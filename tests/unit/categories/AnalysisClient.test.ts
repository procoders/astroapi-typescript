


import { AnalysisClient } from '../../../src/categories/AnalysisClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  CompatibilityRequest,
  CompositeReportRequest,
  LunarAnalysisRequest,
  LunarReturnReportRequest,
  LunarReturnTransitRequest,
  NatalReportRequest,
  NatalTransitRequest,
  ProgressionReportRequest,
  RelationshipAnalysisRequest,
  SolarReturnReportRequest,
  SolarReturnTransitRequest,
  Subject,
  SynastryChartRequest,
  SynastryReportRequest,
} from '../../../src/types';
import type {
  CompositeReportResponse,
  DirectionReportResponse,
  LunarAnalysisResponse,
  LunarReturnReportResponse,
  LunarReturnTransitReportResponse,
  NatalReportResponse,
  NatalTransitReportResponse,
  ProgressionReportResponse,
  RelationshipScoreResponse,
  SolarReturnReportResponse,
  SolarReturnTransitReportResponse,
  SynastryReportResponse,
} from '../../../src/types/responses';
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
    city: 'London',
    country_code: 'GB',
  },
  ...overrides,
});

const createNatalReportRequest = (): NatalReportRequest => ({
  subject: createSubject(),
  tradition: 'psychological',
  language: 'en',
});

const createSynastryReportRequest = (): SynastryReportRequest => ({
  subject1: createSubject({ name: 'Partner 1' }),
  subject2: createSubject({ name: 'Partner 2' }),
  options: { house_system: 'P' },
  report_options: { language: 'en' },
});

const createCompositeReportRequest = (): CompositeReportRequest => ({
  subject1: createSubject({ name: 'Person A' }),
  subject2: createSubject({ name: 'Person B' }),
  options: { zodiac_type: 'Tropic' },
  report_options: { tradition: 'universal' },
});

const createCompatibilityRequest = (): CompatibilityRequest => ({
  subjects: [createSubject({ name: 'One' }), createSubject({ name: 'Two' })],
  options: { house_system: 'P', language: 'en' },
});

const createRelationshipAnalysisRequest = (): RelationshipAnalysisRequest => ({
  subjects: [createSubject({ name: 'Alpha' }), createSubject({ name: 'Beta' })],
  report_options: { language: 'en' },
});

const createSynastryChartRequest = (): SynastryChartRequest => ({
  subject1: createSubject({ name: 'Sync 1' }),
  subject2: createSubject({ name: 'Sync 2' }),
});

const createNatalTransitRequest = (): NatalTransitRequest => ({
  subject: createSubject(),
  date_range: {
    start_date: { year: 2024, month: 3, day: 1 },
    end_date: { year: 2024, month: 3, day: 31 },
  },
  orb: 1,
});

const createProgressionReportRequest = (): ProgressionReportRequest => ({
  subject: createSubject(),
  target_date: '2024-06-01',
  progression_type: 'secondary',
  options: { house_system: 'P' },
});

const createDirectionReportRequest = (): DirectionReportRequest => ({
  subject: createSubject(),
  target_date: '2024-06-01',
  direction_type: 'solar_arc',
  arc_rate: 1,
  options: { house_system: 'P' },
});

const createLunarReturnReportRequest = (): LunarReturnReportRequest => ({
  subject: createSubject(),
  return_date: '2024-07-01',
  options: { house_system: 'P' },
});

const createSolarReturnReportRequest = (): SolarReturnReportRequest => ({
  subject: createSubject(),
  return_year: 2024,
  options: { house_system: 'P' },
});

const createLunarReturnTransitRequest = (): LunarReturnTransitRequest => ({
  subject: createSubject(),
  return_date: '2024-07-01',
  date_range: {
    start_date: { year: 2024, month: 7, day: 1 },
    end_date: { year: 2024, month: 7, day: 15 },
  },
  orb: 1,
});

const createSolarReturnTransitRequest = (): SolarReturnTransitRequest => ({
  subject: createSubject(),
  return_year: 2024,
  date_range: {
    start_date: { year: 2024, month: 1, day: 1 },
    end_date: { year: 2024, month: 12, day: 31 },
  },
  orb: 1,
});

const createLunarAnalysisRequest = (): LunarAnalysisRequest => ({
  datetime_location: {
    year: 2024,
    month: 5,
    day: 21,
    hour: 14,
    minute: 0,
    latitude: 51.5074,
    longitude: -0.1278,
  },
  tradition: 'psychological',
  language: 'en',
});

