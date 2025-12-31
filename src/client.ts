import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  isAxiosError,
} from 'axios';
import {
  AstrologyClientConfig,
  AstrologyLogger,
  DEFAULT_BASE_URL,
  DEFAULT_RAPIDAPI_HOST,
  DEFAULT_RETRY_STATUS_CODES,
  DEFAULT_TIMEOUT_MS,
} from './types';
import { AstrologyError } from './errors/AstrologyError';
import { validateConfig } from './utils/validators';
import { AxiosHttpHelper, type HttpHelper } from './utils/http';
import { DataClient } from './categories/DataClient';
import { ChartsClient } from './categories/ChartsClient';
import { HoroscopeClient } from './categories/HoroscopeClient';
import { AnalysisClient } from './categories/AnalysisClient';
import { GlossaryClient } from './categories/GlossaryClient';
import { AstrocartographyClient } from './categories/AstrocartographyClient';
import { ChineseClient } from './categories/ChineseClient';
import { EclipsesClient } from './categories/EclipsesClient';
import { LunarClient } from './categories/LunarClient';
import { NumerologyClient } from './categories/NumerologyClient';
import { TarotClient } from './categories/TarotClient';
import { TraditionalClient } from './categories/TraditionalClient';
import { FixedStarsClient } from './categories/FixedStarsClient';
import { InsightsClient } from './categories/InsightsClient';
import { SvgClient } from './categories/SvgClient';
import { EnhancedClient } from './categories/EnhancedClient';

interface RetryableRequestConfig extends AxiosRequestConfig {
  __retryCount?: number;
}

interface NormalizedRetryConfig {
  attempts: number;
  delayMs: number;
  retryStatusCodes: number[];
}

const NETWORK_ERROR_CODES = new Set([
  'ECONNABORTED',
  'ENOTFOUND',
  'ECONNRESET',
  'ETIMEDOUT',
  'EPIPE',
]);

