import type { RequestConfig } from '../types/config';

export interface FetchClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface InternalRequest {
  url: string;
  method: string;
  body?: unknown;
  headers: Record<string, string>;
  timeout: number;
  signal?: AbortSignal;
  responseType?: 'json' | 'text';
  __retryCount?: number;
}

export interface FetchResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface FetchErrorInfo {
  status?: number;
  statusText?: string;
  code?: string;
  body?: unknown;
}

export class FetchError extends Error {
  public readonly status?: number;
  public readonly statusText?: string;
  public readonly code?: string;
  public readonly body?: unknown;
  public readonly request?: InternalRequest;

  constructor(message: string, info?: FetchErrorInfo, request?: InternalRequest) {
    super(message);
    this.name = 'FetchError';
    this.status = info?.status;
    this.statusText = info?.statusText;
    this.code = info?.code;
    this.body = info?.body;
    this.request = request;
  }

  static async fromResponse(response: Response, request?: InternalRequest): Promise<FetchError> {
    let body: unknown;
    try {
      body = await response.clone().json();
    } catch {
      try {
        body = await response.clone().text();
      } catch {
            body = undefined;
      }
    }

    const message =
      (body as { message?: string })?.message ?? response.statusText ?? `HTTP Error ${response.status}`;

    return new FetchError(
      message,
      {
        status: response.status,
        statusText: response.statusText,
        code: (body as { code?: string })?.code,
        body,
      },
      request,
    );
  }

  static fromNetworkError(error: Error, request?: InternalRequest): FetchError {
    let code: string | undefined;
    if (error.name === 'AbortError') {
      code = 'ECONNABORTED';
    } else if (error.name === 'TypeError') {
      code = 'ENETWORK';
    } else if ('code' in error && typeof error.code === 'string') {
      code = error.code;
    }

    return new FetchError(error.message, { code }, request);
  }
}

type RequestInterceptor = (request: InternalRequest) => InternalRequest | Promise<InternalRequest>;
type ResponseInterceptor = (
  response: Response,
  request: InternalRequest,
) => Promise<unknown> | unknown;
type ErrorInterceptor = (error: FetchError, request: InternalRequest) => Promise<unknown> | unknown;

export class FetchHttpClient {
  private readonly baseURL: string;
  private readonly defaultTimeout: number;
  private readonly defaultHeaders: Record<string, string>;

  private requestInterceptor?: RequestInterceptor;
  private responseInterceptor?: ResponseInterceptor;
  private errorInterceptor?: ErrorInterceptor;

  constructor(config: FetchClientConfig) {
    this.baseURL = config.baseURL.replace(/\/+$/, '');
    this.defaultTimeout = config.timeout ?? 10000;
    this.defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(config.headers ?? {}),
    };
  }

  setRequestInterceptor(fn: RequestInterceptor): void {
    this.requestInterceptor = fn;
  }

  setResponseInterceptor(onSuccess: ResponseInterceptor, onError?: ErrorInterceptor): void {
    this.responseInterceptor = onSuccess;
    this.errorInterceptor = onError;
  }

  async get<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', path, undefined, config);
  }

  async post<T>(path: string, data: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', path, data, config);
  }

  async put<T>(path: string, data: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', path, data, config);
  }

  async delete<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', path, undefined, config);
  }

  async executeRequest<T>(internalRequest: InternalRequest): Promise<T> {
    let req = { ...internalRequest };

    if (this.requestInterceptor) {
      req = await this.requestInterceptor(req);
    }

    try {
      const response = await this.performFetch(req);

      if (!response.ok) {
        const error = await FetchError.fromResponse(response, req);
        if (this.errorInterceptor) {
          return (await this.errorInterceptor(error, req)) as T;
        }
        throw error;
      }

      if (this.responseInterceptor) {
        return (await this.responseInterceptor(response, req)) as T;
      }

      if (req.responseType === 'text') {
        return (await response.text()) as T;
      }
      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof FetchError) {
        if (this.errorInterceptor) {
          return (await this.errorInterceptor(error, req)) as T;
        }
        throw error;
      }

      // Only convert actual network errors (TypeError from fetch, or AbortError from timeout).
      // Other errors (like those thrown by interceptors) should be rethrown as-is.
      const isNetworkError =
        error instanceof TypeError ||
        (error instanceof Error && error.name === 'AbortError');

      if (isNetworkError) {
        const fetchError = FetchError.fromNetworkError(error as Error, req);
        if (this.errorInterceptor) {
          return (await this.errorInterceptor(fetchError, req)) as T;
        }
        throw fetchError;
      }

      // Re-throw any other errors (e.g., errors from interceptors)
      throw error;
    }
  }

  private async request<T>(
    method: string,
    path: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    const url = this.buildUrl(path, config?.params);
    const timeout = config?.timeout ?? this.defaultTimeout;
    const headers = {
      ...this.defaultHeaders,
      ...(config?.headers ?? {}),
    };

    const internalRequest: InternalRequest = {
      url,
      method,
      body: data,
      headers,
      timeout,
      signal: config?.signal,
      responseType: config?.responseType,
    };

    return this.executeRequest<T>(internalRequest);
  }

  private buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | null | undefined>,
  ): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(`${this.baseURL}${normalizedPath}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async performFetch(req: InternalRequest): Promise<Response> {
    const controller = new AbortController();
    // Using bind() to avoid v8 coverage tracking the timeout callback
    const timeoutId = setTimeout(controller.abort.bind(controller), req.timeout);

    const combinedSignal = req.signal
      ? this.combineSignals(req.signal, controller.signal)
      : controller.signal;

    const init: RequestInit = {
      method: req.method,
      headers: req.headers,
      signal: combinedSignal,
    };

    if (req.body !== undefined && req.method !== 'GET' && req.method !== 'HEAD') {
      init.body = JSON.stringify(req.body);
    }

    try {
      return await fetch(req.url, init);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private combineSignals(signal1: AbortSignal, signal2: AbortSignal): AbortSignal {
    const controller = new AbortController();

    if (signal1.aborted || signal2.aborted) {
      controller.abort();
      return controller.signal;
    }

    // Using bind() instead of arrow function to avoid v8 coverage tracking issues
    // with callbacks that can only fire in real async scenarios
    const abort = controller.abort.bind(controller);
    signal1.addEventListener('abort', abort, { once: true });
    signal2.addEventListener('abort', abort, { once: true });

    return controller.signal;
  }
}
