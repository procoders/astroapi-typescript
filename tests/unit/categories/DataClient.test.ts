import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DataClient } from '../../../src/categories/DataClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  GlobalDataRequest,
  LunarMetricsRequest,
  PlanetaryPositionsRequest,
} from '../../../src/types';
import type {
  AspectsResponse,
  CurrentMomentResponse,
  EnhancedAspectsResponse,
  EnhancedLunarMetricsResponse,
  EnhancedPositionsResponse,
  GlobalPositionsResponse,
  HouseCuspsResponse,
  LunarMetricsResponse,
  PlanetaryPositionsResponse,
} from '../../../src/types/responses';
import { createTestHttpHelper } from '../../utils/testHelpers';
import { mockFetch } from '../../utils/mockFetch';

const createPlanetaryPositionsRequest = (): PlanetaryPositionsRequest => ({
  subject: {
    name: 'Test User',
    birth_data: {
      year: 1990,
      month: 5,
      day: 15,
      hour: 14,
      minute: 30,
      city: 'London',
      country_code: 'GB',
    },
  },
});

const createLunarMetricsRequest = (): LunarMetricsRequest => ({
  datetime_location: {
    year: 2024,
    month: 3,
    day: 21,
    hour: 16,
    minute: 45,
    latitude: 51.5074,
    longitude: -0.1278,
  },
});

const createGlobalDataRequest = (): GlobalDataRequest => ({
  year: 2024,
  month: 3,
  day: 15,
  hour: 12,
  minute: 0,
  second: 0,
  options: {
    active_points: ['Sun', 'Moon'],
  },
});

