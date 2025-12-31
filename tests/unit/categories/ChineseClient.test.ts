import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ChineseClient } from '../../../src/categories/ChineseClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  BaZiRequest,
  ChineseSubject,
  ChineseYearlyRequest,
  LuckPillarsRequest,
  MultipleSubjectsRequest,
  SingleSubjectRequest,
  Subject,
} from '../../../src/types';
import type {
  BaZiResponse,
  ChineseCompatibilityResponse,
  ChineseElementsResponse,
  ChineseSolarTermsResponse,
  ChineseYearlyForecastResponse,
  ChineseZodiacResponse,
  LuckPillarsResponse,
  MingGuaResponse,
} from '../../../src/types/responses';
import { AxiosHttpHelper } from '../../../src/utils/http';

type HttpHelperWithMock = { helper: AxiosHttpHelper; mock: MockAdapter };

const createChineseSubject = (overrides: Partial<ChineseSubject> = {}): ChineseSubject => ({
  name: 'Li Mei',
  gender: 'female',
  birth_data: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 8,
    minute: 30,
    second: 0,
    city: 'Beijing',
    country_code: 'CN',
    timezone: 'Asia/Shanghai',
    ...overrides.birth_data,
  },
  ...overrides,
});

const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'John Doe',
  birth_data: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 10,
    minute: 45,
    city: 'London',
    country_code: 'GB',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
    ...overrides.birth_data,
  },
  ...overrides,
});

const createBaZiRequest = (overrides: Partial<BaZiRequest> = {}): BaZiRequest => ({
  subject: createChineseSubject(),
  include_luck_pillars: true,
  include_annual_pillars: false,
  current_year: 2024,
  language: 'en',
  tradition: 'classical',
  analysis_depth: 'standard',
  ...overrides,
});

const createLuckPillarsRequest = (overrides: Partial<LuckPillarsRequest> = {}): LuckPillarsRequest => ({
  subject: createChineseSubject(),
  include_annual_pillars: true,
  years_ahead: 20,
  current_year: 2024,
  language: 'en',
  ...overrides,
});

const createYearlyRequest = (overrides: Partial<ChineseYearlyRequest> = {}): ChineseYearlyRequest => ({
  subject: createChineseSubject(),
  forecast_year: 2024,
  include_monthly: true,
  include_advice: true,
  language: 'en',
  ...overrides,
});

const createCompatibilityRequest = (
  overrides: Partial<MultipleSubjectsRequest> = {},
): MultipleSubjectsRequest => ({
  subjects: [createSubject(), createSubject({ name: 'Jane Doe' })],
  options: { language: 'en' },
  ...overrides,
});

const createMingGuaRequest = (overrides: Partial<SingleSubjectRequest> = {}): SingleSubjectRequest => ({
  subject: createSubject(),
  ...overrides,
});

const createHttpHelper = (): HttpHelperWithMock => {
  const axiosInstance = axios.create();
  const mock = new MockAdapter(axiosInstance);
  const helper = new AxiosHttpHelper(
    axiosInstance,
    <T>(payload: unknown): T => {
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
    },
  );

  return { helper, mock };
};

