


import { InsightsClient } from '../../../src/categories/InsightsClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  BradleySiderographRequest,
  BusinessMultipleRequest,
  BusinessSingleRequest,
  BusinessTimingRequest,
  CompatibilityRequest,
  CryptoTimingRequest,
  ForexTimingRequest,
  GannAnalysisRequest,
  MarketTimingRequest,
  MultipleSubjectsRequest,
  PersonalTradingRequest,
  PetCompatibilityRequest,
  PetMultiSubjectRequest,
  PetSingleSubjectRequest,
  SingleSubjectRequest,
  Subject,
} from '../../../src/types';
import type {
  BusinessInsightsResponse,
  CryptoTimingResponse,
  ForexTimingResponse,
  GannAnalysisResponse,
  InsightsResponse,
  MarketTimingResponse,
  MultiPetDynamicsResponse,
  PersonalTradingResponse,
  PetCompatibilityResponse,
  PetHealthSensitivitiesResponse,
  PetPersonalityResponse,
  PetTrainingWindowsResponse,
} from '../../../src/types/responses';
import { createTestHttpHelper } from '../../utils/testHelpers';
import { mockFetch } from '../../utils/mockFetch';


const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'Sample Subject',
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

const createSingleSubjectRequest = (
  overrides: Partial<SingleSubjectRequest> = {},
): SingleSubjectRequest => ({
  subject: createSubject(),
  ...overrides,
});

const createMultipleSubjectsRequest = (
  overrides: Partial<MultipleSubjectsRequest> = {},
): MultipleSubjectsRequest => ({
  subjects: [createSubject({ name: 'A' }), createSubject({ name: 'B' })],
  ...overrides,
});

const createCompatibilityRequest = (
  overrides: Partial<CompatibilityRequest> = {},
): CompatibilityRequest => ({
  subjects: [createSubject(), createSubject({ name: 'Partner' })],
  ...overrides,
});

const createPetSingleSubjectRequest = (
  overrides: Partial<PetSingleSubjectRequest> = {},
): PetSingleSubjectRequest => ({
  subject: createSubject(),
  pet_options: {
    pet_type: 'dog',
    training_type: 'obedience',
    language: 'en',
  },
  ...overrides,
});

const createPetCompatibilityRequest = (
  overrides: Partial<PetCompatibilityRequest> = {},
): PetCompatibilityRequest => ({
  subjects: [createSubject({ name: 'Owner' }), createSubject({ name: 'Pet' })],
  options: {
    pet_type: 'cat',
    training_type: 'behavior',
    language: 'en',
  },
  ...overrides,
});

const createPetMultiSubjectRequest = (
  overrides: Partial<PetMultiSubjectRequest> = {},
): PetMultiSubjectRequest => ({
  subjects: [createSubject({ name: 'Pet 1' }), createSubject({ name: 'Pet 2' })],
  pet_options: {
    pet_type: 'dog',
    training_type: 'group',
    language: 'en',
  },
  ...overrides,
});

const createMarketTimingRequest = (
  overrides: Partial<MarketTimingRequest> = {},
): MarketTimingRequest => ({
  markets: ['stocks', 'crypto'],
  language: 'en',
  ...overrides,
});

const createPersonalTradingRequest = (
  overrides: Partial<PersonalTradingRequest> = {},
): PersonalTradingRequest => ({
  subject: createSubject(),
  analysis_period_days: 30,
  trading_style: 'swing',
  include_lunar_cycles: true,
  language: 'en',
  ...overrides,
});

const createGannAnalysisRequest = (
  overrides: Partial<GannAnalysisRequest> = {},
): GannAnalysisRequest => ({
  symbol: 'SPX',
  forecast_days: 60,
  ...overrides,
});

const createBradleyRequest = (
  overrides: Partial<BradleySiderographRequest> = {},
): BradleySiderographRequest => ({
  language: 'en',
  period: 'yearly',
  market: 'stocks',
  ...overrides,
});

const createCryptoTimingRequest = (
  overrides: Partial<CryptoTimingRequest> = {},
): CryptoTimingRequest => ({
  cryptocurrency: 'bitcoin',
  analysis_period_days: 30,
  include_volatility_forecast: true,
  language: 'en',
  ...overrides,
});

const createForexTimingRequest = (
  overrides: Partial<ForexTimingRequest> = {},
): ForexTimingRequest => ({
  pair: 'EUR/USD',
  trading_session: 'london',
  forecast_days: 10,
  ...overrides,
});

