import MockAdapter from 'axios-mock-adapter';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  AstrologyClient,
  AstrologyError,
  DEFAULT_BASE_URL,
  DEFAULT_RAPIDAPI_HOST,
  DEFAULT_RETRY_STATUS_CODES,
} from '../../src';
import {
  mockCitiesResponse,
  mockLunarMetricsResponse,
  mockNatalChartResponse,
  mockNatalReportResponse,
  mockPersonalDailyHoroscopeResponse,
  mockPlanetaryPositionsResponse,
  mockSynastryReportResponse,
} from '../mocks/responses';
import {
  LunarMetricsRequest,
  PersonalizedHoroscopeRequest,
  PlanetaryPositionsRequest,
  Subject,
  SynastryReportRequest,
} from '../../src/types';

const SUBJECT: Subject = {
  name: 'Demo',
  birth_data: {
    year: 1990,
    month: 5,
    day: 11,
    hour: 18,
    minute: 15,
    city: 'London',
    country_code: 'GB',
  },
};

const SYNASRY_SUBJECT: Subject = {
  name: 'Partner',
  birth_data: {
    year: 1992,
    month: 8,
    day: 23,
    hour: 6,
    minute: 45,
    city: 'Paris',
    country_code: 'FR',
  },
};

const buildAxiosError = (status: number, message: string, config?: AxiosRequestConfig): AxiosError => {
  const axiosConfig = (config ?? { url: '/test', method: 'get' }) as AxiosRequestConfig;
  return new AxiosError(
    message,
    'ERR_BAD_RESPONSE',
    axiosConfig as any,
    undefined,
    {
      status,
      statusText: message,
      headers: {},
      config: axiosConfig as any,
      data: { message },
    },
  );
};

const ORIGINAL_ENV_API_KEY = process.env.RAPIDAPI_KEY;
const ORIGINAL_ENV_HOST = process.env.RAPIDAPI_HOST;
const ORIGINAL_DEBUG_ENV = process.env.ASTROLOGY_DEBUG;

