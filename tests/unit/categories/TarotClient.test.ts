import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { TarotClient } from '../../../src/categories/TarotClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  BirthCardFlexibleRequest,
  DailyCardParams,
  DrawCardsRequest,
  ElementalDignitiesRequest,
  OptimalTimesRequest,
  QuintessenceRequest,
  TarotCardSearchParams,
  TarotGlossaryParams,
  TarotNatalReportRequest,
  TarotReportRequest,
  TarotTransitReportRequest,
  TimingAnalysisRequest,
  TreeOfLifeRequest,
} from '../../../src/types';
import type {
  BirthCardResponse,
  ElementalDignitiesResponse,
  OptimalTimesResponse,
  QuintessenceResponse,
  TarotCardDetailResponse,
  TarotCardSearchResponse,
  TarotDailyCardResponse,
  TarotDrawResponse,
  TarotGlossaryResponse,
  TarotNatalReportResponse,
  TarotReportResponse,
  TarotTransitReportResponse,
  TimingAnalysisResponse,
  TreeOfLifeResponse,
} from '../../../src/types/responses';
import { AxiosHttpHelper } from '../../../src/utils/http';

type HttpHelperWithMock = { helper: AxiosHttpHelper; mock: MockAdapter };

const createReportRequest = (overrides: Partial<TarotReportRequest> = {}): TarotReportRequest => ({
  spread_type: 'single',
  life_area: 'general',
  use_reversals: true,
  tradition: 'universal',
  include_dignities: false,
  include_timing: false,
  include_astro_context: false,
  include_birth_cards: false,
  interpretation_depth: 'basic',
  language: 'en',
  ...overrides,
});

const createTreeRequest = (overrides: Partial<TreeOfLifeRequest> = {}): TreeOfLifeRequest => ({
  spread_type: 'tree_of_life',
  life_area: 'spirituality',
  include_timing: true,
  include_dignities: true,
  include_astro_context: false,
  interpretation_depth: 'detailed',
  language: 'en',
  ...overrides,
});

const createDrawRequest = (overrides: Partial<DrawCardsRequest> = {}): DrawCardsRequest => ({
  count: 1,
  exclude_reversed: false,
  exclude_majors: false,
  exclude_minors: false,
  ...overrides,
});

const createDailyParams = (overrides: Partial<DailyCardParams> = {}): DailyCardParams => ({
  user_id: 'user-1',
  ...overrides,
});

const createElementalRequest = (
  overrides: Partial<ElementalDignitiesRequest> = {},
): ElementalDignitiesRequest => ({
  cards: [
    {
      id: 'major_01',
      position: 1,
    },
    {
      id: 'major_02',
      position: 2,
    },
  ],
  ...overrides,
});

const createTimingRequest = (overrides: Partial<TimingAnalysisRequest> = {}): TimingAnalysisRequest => ({
  cards: ['major_01', 'major_02'],
  ...overrides,
});

const createOptimalTimesRequest = (
  overrides: Partial<OptimalTimesRequest> = {},
): OptimalTimesRequest => ({
  birth_data: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 14,
    minute: 30,
    second: 0,
    city: 'London',
    country_code: 'GB',
  },
  question_type: 'career',
  date_range: {
    start_date: '2024-01-01',
    end_date: '2024-03-01',
  },
  ...overrides,
});

const createTransitReportRequest = (
  overrides: Partial<TarotTransitReportRequest> = {},
): TarotTransitReportRequest => ({
  birth_data: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 14,
    minute: 30,
    second: 0,
    city: 'London',
    country_code: 'GB',
  },
  life_area: 'career',
  include_timing: true,
  interpretation_depth: 'detailed',
  language: 'en',
  ...overrides,
});

const createNatalReportRequest = (
  overrides: Partial<TarotNatalReportRequest> = {},
): TarotNatalReportRequest => ({
  birth_data: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 14,
    minute: 30,
    second: 0,
    city: 'London',
    country_code: 'GB',
  },
  life_area: 'general',
  include_timing: true,
  interpretation_depth: 'detailed',
  language: 'en',
  ...overrides,
});