describe('DataClient', () => {
  let client: DataClient;

  beforeEach(() => {
    const helper = createTestHttpHelper();
    client = new DataClient(helper);
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('retrieves planetary positions', async () => {
    const request = createPlanetaryPositionsRequest();
    const response: PlanetaryPositionsResponse = {
      positions: [
        {
          name: 'Sun',
          sign: 'Ari',
          degree: 10.5,
          absolute_longitude: 10.5,
          house: 10,
          is_retrograde: false,
          speed: 0.9,
        },
      ],
    };

    mockFetch.onPost('/api/v3/data/positions').reply(200, { data: response });

    await expect(client.getPositions(request)).resolves.toEqual(response);
  });

  it('validates planetary position requests', async () => {
    const invalidRequest = {
      subject: {
        name: 'Invalid',
        birth_data: {
          year: 1990,
          month: 13,
          day: 10,
        },
      },
    } as unknown as PlanetaryPositionsRequest;

    await expect(client.getPositions(invalidRequest)).rejects.toThrow(AstrologyError);
  });

  it('retrieves enhanced planetary positions', async () => {
    const request = createPlanetaryPositionsRequest();
    const response: EnhancedPositionsResponse = {
      positions: [
        {
          name: 'Sun',
          sign: 'Leo',
          degree: 15.2,
          absolute_longitude: 135.2,
          is_retrograde: false,
          house: 10,
          speed: 0.95,
          dignities: { domicile: true },
          debilities: { exile: false },
          sect: 'diurnal',
          conditions: {
            domicile: true,
            exaltation: false,
            exile: false,
            fall: false,
            triplicity: {
              is_in_triplicity: true,
              ruler_primary: 'Sun',
              ruler_secondary: 'Jupiter',
              ruler_participant: 'Saturn',
              active_ruler: 'Sun',
            },
            combustion: false,
            cazimi: false,
            under_beams: false,
            in_joy: false,
            about_to_change_sign: false,
          },
          jubilation: false,
          dispositor_chain: ['Sun', 'Mars'],
          mutual_reception: null,
          about_to_change_sign: false,
        },
      ],
      dignity_overview: {
        dignified_planets: ['Sun'],
        debilitated_planets: [],
      },
      sect_info: {
        is_day_chart: true,
        sect: 'diurnal',
      },
    };

    mockFetch.onPost('/api/v3/data/positions/enhanced').reply(200, response);

    await expect(client.getEnhancedPositions(request)).resolves.toEqual(response);
  });

  it('retrieves global planetary positions', async () => {
    const request = createGlobalDataRequest();
    const response: GlobalPositionsResponse = {
      positions: [
        {
          name: 'Sun',
          sign: 'Ari',
          degree: 24.3,
          absolute_longitude: 24.3,
          is_retrograde: false,
        },
      ],
    };

    mockFetch.onPost('/api/v3/data/global-positions').reply(200, { result: response });

    await expect(client.getGlobalPositions(request)).resolves.toEqual(response);
  });

  it('validates global planetary request fields', async () => {
    const request = {
      year: 2024,
      month: 0,
      day: 1,
      hour: 12,
      minute: 0,
      second: 0,
    } as unknown as GlobalDataRequest;

    await expect(client.getGlobalPositions(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves aspects', async () => {
    const request = createPlanetaryPositionsRequest();
    const response: AspectsResponse = {
      aspects: [
        {
          point1: 'Sun',
          point2: 'Moon',
          aspect_type: 'trine',
          orb: 2.1,
        },
      ],
    };

    mockFetch.onPost('/api/v3/data/aspects').reply(200, response);

    await expect(client.getAspects(request)).resolves.toEqual(response);
  });

  it('retrieves enhanced aspects', async () => {
    const request = createPlanetaryPositionsRequest();
    const response: EnhancedAspectsResponse = {
      aspects: [
        {
          point1: 'Sun',
          point2: 'Jupiter',
          aspect_type: 'trine',
          orb: 1.2,
          applying: true,
          strength: 8.5,
          reception_data: {
            has_reception: true,
            reception_type: 'single',
          },
        },
      ],
      reception_summary: {
        total_mutual_receptions: 1,
      },
    };

    mockFetch.onPost('/api/v3/data/aspects/enhanced').reply(200, { data: response });

    await expect(client.getEnhancedAspects(request)).resolves.toEqual(response);
  });

  it('retrieves house cusps', async () => {
    const request = createPlanetaryPositionsRequest();
    const response: HouseCuspsResponse = {
      house_cusps: [
        {
          house: 1,
          sign: 'Lib',
          degree: 15.3,
          absolute_longitude: 195.3,
        },
      ],
    };

    mockFetch.onPost('/api/v3/data/house-cusps').reply(200, response);

    await expect(client.getHouseCusps(request)).resolves.toEqual(response);
  });

  it('retrieves lunar metrics', async () => {
    const request = createLunarMetricsRequest();
    const response: LunarMetricsResponse = {
      date: '2024-03-21',
      within_perigee_range: false,
      distance: 384400,
      within_apogee_range: false,
      apogee_distance: 405500,
      moon_sign: 'Gem',
      moon_phase: 'Waxing Gibbous',
      moon_age_in_days: 10,
      moon_day: 11,
      moon_illumination: 0.78,
    };

    mockFetch.onPost('/api/v3/data/lunar-metrics').reply(200, response);

    await expect(client.getLunarMetrics(request)).resolves.toEqual(response);
  });

  it('validates lunar metrics request location', async () => {
    const request = {
      datetime_location: {
        year: 2024,
        month: 13,
        day: 31,
        hour: 12,
        minute: 0,
      },
    } as unknown as LunarMetricsRequest;

    await expect(client.getLunarMetrics(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves enhanced lunar metrics', async () => {
    const request = createLunarMetricsRequest();
    const response: EnhancedLunarMetricsResponse = {
      phase_info: {
        phase_name: 'Full Moon',
        illumination_percent: 99.3,
        moon_age_days: 14.7,
        elongation_deg: 180,
        increasing_light: false,
        void_of_course: false,
      },
      void_of_course: false,
      electional_guidance: {
        favorable_for: ['Completion', 'Celebration'],
        avoid_for: ['Starting new projects'],
        timing_quality: 'excellent',
      },
    };

    mockFetch.onPost('/api/v3/data/lunar-metrics/enhanced').reply(200, { result: response });

    await expect(client.getEnhancedLunarMetrics(request)).resolves.toEqual(response);
  });

  it('retrieves current moment subject', async () => {
    const response: CurrentMomentResponse = {
      name: 'Current UTC Time',
      birth_data: {
        year: 2024,
        month: 1,
        day: 1,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: 0,
        longitude: 0,
        timezone: 'UTC',
      },
    };

    mockFetch.onGet('/api/v3/data/now').reply(200, { data: response });

    await expect(client.getCurrentMoment()).resolves.toEqual(response);
  });
});
