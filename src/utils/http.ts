import type { RequestConfig } from '../types/config';
import type { FetchHttpClient } from './fetchClient';

type Normalizer = <T>(payload: unknown) => T;

export interface HttpHelper {
  get<TResponse>(path: string, config?: RequestConfig): Promise<TResponse>;
  post<TRequest, TResponse>(path: string, data: TRequest, config?: RequestConfig): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, data: TRequest, config?: RequestConfig): Promise<TResponse>;
  delete<TResponse>(path: string, config?: RequestConfig): Promise<TResponse>;
}

export class FetchHttpHelper implements HttpHelper {
  constructor(
    private readonly client: FetchHttpClient,
    private readonly normalize: Normalizer,
  ) {}

  async get<TResponse>(path: string, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.get<TResponse>(path, config);
    return this.normalize<TResponse>(response);
  }

  async post<TRequest, TResponse>(
    path: string,
    data: TRequest,
    config?: RequestConfig,
  ): Promise<TResponse> {
    const response = await this.client.post<TResponse>(path, data, config);
    return this.normalize<TResponse>(response);
  }

  async put<TRequest, TResponse>(
    path: string,
    data: TRequest,
    config?: RequestConfig,
  ): Promise<TResponse> {
    const response = await this.client.put<TResponse>(path, data, config);
    return this.normalize<TResponse>(response);
  }

  async delete<TResponse>(path: string, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.delete<TResponse>(path, config);
    return this.normalize<TResponse>(response);
  }
}
