import { AxiosRequestConfig } from 'axios';

export interface RetryConfig {
  attempts: number;
  delayMs?: number;
  retryStatusCodes?: number[];
}

export type AstrologyLogger = (message: string, details?: unknown) => void;

export interface AstrologyClientConfig {
  /**
   * RapidAPI key for authentication. If omitted, the client will fall back to
   * the RAPIDAPI_KEY environment variable.
   */
  apiKey?: string;
  /**
   * RapidAPI host header value. If omitted, defaults to the RapidAPI host.
   * Can also be set via RAPIDAPI_HOST environment variable.
   */
  rapidApiHost?: string;
  /**
   * Optional override for the API base URL. When omitted, the client uses the RapidAPI
   * endpoint. `baseUrl` is accepted as a camelCase alias.
   */
  baseUrl?: string;
  baseURL?: string;
  timeout?: number;
  retry?: RetryConfig;
  axiosOptions?: AxiosRequestConfig;
  /**
   * Enables verbose logging. Can also be toggled via the ASTROLOGY_DEBUG environment variable.
   */
  debug?: boolean;
  /**
   * Custom logger function used when debugging is enabled. Defaults to console.log.
   */
  logger?: AstrologyLogger;
}

export const DEFAULT_RAPIDAPI_HOST =
  'best-astrology-api-natal-charts-transits-synastry.p.rapidapi.com';
export const DEFAULT_BASE_URL = `https://${DEFAULT_RAPIDAPI_HOST}`;
export const DEFAULT_TIMEOUT_MS = 10000;
export const DEFAULT_RETRY_STATUS_CODES = [408, 425, 429, 500, 502, 503, 504];