const createBirthCardRequest = (
  overrides: Partial<BirthCardFlexibleRequest> = {},
): BirthCardFlexibleRequest => ({
  birth_date: '1990-05-15',
  include_interpretation: true,
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

describe('TarotClient', () => {
  let client: TarotClient;
  let mock: MockAdapter;

  beforeEach(() => {
    const { helper, mock: axiosMock } = createHttpHelper();
    client = new TarotClient(helper);
    mock = axiosMock;
  });

  afterEach(() => {
    mock.reset();
  });

  it('retrieves tarot cards glossary with filters', async () => {
    const params: TarotGlossaryParams = { arcana: 'major', planet: 'Mars' };
    const response = { items: [] } as TarotGlossaryResponse;
    mock.onGet('/api/v3/tarot/glossary/cards').reply(200, { data: response });

    await expect(client.getCardsGlossary(params)).resolves.toEqual(response);
    expect(mock.history.get[0].params).toMatchObject(params);
  });

  it('draws tarot cards', async () => {
    const request = createDrawRequest();
    const response = { cards: [] } as TarotDrawResponse;
    mock.onPost('/api/v3/tarot/cards/draw').reply(200, { data: response });

    await expect(client.drawCards(request)).resolves.toEqual(response);
  });

  it('rejects invalid draw count', async () => {
    const request = createDrawRequest({ count: 0 });

    await expect(client.drawCards(request)).rejects.toThrow(AstrologyError);
  });

  it('fetches daily tarot card', async () => {
    const params = createDailyParams();
    const response = { card: {} } as TarotDailyCardResponse;
    mock.onGet('/api/v3/tarot/reports/daily').reply(200, { data: response });

    await expect(client.getDailyCard(params)).resolves.toEqual(response);
    expect(mock.history.get[0].params).toMatchObject({ user_id: 'user-1' });
  });

  it('validates daily card user id', async () => {
    const params = createDailyParams({ user_id: '' });

    await expect(client.getDailyCard(params)).rejects.toThrow(AstrologyError);
  });

  it('generates single card report', async () => {
    const request = createReportRequest({ spread_type: 'single' });
    const response = { report_id: 'rpt_1' } as TarotReportResponse;
    mock.onPost('/api/v3/tarot/reports/single').reply(200, { data: response });

    await expect(client.generateSingleReport(request)).resolves.toEqual(response);
  });

  it('retrieves cards glossary with params', async () => {
    const response = { items: [] } as TarotGlossaryResponse;
    mock.onGet('/api/v3/tarot/glossary/cards').reply((config) => {
      expect(config.params).toMatchObject({ arcana: 'major', suit: null });
      return [200, { data: response }];
    });

    await expect(
      client.getCardsGlossary({
        arcana: 'major',
        suit: null,
      }),
    ).resolves.toEqual(response);
  });

  it('merges cards glossary params with axios config', async () => {
    const response = { items: [] } as TarotGlossaryResponse;
    const controller = new AbortController();
    mock.onGet('/api/v3/tarot/glossary/cards').reply((config) => {
      expect(config.params).toMatchObject({ planet: 'Mars' });
      expect(config.signal).toBe(controller.signal);
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.getCardsGlossary(
        { planet: 'Mars' },
        {
          signal: controller.signal,
          headers: { Authorization: 'Bearer token' },
        },
      ),
    ).resolves.toEqual(response);
  });

  it('preserves axios config when glossary params omitted', async () => {
    const response = { items: [] } as TarotGlossaryResponse;
    mock.onGet('/api/v3/tarot/glossary/cards').reply((config) => {
      expect(config.params).toBeUndefined();
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.getCardsGlossary(undefined, {
        headers: { Authorization: 'Bearer token' },
      }),
    ).resolves.toEqual(response);
  });

  it('retrieves tarot spreads glossary', async () => {
    const response = { items: [] } as TarotGlossaryResponse;
    mock.onGet('/api/v3/tarot/glossary/spreads').reply(200, { data: response });

    await expect(client.getSpreadsGlossary()).resolves.toEqual(response);
  });

  it('generates three card report', async () => {
    const request = createReportRequest({ spread_type: 'three_card' });
    const response = { report_id: 'rpt_three' } as TarotReportResponse;
    mock.onPost('/api/v3/tarot/reports/three-card').reply(200, { data: response });

    await expect(client.generateThreeCardReport(request)).resolves.toEqual(response);
  });

  it('generates celtic cross report', async () => {
    const request = createReportRequest({ spread_type: 'celtic_cross' });
    const response = { report_id: 'rpt_celtic' } as TarotReportResponse;
    mock.onPost('/api/v3/tarot/reports/celtic-cross').reply(200, { data: response });

    await expect(client.generateCelticCrossReport(request)).resolves.toEqual(response);
  });

  it('generates houses report', async () => {
    const request = createReportRequest({ spread_type: 'houses' });
    const response = { report_id: 'rpt_houses' } as TarotReportResponse;
    mock.onPost('/api/v3/tarot/reports/houses').reply(200, { data: response });

    await expect(client.generateHousesReport(request)).resolves.toEqual(response);
  });

  it('generates synastry report', async () => {
    const request = createReportRequest({
      spread_type: 'synastry',
      partner_birth_data: {
        year: 1992,
        month: 7,
        day: 12,
        hour: 9,
        minute: 15,
        city: 'Paris',
        country_code: 'FR',
      },
    });
    const response = { report_id: 'rpt_synastry' } as TarotSynastryReportResponse;
    mock.onPost('/api/v3/tarot/reports/synastry').reply(200, { data: response });

    await expect(client.generateSynastryReport(request)).resolves.toEqual(response);
  });

  it('validates spread type for three card report', async () => {
    const request = createReportRequest({ spread_type: 'single' });

    await expect(client.generateThreeCardReport(request)).rejects.toThrow(AstrologyError);
  });

  it('requires partner birth data for synastry report', async () => {
    const request = createReportRequest({ spread_type: 'synastry', partner_birth_data: undefined });

    await expect(client.generateSynastryReport(request)).rejects.toThrow(AstrologyError);
  });

  it('generates tree of life report', async () => {
    const request = createTreeRequest();
    const response = { report_id: 'tree_1' } as TreeOfLifeResponse;
    mock.onPost('/api/v3/tarot/reports/tree-of-life').reply(200, { data: response });

    await expect(client.generateTreeOfLifeReport(request)).resolves.toEqual(response);
  });

  it('calculates quintessence', async () => {
    const request = { cards: ['major_01', 'major_10'] } as QuintessenceRequest;
    const response = { card: {} } as QuintessenceResponse;
    mock.onPost('/api/v3/tarot/analysis/quintessence').reply(200, { data: response });

    await expect(client.calculateQuintessence(request)).resolves.toEqual(response);
  });

  it('validates quintessence cards presence', async () => {
    const request = { cards: [] } as QuintessenceRequest;

    await expect(client.calculateQuintessence(request)).rejects.toThrow(AstrologyError);
  });

  it('calculates elemental dignities', async () => {
    const request = createElementalRequest();
    const response = { dignities: [] } as ElementalDignitiesResponse;
    mock.onPost('/api/v3/tarot/analysis/dignities').reply(200, { data: response });

    await expect(client.calculateElementalDignities(request)).resolves.toEqual(response);
  });

  it('analyzes timing', async () => {
    const request = createTimingRequest();
    const response = { predictions: [] } as TimingAnalysisResponse;
    mock.onPost('/api/v3/tarot/analysis/timing').reply(200, { data: response });

    await expect(client.analyzeTiming(request)).resolves.toEqual(response);
  });

  it('calculates optimal times', async () => {
    const request = createOptimalTimesRequest();
    const response = { windows: [] } as OptimalTimesResponse;
    mock.onPost('/api/v3/tarot/analysis/optimal-times').reply(200, { data: response });

    await expect(client.calculateOptimalTimes(request)).resolves.toEqual(response);
  });

  it('validates optimal times date range', async () => {
    const request = createOptimalTimesRequest({ date_range: { start_date: '2024-01-01' } as Record<string, string> });

    await expect(client.calculateOptimalTimes(request)).rejects.toThrow(AstrologyError);
  });

  it('calculates birth cards', async () => {
    const request = createBirthCardRequest();
    const response = { cards: [] } as BirthCardResponse;
    mock.onPost('/api/v3/tarot/analysis/birth-cards').reply(200, { data: response });

    await expect(client.calculateBirthCards(request)).resolves.toEqual(response);
  });

  it('generates transit report', async () => {
    const request = createTransitReportRequest();
    const response = { report_id: 'transit_1' } as TarotTransitReportResponse;
    mock.onPost('/api/v3/tarot/analysis/transit-report').reply(200, { data: response });

    await expect(client.generateTransitReport(request)).resolves.toEqual(response);
  });

  it('generates natal report', async () => {
    const request = createNatalReportRequest();
    const response = { report_id: 'natal_1' } as TarotNatalReportResponse;
    mock.onPost('/api/v3/tarot/analysis/natal-report').reply(200, { data: response });

    await expect(client.generateNatalReport(request)).resolves.toEqual(response);
  });

  it('searches cards with pagination', async () => {
    const params: TarotCardSearchParams = { keyword: 'emperor', page: 2, page_size: 10 };
    const response = { items: [] } as TarotCardSearchResponse;
    mock.onGet('/api/v3/tarot/cards/search').reply(200, { data: response });

    await expect(client.searchCards(params)).resolves.toEqual(response);
    expect(mock.history.get[0].params).toMatchObject({ keyword: 'emperor', page: 2, page_size: 10 });
  });

  it('merges search params with axios config', async () => {
    const params: TarotCardSearchParams = { keyword: 'strength' };
    const response = { items: [] } as TarotCardSearchResponse;
    mock.onGet('/api/v3/tarot/cards/search').reply((config) => {
      expect(config.params).toMatchObject({ keyword: 'strength', page: 1 });
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.searchCards(params, { params: { page: 1 }, headers: { Authorization: 'Bearer token' } }),
    ).resolves.toEqual(response);
  });

  it('preserves axios config when search params omitted', async () => {
    const response = { items: [] } as TarotCardSearchResponse;
    mock.onGet('/api/v3/tarot/cards/search').reply((config) => {
      expect(config.params).toMatchObject({ page: 2 });
      expect(Object.keys(config.params ?? {}).length).toBe(1);
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.searchCards(undefined, {
        params: { page: 2 },
        headers: { Authorization: 'Bearer token' },
      }),
    ).resolves.toEqual(response);
  });

  it('fetches card details', async () => {
    const response = { id: 'major_01' } as TarotCardDetailResponse;
    mock.onGet('/api/v3/tarot/glossary/cards/major_01').reply(200, { data: response });

    await expect(client.getCardDetails('major_01')).resolves.toEqual(response);
  });

  it('validates card details id', async () => {
    await expect(client.getCardDetails('')).rejects.toThrow(AstrologyError);
  });
});

