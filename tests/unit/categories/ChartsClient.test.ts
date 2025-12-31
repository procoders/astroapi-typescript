import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ChartsClient } from '../../../src/categories/ChartsClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  CompositeChartRequest,
  DirectionRequest,
  LunarReturnRequest,
  LunarReturnTransitRequest,
  NatalChartRequest,
  NatalTransitRequest,
  ProgressionRequest,
  SolarReturnRequest,
  SolarReturnTransitRequest,
  SynastryChartRequest,
  TransitChartRequest,
} from '../../../src/types';
import type {
  CompositeChartResponse,
  DirectionChartResponse,
  LunarReturnChartResponse,
  LunarReturnTransitChartResponse,
  NatalChartResponse,
  NatalTransitChartResponse,
  ProgressionChartResponse,
  SolarReturnChartResponse,
  SolarReturnTransitChartResponse,
  SynastryChartResponse,
  TransitChartResponse,
} from '../../../src/types/responses';
import { AxiosHttpHelper } from '../../../src/utils/http';

const createChartsClient = () => {
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

  return {
    client: new ChartsClient(helper),
    mock,
  };
};

const createSubject = () => ({
  name: 'Test Subject',
  birth_data: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 14,
    minute: 30,
    city: 'London',
    country_code: 'GB',
  },
});

