import { vi, type Mock } from 'vitest';

export interface MockResponseConfig {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  body?: unknown;
  /** If true, body is treated as raw text and not JSON.stringified */
  rawBody?: boolean;
}

interface MockHandler {
  method: string;
  url: string | RegExp;
  response: MockResponseConfig | ((request: { url: string; body?: unknown; headers: Record<string, string>; params?: Record<string, string>; signal?: AbortSignal }) => MockResponseConfig | Promise<MockResponseConfig>);
  once?: boolean;
}

interface HistoryEntry {
  method: string;
  url: string;
  body?: unknown;
  headers: Record<string, string>;
  params?: Record<string, string>;
  signal?: AbortSignal;
  responseType?: string;
}

class MockFetchBuilder {
  constructor(
    private mock: MockFetch,
    private method: string,
    private url: string | RegExp,
  ) {}

  replyOnce(status: number, body?: unknown): MockFetch {
    this.mock.addHandler({
      method: this.method,
      url: this.url,
      response: { status, body },
      once: true,
    });
    return this.mock;
  }

  replyWithCallback(
    callback: (request: { url: string; body?: unknown; headers: Record<string, string>; params?: Record<string, string> }) => MockResponseConfig | Promise<MockResponseConfig>,
  ): MockFetch {
    this.mock.addHandler({
      method: this.method,
      url: this.url,
      response: callback as () => MockResponseConfig,
    });
    return this.mock;
  }

  // Support axios-mock-adapter style callback: (config) => [status, body]
  reply(
    statusOrCallback: number | ((config: { url: string; body?: unknown; headers: Record<string, string>; params?: Record<string, string>; signal?: AbortSignal }) => [number, unknown]),
    body?: unknown,
  ): MockFetch {
    if (typeof statusOrCallback === 'function') {
      this.mock.addHandler({
        method: this.method,
        url: this.url,
        response: (request) => {
          const [status, responseBody] = statusOrCallback(request as { url: string; body?: unknown; headers: Record<string, string>; params?: Record<string, string>; signal?: AbortSignal });
          return { status, body: responseBody };
        },
      });
    } else {
      this.mock.addHandler({
        method: this.method,
        url: this.url,
        response: { status: statusOrCallback, body },
      });
    }
    return this.mock;
  }

  /** Reply with raw text body (not JSON stringified) */
  replyRaw(status: number, body: string): MockFetch {
    this.mock.addHandler({
      method: this.method,
      url: this.url,
      response: { status, body, rawBody: true },
    });
    return this.mock;
  }

  networkError(): MockFetch {
    this.mock.addHandler({
      method: this.method,
      url: this.url,
      response: () => {
        throw new TypeError('fetch failed');
      },
    });
    return this.mock;
  }

  networkErrorOnce(): MockFetch {
    this.mock.addHandler({
      method: this.method,
      url: this.url,
      response: () => {
        throw new TypeError('fetch failed');
      },
      once: true,
    });
    return this.mock;
  }

  timeout(): MockFetch {
    this.mock.addHandler({
      method: this.method,
      url: this.url,
      response: () => {
        const error = new Error('The operation was aborted');
        error.name = 'AbortError';
        throw error;
      },
    });
    return this.mock;
  }
}

export class MockFetch {
  private handlers: MockHandler[] = [];
  private callHistory: HistoryEntry[] = [];
  private originalFetch: typeof fetch | undefined;
  private currentRequest: { url: string; body?: unknown; headers: Record<string, string>; params?: Record<string, string>; signal?: AbortSignal } | null = null;

  install(): void {
    this.originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(this.handleFetch.bind(this)) as Mock;
  }

  restore(): void {
    if (this.originalFetch) {
      globalThis.fetch = this.originalFetch;
    }
    this.reset();
  }

  reset(): void {
    this.handlers = [];
    this.callHistory = [];
    this.currentRequest = null;
  }

  onGet(url: string | RegExp): MockFetchBuilder {
    return new MockFetchBuilder(this, 'GET', url);
  }

  onPost(url: string | RegExp): MockFetchBuilder {
    return new MockFetchBuilder(this, 'POST', url);
  }

  onPut(url: string | RegExp): MockFetchBuilder {
    return new MockFetchBuilder(this, 'PUT', url);
  }

  onDelete(url: string | RegExp): MockFetchBuilder {
    return new MockFetchBuilder(this, 'DELETE', url);
  }

  onAny(url: string | RegExp): MockFetchBuilder {
    return new MockFetchBuilder(this, '*', url);
  }

  addHandler(handler: MockHandler): void {
    this.handlers.push(handler);
  }

  get history(): {
    get: HistoryEntry[];
    post: HistoryEntry[];
    put: HistoryEntry[];
    delete: HistoryEntry[];
    all: HistoryEntry[];
  } {
    return {
      get: this.callHistory.filter((c) => c.method === 'GET'),
      post: this.callHistory.filter((c) => c.method === 'POST'),
      put: this.callHistory.filter((c) => c.method === 'PUT'),
      delete: this.callHistory.filter((c) => c.method === 'DELETE'),
      all: [...this.callHistory],
    };
  }

  private async handleFetch(
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> {
    // Check for pre-aborted signal (mirrors real fetch behavior)
    if (init?.signal?.aborted) {
      const error = new Error('This operation was aborted');
      error.name = 'AbortError';
      throw error;
    }

    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const method = init?.method ?? 'GET';

    let body: unknown;
    if (init?.body) {
      try {
        body = JSON.parse(init.body as string);
      } catch {
        body = init.body;
      }
    }

    const headers: Record<string, string> = {};
    if (init?.headers) {
      if (init.headers instanceof Headers) {
        init.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(init.headers)) {
        init.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, init.headers);
      }
    }

    // Extract query params from URL
    let params: Record<string, string> | undefined;
    try {
      const urlObj = new URL(url);
      if (urlObj.search) {
        params = {};
        urlObj.searchParams.forEach((value, key) => {
          params![key] = value;
        });
      }
    } catch {
      // URL parsing failed, ignore params
    }

    const signal = init?.signal;
    this.callHistory.push({ method, url, body, headers, params, signal });
    this.currentRequest = { url, body, headers, params, signal };

    const handlerIndex = this.handlers.findIndex((h) => {
      if (h.method !== '*' && h.method !== method) return false;
      if (typeof h.url === 'string') {
        return url.includes(h.url);
      }
      return h.url.test(url);
    });

    if (handlerIndex === -1) {
      throw new Error(`MockFetch: No handler for ${method} ${url}`);
    }

    const handler = this.handlers[handlerIndex];
    if (handler.once) {
      this.handlers.splice(handlerIndex, 1);
    }

    const responseConfig =
      typeof handler.response === 'function'
        ? await handler.response(this.currentRequest!)
        : handler.response;

    let bodyContent: string | null = null;
    let contentType = 'application/json';

    if (responseConfig.body !== undefined) {
      if (responseConfig.rawBody) {
        // Raw body - use as-is (for text/svg responses)
        bodyContent = String(responseConfig.body);
        contentType = 'text/plain';
      } else {
        bodyContent = JSON.stringify(responseConfig.body);
      }
    }

    return new Response(bodyContent, {
      status: responseConfig.status ?? 200,
      statusText: responseConfig.statusText ?? 'OK',
      headers: {
        'Content-Type': contentType,
        ...(responseConfig.headers ?? {}),
      },
    });
  }
}

export const mockFetch = new MockFetch();
