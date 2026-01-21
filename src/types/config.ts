export interface RetryConfig {
  attempts: number;
  delayMs?: number;
  retryStatusCodes?: number[];
}

export type AstrologyLogger = (message: string, details?: unknown) => void;

/**
 * Configuration for individual HTTP requests.
 */
export interface RequestConfig {
  /** Query parameters to append to the URL */
  params?: Record<string, string | number | boolean | null | undefined>;
  /** Additional headers for the request */
  headers?: Record<string, string>;
  /** AbortSignal for request cancellation */
  signal?: AbortSignal;
  /** Request timeout in milliseconds (overrides client default) */
  timeout?: number;
  /** Response type: 'json' (default) or 'text' */
  responseType?: 'json' | 'text';
}

export interface AstrologyClientConfig {
  /**
   * API key for Bearer token authentication. If omitted, the client will fall back to
   * the ASTROLOGY_API_KEY environment variable.
   */
  apiKey?: string;
  /**
   * Optional override for the API base URL. When omitted, the client uses the default
   * endpoint (https://api.astrology-api.io). `baseUrl` is accepted as a camelCase alias.
   * Can also be set via ASTROLOGY_API_BASE_URL environment variable.
   */
  baseUrl?: string;
  baseURL?: string;
  timeout?: number;
  retry?: RetryConfig;
  /**
   * Additional options for individual requests.
   */
  requestOptions?: RequestConfig;
  /**
   * Enables verbose logging. Can also be toggled via the ASTROLOGY_DEBUG environment variable.
   */
  debug?: boolean;
  /**
   * Custom logger function used when debugging is enabled. Defaults to console.log.
   */
  logger?: AstrologyLogger;
}

export const DEFAULT_BASE_URL = 'https://api.astrology-api.io';
export const DEFAULT_TIMEOUT_MS = 10000;
export const DEFAULT_RETRY_STATUS_CODES = [408, 425, 429, 500, 502, 503, 504];