const mockNatalReportResponse: NatalReportResponse = {
  subject: { name: 'Test Subject' },
  interpretations: [],
};

const mockSynastryReportResponse: SynastryReportResponse = {
  report_title: 'Synastry Insights',
  sections: [],
};

const mockCompositeReportResponse: CompositeReportResponse = {
  subject_data: {} as Record<string, unknown>,
  interpretations: [],
  life_area_compatibility: [],
  overall_compatibility_score: 0.8,
};

const mockRelationshipScoreResponse: RelationshipScoreResponse = {
  score: 0.75,
  score_description: 'Strong compatibility',
  is_destiny_sign: false,
  aspects: [],
  subject_data: {} as Record<string, unknown>,
};

const mockNatalTransitReportResponse: NatalTransitReportResponse = {
  events: [],
};

const mockProgressionReportResponse: ProgressionReportResponse = {
  subject_data: {},
  progressed_data: {},
  chart_data: {
    planetary_positions: [],
    house_cusps: [],
    aspects: [],
  },
  interpretations: [],
  progression_type: 'secondary',
};

const mockDirectionReportResponse: DirectionReportResponse = {
  subject_data: {},
  directed_data: {},
  chart_data: {
    planetary_positions: [],
    house_cusps: [],
    aspects: [],
  },
  interpretations: [],
  direction_type: 'solar_arc',
  arc_used: 1,
};

const mockLunarReturnReportResponse: LunarReturnReportResponse = {
  subject_data: {},
  chart_data: {
    planetary_positions: [],
    house_cusps: [],
    aspects: [],
  },
  interpretations: [],
};

const mockSolarReturnReportResponse: SolarReturnReportResponse = {
  subject_data: {},
  chart_data: {
    planetary_positions: [],
    house_cusps: [],
    aspects: [],
  },
  interpretations: [],
};

const mockLunarReturnTransitReportResponse: LunarReturnTransitReportResponse = {
  events: [],
};

const mockSolarReturnTransitReportResponse: SolarReturnTransitReportResponse = {
  events: [],
};

const mockLunarAnalysisResponse: LunarAnalysisResponse = {
  lunar_metrics: {} as unknown as LunarAnalysisResponse['lunar_metrics'],
  interpretations: [],
};