describe('AstrologyClient', () => {
  let client: AstrologyClient;
  let mock: MockAdapter;

  beforeEach(() => {
    if (ORIGINAL_ENV_API_KEY === undefined) {
      delete process.env.RAPIDAPI_KEY;
    } else {
      process.env.RAPIDAPI_KEY = ORIGINAL_ENV_API_KEY;
    }
    if (ORIGINAL_ENV_HOST === undefined) {
      delete process.env.RAPIDAPI_HOST;
    } else {
      process.env.RAPIDAPI_HOST = ORIGINAL_ENV_HOST;
    }
    if (ORIGINAL_DEBUG_ENV === undefined) {
      delete process.env.ASTROLOGY_DEBUG;
    } else {
      process.env.ASTROLOGY_DEBUG = ORIGINAL_DEBUG_ENV;
    }
    client = new AstrologyClient({
      apiKey: 'test-key',
      retry: {
        attempts: 1,
        delayMs: 0,
      },
    });
    mock = new MockAdapter(client.httpClient);
  });

  afterEach(() => {
    mock.reset();
    if (ORIGINAL_ENV_API_KEY === undefined) {
      delete process.env.RAPIDAPI_KEY;
    } else {
      process.env.RAPIDAPI_KEY = ORIGINAL_ENV_API_KEY;
    }
    if (ORIGINAL_ENV_HOST === undefined) {
      delete process.env.RAPIDAPI_HOST;
    } else {
      process.env.RAPIDAPI_HOST = ORIGINAL_ENV_HOST;
    }
    if (ORIGINAL_DEBUG_ENV === undefined) {
      delete process.env.ASTROLOGY_DEBUG;
    } else {
      process.env.ASTROLOGY_DEBUG = ORIGINAL_DEBUG_ENV;
    }
  });

  afterAll(() => {
    if (ORIGINAL_ENV_API_KEY === undefined) {
      delete process.env.RAPIDAPI_KEY;
    } else {
      process.env.RAPIDAPI_KEY = ORIGINAL_ENV_API_KEY;
    }
    if (ORIGINAL_ENV_HOST === undefined) {
      delete process.env.RAPIDAPI_HOST;
    } else {
      process.env.RAPIDAPI_HOST = ORIGINAL_ENV_HOST;
    }
    if (ORIGINAL_DEBUG_ENV === undefined) {
      delete process.env.ASTROLOGY_DEBUG;
    } else {
      process.env.ASTROLOGY_DEBUG = ORIGINAL_DEBUG_ENV;
    }
  });

  const createPositionsRequest = (): PlanetaryPositionsRequest => ({
    subject: SUBJECT,
    options: {
      house_system: 'P',
    },
  });

  it('sends RapidAPI headers and returns planetary positions', async () => {
    mock.onPost('/api/v3/data/positions').reply((config) => {
      expect(config.headers?.['x-rapidapi-key']).toBe('test-key');
      expect(config.headers?.['x-rapidapi-host']).toBeDefined();
      const payload = JSON.parse(config.data) as PlanetaryPositionsRequest;
      expect(payload.subject.birth_data.year).toBe(1990);
      return [200, mockPlanetaryPositionsResponse];
    });

    const response = await client.data.getPositions(createPositionsRequest());
    expect(response).toEqual(mockPlanetaryPositionsResponse);
  });

  it('unwraps data envelope responses', async () => {
    mock.onPost('/api/v3/data/positions').reply(200, {
      data: mockPlanetaryPositionsResponse,
      success: true,
    });

    const response = await client.data.getPositions(createPositionsRequest());
    expect(response).toEqual(mockPlanetaryPositionsResponse);
  });

  it('unwraps result envelope responses', async () => {
    mock.onPost('/api/v3/data/positions').reply(200, {
      result: mockPlanetaryPositionsResponse,
    });

    const response = await client.data.getPositions(createPositionsRequest());
    expect(response).toEqual(mockPlanetaryPositionsResponse);
  });

  it('retrieves lunar metrics', async () => {
    const request: LunarMetricsRequest = {
      datetime_location: {
        year: 2024,
        month: 1,
        day: 15,
        hour: 10,
        minute: 30,
        latitude: 51.5,
        longitude: -0.12,
      },
    };

    mock.onPost('/api/v3/data/lunar-metrics').reply(200, mockLunarMetricsResponse);

    const response = await client.data.getLunarMetrics(request);
    expect(response.moon_phase).toBe('Waxing Crescent');
  });

  it('retrieves natal chart and report responses', async () => {
    mock.onPost('/api/v3/charts/natal').reply(200, mockNatalChartResponse);
    mock.onPost('/api/v3/analysis/natal-report').reply(200, mockNatalReportResponse);

    const chart = await client.charts.getNatalChart({ subject: SUBJECT });
    const report = await client.analysis.getNatalReport({ subject: SUBJECT });

    expect(chart.chart_data.planetary_positions).toHaveLength(2);
    expect(report.interpretations[0].title).toContain('Sun');
  });

  it('retrieves synastry report', async () => {
    mock.onPost('/api/v3/analysis/synastry-report').reply(200, mockSynastryReportResponse);
    const request: SynastryReportRequest = {
      subject1: SUBJECT,
      subject2: SYNASRY_SUBJECT,
    };

    const response = await client.analysis.getSynastryReport(request);
    expect(response.report_title).toBe('Synastry Overview');
  });

  it('retrieves personal daily horoscope', async () => {
    mock.onPost('/api/v3/horoscope/personal/daily').reply(200, mockPersonalDailyHoroscopeResponse);
    const request: PersonalizedHoroscopeRequest = {
      subject: SUBJECT,
      date: '2024-01-15',
      horoscope_type: 'daily',
    };

    const response = await client.horoscope.getPersonalDailyHoroscope(request);
    expect(response.overall_theme).toContain('Communication');
  });

  it('throws validation error for invalid personal horoscope date', async () => {
    const request: PersonalizedHoroscopeRequest = {
      subject: SUBJECT,
      // invalid format
      date: '15-01-2024',
    };

    await expect(client.horoscope.getPersonalDailyHoroscope(request)).rejects.toBeInstanceOf(
      AstrologyError,
    );
  });

  it('retrieves city glossary data with query params', async () => {
    mock.onGet('/api/v3/glossary/cities').reply((config) => {
      expect(config.params).toEqual({ search: 'Lon', limit: 5 });
      return [200, mockCitiesResponse];
    });

    const response = await client.glossary.getCities({ search: 'Lon', limit: 5 });
    expect(response.total).toBe(1);
    expect(response.items[0].name).toBe('London');
  });

  it('merges city params with custom axios options', async () => {
    const controller = new AbortController();
    mock.onGet('/api/v3/glossary/cities').reply((config) => {
      expect(config.params).toEqual({ limit: 10, offset: 2, search: 'Paris' });
      expect(config.signal).toBe(controller.signal);
      return [200, mockCitiesResponse];
    });

    const response = await client.glossary.getCities({ search: 'Paris', offset: 2 }, { params: { limit: 10 }, signal: controller.signal });

    expect(response.total).toBe(1);
  });

  it('merges axiosOptions when provided on legacy getCities helper', async () => {
    const controller = new AbortController();
    mock.onGet('/api/v3/glossary/cities').reply((config) => {
      expect(config.params).toEqual({ search: 'Rome' });
      expect(config.signal).toBe(controller.signal);
      expect(config.headers?.['X-Extra']).toBe('yes');
      return [200, mockCitiesResponse];
    });

    await client.glossary.getCities(
      { search: 'Rome' },
      {
        headers: { 'X-Extra': 'yes' },
        signal: controller.signal,
      },
    );
  });

  it('retries once after server error and succeeds', async () => {
    mock
      .onPost('/api/v3/data/positions')
      .replyOnce(500)
      .onPost('/api/v3/data/positions')
      .reply(200, mockPlanetaryPositionsResponse);

    const response = await client.data.getPositions(createPositionsRequest());
    expect(response.positions[0].name).toBe('Sun');
  });

  it('retries on network error and succeeds', async () => {
    mock
      .onPost('/api/v3/data/positions')
      .networkErrorOnce()
      .onPost('/api/v3/data/positions')
      .reply(200, mockPlanetaryPositionsResponse);

    const response = await client.data.getPositions(createPositionsRequest());
    expect(response.positions.length).toBe(2);
  });

  it('recognizes retryable network error codes', () => {
    const error = new AxiosError('socket hang up', 'ECONNRESET');
    (error as any).config = { __retryCount: 0 };
    expect((client as any).shouldRetry(error)).toBe(true);
  });

  it('logs failed non-Axios errors', async () => {
    const logger = vi.fn();
    const debugClient = new AstrologyClient({
      apiKey: 'debug-key',
      debug: true,
      logger,
      retry: { attempts: 0 },
    });

    const handlers = debugClient.httpClient.interceptors.response.handlers;
    const rejected = handlers[handlers.length - 1]?.rejected;
    await expect(rejected?.(new Error('boom'))).rejects.toBeInstanceOf(AstrologyError);
    expect(logger).toHaveBeenCalledWith('[AstrologyClient] Request failed', {
      url: undefined,
      status: undefined,
      code: undefined,
      message: 'boom',
    });
  });

  it('honors retry delay when configured', async () => {
    vi.useFakeTimers();
    const delayedClient = new AstrologyClient({
      apiKey: 'test-key',
      retry: {
        attempts: 1,
        delayMs: 25,
      },
    });
    const delayedMock = new MockAdapter(delayedClient.httpClient);
    delayedMock
      .onPost('/api/v3/data/positions')
      .replyOnce(500)
      .onPost('/api/v3/data/positions')
      .reply(200, mockPlanetaryPositionsResponse);

    const promise = delayedClient.data.getPositions(createPositionsRequest());
    await vi.runAllTimersAsync();
    const response = await promise;
    expect(response.positions).toHaveLength(2);
    vi.useRealTimers();
  });

  it('throws AstrologyError when retries exhausted', async () => {
    const failingClient = new AstrologyClient({
      apiKey: 'test-key',
      retry: {
        attempts: 1,
        delayMs: 0,
        retryStatusCodes: [500],
      },
    });
    const failingMock = new MockAdapter(failingClient.httpClient);
    failingMock.onPost('/api/v3/data/positions').reply(500, { message: 'Server error' });

    await expect(failingClient.data.getPositions(createPositionsRequest())).rejects.toMatchObject({
      statusCode: 500,
      message: 'Server error',
    });
  });

  it('should not retry when attempts disabled', () => {
    const noRetryClient = new AstrologyClient({
      apiKey: 'test-key',
      retry: { attempts: 0 },
    });
    const error = buildAxiosError(500, 'fail');
    expect((noRetryClient as any).shouldRetry(error)).toBe(false);
  });

  it('should not retry when request config missing', () => {
    const error = new AxiosError('fail', 'ERR_NETWORK');
    expect((client as any).shouldRetry(error)).toBe(false);
  });

  it('respects custom baseURL and pre-set headers', async () => {
    const customClient = new AstrologyClient({
      apiKey: 'custom-key',
      baseURL: 'https://custom.example.com',
      timeout: 5000,
      retry: {
        attempts: -1,
        delayMs: -100,
        retryStatusCodes: [429],
      },
      axiosOptions: {
        headers: {
          'x-rapidapi-key': 'pre-set',
          'X-Custom-Header': 'value',
        },
      },
    });

    const customMock = new MockAdapter(customClient.httpClient);
    customMock.onPost('/api/v3/data/positions').reply((config) => {
      expect(config.baseURL).toBe('https://custom.example.com');
      expect(config.timeout).toBe(5000);
      expect(config.headers?.['x-rapidapi-key']).toBe('pre-set');
      expect(config.headers?.['X-Custom-Header']).toBe('value');
      return [200, mockPlanetaryPositionsResponse];
    });

    await customClient.data.getPositions(createPositionsRequest());
  });

  it('uses environment API key when config omits one', async () => {
    const original = process.env.RAPIDAPI_KEY;
    process.env.RAPIDAPI_KEY = 'env-key';
    const envClient = new AstrologyClient({
      retry: { attempts: 0 },
    });
    const envMock = new MockAdapter(envClient.httpClient);
    envMock.onPost('/api/v3/data/positions').reply((config) => {
      expect(config.headers?.['x-rapidapi-key']).toBe('env-key');
      return [200, mockPlanetaryPositionsResponse];
    });

    await envClient.data.getPositions(createPositionsRequest());
    envMock.reset();
    if (original === undefined) {
      delete process.env.RAPIDAPI_KEY;
    } else {
      process.env.RAPIDAPI_KEY = original;
    }
  });

  it('does not set API key header when no key provided', async () => {
    delete process.env.RAPIDAPI_KEY;
    const anonymousClient = new AstrologyClient({
      retry: { attempts: 0 },
    });
    const anonymousMock = new MockAdapter(anonymousClient.httpClient);
    anonymousMock.onPost('/api/v3/data/positions').reply((config) => {
      expect(config.headers?.['x-rapidapi-key']).toBeUndefined();
      return [200, mockPlanetaryPositionsResponse];
    });

    await anonymousClient.data.getPositions(createPositionsRequest());
  });

  it('logs via custom logger when debug enabled', async () => {
    const logger = vi.fn();
    const debugClient = new AstrologyClient({
      apiKey: 'debug-key',
      debug: true,
      logger,
      retry: { attempts: 0 },
    });
    const debugMock = new MockAdapter(debugClient.httpClient);
    debugMock.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await debugClient.data.getPositions(createPositionsRequest());
    expect(logger).toHaveBeenCalled();
  });

  it('respects ASTROLOGY_DEBUG environment flag with default logger', async () => {
    const originalConsole = console.log;
    const consoleSpy = vi.fn();
    // @ts-expect-error override for test
    console.log = consoleSpy;
    process.env.ASTROLOGY_DEBUG = 'true';
    const envDebugClient = new AstrologyClient({
      apiKey: 'debug-env',
      retry: { attempts: 0 },
    });
    const envDebugMock = new MockAdapter(envDebugClient.httpClient);
    envDebugMock.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await envDebugClient.data.getPositions(createPositionsRequest());
    expect(consoleSpy).toHaveBeenCalled();

    console.log = originalConsole;
    envDebugMock.reset();
  });

  it('treats ASTROLOGY_DEBUG=false as disabled', async () => {
    const logger = vi.fn();
    process.env.ASTROLOGY_DEBUG = 'false';
    const clientWithFalseEnv = new AstrologyClient({
      apiKey: 'debug-env',
      logger,
      retry: { attempts: 0 },
    });
    const mockFalseEnv = new MockAdapter(clientWithFalseEnv.httpClient);
    mockFalseEnv.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await clientWithFalseEnv.data.getPositions(createPositionsRequest());
    expect(logger).not.toHaveBeenCalled();
  });

  it('does not log when debug disabled', async () => {
    const logger = vi.fn();
    const quietClient = new AstrologyClient({
      apiKey: 'quiet',
      debug: false,
      logger,
      retry: { attempts: 0 },
    });
    const quietMock = new MockAdapter(quietClient.httpClient);
    quietMock.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await quietClient.data.getPositions(createPositionsRequest());
    expect(logger).not.toHaveBeenCalled();
  });

  it('returns payload as-is when no envelope present', async () => {
    mock.onPost('/api/v3/data/positions').reply(200, ['raw']);
    const response = await client.data.getPositions(createPositionsRequest());
    expect(response).toEqual(['raw']);
  });

  it('handles undefined payload without error', async () => {
    mock.onPost('/api/v3/data/positions').reply(200, undefined);
    const response = await client.data.getPositions(createPositionsRequest());
    expect(response).toBeUndefined();
  });

  it('swallows logger errors', async () => {
    const logger = vi.fn(() => {
      throw new Error('logger failed');
    });
    const debugClient = new AstrologyClient({
      apiKey: 'debug',
      debug: true,
      logger,
      retry: { attempts: 0 },
    });
    const debugMock = new MockAdapter(debugClient.httpClient);
    debugMock.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await expect(debugClient.data.getPositions(createPositionsRequest())).resolves.toEqual(
      mockPlanetaryPositionsResponse,
    );
    expect(logger).toHaveBeenCalled();
  });

  it('falls back to default base URL when environment is absent', () => {
    const originalEnv = process.env.ASTROLOGY_API_BASE_URL;
    delete process.env.ASTROLOGY_API_BASE_URL;
    const baseUrl = (client as any).resolveBaseUrl(undefined);
    expect(baseUrl).toBe(DEFAULT_BASE_URL);
    if (originalEnv !== undefined) {
      process.env.ASTROLOGY_API_BASE_URL = originalEnv;
    }
  });

  it('uses custom rapidApiHost when provided in config', async () => {
    const customHostClient = new AstrologyClient({
      apiKey: 'test-key',
      rapidApiHost: 'custom-host.example.com',
      retry: { attempts: 0 },
    });
    const customHostMock = new MockAdapter(customHostClient.httpClient);
    customHostMock.onPost('/api/v3/data/positions').reply((config) => {
      expect(config.headers?.['x-rapidapi-host']).toBe('custom-host.example.com');
      return [200, mockPlanetaryPositionsResponse];
    });

    await customHostClient.data.getPositions(createPositionsRequest());
  });

  it('falls back to default RapidAPI host when not provided', () => {
    const host = (client as any).resolveRapidApiHost(undefined);
    expect(host).toBe(DEFAULT_RAPIDAPI_HOST);
  });

  it('clamps retry values to non-negative numbers', () => {
    expect((client as any).clampToNonNegative(undefined, 5)).toBe(5);
    expect((client as any).clampToNonNegative(NaN, 5)).toBe(5);
    expect((client as any).clampToNonNegative(-2, 5)).toBe(0);
    expect((client as any).clampToNonNegative(3, 5)).toBe(3);
  });

  it('resolves retry status code fallbacks', () => {
    expect((client as any).resolveRetryStatusCodes(undefined)).toEqual(DEFAULT_RETRY_STATUS_CODES);
    expect((client as any).resolveRetryStatusCodes([])).toEqual(DEFAULT_RETRY_STATUS_CODES);
    expect((client as any).resolveRetryStatusCodes([418])).toEqual([418]);
  });

  it('initializes missing headers inside request interceptor', () => {
    const interceptor = client.httpClient.interceptors.request.handlers[0].fulfilled!;
    const result = interceptor({} as any);
    expect(result.headers['x-rapidapi-key']).toBe('test-key');
    expect(result.headers['x-rapidapi-host']).toBeDefined();
  });

  it('delegates to headers.set when available', () => {
    const set = vi.fn();
    const has = vi.fn().mockReturnValue(false);
    const interceptor = client.httpClient.interceptors.request.handlers[0].fulfilled!;
    interceptor({ headers: { set, has } } as any);
    expect(set).toHaveBeenCalledWith('x-rapidapi-host', expect.any(String));
    expect(set).toHaveBeenCalledWith('x-rapidapi-key', 'test-key');
  });
});

