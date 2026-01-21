import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  AstrologyClient,
  AstrologyError,
  DEFAULT_BASE_URL,
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
import { mockFetch } from '../utils/mockFetch';

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

const ORIGINAL_ENV_API_KEY = process.env.ASTROLOGY_API_KEY;
const ORIGINAL_DEBUG_ENV = process.env.ASTROLOGY_DEBUG;

describe('AstrologyClient', () => {
  let client: AstrologyClient;

  beforeEach(() => {
    if (ORIGINAL_ENV_API_KEY === undefined) {
      delete process.env.ASTROLOGY_API_KEY;
    } else {
      process.env.ASTROLOGY_API_KEY = ORIGINAL_ENV_API_KEY;
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
  });

  afterEach(() => {
    mockFetch.reset();
    if (ORIGINAL_ENV_API_KEY === undefined) {
      delete process.env.ASTROLOGY_API_KEY;
    } else {
      process.env.ASTROLOGY_API_KEY = ORIGINAL_ENV_API_KEY;
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

  it('sends Authorization Bearer header and returns planetary positions', async () => {
    mockFetch.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    const response = await client.data.getPositions(createPositionsRequest());
    expect(response).toEqual(mockPlanetaryPositionsResponse);

    const lastCall = mockFetch.history.post[0];
    expect(lastCall.headers['Authorization']).toBe('Bearer test-key');
    expect(lastCall.body).toMatchObject({
      subject: { birth_data: { year: 1990 } },
    });
  });

  it('unwraps data envelope responses', async () => {
    mockFetch.onPost('/api/v3/data/positions').reply(200, {
      data: mockPlanetaryPositionsResponse,
      success: true,
    });

    const response = await client.data.getPositions(createPositionsRequest());
    expect(response).toEqual(mockPlanetaryPositionsResponse);
  });

  it('unwraps result envelope responses', async () => {
    mockFetch.onPost('/api/v3/data/positions').reply(200, {
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

    mockFetch.onPost('/api/v3/data/lunar-metrics').reply(200, mockLunarMetricsResponse);

    const response = await client.data.getLunarMetrics(request);
    expect(response.moon_phase).toBe('Waxing Crescent');
  });

  it('retrieves natal chart and report responses', async () => {
    mockFetch.onPost('/api/v3/charts/natal').reply(200, mockNatalChartResponse);
    mockFetch.onPost('/api/v3/analysis/natal-report').reply(200, mockNatalReportResponse);

    const chart = await client.charts.getNatalChart({ subject: SUBJECT });
    const report = await client.analysis.getNatalReport({ subject: SUBJECT });

    expect(chart.chart_data.planetary_positions).toHaveLength(2);
    expect(report.interpretations[0].title).toContain('Sun');
  });

  it('retrieves synastry report', async () => {
    mockFetch.onPost('/api/v3/analysis/synastry-report').reply(200, mockSynastryReportResponse);
    const request: SynastryReportRequest = {
      subject1: SUBJECT,
      subject2: SYNASRY_SUBJECT,
    };

    const response = await client.analysis.getSynastryReport(request);
    expect(response.report_title).toBe('Synastry Overview');
  });

  it('retrieves personal daily horoscope', async () => {
    mockFetch.onPost('/api/v3/horoscope/personal/daily').reply(200, mockPersonalDailyHoroscopeResponse);
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
      date: '15-01-2024',
    };

    await expect(client.horoscope.getPersonalDailyHoroscope(request)).rejects.toBeInstanceOf(
      AstrologyError,
    );
  });

  it('retrieves city glossary data with query params', async () => {
    mockFetch.onGet('/api/v3/glossary/cities').reply(200, mockCitiesResponse);

    const response = await client.glossary.getCities({ search: 'Lon', limit: 5 });
    expect(response.total).toBe(1);
    expect(response.items[0].name).toBe('London');

    const lastCall = mockFetch.history.get[0];
    expect(lastCall.url).toContain('search=Lon');
    expect(lastCall.url).toContain('limit=5');
  });

  it('retries once after server error and succeeds', async () => {
    mockFetch
      .onPost('/api/v3/data/positions')
      .replyOnce(500, { message: 'Server error' });
    mockFetch
      .onPost('/api/v3/data/positions')
      .reply(200, mockPlanetaryPositionsResponse);

    const response = await client.data.getPositions(createPositionsRequest());
    expect(response.positions[0].name).toBe('Sun');
  });

  it('retries on network error and succeeds', async () => {
    mockFetch
      .onPost('/api/v3/data/positions')
      .networkErrorOnce();
    mockFetch
      .onPost('/api/v3/data/positions')
      .reply(200, mockPlanetaryPositionsResponse);

    const response = await client.data.getPositions(createPositionsRequest());
    expect(response.positions.length).toBe(2);
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

    mockFetch.reset();
    mockFetch
      .onPost('/api/v3/data/positions')
      .replyOnce(500, { message: 'error' });
    mockFetch
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

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(500, { message: 'Server error' });

    await expect(failingClient.data.getPositions(createPositionsRequest())).rejects.toMatchObject({
      statusCode: 500,
      message: 'Server error',
    });
  });

  it('respects custom baseURL', async () => {
    const customClient = new AstrologyClient({
      apiKey: 'custom-key',
      baseURL: 'https://custom.example.com',
      timeout: 5000,
      retry: { attempts: 0 },
    });

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await customClient.data.getPositions(createPositionsRequest());

    const lastCall = mockFetch.history.post[0];
    expect(lastCall.url).toContain('https://custom.example.com');
  });

  it('uses environment API key when config omits one', async () => {
    process.env.ASTROLOGY_API_KEY = 'env-key';
    const envClient = new AstrologyClient({
      retry: { attempts: 0 },
    });

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await envClient.data.getPositions(createPositionsRequest());

    const lastCall = mockFetch.history.post[0];
    expect(lastCall.headers['Authorization']).toBe('Bearer env-key');
  });

  it('does not set Authorization header when no key provided', async () => {
    delete process.env.ASTROLOGY_API_KEY;
    const anonymousClient = new AstrologyClient({
      retry: { attempts: 0 },
    });

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await anonymousClient.data.getPositions(createPositionsRequest());

    const lastCall = mockFetch.history.post[0];
    expect(lastCall.headers['Authorization']).toBeUndefined();
  });

  it('logs via custom logger when debug enabled', async () => {
    const logger = vi.fn();
    const debugClient = new AstrologyClient({
      apiKey: 'debug-key',
      debug: true,
      logger,
      retry: { attempts: 0 },
    });

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

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

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await envDebugClient.data.getPositions(createPositionsRequest());
    expect(consoleSpy).toHaveBeenCalled();

    console.log = originalConsole;
  });

  it('treats ASTROLOGY_DEBUG=false as disabled', async () => {
    const logger = vi.fn();
    process.env.ASTROLOGY_DEBUG = 'false';
    const clientWithFalseEnv = new AstrologyClient({
      apiKey: 'debug-env',
      logger,
      retry: { attempts: 0 },
    });

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

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

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

    await quietClient.data.getPositions(createPositionsRequest());
    expect(logger).not.toHaveBeenCalled();
  });

  it('returns payload as-is when no envelope present', async () => {
    mockFetch.onPost('/api/v3/data/positions').reply(200, ['raw']);
    const response = await client.data.getPositions(createPositionsRequest());
    expect(response).toEqual(['raw']);
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

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(200, mockPlanetaryPositionsResponse);

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

  it('exposes httpClient getter', () => {
    expect(client.httpClient).toBeDefined();
    expect(typeof client.httpClient.get).toBe('function');
    expect(typeof client.httpClient.post).toBe('function');
  });

  it('does not retry when attempts is zero', async () => {
    const noRetryClient = new AstrologyClient({
      apiKey: 'no-retry',
      retry: { attempts: 0 },
    });

    mockFetch.reset();
    mockFetch.onPost('/api/v3/data/positions').reply(500, { message: 'Server error' });

    await expect(noRetryClient.data.getPositions(createPositionsRequest())).rejects.toMatchObject({
      statusCode: 500,
      message: 'Server error',
    });

    // Should have only one request (no retry)
    expect(mockFetch.history.post).toHaveLength(1);
  });

  it('handles text response type for SVG requests', async () => {
    const svg = '<svg>Test</svg>';
    mockFetch.reset();
    mockFetch.onPost('/api/v3/svg/natal').replyRaw(200, svg);

    const result = await client.svg.getNatalChartSvg({
      subject: SUBJECT,
    });

    expect(result).toBe(svg);
    expect(typeof result).toBe('string');
  });
});