describe('AnalysisClient', () => {
  let client: AnalysisClient;
  

  beforeEach(() => {
    const helper = createTestHttpHelper();
    client = new AnalysisClient(helper);
    
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('retrieves natal report', async () => {
    const request = createNatalReportRequest();
    mockFetch.onPost('/api/v3/analysis/natal-report').reply(200, { data: mockNatalReportResponse });

    await expect(client.getNatalReport(request)).resolves.toEqual(mockNatalReportResponse);
  });

  it('validates natal report subject', async () => {
    const request = { subject: { name: 'Invalid' } } as unknown as NatalReportRequest;

    await expect(client.getNatalReport(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves synastry report', async () => {
    const request = createSynastryReportRequest();
    mockFetch.onPost('/api/v3/analysis/synastry-report').reply(200, { data: mockSynastryReportResponse });

    await expect(client.getSynastryReport(request)).resolves.toEqual(mockSynastryReportResponse);
  });

  it('validates synastry report request', async () => {
    const request = {
      subject1: createSubject(),
      subject2: { name: 'Invalid' },
    } as unknown as SynastryReportRequest;

    await expect(client.getSynastryReport(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves composite report', async () => {
    const request = createCompositeReportRequest();
    mockFetch.onPost('/api/v3/analysis/composite-report').reply(200, { data: mockCompositeReportResponse });

    await expect(client.getCompositeReport(request)).resolves.toEqual(mockCompositeReportResponse);
  });

  it('validates compatibility analysis subjects', async () => {
    const request = { subjects: [createSubject()] } as CompatibilityRequest;

    await expect(client.getCompatibilityAnalysis(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves compatibility analysis', async () => {
    const request = createCompatibilityRequest();
    mockFetch.onPost('/api/v3/analysis/compatibility').reply(200, { data: mockSynastryReportResponse });

    await expect(client.getCompatibilityAnalysis(request)).resolves.toEqual(mockSynastryReportResponse);
  });

  it('retrieves compatibility score', async () => {
    const request = createSynastryChartRequest();
    mockFetch.onPost('/api/v3/analysis/compatibility-score').reply(200, { data: mockRelationshipScoreResponse });

    await expect(client.getCompatibilityScore(request)).resolves.toEqual(mockRelationshipScoreResponse);
  });

  it('validates compatibility score request', async () => {
    const request = {
      subject1: { name: 'Invalid' },
      subject2: createSubject(),
    } as unknown as SynastryChartRequest;

    await expect(client.getCompatibilityScore(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves relationship analysis', async () => {
    const request = createRelationshipAnalysisRequest();
    mockFetch.onPost('/api/v3/analysis/relationship').reply(200, { data: mockSynastryReportResponse });

    await expect(client.getRelationshipAnalysis(request)).resolves.toEqual(mockSynastryReportResponse);
  });

  it('validates relationship analysis', async () => {
    const request = {
      subjects: [createSubject()],
    } as unknown as RelationshipAnalysisRequest;

    await expect(client.getRelationshipAnalysis(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves relationship score', async () => {
    const request = createSynastryChartRequest();
    mockFetch.onPost('/api/v3/analysis/relationship-score').reply(200, { data: mockRelationshipScoreResponse });

    await expect(client.getRelationshipScore(request)).resolves.toEqual(mockRelationshipScoreResponse);
  });

  it('retrieves transit report', async () => {
    const request = createNatalTransitRequest();
    mockFetch.onPost('/api/v3/analysis/transit-report').reply(200, { data: mockNatalTransitReportResponse });

    await expect(client.getTransitReport(request)).resolves.toEqual(mockNatalTransitReportResponse);
  });

  it('validates transit report orb', async () => {
    const request = {
      subject: createSubject(),
      orb: 0,
    } as unknown as NatalTransitRequest;

    await expect(client.getTransitReport(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves natal transit report', async () => {
    const request = createNatalTransitRequest();
    mockFetch.onPost('/api/v3/analysis/natal-transit-report').reply(200, { data: mockNatalTransitReportResponse });

    await expect(client.getNatalTransitReport(request)).resolves.toEqual(mockNatalTransitReportResponse);
  });

  it('retrieves progression report', async () => {
    const request = createProgressionReportRequest();
    mockFetch.onPost('/api/v3/analysis/progression-report').reply(200, { data: mockProgressionReportResponse });

    await expect(client.getProgressionReport(request)).resolves.toEqual(mockProgressionReportResponse);
  });

  it('validates progression report target date', async () => {
    const request = {
      subject: createSubject(),
      target_date: 'invalid-date',
      progression_type: 'secondary',
    } as unknown as ProgressionReportRequest;

    await expect(client.getProgressionReport(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves direction report', async () => {
    const request = createDirectionReportRequest();
    mockFetch.onPost('/api/v3/analysis/direction-report').reply(200, { data: mockDirectionReportResponse });

    await expect(client.getDirectionReport(request)).resolves.toEqual(mockDirectionReportResponse);
  });

  it('validates direction report type', async () => {
    const request = {
      subject: createSubject(),
      target_date: '2024-01-01',
      direction_type: 'invalid',
    } as unknown as DirectionReportRequest;

    await expect(client.getDirectionReport(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves lunar return report', async () => {
    const request = createLunarReturnReportRequest();
    mockFetch.onPost('/api/v3/analysis/lunar-return-report').reply(200, { data: mockLunarReturnReportResponse });

    await expect(client.getLunarReturnReport(request)).resolves.toEqual(mockLunarReturnReportResponse);
  });

  it('validates lunar return report date', async () => {
    const request = {
      subject: createSubject(),
      return_date: 'invalid-date',
    } as unknown as LunarReturnReportRequest;

    await expect(client.getLunarReturnReport(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves solar return report', async () => {
    const request = createSolarReturnReportRequest();
    mockFetch.onPost('/api/v3/analysis/solar-return-report').reply(200, { data: mockSolarReturnReportResponse });

    await expect(client.getSolarReturnReport(request)).resolves.toEqual(mockSolarReturnReportResponse);
  });

  it('validates solar return report year', async () => {
    const request = {
      subject: createSubject(),
      return_year: 1800,
    } as unknown as SolarReturnReportRequest;

    await expect(client.getSolarReturnReport(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves lunar return transit report', async () => {
    const request = createLunarReturnTransitRequest();
    mockFetch.onPost('/api/v3/analysis/lunar-return-transit-report').reply(200, { data: mockLunarReturnTransitReportResponse });

    await expect(client.getLunarReturnTransitReport(request)).resolves.toEqual(mockLunarReturnTransitReportResponse);
  });

  it('validates lunar return transit orb', async () => {
    const request = {
      subject: createSubject(),
      return_date: '2024-07-01',
      date_range: {
        start_date: { year: 2024, month: 7, day: 1 },
        end_date: { year: 2024, month: 7, day: 15 },
      },
      orb: 0,
    } as unknown as LunarReturnTransitRequest;

    await expect(client.getLunarReturnTransitReport(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves solar return transit report', async () => {
    const request = createSolarReturnTransitRequest();
    mockFetch.onPost('/api/v3/analysis/solar-return-transit-report').reply(200, { data: mockSolarReturnTransitReportResponse });

    await expect(client.getSolarReturnTransitReport(request)).resolves.toEqual(mockSolarReturnTransitReportResponse);
  });

  it('validates solar return transit date range', async () => {
    const request = {
      subject: createSubject(),
      return_year: 2024,
      date_range: {
        start_date: { year: 2024, month: 1, day: 1 },
        end_date: { year: 2024, month: 13, day: 1 },
      },
      orb: 1,
    } as unknown as SolarReturnTransitRequest;

    await expect(client.getSolarReturnTransitReport(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves career analysis', async () => {
    const request = createNatalReportRequest();
    mockFetch.onPost('/api/v3/analysis/career').reply(200, { data: mockNatalReportResponse });

    await expect(client.getCareerAnalysis(request)).resolves.toEqual(mockNatalReportResponse);
  });

  it('retrieves health analysis', async () => {
    const request = createNatalReportRequest();
    mockFetch.onPost('/api/v3/analysis/health').reply(200, { data: mockNatalReportResponse });

    await expect(client.getHealthAnalysis(request)).resolves.toEqual(mockNatalReportResponse);
  });

  it('retrieves karmic analysis', async () => {
    const request = createNatalReportRequest();
    mockFetch.onPost('/api/v3/analysis/karmic').reply(200, { data: mockNatalReportResponse });

    await expect(client.getKarmicAnalysis(request)).resolves.toEqual(mockNatalReportResponse);
  });

  it('retrieves psychological analysis', async () => {
    const request = createNatalReportRequest();
    mockFetch.onPost('/api/v3/analysis/psychological').reply(200, { data: mockNatalReportResponse });

    await expect(client.getPsychologicalAnalysis(request)).resolves.toEqual(mockNatalReportResponse);
  });

  it('retrieves spiritual analysis', async () => {
    const request = createNatalReportRequest();
    mockFetch.onPost('/api/v3/analysis/spiritual').reply(200, { data: mockNatalReportResponse });

    await expect(client.getSpiritualAnalysis(request)).resolves.toEqual(mockNatalReportResponse);
  });

  it('retrieves predictive analysis', async () => {
    const request = createNatalTransitRequest();
    mockFetch.onPost('/api/v3/analysis/predictive').reply(200, { data: mockNatalTransitReportResponse });

    await expect(client.getPredictiveAnalysis(request)).resolves.toEqual(mockNatalTransitReportResponse);
  });

  it('retrieves vocational analysis', async () => {
    const request = createNatalReportRequest();
    mockFetch.onPost('/api/v3/analysis/vocational').reply(200, { data: mockNatalReportResponse });

    await expect(client.getVocationalAnalysis(request)).resolves.toEqual(mockNatalReportResponse);
  });

  it('retrieves relocation analysis', async () => {
    const request = createNatalReportRequest();
    mockFetch.onPost('/api/v3/analysis/relocation').reply(200, { data: mockNatalReportResponse });

    await expect(client.getRelocationAnalysis(request)).resolves.toEqual(mockNatalReportResponse);
  });

  it('retrieves lunar analysis', async () => {
    const request = createLunarAnalysisRequest();
    mockFetch.onPost('/api/v3/analysis/lunar-analysis').reply(200, { data: mockLunarAnalysisResponse });

    await expect(client.getLunarAnalysis(request)).resolves.toEqual(mockLunarAnalysisResponse);
  });

  it('validates lunar analysis', async () => {
    const request = {
      datetime_location: {
        year: 2024,
        month: 5,
        day: 21,
        hour: 14,
        minute: 0,
        latitude: 51.5074,
        longitude: -0.1278,
      },
      tradition: '',
    } as LunarAnalysisRequest;

    await expect(client.getLunarAnalysis(request)).rejects.toThrow(AstrologyError);
  });
});
