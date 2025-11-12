import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { LunarClient } from '../../../src/categories/LunarClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  LunarCalendarParams,
  LunarEventsRequest,
  LunarMansionsRequest,
  LunarPhasesRequest,
  Subject,
  VoidOfCourseRequest,
} from '../../../src/types';
import type {
  LunarCalendarResponse,
  LunarEventsResponse,
  LunarMansionsResponse,
  LunarPhasesResponse,
  VoidOfCourseResponse,
} from '../../../src/types/responses';
import { AxiosHttpHelper } from '../../../src/utils/http';

type HttpHelperWithMock = { helper: AxiosHttpHelper; mock: MockAdapter };

const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'Test Subject',
  birth_data: {
    year: 1990,
    month: 5,
    day: 21,
    hour: 10,
    minute: 30,
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

const createPhasesRequest = (overrides: Partial<LunarPhasesRequest> = {}): LunarPhasesRequest => ({
  datetime_location: {
    year: 2024,
    month: 3,
    day: 15,
    hour: 12,
    minute: 0,
    second: 0,
    city: 'London',
    country_code: 'GB',
  },
  days_ahead: 30,
  ...overrides,
});

const createEventsRequest = (overrides: Partial<LunarEventsRequest> = {}): LunarEventsRequest => ({
  datetime_location: {
    year: 2024,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    city: 'New York',
    country_code: 'US',
  },
  days_ahead: 90,
  ...overrides,
});

const createMansionsRequest = (overrides: Partial<LunarMansionsRequest> = {}): LunarMansionsRequest => ({
  datetime_location: {
    year: 2024,
    month: 6,
    day: 21,
    hour: 8,
    minute: 0,
    second: 0,
    city: 'Cairo',
    country_code: 'EG',
  },
  system: 'arabian_tropical',
  days_ahead: 28,
  ...overrides,
});

const createVoidOfCourseRequest = (
  overrides: Partial<VoidOfCourseRequest> = {},
): VoidOfCourseRequest => ({
  datetime_location: {
    year: 2024,
    month: 3,
    day: 15,
    hour: 14,
    minute: 30,
    second: 0,
    city: 'Paris',
    country_code: 'FR',
  },
  days_ahead: 7,
  use_modern_planets: false,
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

describe('LunarClient', () => {
  let client: LunarClient;
  let mock: MockAdapter;

  beforeEach(() => {
    const { helper, mock: axiosMock } = createHttpHelper();
    client = new LunarClient(helper);
    mock = axiosMock;
  });

  afterEach(() => {
    mock.reset();
  });

  it('retrieves precise lunar phases', async () => {
    const request = createPhasesRequest();
    const response = { current_phase: {} } as LunarPhasesResponse;
    mock.onPost('/api/v3/lunar/phases').reply(200, { data: response });

    await expect(client.getPhases(request)).resolves.toEqual(response);
  });

  it('validates lunar phases days ahead', async () => {
    const request = createPhasesRequest({ days_ahead: -1 });

    await expect(client.getPhases(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves special lunar events', async () => {
    const request = createEventsRequest();
    const response = { events_summary: {} } as LunarEventsResponse;
    mock.onPost('/api/v3/lunar/events').reply(200, { data: response });

    await expect(client.getEvents(request)).resolves.toEqual(response);
  });

  it('validates mansion system value', async () => {
    const request = createMansionsRequest({ system: 'invalid' as LunarMansionsRequest['system'] });

    await expect(client.getMansions(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves lunar mansions', async () => {
    const request = createMansionsRequest();
    const response = { mansion: {} } as LunarMansionsResponse;
    mock.onPost('/api/v3/lunar/mansions').reply(200, { data: response });

    await expect(client.getMansions(request)).resolves.toEqual(response);
  });

  it('retrieves void-of-course status', async () => {
    const request = createVoidOfCourseRequest();
    const response = { is_void_of_course: true } as VoidOfCourseResponse;
    mock.onPost('/api/v3/lunar/void-of-course').reply(200, { data: response });

    await expect(client.getVoidOfCourse(request)).resolves.toEqual(response);
  });

  it('validates void-of-course request days ahead', async () => {
    const request = createVoidOfCourseRequest({ days_ahead: 400 });

    await expect(client.getVoidOfCourse(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves lunar calendar', async () => {
    const response = { success: true } as LunarCalendarResponse;
    mock.onGet('/api/v3/lunar/calendar/2024').reply(200, { data: response });

    await expect(client.getCalendar(2024, { month: 5 })).resolves.toEqual(response);
    expect(mock.history.get[0].params).toMatchObject({ month: 5 });
  });

  it('preserves axios config when calendar params omitted', async () => {
    const response = { success: true } as LunarCalendarResponse;
    const controller = new AbortController();
    mock.onGet('/api/v3/lunar/calendar/2024').reply((config) => {
      expect(config.signal).toBe(controller.signal);
      expect(config.headers?.Authorization).toBe('Bearer token');
      expect(config.params).toBeUndefined();
      return [200, { data: response }];
    });

    await expect(
      client.getCalendar(2024, undefined, { signal: controller.signal, headers: { Authorization: 'Bearer token' } }),
    ).resolves.toEqual(response);
  });

  it('validates lunar calendar month', async () => {
    await expect(client.getCalendar(2024, { month: 13 })).rejects.toThrow(AstrologyError);
  });
});