describe('ChartsClient', () => {
  let client: ChartsClient;
  let mock: MockAdapter;

  beforeEach(() => {
    const factory = createChartsClient();
    client = factory.client;
    mock = factory.mock;
  });

  afterEach(() => {
    mock.reset();
  });

  it('retrieves natal chart', async () => {
    const request: NatalChartRequest = { subject: createSubject() };
    const response: NatalChartResponse = {
      subject_data: {},
      chart_data: {
        planetary_positions: [],
        house_cusps: [],
        aspects: [],
      },
    };

    mock.onPost('/api/v3/charts/natal').reply(200, { data: response });

    await expect(client.getNatalChart(request)).resolves.toEqual(response);
  });

  it('retrieves composite chart', async () => {
    const request: CompositeChartRequest = {
      subject1: createSubject(),
      subject2: createSubject(),
    };
    const response: CompositeChartResponse = {
      subject_data: { subject1: {}, subject2: {} },
      chart_data: {
        planetary_positions: [],
        house_cusps: [],
        aspects: [],
      },
    };

    mock.onPost('/api/v3/charts/composite').reply(200, response);

    await expect(client.getCompositeChart(request)).resolves.toEqual(response);
  });

  it('validates composite chart subjects', async () => {
    const request = {
      subject1: createSubject(),
      subject2: {
        name: 'Invalid',
        birth_data: {
          year: 1990,
          month: 13,
          day: 10,
        },
      },
    } as unknown as CompositeChartRequest;

    await expect(client.getCompositeChart(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves synastry chart', async () => {
    const request: SynastryChartRequest = {
      subject1: createSubject(),
      subject2: createSubject(),
    };
    const response: SynastryChartResponse = {
      subject_data: { subject1: {}, subject2: {} },
      chart_data: {
        planetary_positions: [],
        house_cusps: [],
        aspects: [],
      },
    };

    mock.onPost('/api/v3/charts/synastry').reply(200, { result: response });

    await expect(client.getSynastryChart(request)).resolves.toEqual(response);
  });

  it('retrieves transit chart', async () => {
    const request: TransitChartRequest = {
      natal_subject: createSubject(),
      transit_datetime: {
        year: 2024,
        month: 3,
        day: 15,
        hour: 12,
        minute: 0,
      },
    };
    const response: TransitChartResponse = {
      subject_data: {},
      chart_data: {
        planetary_positions: [],
        house_cusps: [],
        aspects: [],
      },
    };

    mock.onPost('/api/v3/charts/transit').reply(200, response);

    await expect(client.getTransitChart(request)).resolves.toEqual(response);
  });

  it('validates transit datetime', async () => {
    const request = {
      natal_subject: createSubject(),
      transit_datetime: {
        year: 2024,
        month: 13,
        day: 10,
        hour: 8,
        minute: 0,
      },
    } as unknown as TransitChartRequest;

    await expect(client.getTransitChart(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves solar return chart', async () => {
    const request: SolarReturnRequest = {
      subject: createSubject(),
      return_year: 2025,
    };
    const response: SolarReturnChartResponse = {
      subject_data: {},
      chart_data: {
        planetary_positions: [],
        house_cusps: [],
        aspects: [],
      },
    };

    mock.onPost('/api/v3/charts/solar-return').reply(200, { data: response });

    await expect(client.getSolarReturnChart(request)).resolves.toEqual(response);
  });

  it('validates solar return year', async () => {
    const request = {
      subject: createSubject(),
      return_year: 1800,
    } as SolarReturnRequest;

    await expect(client.getSolarReturnChart(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves lunar return chart', async () => {
    const request: LunarReturnRequest = {
      subject: createSubject(),
      return_date: '2024-03-15',
    };
    const response: LunarReturnChartResponse = {
      subject_data: {},
      chart_data: {
        planetary_positions: [],
        house_cusps: [],
        aspects: [],
      },
    };

    mock.onPost('/api/v3/charts/lunar-return').reply(200, response);

    await expect(client.getLunarReturnChart(request)).resolves.toEqual(response);
  });

  it('validates lunar return date format', async () => {
    const request = {
      subject: createSubject(),
      return_date: '15-03-2024',
    } as LunarReturnRequest;

    await expect(client.getLunarReturnChart(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves solar return transits', async () => {
    const request: SolarReturnTransitRequest = {
      subject: createSubject(),
      return_year: 2025,
      date_range: {
        start_date: { year: 2025, month: 5, day: 1 },
        end_date: { year: 2025, month: 5, day: 31 },
      },
      orb: 1,
    };
    const response: SolarReturnTransitChartResponse = {
      events: [],
    };

    mock.onPost('/api/v3/charts/solar-return-transits').reply(200, { result: response });

    await expect(client.getSolarReturnTransits(request)).resolves.toEqual(response);
  });

  it('validates solar return transits date range', async () => {
    const request = {
      subject: createSubject(),
      return_year: 2025,
      date_range: {
        start_date: { year: 2025, month: 13, day: 1 },
        end_date: { year: 2025, month: 5, day: 31 },
      },
      orb: 1,
    } as unknown as SolarReturnTransitRequest;

    await expect(client.getSolarReturnTransits(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves lunar return transits', async () => {
    const request: LunarReturnTransitRequest = {
      subject: createSubject(),
      return_date: '2024-03-01',
      date_range: {
        start_date: { year: 2024, month: 3, day: 1 },
        end_date: { year: 2024, month: 3, day: 31 },
      },
      orb: 1,
    };
    const response: LunarReturnTransitChartResponse = {
      events: [],
    };

    mock.onPost('/api/v3/charts/lunar-return-transits').reply(200, response);

    await expect(client.getLunarReturnTransits(request)).resolves.toEqual(response);
  });

  it('retrieves progressions', async () => {
    const request: ProgressionRequest = {
      subject: createSubject(),
      target_date: '2024-03-15',
      progression_type: 'secondary',
    };
    const response: ProgressionChartResponse = {
      subject_data: {},
      chart_data: {
        planetary_positions: [],
        house_cusps: [],
        aspects: [],
      },
    };

    mock.onPost('/api/v3/charts/progressions').reply(200, { data: response });

    await expect(client.getProgressions(request)).resolves.toEqual(response);
  });

  it('validates progression type', async () => {
    const request = {
      subject: createSubject(),
      target_date: '2024-03-15',
      progression_type: 'invalid',
    } as unknown as ProgressionRequest;

    await expect(client.getProgressions(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves directions', async () => {
    const request: DirectionRequest = {
      subject: createSubject(),
      target_date: '2024-03-15',
      direction_type: 'solar_arc',
    };
    const response: DirectionChartResponse = {
      subject_data: {},
      chart_data: {
        planetary_positions: [],
        house_cusps: [],
        aspects: [],
      },
    };

    mock.onPost('/api/v3/charts/directions').reply(200, response);

    await expect(client.getDirections(request)).resolves.toEqual(response);
  });

  it('validates direction type', async () => {
    const request = {
      subject: createSubject(),
      target_date: '2024-03-15',
      direction_type: 'invalid',
    } as unknown as DirectionRequest;

    await expect(client.getDirections(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves natal transits', async () => {
    const request: NatalTransitRequest = {
      subject: createSubject(),
      orb: 1,
    };
    const response: NatalTransitChartResponse = {
      transits: [],
    };

    mock.onPost('/api/v3/charts/natal-transits').reply(200, { result: response });

    await expect(client.getNatalTransits(request)).resolves.toEqual(response);
  });

  it('validates natal transits orb', async () => {
    const request = {
      subject: createSubject(),
      orb: 0,
    } as NatalTransitRequest;

    await expect(client.getNatalTransits(request)).rejects.toThrow(AstrologyError);
  });
});

