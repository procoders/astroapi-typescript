import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { FixedStarsClient } from '../../../src/categories/FixedStarsClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  FixedStarsConjunctionsRequest,
  FixedStarsPositionsRequest,
  FixedStarsReportRequest,
  FixedStarsConfig,
  FixedStarPreset,
  Subject,
} from '../../../src/types';
import type {
  FixedStarsConjunctionsResponse,
  FixedStarsPositionsResponse,
  FixedStarsPresetsResponse,
  FixedStarsReportResponse,
} from '../../../src/types/responses';
import { AxiosHttpHelper } from '../../../src/utils/http';

type HttpHelperWithMock = { helper: AxiosHttpHelper; mock: MockAdapter };

const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'Fixed Star Subject',
  birth_data: {
    year: 1990,
    month: 5,
    day: 21,
    hour: 10,
    minute: 30,
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
    ...overrides.birth_data,
  },
  ...overrides,
});

const createConfig = (overrides: Partial<FixedStarsConfig> = {}): FixedStarsConfig => ({
  presets: ['essential'],
  custom_orbs: undefined,
  include_parans: false,
  include_heliacal: false,
  include_interpretations: true,
  ...overrides,
});

const createPositionsRequest = (
  overrides: Partial<FixedStarsPositionsRequest> = {},
): FixedStarsPositionsRequest => ({
  subject: createSubject(),
  fixed_stars: createConfig(),
  ...overrides,
});

const createConjunctionsRequest = (
  overrides: Partial<FixedStarsConjunctionsRequest> = {},
): FixedStarsConjunctionsRequest => ({
  subject: createSubject(),
  fixed_stars: createConfig(),
  include_oppositions: false,
  ...overrides,
});

const createReportRequest = (
  overrides: Partial<FixedStarsReportRequest> = {},
): FixedStarsReportRequest => ({
  subject: createSubject(),
  fixed_stars: createConfig({ presets: ['essential', 'traditional'] }),
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

describe('FixedStarsClient', () => {
  let client: FixedStarsClient;
  let mock: MockAdapter;

  beforeEach(() => {
    const { helper, mock: axiosMock } = createHttpHelper();
    client = new FixedStarsClient(helper);
    mock = axiosMock;
  });

  afterEach(() => {
    mock.reset();
  });

  it('retrieves fixed star positions', async () => {
    const request = createPositionsRequest();
    const response = { positions: [] } as FixedStarsPositionsResponse;
    mock.onPost('/api/v3/fixed-stars/positions').reply(200, { data: response });

    await expect(client.getPositions(request)).resolves.toEqual(response);
  });

  it('validates fixed star preset values', async () => {
    const request = createPositionsRequest({
      fixed_stars: createConfig({ presets: ['invalid' as FixedStarPreset] }),
    });

    await expect(client.getPositions(request)).rejects.toThrow(AstrologyError);
  });

  it('validates custom orbs values', async () => {
    const request = createConjunctionsRequest({
      fixed_stars: createConfig({ custom_orbs: { conjunction: -1 } }),
    });

    await expect(client.getConjunctions(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves fixed star conjunctions', async () => {
    const request = createConjunctionsRequest();
    const response = { conjunctions: [] } as FixedStarsConjunctionsResponse;
    mock.onPost('/api/v3/fixed-stars/conjunctions').reply(200, { data: response });

    await expect(client.getConjunctions(request)).resolves.toEqual(response);
  });

  it('validates include_oppositions boolean', async () => {
    const request = createConjunctionsRequest({ include_oppositions: 'yes' as unknown as boolean });

    await expect(client.getConjunctions(request)).rejects.toThrow(AstrologyError);
  });

  it('generates fixed star report', async () => {
    const request = createReportRequest();
    const response = { summary: {} } as FixedStarsReportResponse;
    mock.onPost('/api/v3/fixed-stars/report').reply(200, { data: response });

    await expect(client.generateReport(request)).resolves.toEqual(response);
  });

  it('retrieves fixed star presets info', async () => {
    const response = { presets: [] } as FixedStarsPresetsResponse;
    mock.onGet('/api/v3/fixed-stars/presets').reply(200, { data: response });

    await expect(client.getPresets()).resolves.toEqual(response);
  });
});

