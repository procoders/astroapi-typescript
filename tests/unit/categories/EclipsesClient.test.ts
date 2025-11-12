import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { EclipsesClient } from '../../../src/categories/EclipsesClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type { EclipseInterpretationRequest, EclipseNatalCheckRequest, Subject } from '../../../src/types';
import type {
  EclipseInterpretationResponse,
  EclipseNatalCheckResponse,
  EclipseUpcomingResponse,
} from '../../../src/types/responses';
import { AxiosHttpHelper } from '../../../src/utils/http';

type HttpHelperWithMock = { helper: AxiosHttpHelper; mock: MockAdapter };

const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'John Doe',
  birth_data: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 10,
    minute: 45,
    second: 0,
    city: 'London',
    country_code: 'GB',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
    ...overrides.birth_data,
  },
  ...overrides,
});

const createNatalCheckRequest = (
  overrides: Partial<EclipseNatalCheckRequest> = {},
): EclipseNatalCheckRequest => ({
  subject: createSubject(),
  max_orb: 3,
  date_range: undefined,
  ...overrides,
});

const createInterpretationRequest = (
  overrides: Partial<EclipseInterpretationRequest> = {},
): EclipseInterpretationRequest => ({
  eclipse_id: '2024Apr08T',
  birth_data: undefined,
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

describe('EclipsesClient', () => {
  let client: EclipsesClient;
  let mock: MockAdapter;

  beforeEach(() => {
    const { helper, mock: axiosMock } = createHttpHelper();
    client = new EclipsesClient(helper);
    mock = axiosMock;
  });

  afterEach(() => {
    mock.reset();
  });

  it('retrieves upcoming eclipses', async () => {
    const response = {
      success: true,
      eclipses: [],
    } as EclipseUpcomingResponse;
    mock.onGet('/api/v3/eclipses/upcoming').reply(200, { data: response });

    await expect(client.getUpcoming({ count: 5 })).resolves.toEqual(response);
    expect(mock.history.get[0].params).toMatchObject({ count: 5 });
  });

  it('preserves axios config when upcoming params omitted', async () => {
    const response = { success: true, eclipses: [] } as EclipseUpcomingResponse;
    const controller = new AbortController();
    mock.onGet('/api/v3/eclipses/upcoming').reply((config) => {
      expect(config.signal).toBe(controller.signal);
      expect(config.headers?.['X-Test']).toBe('true');
      expect(config.params).toBeUndefined();
      return [200, { data: response }];
    });

    await expect(
      client.getUpcoming(undefined, { signal: controller.signal, headers: { 'X-Test': 'true' } }),
    ).resolves.toEqual(response);
  });

  it('validates upcoming eclipses params', async () => {
    await expect(client.getUpcoming({ count: 0 })).rejects.toThrow(AstrologyError);
  });

  it('checks eclipse natal impact', async () => {
    const request = createNatalCheckRequest();
    const response = {
      success: true,
      subject_name: 'John Doe',
      search_period: '2024-01-01 to 2024-12-31',
      impactful_eclipses: [],
    } as EclipseNatalCheckResponse;
    mock.onPost('/api/v3/eclipses/natal-check').reply(200, { data: response });

    await expect(client.checkNatalImpact(request)).resolves.toEqual(response);
  });

  it('validates max orb for natal impact', async () => {
    const request = createNatalCheckRequest({ max_orb: 0 });

    await expect(client.checkNatalImpact(request)).rejects.toThrow(AstrologyError);
  });

  it('gets eclipse interpretation', async () => {
    const request = createInterpretationRequest();
    const response = {
      success: true,
      eclipse_id: '2024Apr08T',
      saros_information: {},
      astronomical_data: {},
      astrological_data: {},
      interpretation: { overview: 'Detailed interpretation' },
    } as unknown as EclipseInterpretationResponse;
    mock.onPost('/api/v3/eclipses/interpretation').reply(200, { data: response });

    await expect(client.getInterpretation(request)).resolves.toEqual(response);
  });

  it('validates eclipse interpretation id', async () => {
    const request = createInterpretationRequest({ eclipse_id: '   ' });

    await expect(client.getInterpretation(request)).rejects.toThrow(AstrologyError);
  });
});

