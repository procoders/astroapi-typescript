import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type Normalizer = <T>(payload: unknown) => T;

export interface HttpHelper {
  get<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse>;
  post<TRequest, TResponse>(
    path: string,
    data: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse>;
  put<TRequest, TResponse>(
    path: string,
    data: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse>;
  delete<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse>;
}

export class AxiosHttpHelper implements HttpHelper {
  constructor(private readonly axios: AxiosInstance, private readonly normalize: Normalizer) {}

  async get<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.axios.get<TResponse>(path, config);
    return this.normalizeResponse(response);
  }

  async post<TRequest, TResponse>(
    path: string,
    data: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.axios.post<TResponse>(path, data, config);
    return this.normalizeResponse(response);
  }

  async put<TRequest, TResponse>(
    path: string,
    data: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.axios.put<TResponse>(path, data, config);
    return this.normalizeResponse(response);
  }

  async delete<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.axios.delete<TResponse>(path, config);
    return this.normalizeResponse(response);
  }

  private normalizeResponse<TResponse>(response: AxiosResponse<TResponse>): TResponse {
    return this.normalize<TResponse>(response.data);
  }
}