export class AstrologyClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly retryConfig: NormalizedRetryConfig;
  private readonly apiKey?: string;
  private readonly rapidApiHost: string;
  private readonly debugEnabled: boolean;
  private readonly logger: AstrologyLogger;
  private readonly logPrefix = '[AstrologyClient]';
  private readonly httpHelper: HttpHelper;

  readonly data: DataClient;
  readonly charts: ChartsClient;
  readonly horoscope: HoroscopeClient;
  readonly analysis: AnalysisClient;
  readonly glossary: GlossaryClient;
  readonly astrocartography: AstrocartographyClient;
  readonly chinese: ChineseClient;
  readonly eclipses: EclipsesClient;
  readonly lunar: LunarClient;
  readonly numerology: NumerologyClient;
  readonly tarot: TarotClient;
  readonly traditional: TraditionalClient;
  readonly fixedStars: FixedStarsClient;
  readonly insights: InsightsClient;
  readonly svg: SvgClient;
  readonly enhanced: EnhancedClient;

  private readonly normalizePayload = <T>(payload: unknown): T => {
    if (payload && typeof payload === 'object') {
      const record = payload as Record<string, unknown>;
      if (record.data !== undefined) {
        return record.data as T;
      }
      if (record.result !== undefined) {
        return record.result as T;
      }
    }
    return payload as T;
  };

  constructor(private readonly config: AstrologyClientConfig) {
    validateConfig(config);

    const baseURL = this.resolveBaseUrl(config.baseURL ?? config.baseUrl);
    const timeout = typeof config.timeout === 'number' ? config.timeout : DEFAULT_TIMEOUT_MS;
    this.apiKey = this.resolveApiKey(config.apiKey);
    this.rapidApiHost = this.resolveRapidApiHost(config.rapidApiHost);
    this.debugEnabled = this.resolveDebugFlag(config.debug);
    this.logger = config.logger ?? console.log;
    this.retryConfig = {
      attempts: this.clampToNonNegative(config.retry?.attempts, 0),
      delayMs: this.clampToNonNegative(config.retry?.delayMs, 250),
      retryStatusCodes: this.resolveRetryStatusCodes(config.retry?.retryStatusCodes),
    };

    if (this.debugEnabled) {
      this.log('Debug logging enabled');
    }

    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      ...config.axiosOptions,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(config.axiosOptions?.headers ?? {}),
      },
    });

    this.setupInterceptors();

    this.httpHelper = new AxiosHttpHelper(this.axiosInstance, this.normalizePayload);

    this.data = new DataClient(this.httpHelper);
    this.charts = new ChartsClient(this.httpHelper);
    this.horoscope = new HoroscopeClient(this.httpHelper);
    this.analysis = new AnalysisClient(this.httpHelper);
    this.glossary = new GlossaryClient(this.httpHelper);
    this.astrocartography = new AstrocartographyClient(this.httpHelper);
    this.chinese = new ChineseClient(this.httpHelper);
    this.eclipses = new EclipsesClient(this.httpHelper);
    this.lunar = new LunarClient(this.httpHelper);
    this.numerology = new NumerologyClient(this.httpHelper);
    this.tarot = new TarotClient(this.httpHelper);
    this.traditional = new TraditionalClient(this.httpHelper);
    this.fixedStars = new FixedStarsClient(this.httpHelper);
    this.insights = new InsightsClient(this.httpHelper);
    this.svg = new SvgClient(this.httpHelper);
    this.enhanced = new EnhancedClient(this.httpHelper);
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use((request) => {
      if (!request.headers || typeof request.headers !== 'object') {
        request.headers = {} as AxiosRequestHeaders;
      }
      const headers = request.headers as AxiosRequestHeaders & {
        has?: (name: string) => boolean;
        set?: (name: string, value: string) => void;
      };

      // Set RapidAPI host header
      this.setHeaderIfMissing(headers, 'x-rapidapi-host', this.rapidApiHost);

      // Set RapidAPI key header
      if (this.apiKey) {
        this.setHeaderIfMissing(headers, 'x-rapidapi-key', this.apiKey);
      }

      this.log('Outgoing request', {
        method: request.method,
        url: request.url,
        baseURL: request.baseURL,
        params: request.params,
      });
      return request;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.log('Response received', {
          url: response.config?.url,
          status: response.status,
        });
        return response;
      },
      async (error) => {
        if (isAxiosError(error) && this.shouldRetry(error)) {
          this.log('Retry condition met', {
            url: error.config?.url,
            status: error.response?.status,
            code: error.code,
          });
          return this.retryRequest(error);
        }
        this.log('Request failed', {
          url: error.config?.url,
          status: isAxiosError(error) ? error.response?.status : undefined,
          code: isAxiosError(error) ? error.code : undefined,
          message: error.message,
        });
        throw AstrologyError.normalize(error);
      },
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    if (this.retryConfig.attempts <= 0) {
      return false;
    }

    const requestConfig = error.config as RetryableRequestConfig | undefined;
    if (!requestConfig) {
      return false;
    }

    const attempt = requestConfig.__retryCount ?? 0;
    if (attempt >= this.retryConfig.attempts) {
      return false;
    }

    // Retry on network errors
    if (!error.response) {
      return NETWORK_ERROR_CODES.has(error.code ?? '') || error.message.includes('Network Error');
    }

    return this.retryConfig.retryStatusCodes.includes(error.response.status);
  }

  private async retryRequest(error: AxiosError): Promise<AxiosResponse> {
    const requestConfig = error.config as RetryableRequestConfig;
    requestConfig.__retryCount = (requestConfig.__retryCount ?? 0) + 1;

    this.log('Retrying request', {
      url: requestConfig.url,
      attempt: requestConfig.__retryCount,
      status: error.response?.status,
      code: error.code,
    });

    await this.delay(this.retryConfig.delayMs);
    return this.axiosInstance.request(requestConfig);
  }

  private async delay(ms: number): Promise<void> {
    if (ms <= 0) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  private setHeaderIfMissing(
    headers: AxiosRequestHeaders & {
      has?: (name: string) => boolean;
      set?: (name: string, value: string) => void;
    },
    name: string,
    value: string,
  ): void {
    const hasHeader =
      typeof headers.has === 'function'
        ? headers.has(name)
        : Object.prototype.hasOwnProperty.call(headers, name);

    if (!hasHeader) {
      if (typeof headers.set === 'function') {
        headers.set(name, value);
      } else {
        headers[name] = value;
      }
    }
  }

  private resolveApiKey(apiKey?: string): string | undefined {
    const fromConfig = apiKey?.trim();
    if (fromConfig) {
      return fromConfig;
    }
    const fromEnv = process.env.RAPIDAPI_KEY?.trim();
    return fromEnv || undefined;
  }

  private resolveRapidApiHost(host?: string): string {
    const fromConfig = host?.trim();
    if (fromConfig) {
      return fromConfig;
    }
    const fromEnv = process.env.RAPIDAPI_HOST?.trim();
    return fromEnv || DEFAULT_RAPIDAPI_HOST;
  }

  private resolveBaseUrl(baseURL?: string): string {
    if (baseURL && baseURL.trim()) {
      return baseURL;
    }

    const envBaseUrl = process.env.ASTROLOGY_API_BASE_URL;
    if (envBaseUrl && envBaseUrl.trim()) {
      return envBaseUrl;
    }

    return DEFAULT_BASE_URL;
  }

  private resolveDebugFlag(flag?: boolean): boolean {
    if (typeof flag === 'boolean') {
      return flag;
    }
    const env = process.env.ASTROLOGY_DEBUG;
    if (env === undefined) {
      return false;
    }
    return env.trim().toLowerCase() === 'true';
  }

  private clampToNonNegative(value: number | undefined, fallback: number): number {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return fallback;
    }

    if (value < 0) {
      return 0;
    }

    return value;
  }

  private resolveRetryStatusCodes(codes?: number[]): number[] {
    return Array.isArray(codes) && codes.length > 0 ? codes : DEFAULT_RETRY_STATUS_CODES;
  }

  private log(message: string, details?: unknown): void {
    if (!this.debugEnabled) {
      return;
    }

    try {
      if (details !== undefined) {
        this.logger(`${this.logPrefix} ${message}`, details);
      } else {
        this.logger(`${this.logPrefix} ${message}`);
      }
    } catch {
      // Swallow logger errors to avoid breaking client flow.
    }
  }

  get httpClient(): AxiosInstance {
    return this.axiosInstance;
  }
}