const createBusinessMultipleRequest = (
  overrides: Partial<BusinessMultipleRequest> = {},
): BusinessMultipleRequest => ({
  subjects: [createSubject({ name: 'Alex' }), createSubject({ name: 'Sam' })],
  options: {
    house_system: 'P',
    language: 'en',
    tradition: 'universal',
    perspective: 'geocentric',
    detail_level: 'standard',
  },
  ...overrides,
});

const createBusinessSingleRequest = (
  overrides: Partial<BusinessSingleRequest> = {},
): BusinessSingleRequest => ({
  subject: createSubject(),
  options: {
    house_system: 'P',
    language: 'en',
    tradition: 'universal',
    perspective: 'geocentric',
    detail_level: 'standard',
  },
  ...overrides,
});

const createBusinessTimingRequest = (
  overrides: Partial<BusinessTimingRequest> = {},
): BusinessTimingRequest => ({
  activities: ['product_launch'],
  language: 'en',
  ...overrides,
});


describe('InsightsClient', () => {
  let client: InsightsClient;
  

  beforeEach(() => {
    const helper = createTestHttpHelper();
    client = new InsightsClient(helper);
    
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('discovers available insights', async () => {
    const response = { categories: ['relationship', 'pet'] } as InsightsResponse;
    mockFetch.onGet('/api/v3/insights').reply(200, { data: response });

    await expect(client.discover()).resolves.toEqual(response);
  });

  describe('relationship insights', () => {
    it('analyzes relationship compatibility', async () => {
      const request = createCompatibilityRequest();
      const response = { score: 0.82 } as InsightsResponse;
      mockFetch.onPost('/api/v3/insights/relationship/compatibility').reply(200, { data: response });

      await expect(client.relationship.getCompatibility(request)).resolves.toEqual(response);
    });

    it('validates relationship compatibility requires two subjects', async () => {
      const request = createCompatibilityRequest({ subjects: [createSubject()] });

      await expect(client.relationship.getCompatibility(request)).rejects.toThrow(AstrologyError);
    });

    it('returns compatibility score', async () => {
      const request = createMultipleSubjectsRequest();
      const response = { score: 78 } as InsightsResponse;
      mockFetch.onPost('/api/v3/insights/relationship/compatibility-score').reply(200, { data: response });

      await expect(client.relationship.getCompatibilityScore(request)).resolves.toEqual(response);
    });

    it('validates compatibility score subject count', async () => {
      const request = createMultipleSubjectsRequest({ subjects: [createSubject()] });

      await expect(client.relationship.getCompatibilityScore(request)).rejects.toThrow(AstrologyError);
    });

    it('retrieves love languages', async () => {
      const request = createSingleSubjectRequest();
      const response = { primary: 'words_of_affirmation' } as InsightsResponse;
      mockFetch.onPost('/api/v3/insights/relationship/love-languages').reply(200, { data: response });

      await expect(client.relationship.getLoveLanguages(request)).resolves.toEqual(response);
    });

    it('validates love languages subject presence', async () => {
      const request = createSingleSubjectRequest({ subject: undefined as unknown as Subject });

      await expect(client.relationship.getLoveLanguages(request)).rejects.toThrow(AstrologyError);
    });

    it('generates Davison report for two subjects', async () => {
      const response = { report: {} } as InsightsResponse;
      mockFetch.onPost('/api/v3/insights/relationship/davison').reply(200, { data: response });

      await expect(client.relationship.getDavisonReport(createMultipleSubjectsRequest())).resolves.toEqual(response);
    });

    it('retrieves relationship timing insights', async () => {
      const response = { periods: [] } as InsightsResponse;
      mockFetch.onPost('/api/v3/insights/relationship/timing').reply(200, { data: response });

      await expect(client.relationship.getTiming(createCompatibilityRequest())).resolves.toEqual(response);
    });

    it('retrieves relationship red flags', async () => {
      const response = { warnings: [] } as InsightsResponse;
      mockFetch.onPost('/api/v3/insights/relationship/red-flags').reply(200, { data: response });

      await expect(client.relationship.getRedFlags(createSingleSubjectRequest())).resolves.toEqual(response);
    });
  });

  describe('pet insights', () => {
    it('retrieves pet personality', async () => {
      const response = { traits: [] } as PetPersonalityResponse;
      mockFetch.onPost('/api/v3/insights/pet/personality').reply(200, { data: response });

      await expect(client.pet.getPersonality(createPetSingleSubjectRequest())).resolves.toEqual(response);
    });

    it('retrieves pet compatibility', async () => {
      const response = { score: 85 } as PetCompatibilityResponse;
      mockFetch.onPost('/api/v3/insights/pet/compatibility').reply(200, { data: response });

      await expect(client.pet.getCompatibility(createPetCompatibilityRequest())).resolves.toEqual(response);
    });

    it('validates pet compatibility requires two subjects', async () => {
      const request = createPetCompatibilityRequest({ subjects: [createSubject({ name: 'Owner' })] });

      await expect(client.pet.getCompatibility(request)).rejects.toThrow(AstrologyError);
    });

    it('retrieves pet training windows', async () => {
      const response = { optimal_windows: [] } as PetTrainingWindowsResponse;
      mockFetch.onPost('/api/v3/insights/pet/training-windows').reply(200, { data: response });

      await expect(client.pet.getTrainingWindows(createPetSingleSubjectRequest())).resolves.toEqual(response);
    });

    it('validates pet training requires subject', async () => {
      const request = createPetSingleSubjectRequest({ subject: undefined as unknown as Subject });

      await expect(client.pet.getTrainingWindows(request)).rejects.toThrow(AstrologyError);
    });

    it('retrieves pet health sensitivities', async () => {
      const response = { recommendations: [] } as PetHealthSensitivitiesResponse;
      mockFetch.onPost('/api/v3/insights/pet/health-sensitivities').reply(200, { data: response });

      await expect(client.pet.getHealthSensitivities(createPetSingleSubjectRequest())).resolves.toEqual(response);
    });

    it('retrieves multi-pet dynamics', async () => {
      const response = { success: true, data: {} } as MultiPetDynamicsResponse;
      mockFetch.onPost('/api/v3/insights/pet/multi-pet-dynamics').reply(200, { data: response });

      await expect(client.pet.getMultiPetDynamics(createPetMultiSubjectRequest())).resolves.toEqual(response);
    });
  });

  describe('wellness insights', () => {
    const endpoints: Array<{ path: string; action: (req: SingleSubjectRequest) => Promise<InsightsResponse> }> = [
      {
        path: '/api/v3/insights/wellness/body-mapping',
        action: (request) => client.wellness.getBodyMapping(request),
      },
      {
        path: '/api/v3/insights/wellness/biorhythms',
        action: (request) => client.wellness.getBiorhythms(request),
      },
      {
        path: '/api/v3/insights/wellness/wellness-timing',
        action: (request) => client.wellness.getWellnessTiming(request),
      },
      {
        path: '/api/v3/insights/wellness/energy-patterns',
        action: (request) => client.wellness.getEnergyPatterns(request),
      },
      {
        path: '/api/v3/insights/wellness/wellness-score',
        action: (request) => client.wellness.getWellnessScore(request),
      },
      {
        path: '/api/v3/insights/wellness/moon-wellness',
        action: (request) => client.wellness.getMoonWellness(request),
      },
    ];

    it.each(endpoints)('calls %s', async ({ path, action }) => {
      const response = { result: 'ok' } as InsightsResponse;
      mockFetch.onPost(path).reply(200, { data: response });

      await expect(action(createSingleSubjectRequest())).resolves.toEqual(response);
    });
  });

  describe('financial insights', () => {
    it('retrieves market timing', async () => {
      const response = { markets: [] } as MarketTimingResponse;
      mockFetch.onPost('/api/v3/insights/financial/market-timing').reply(200, { data: response });

      await expect(client.financial.getMarketTiming(createMarketTimingRequest())).resolves.toEqual(response);
    });

    it('validates market timing requires markets', async () => {
      const request = createMarketTimingRequest({ markets: [] });

      await expect(client.financial.getMarketTiming(request)).rejects.toThrow(AstrologyError);
    });

    it('analyzes personal trading windows', async () => {
      const response = { optimal_trading_days: [] } as PersonalTradingResponse;
      mockFetch.onPost('/api/v3/insights/financial/personal-trading').reply(200, { data: response });

      await expect(client.financial.analyzePersonalTrading(createPersonalTradingRequest())).resolves.toEqual(response);
    });

    it('validates personal trading requires subject or birth data', async () => {
      const request = createPersonalTradingRequest({ subject: null, birth_data: null });

      await expect(client.financial.analyzePersonalTrading(request)).rejects.toThrow(AstrologyError);
    });

    it('retrieves Gann analysis', async () => {
      const response = { cycles: [] } as GannAnalysisResponse;
      mockFetch.onPost('/api/v3/insights/financial/gann-analysis').reply(200, { data: response });

      await expect(client.financial.getGannAnalysis(createGannAnalysisRequest())).resolves.toEqual(response);
    });

    it('validates Gann analysis forecast days range', async () => {
      const request = createGannAnalysisRequest({ forecast_days: 0 });

      await expect(client.financial.getGannAnalysis(request)).rejects.toThrow(AstrologyError);
    });

    it('retrieves Bradley siderograph analysis', async () => {
      const response = { turning_points: [] } as InsightsResponse;
      mockFetch.onPost('/api/v3/insights/financial/bradley-siderograph').reply(200, { data: response });

      await expect(client.financial.getBradleySiderograph(createBradleyRequest())).resolves.toEqual(response);
    });

    it('validates Bradley period option', async () => {
      const request = createBradleyRequest({ period: 'daily' });

      await expect(client.financial.getBradleySiderograph(request)).rejects.toThrow(AstrologyError);
    });

    it('retrieves crypto timing analysis', async () => {
      const response = { signals: [] } as CryptoTimingResponse;
      mockFetch.onPost('/api/v3/insights/financial/crypto-timing').reply(200, { data: response });

      await expect(client.financial.getCryptoTiming(createCryptoTimingRequest())).resolves.toEqual(response);
    });

    it('validates crypto timing volatility flag', async () => {
      const request = createCryptoTimingRequest({ include_volatility_forecast: 'yes' as unknown as boolean });

      await expect(client.financial.getCryptoTiming(request)).rejects.toThrow(AstrologyError);
    });

    it('retrieves forex timing analysis', async () => {
      const response = { sessions: [] } as ForexTimingResponse;
      mockFetch.onPost('/api/v3/insights/financial/forex-timing').reply(200, { data: response });

      await expect(client.financial.getForexTiming(createForexTimingRequest())).resolves.toEqual(response);
    });

    it('validates forex trading session value', async () => {
      const request = createForexTimingRequest({ trading_session: 'berlin' });

      await expect(client.financial.getForexTiming(request)).rejects.toThrow(AstrologyError);
    });
  });

  describe('business insights', () => {
    it('retrieves team dynamics analysis', async () => {
      const response = { team: {} } as BusinessInsightsResponse;
      mockFetch.onPost('/api/v3/insights/business/team-dynamics').reply(200, { data: response });

      await expect(client.business.getTeamDynamics(createBusinessMultipleRequest())).resolves.toEqual(response);
    });

    it('validates team dynamics requires at least two subjects', async () => {
      const request = createBusinessMultipleRequest({ subjects: [createSubject()] });

      await expect(client.business.getTeamDynamics(request)).rejects.toThrow(AstrologyError);
    });

    it('retrieves leadership style insights', async () => {
      const response = { style: 'visionary' } as BusinessInsightsResponse;
      mockFetch.onPost('/api/v3/insights/business/leadership-style').reply(200, { data: response });

      await expect(client.business.getLeadershipStyle(createBusinessSingleRequest())).resolves.toEqual(response);
    });

    it('retrieves hiring compatibility insights', async () => {
      const response = { result: 'match' } as BusinessInsightsResponse;
      mockFetch.onPost('/api/v3/insights/business/hiring-compatibility').reply(200, { data: response });

      await expect(client.business.getHiringCompatibility(createBusinessMultipleRequest())).resolves.toEqual(response);
    });

    it('retrieves business timing insights', async () => {
      const response = { windows: [] } as BusinessInsightsResponse;
      mockFetch.onPost('/api/v3/insights/business/business-timing').reply(200, { data: response });

      await expect(client.business.getBusinessTiming(createBusinessTimingRequest())).resolves.toEqual(response);
    });

    it('validates business timing activities', async () => {
      const request = createBusinessTimingRequest({ activities: ['invalid_activity'] });

      await expect(client.business.getBusinessTiming(request)).rejects.toThrow(AstrologyError);
    });

    it('retrieves department compatibility', async () => {
      const response = { compatibility: [] } as BusinessInsightsResponse;
      mockFetch.onPost('/api/v3/insights/business/department-compatibility').reply(200, { data: response });

      await expect(client.business.getDepartmentCompatibility(createBusinessMultipleRequest())).resolves.toEqual(response);
    });

    it('retrieves succession planning insights', async () => {
      const response = { recommendations: [] } as BusinessInsightsResponse;
      mockFetch.onPost('/api/v3/insights/business/succession-planning').reply(200, { data: response });

      await expect(client.business.getSuccessionPlanning(createBusinessMultipleRequest())).resolves.toEqual(response);
    });
  });
});

