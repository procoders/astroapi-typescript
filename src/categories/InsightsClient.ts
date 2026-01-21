import type { RequestConfig } from '../types/config';

import {
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
} from '../types/requests';
import {
  BradleySiderographResponse,
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
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import {
  validateBradleySiderographRequest,
  validateBusinessMultipleRequest,
  validateBusinessSingleRequest,
  validateBusinessTimingRequest,
  validateCompatibilityRequest,
  validateCryptoTimingRequest,
  validateForexTimingRequest,
  validateGannAnalysisRequest,
  validateMarketTimingRequest,
  validateMultipleSubjectsRequest,
  validatePersonalTradingRequest,
  validatePetCompatibilityRequest,
  validatePetMultiSubjectRequest,
  validatePetSingleSubjectRequest,
  validateSingleSubjectRequest,
} from '../utils/validators';
import { BaseCategoryClient } from './BaseCategoryClient';

export class InsightsClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/insights';

  readonly relationship: RelationshipInsightsClient;
  readonly pet: PetInsightsClient;
  readonly wellness: WellnessInsightsClient;
  readonly financial: FinancialInsightsClient;
  readonly business: BusinessInsightsClient;

  constructor(http: HttpHelper) {
    super(http, InsightsClient.API_PREFIX);
    this.relationship = new RelationshipInsightsClient(http);
    this.pet = new PetInsightsClient(http);
    this.wellness = new WellnessInsightsClient(http);
    this.financial = new FinancialInsightsClient(http);
    this.business = new BusinessInsightsClient(http);
  }

  async discover(config?: RequestConfig): Promise<InsightsResponse> {
    return this.http.get<InsightsResponse>(this.buildUrl(), config);
  }
}

class RelationshipInsightsClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/insights/relationship';

  constructor(http: HttpHelper) {
    super(http, RelationshipInsightsClient.API_PREFIX);
  }

  async getCompatibility(
    request: CompatibilityRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateCompatibilityRequest(request, 'RelationshipCompatibilityRequest');
    return this.http.post<CompatibilityRequest, InsightsResponse>(
      this.buildUrl('compatibility'),
      request,
      config,
    );
  }

  async getCompatibilityScore(
    request: MultipleSubjectsRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateMultipleSubjectsRequest(request, 'RelationshipCompatibilityScoreRequest', 2, 2);
    return this.http.post<MultipleSubjectsRequest, InsightsResponse>(
      this.buildUrl('compatibility-score'),
      request,
      config,
    );
  }

  async getLoveLanguages(
    request: SingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateSingleSubjectRequest(request, 'RelationshipLoveLanguagesRequest');
    return this.http.post<SingleSubjectRequest, InsightsResponse>(
      this.buildUrl('love-languages'),
      request,
      config,
    );
  }

  async getDavisonReport(
    request: MultipleSubjectsRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateMultipleSubjectsRequest(request, 'RelationshipDavisonRequest', 2, 2);
    return this.http.post<MultipleSubjectsRequest, InsightsResponse>(
      this.buildUrl('davison'),
      request,
      config,
    );
  }

  async getTiming(
    request: CompatibilityRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateCompatibilityRequest(request, 'RelationshipTimingRequest');
    return this.http.post<CompatibilityRequest, InsightsResponse>(
      this.buildUrl('timing'),
      request,
      config,
    );
  }

  async getRedFlags(
    request: SingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateSingleSubjectRequest(request, 'RelationshipRedFlagsRequest');
    return this.http.post<SingleSubjectRequest, InsightsResponse>(
      this.buildUrl('red-flags'),
      request,
      config,
    );
  }
}

class PetInsightsClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/insights/pet';

  constructor(http: HttpHelper) {
    super(http, PetInsightsClient.API_PREFIX);
  }

  async getPersonality(
    request: PetSingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<PetPersonalityResponse> {
    validatePetSingleSubjectRequest(request, 'PetPersonalityRequest');
    return this.http.post<PetSingleSubjectRequest, PetPersonalityResponse>(
      this.buildUrl('personality'),
      request,
      config,
    );
  }

  async getCompatibility(
    request: PetCompatibilityRequest,
    config?: RequestConfig,
  ): Promise<PetCompatibilityResponse> {
    validatePetCompatibilityRequest(request);
    return this.http.post<PetCompatibilityRequest, PetCompatibilityResponse>(
      this.buildUrl('compatibility'),
      request,
      config,
    );
  }

  async getTrainingWindows(
    request: PetSingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<PetTrainingWindowsResponse> {
    validatePetSingleSubjectRequest(request, 'PetTrainingWindowsRequest');
    return this.http.post<PetSingleSubjectRequest, PetTrainingWindowsResponse>(
      this.buildUrl('training-windows'),
      request,
      config,
    );
  }

  async getHealthSensitivities(
    request: PetSingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<PetHealthSensitivitiesResponse> {
    validatePetSingleSubjectRequest(request, 'PetHealthSensitivitiesRequest');
    return this.http.post<PetSingleSubjectRequest, PetHealthSensitivitiesResponse>(
      this.buildUrl('health-sensitivities'),
      request,
      config,
    );
  }

  async getMultiPetDynamics(
    request: PetMultiSubjectRequest,
    config?: RequestConfig,
  ): Promise<MultiPetDynamicsResponse> {
    validatePetMultiSubjectRequest(request);
    return this.http.post<PetMultiSubjectRequest, MultiPetDynamicsResponse>(
      this.buildUrl('multi-pet-dynamics'),
      request,
      config,
    );
  }
}

class WellnessInsightsClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/insights/wellness';

  constructor(http: HttpHelper) {
    super(http, WellnessInsightsClient.API_PREFIX);
  }

  async getBodyMapping(
    request: SingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateSingleSubjectRequest(request, 'WellnessBodyMappingRequest');
    return this.http.post<SingleSubjectRequest, InsightsResponse>(
      this.buildUrl('body-mapping'),
      request,
      config,
    );
  }

  async getBiorhythms(
    request: SingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateSingleSubjectRequest(request, 'WellnessBiorhythmsRequest');
    return this.http.post<SingleSubjectRequest, InsightsResponse>(
      this.buildUrl('biorhythms'),
      request,
      config,
    );
  }

  async getWellnessTiming(
    request: SingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateSingleSubjectRequest(request, 'WellnessTimingRequest');
    return this.http.post<SingleSubjectRequest, InsightsResponse>(
      this.buildUrl('wellness-timing'),
      request,
      config,
    );
  }

  async getEnergyPatterns(
    request: SingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateSingleSubjectRequest(request, 'WellnessEnergyPatternsRequest');
    return this.http.post<SingleSubjectRequest, InsightsResponse>(
      this.buildUrl('energy-patterns'),
      request,
      config,
    );
  }

  async getWellnessScore(
    request: SingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateSingleSubjectRequest(request, 'WellnessScoreRequest');
    return this.http.post<SingleSubjectRequest, InsightsResponse>(
      this.buildUrl('wellness-score'),
      request,
      config,
    );
  }

  async getMoonWellness(
    request: SingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<InsightsResponse> {
    validateSingleSubjectRequest(request, 'MoonWellnessRequest');
    return this.http.post<SingleSubjectRequest, InsightsResponse>(
      this.buildUrl('moon-wellness'),
      request,
      config,
    );
  }
}

class FinancialInsightsClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/insights/financial';

  constructor(http: HttpHelper) {
    super(http, FinancialInsightsClient.API_PREFIX);
  }

  async getMarketTiming(
    request: MarketTimingRequest,
    config?: RequestConfig,
  ): Promise<MarketTimingResponse> {
    validateMarketTimingRequest(request);
    return this.http.post<MarketTimingRequest, MarketTimingResponse>(
      this.buildUrl('market-timing'),
      request,
      config,
    );
  }

  async analyzePersonalTrading(
    request: PersonalTradingRequest,
    config?: RequestConfig,
  ): Promise<PersonalTradingResponse> {
    validatePersonalTradingRequest(request);
    return this.http.post<PersonalTradingRequest, PersonalTradingResponse>(
      this.buildUrl('personal-trading'),
      request,
      config,
    );
  }

  async getGannAnalysis(
    request: GannAnalysisRequest,
    config?: RequestConfig,
  ): Promise<GannAnalysisResponse> {
    validateGannAnalysisRequest(request);
    return this.http.post<GannAnalysisRequest, GannAnalysisResponse>(
      this.buildUrl('gann-analysis'),
      request,
      config,
    );
  }

  async getBradleySiderograph(
    request: BradleySiderographRequest,
    config?: RequestConfig,
  ): Promise<BradleySiderographResponse> {
    validateBradleySiderographRequest(request);
    return this.http.post<BradleySiderographRequest, BradleySiderographResponse>(
      this.buildUrl('bradley-siderograph'),
      request,
      config,
    );
  }

  async getCryptoTiming(
    request: CryptoTimingRequest,
    config?: RequestConfig,
  ): Promise<CryptoTimingResponse> {
    validateCryptoTimingRequest(request);
    return this.http.post<CryptoTimingRequest, CryptoTimingResponse>(
      this.buildUrl('crypto-timing'),
      request,
      config,
    );
  }

  async getForexTiming(
    request: ForexTimingRequest,
    config?: RequestConfig,
  ): Promise<ForexTimingResponse> {
    validateForexTimingRequest(request);
    return this.http.post<ForexTimingRequest, ForexTimingResponse>(
      this.buildUrl('forex-timing'),
      request,
      config,
    );
  }
}

class BusinessInsightsClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/insights/business';

  constructor(http: HttpHelper) {
    super(http, BusinessInsightsClient.API_PREFIX);
  }

  async getTeamDynamics(
    request: BusinessMultipleRequest,
    config?: RequestConfig,
  ): Promise<BusinessInsightsResponse> {
    validateBusinessMultipleRequest(request, 'BusinessTeamDynamicsRequest', 2);
    return this.http.post<BusinessMultipleRequest, BusinessInsightsResponse>(
      this.buildUrl('team-dynamics'),
      request,
      config,
    );
  }

  async getHiringCompatibility(
    request: BusinessMultipleRequest,
    config?: RequestConfig,
  ): Promise<BusinessInsightsResponse> {
    validateBusinessMultipleRequest(request, 'BusinessHiringCompatibilityRequest', 2);
    return this.http.post<BusinessMultipleRequest, BusinessInsightsResponse>(
      this.buildUrl('hiring-compatibility'),
      request,
      config,
    );
  }

  async getLeadershipStyle(
    request: BusinessSingleRequest,
    config?: RequestConfig,
  ): Promise<BusinessInsightsResponse> {
    validateBusinessSingleRequest(request, 'BusinessLeadershipStyleRequest');
    return this.http.post<BusinessSingleRequest, BusinessInsightsResponse>(
      this.buildUrl('leadership-style'),
      request,
      config,
    );
  }

  async getBusinessTiming(
    request: BusinessTimingRequest,
    config?: RequestConfig,
  ): Promise<BusinessInsightsResponse> {
    validateBusinessTimingRequest(request);
    return this.http.post<BusinessTimingRequest, BusinessInsightsResponse>(
      this.buildUrl('business-timing'),
      request,
      config,
    );
  }

  async getDepartmentCompatibility(
    request: BusinessMultipleRequest,
    config?: RequestConfig,
  ): Promise<BusinessInsightsResponse> {
    validateBusinessMultipleRequest(request, 'BusinessDepartmentCompatibilityRequest', 2);
    return this.http.post<BusinessMultipleRequest, BusinessInsightsResponse>(
      this.buildUrl('department-compatibility'),
      request,
      config,
    );
  }

  async getSuccessionPlanning(
    request: BusinessMultipleRequest,
    config?: RequestConfig,
  ): Promise<BusinessInsightsResponse> {
    validateBusinessMultipleRequest(request, 'BusinessSuccessionPlanningRequest', 2);
    return this.http.post<BusinessMultipleRequest, BusinessInsightsResponse>(
      this.buildUrl('succession-planning'),
      request,
      config,
    );
  }
}