describe('ChineseClient', () => {
  let client: ChineseClient;
  let mock: MockAdapter;

  beforeEach(() => {
    const { helper, mock: axiosMock } = createHttpHelper();
    client = new ChineseClient(helper);
    mock = axiosMock;
  });

  afterEach(() => {
    mock.reset();
  });

  it('calculates BaZi analysis', async () => {
    const request = createBaZiRequest();
    const response = { success: true } as BaZiResponse;
    mock.onPost('/api/v3/chinese/bazi').reply(200, { data: response });

    await expect(client.calculateBaZi(request)).resolves.toEqual(response);
  });

  it('validates BaZi analysis depth', async () => {
    const request = createBaZiRequest({ analysis_depth: 'invalid' as BaZiRequest['analysis_depth'] });

    await expect(client.calculateBaZi(request)).rejects.toThrow(AstrologyError);
  });

  it('calculates Chinese compatibility', async () => {
    const request = createCompatibilityRequest();
    const response = { score: 85 } as ChineseCompatibilityResponse;
    mock.onPost('/api/v3/chinese/compatibility').reply(200, { data: response });

    await expect(client.calculateCompatibility(request)).resolves.toEqual(response);
  });

  it('requires at least two subjects for compatibility', async () => {
    const request = createCompatibilityRequest({ subjects: [createSubject()] });

    await expect(client.calculateCompatibility(request)).rejects.toThrow(AstrologyError);
  });

  it('calculates luck pillars', async () => {
    const request = createLuckPillarsRequest();
    const response = { luck_pillars: [] } as LuckPillarsResponse;
    mock.onPost('/api/v3/chinese/luck-pillars').reply(200, { data: response });

    await expect(client.calculateLuckPillars(request)).resolves.toEqual(response);
  });

  it('requires gender for luck pillars', async () => {
    const request = createLuckPillarsRequest({
      subject: createChineseSubject({ gender: null }),
    });

    await expect(client.calculateLuckPillars(request)).rejects.toThrow(AstrologyError);
  });

  it('calculates Ming Gua', async () => {
    const request = createMingGuaRequest();
    const response = { ming_gua: 3 } as MingGuaResponse;
    mock.onPost('/api/v3/chinese/ming-gua').reply(200, { data: response });

    await expect(client.calculateMingGua(request)).resolves.toEqual(response);
  });

  it('requires subject for Ming Gua', async () => {
    const request = { subject: undefined } as unknown as SingleSubjectRequest;

    await expect(client.calculateMingGua(request)).rejects.toThrow(AstrologyError);
  });

  it('returns yearly forecast', async () => {
    const request = createYearlyRequest();
    const response = { forecast: {} } as ChineseYearlyForecastResponse;
    mock.onPost('/api/v3/chinese/yearly-forecast').reply(200, { data: response });

    await expect(client.getYearlyForecast(request)).resolves.toEqual(response);
  });

  it('validates yearly forecast year range', async () => {
    const request = createYearlyRequest({ forecast_year: 1800 });

    await expect(client.getYearlyForecast(request)).rejects.toThrow(AstrologyError);
  });

  it('analyzes year elements', async () => {
    const response = { elements_analysis: {} } as ChineseElementsResponse;
    mock.onGet('/api/v3/chinese/elements/balance/2024').reply(200, { data: response });

    await expect(
      client.analyzeYearElements(2024, { include_predictions: true, language: 'en' }),
    ).resolves.toEqual(response);

    expect(mock.history.get[0].params).toMatchObject({ include_predictions: true, language: 'en' });
  });

  it('preserves axios config when year elements params omitted', async () => {
    const response = { elements_analysis: {} } as ChineseElementsResponse;
    const controller = new AbortController();
    mock.onGet('/api/v3/chinese/elements/balance/2024').reply((config) => {
      expect(config.headers?.Authorization).toBe('Bearer token');
      expect(config.signal).toBe(controller.signal);
      expect(config.params).toBeUndefined();
      return [200, { data: response }];
    });

    await expect(
      client.analyzeYearElements(
        2024,
        undefined,
        {
          headers: { Authorization: 'Bearer token' },
          signal: controller.signal,
        },
      ),
    ).resolves.toEqual(response);
  });

  it('validates year elements year range', async () => {
    await expect(client.analyzeYearElements(1800)).rejects.toThrow(AstrologyError);
  });

  it('retrieves solar terms', async () => {
    const response = { solar_terms: [] } as ChineseSolarTermsResponse;
    mock.onGet('/api/v3/chinese/calendar/solar-terms/2024').reply(200, { data: response });

    await expect(
      client.getSolarTerms(2024, { timezone: '  Asia/Shanghai ', language: 'en' }),
    ).resolves.toEqual(response);

    expect(mock.history.get[0].params).toMatchObject({ timezone: 'Asia/Shanghai', language: 'en' });
  });

  it('validates solar terms timezone', async () => {
    await expect(
      client.getSolarTerms(2024, { timezone: '   ' }),
    ).rejects.toThrow(AstrologyError);
  });

  it('retrieves zodiac animal info', async () => {
    const response = { animal: 'Dragon' } as ChineseZodiacResponse;
    mock.onGet('/api/v3/chinese/zodiac/dragon').reply(200, { data: response });

    await expect(
      client.getZodiacAnimal('Dragon', { year: 2024, language: 'en' }),
    ).resolves.toEqual(response);

    expect(mock.history.get[0].url).toBe('/api/v3/chinese/zodiac/dragon');
    expect(mock.history.get[0].params).toMatchObject({ year: 2024, language: 'en' });
  });

  it('merges zodiac params with axios config', async () => {
    const response = { animal: 'Tiger' } as ChineseZodiacResponse;
    const controller = new AbortController();
    mock.onGet('/api/v3/chinese/zodiac/tiger').reply((config) => {
      expect(config.params).toMatchObject({ year: 2025, language: 'fr' });
      expect(config.signal).toBe(controller.signal);
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.getZodiacAnimal(
        'Tiger',
        { year: 2025, language: 'fr' },
        {
          signal: controller.signal,
          headers: { Authorization: 'Bearer token' },
        },
      ),
    ).resolves.toEqual(response);
  });

  it('preserves axios config when zodiac params omitted', async () => {
    const response = { animal: 'Rat' } as ChineseZodiacResponse;
    mock.onGet('/api/v3/chinese/zodiac/rat').reply((config) => {
      expect(config.params).toBeUndefined();
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.getZodiacAnimal('Rat', undefined, { headers: { Authorization: 'Bearer token' } }),
    ).resolves.toEqual(response);
  });

  it('validates zodiac animal value', async () => {
    await expect(client.getZodiacAnimal('phoenix')).rejects.toThrow(AstrologyError);
  });
});

