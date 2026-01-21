


import { TraditionalClient } from '../../../src/categories/TraditionalClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  AnnualProfectionRequest,
  ProfectionTimelineRequest,
  Subject,
  TraditionalAnalysisRequest,
} from '../../../src/types';
import type {
  AnnualProfectionResponse,
  DignitiesAnalysisResponse,
  ProfectionTimelineResponse,
  ProfectionsAnalysisResponse,
  TraditionalAnalysisResponse,
  TraditionalCapabilitiesResponse,
  TraditionalGlossaryResponse,
  TraditionalLotsResponse,
} from '../../../src/types/responses';
import { createTestHttpHelper } from '../../utils/testHelpers';
import { mockFetch } from '../../utils/mockFetch';


const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'Traditional Subject',
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

const createTraditionalRequest = (
  overrides: Partial<TraditionalAnalysisRequest> = {},
): TraditionalAnalysisRequest => ({
  subject: createSubject(),
  options: { house_system: 'P' },
  orbs: { major_aspects_deg: 3 },
  ...overrides,
});

const createAnnualProfectionRequest = (
  overrides: Partial<AnnualProfectionRequest> = {},
): AnnualProfectionRequest => ({
  subject: createSubject(),
  current_date: '2024-05-01',
  current_age: 34,
  ...overrides,
});

const createProfectionTimelineRequest = (
  overrides: Partial<ProfectionTimelineRequest> = {},
): ProfectionTimelineRequest => ({
  subject: createSubject(),
  start_age: 0,
  end_age: 84,
  ...overrides,
});


describe('TraditionalClient', () => {
  let client: TraditionalClient;
  

  beforeEach(() => {
    const helper = createTestHttpHelper();
    client = new TraditionalClient(helper);
    
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('retrieves traditional analysis', async () => {
    const request = createTraditionalRequest();
    const response = { summary: {} } as TraditionalAnalysisResponse;
    mockFetch.onPost('/api/v3/traditional/analysis').reply(200, { data: response });

    await expect(client.getAnalysis(request)).resolves.toEqual(response);
  });

  it('validates traditional analysis orbs shape', async () => {
    const request = createTraditionalRequest({ orbs: [] as unknown as Record<string, unknown> });

    await expect(client.getAnalysis(request)).rejects.toThrow(AstrologyError);
  });

  it('validates traditional analysis orb values', async () => {
    const request = createTraditionalRequest({
      orbs: { major_aspects_deg: -1 },
    });

    await expect(client.getAnalysis(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves dignities analysis', async () => {
    const request = createTraditionalRequest();
    const response = { dignity_scores: {} } as DignitiesAnalysisResponse;
    mockFetch.onPost('/api/v3/traditional/dignities').reply(200, { data: response });

    await expect(client.getDignitiesAnalysis(request)).resolves.toEqual(response);
  });

  it('retrieves lots analysis', async () => {
    const request = createTraditionalRequest();
    const response = { lots: {} } as TraditionalLotsResponse;
    mockFetch.onPost('/api/v3/traditional/lots').reply(200, { data: response });

    await expect(client.getLotsAnalysis(request)).resolves.toEqual(response);
  });

  it('retrieves profections analysis', async () => {
    const request = createTraditionalRequest();
    const response = { current_profection: {} } as ProfectionsAnalysisResponse;
    mockFetch.onPost('/api/v3/traditional/profections').reply(200, { data: response });

    await expect(client.getProfectionsAnalysis(request)).resolves.toEqual(response);
  });

  it('retrieves annual profection', async () => {
    const request = createAnnualProfectionRequest();
    const response = { lord_of_the_year: 'Venus' } as AnnualProfectionResponse;
    mockFetch.onPost('/api/v3/traditional/analysis/annual-profection').reply(200, { data: response });

    await expect(client.getAnnualProfection(request)).resolves.toEqual(response);
  });

  it('validates annual profection date format', async () => {
    const request = createAnnualProfectionRequest({ current_date: '01-05-2024' });

    await expect(client.getAnnualProfection(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves profection timeline', async () => {
    const request = createProfectionTimelineRequest();
    const response = { timeline: [] } as ProfectionTimelineResponse;
    mockFetch.onPost('/api/v3/traditional/analysis/profection-timeline').reply(200, { data: response });

    await expect(client.getProfectionTimeline(request)).resolves.toEqual(response);
  });

  it('validates profection timeline age ordering', async () => {
    const request = createProfectionTimelineRequest({ start_age: 40, end_age: 30 });

    await expect(client.getProfectionTimeline(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves traditional points glossary', async () => {
    const response = { items: [] } as TraditionalGlossaryResponse;
    mockFetch.onGet('/api/v3/traditional/glossary/traditional-points').reply(200, { data: response });

    await expect(client.getTraditionalPointsGlossary()).resolves.toEqual(response);
  });

  it('retrieves dignities glossary', async () => {
    const response = { dignities: [] } as TraditionalGlossaryResponse;
    mockFetch.onGet('/api/v3/traditional/glossary/dignities').reply(200, { data: response });

    await expect(client.getDignitiesGlossary()).resolves.toEqual(response);
  });

  it('retrieves profection houses glossary', async () => {
    const response = { houses: [] } as TraditionalGlossaryResponse;
    mockFetch.onGet('/api/v3/traditional/glossary/profection-houses').reply(200, { data: response });

    await expect(client.getProfectionHousesGlossary()).resolves.toEqual(response);
  });

  it('retrieves traditional capabilities', async () => {
    const response = { features: [] } as TraditionalCapabilitiesResponse;
    mockFetch.onGet('/api/v3/traditional/capabilities').reply(200, { data: response });

    await expect(client.getCapabilities()).resolves.toEqual(response);
  });
});


