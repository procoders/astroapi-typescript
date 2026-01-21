


import { EnhancedClient } from '../../../src/categories/EnhancedClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  DateTimeLocation,
  GlobalAnalysisRequest,
  PersonalAnalysisRequest,
  Subject,
} from '../../../src/types';
import type { GlobalAnalysisResponse, PersonalAnalysisResponse } from '../../../src/types/responses';
import { createTestHttpHelper } from '../../utils/testHelpers';
import { mockFetch } from '../../utils/mockFetch';


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

const createDateTimeLocation = (
  overrides: Partial<DateTimeLocation> = {},
): DateTimeLocation => ({
  year: 2024,
  month: 5,
  day: 11,
  hour: 12,
  minute: 30,
  second: 0,
  city: 'London',
  country_code: 'GB',
  latitude: 51.5074,
  longitude: -0.1278,
  timezone: 'Europe/London',
  ...overrides,
});

const createGlobalRequest = (
  overrides: Partial<GlobalAnalysisRequest> = {},
): GlobalAnalysisRequest => ({
  options: {
    house_system: 'W',
    zodiac_type: 'Tropic',
    active_points: ['Sun', 'Moon', 'Mercury'],
    precision: 3,
  },
  orbs: {
    major_aspects_deg: 2,
    minor_aspects_deg: 1,
  },
  ...overrides,
});

const createPersonalRequest = (
  overrides: Partial<PersonalAnalysisRequest> = {},
): PersonalAnalysisRequest => ({
  subject: createSubject(),
  options: {
    house_system: 'W',
    zodiac_type: 'Tropic',
    active_points: ['Sun', 'Moon', 'Mercury', 'Venus'],
    precision: 3,
  },
  orbs: {
    major_aspects_deg: 2,
    minor_aspects_deg: 1,
  },
  ...overrides,
});


describe('EnhancedClient', () => {
  let client: EnhancedClient;
  

  beforeEach(() => {
    const helper = createTestHttpHelper();
    client = new EnhancedClient(helper);
    
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('retrieves global analysis', async () => {
    const request = createGlobalRequest();
    const response = { metadata: {}, planets: [], aspects: [], fixed_stars: [], lunar_phase: {} } as unknown as GlobalAnalysisResponse;
    mockFetch.onPost('/api/v3/enhanced/global-analysis').reply(200, { data: response });

    await expect(client.getGlobalAnalysis(request)).resolves.toEqual(response);
  });

  it('validates global analysis orbs', async () => {
    const request = createGlobalRequest({ orbs: { major_aspects_deg: -1 } });

    await expect(client.getGlobalAnalysis(request)).rejects.toThrow(AstrologyError);
  });

  it('validates global calculation time shape', async () => {
    const request = createGlobalRequest({ calculation_time: 'invalid' as unknown as DateTimeLocation });

    await expect(client.getGlobalAnalysis(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves personal analysis', async () => {
    const request = createPersonalRequest();
    const response = {
      metadata: {},
      ascendant: {},
      houses: [],
      planets: [],
      aspects: [],
      fixed_stars: [],
      lunar_phase: {},
      chronocrator: {},
    } as unknown as PersonalAnalysisResponse;
    mockFetch.onPost('/api/v3/enhanced/personal-analysis').reply(200, { data: response });

    await expect(client.getPersonalAnalysis(request)).resolves.toEqual(response);
  });

  it('validates personal analysis subject', async () => {
    const request = createPersonalRequest({ subject: undefined as unknown as Subject });

    await expect(client.getPersonalAnalysis(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves global analysis charts endpoint', async () => {
    const request = createGlobalRequest();
    const response = { metadata: {}, planets: [], aspects: [], fixed_stars: [], lunar_phase: {} } as unknown as GlobalAnalysisResponse;
    mockFetch.onPost('/api/v3/enhanced_charts/global-analysis').reply(200, { data: response });

    await expect(client.getGlobalAnalysisChart(request)).resolves.toEqual(response);
  });

  it('retrieves personal analysis charts endpoint', async () => {
    const request = createPersonalRequest();
    const response = {
      metadata: {},
      ascendant: {},
      houses: [],
      planets: [],
      aspects: [],
      fixed_stars: [],
      lunar_phase: {},
      chronocrator: {},
    } as unknown as PersonalAnalysisResponse;
    mockFetch.onPost('/api/v3/enhanced_charts/personal-analysis').reply(200, { data: response });

    await expect(client.getPersonalAnalysisChart(request)).resolves.toEqual(response);
  });

  it('validates personal analysis calculation time shape', async () => {
    const request = createPersonalRequest({ calculation_time: 'invalid' as unknown as DateTimeLocation });

    await expect(client.getPersonalAnalysis(request)).rejects.toThrow(AstrologyError);
  });
});

