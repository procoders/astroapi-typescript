import type { RequestConfig } from '../types/config';

import {
  BirthCardFlexibleRequest,
  DailyCardParams,
  DrawCardsRequest,
  ElementalDignitiesRequest,
  OptimalTimesRequest,
  QuintessenceRequest,
  TarotCardSearchParams,
  TarotGlossaryParams,
  TarotNatalReportRequest,
  TarotReportRequest,
  TarotTransitReportRequest,
  TimingAnalysisRequest,
  TreeOfLifeRequest,
} from '../types/requests';
import {
  BirthCardResponse,
  ElementalDignitiesResponse,
  OptimalTimesResponse,
  QuintessenceResponse,
  TarotCardDetailResponse,
  TarotCardSearchResponse,
  TarotDailyCardResponse,
  TarotDrawResponse,
  TarotGlossaryResponse,
  TarotNatalReportResponse,
  TarotReportResponse,
  TarotSynastryReportResponse,
  TarotTransitReportResponse,
  TimingAnalysisResponse,
  TreeOfLifeResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import {
  validateBirthCardFlexibleRequest,
  validateDailyCardParams,
  validateDrawCardsRequest,
  validateElementalDignitiesRequest,
  validateOptimalTimesRequest,
  validateQuintessenceRequest,
  validateTarotCardId,
  validateTarotCardSearchParams,
  validateTarotGlossaryParams,
  validateTarotNatalReportRequest,
  validateTarotReportRequest,
  validateTarotSynastryReportRequest,
  validateTarotTransitReportRequest,
  validateTimingAnalysisRequest,
  validateTreeOfLifeRequest,
} from '../utils/validators';
import { BaseCategoryClient } from './BaseCategoryClient';

const mergeConfigWithParams = <T extends object>(
  config: RequestConfig | undefined,
  params?: T | null,
): RequestConfig | undefined => {
  if (!params || Object.keys(params).length === 0) {
    return config;
  }

  return {
    ...(config ?? {}),
    params: {
      ...(config?.params ?? {}),
      ...params,
    },
  };
};

export class TarotClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/tarot';

  constructor(http: HttpHelper) {
    super(http, TarotClient.API_PREFIX);
  }

  async getCardsGlossary(
    params?: TarotGlossaryParams,
    config?: RequestConfig,
  ): Promise<TarotGlossaryResponse> {
    const validated = validateTarotGlossaryParams(params);
    const requestConfig = mergeConfigWithParams(config, validated ?? undefined);
    return this.http.get<TarotGlossaryResponse>(this.buildUrl('glossary', 'cards'), requestConfig);
  }

  async getSpreadsGlossary(config?: RequestConfig): Promise<TarotGlossaryResponse> {
    return this.http.get<TarotGlossaryResponse>(this.buildUrl('glossary', 'spreads'), config);
  }

  async getCardDetails(cardId: string, config?: RequestConfig): Promise<TarotCardDetailResponse> {
    const normalizedId = validateTarotCardId(cardId, 'cardId');
    return this.http.get<TarotCardDetailResponse>(
      this.buildUrl('glossary', 'cards', encodeURIComponent(normalizedId)),
      config,
    );
  }

  async drawCards(request: DrawCardsRequest, config?: RequestConfig): Promise<TarotDrawResponse> {
    validateDrawCardsRequest(request);
    return this.http.post<DrawCardsRequest, TarotDrawResponse>(
      this.buildUrl('cards', 'draw'),
      request,
      config,
    );
  }

  async searchCards(
    params?: TarotCardSearchParams,
    config?: RequestConfig,
  ): Promise<TarotCardSearchResponse> {
    const validated = validateTarotCardSearchParams(params);
    const requestConfig = mergeConfigWithParams(config, validated ?? undefined);
    return this.http.get<TarotCardSearchResponse>(this.buildUrl('cards', 'search'), requestConfig);
  }

  async getDailyCard(params: DailyCardParams, config?: RequestConfig): Promise<TarotDailyCardResponse> {
    const validated = validateDailyCardParams(params);
    const requestConfig = mergeConfigWithParams(config, validated);
    return this.http.get<TarotDailyCardResponse>(this.buildUrl('reports', 'daily'), requestConfig);
  }

  async generateSingleReport(
    request: TarotReportRequest,
    config?: RequestConfig,
  ): Promise<TarotReportResponse> {
    validateTarotReportRequest(request, 'single');
    return this.http.post<TarotReportRequest, TarotReportResponse>(
      this.buildUrl('reports', 'single'),
      request,
      config,
    );
  }

  async generateThreeCardReport(
    request: TarotReportRequest,
    config?: RequestConfig,
  ): Promise<TarotReportResponse> {
    validateTarotReportRequest(request, 'three_card');
    return this.http.post<TarotReportRequest, TarotReportResponse>(
      this.buildUrl('reports', 'three-card'),
      request,
      config,
    );
  }

  async generateCelticCrossReport(
    request: TarotReportRequest,
    config?: RequestConfig,
  ): Promise<TarotReportResponse> {
    validateTarotReportRequest(request, 'celtic_cross');
    return this.http.post<TarotReportRequest, TarotReportResponse>(
      this.buildUrl('reports', 'celtic-cross'),
      request,
      config,
    );
  }

  async generateSynastryReport(
    request: TarotReportRequest,
    config?: RequestConfig,
  ): Promise<TarotSynastryReportResponse> {
    validateTarotSynastryReportRequest(request);
    return this.http.post<TarotReportRequest, TarotSynastryReportResponse>(
      this.buildUrl('reports', 'synastry'),
      request,
      config,
    );
  }

  async generateHousesReport(
    request: TarotReportRequest,
    config?: RequestConfig,
  ): Promise<TarotReportResponse> {
    validateTarotReportRequest(request, 'houses');
    return this.http.post<TarotReportRequest, TarotReportResponse>(
      this.buildUrl('reports', 'houses'),
      request,
      config,
    );
  }

  async generateTreeOfLifeReport(
    request: TreeOfLifeRequest,
    config?: RequestConfig,
  ): Promise<TreeOfLifeResponse> {
    validateTreeOfLifeRequest(request);
    return this.http.post<TreeOfLifeRequest, TreeOfLifeResponse>(
      this.buildUrl('reports', 'tree-of-life'),
      request,
      config,
    );
  }

  async calculateQuintessence(
    request: QuintessenceRequest,
    config?: RequestConfig,
  ): Promise<QuintessenceResponse> {
    validateQuintessenceRequest(request);
    return this.http.post<QuintessenceRequest, QuintessenceResponse>(
      this.buildUrl('analysis', 'quintessence'),
      request,
      config,
    );
  }

  async calculateBirthCards(
    request: BirthCardFlexibleRequest,
    config?: RequestConfig,
  ): Promise<BirthCardResponse> {
    validateBirthCardFlexibleRequest(request);
    return this.http.post<BirthCardFlexibleRequest, BirthCardResponse>(
      this.buildUrl('analysis', 'birth-cards'),
      request,
      config,
    );
  }

  async calculateElementalDignities(
    request: ElementalDignitiesRequest,
    config?: RequestConfig,
  ): Promise<ElementalDignitiesResponse> {
    validateElementalDignitiesRequest(request);
    return this.http.post<ElementalDignitiesRequest, ElementalDignitiesResponse>(
      this.buildUrl('analysis', 'dignities'),
      request,
      config,
    );
  }

  async analyzeTiming(
    request: TimingAnalysisRequest,
    config?: RequestConfig,
  ): Promise<TimingAnalysisResponse> {
    validateTimingAnalysisRequest(request);
    return this.http.post<TimingAnalysisRequest, TimingAnalysisResponse>(
      this.buildUrl('analysis', 'timing'),
      request,
      config,
    );
  }

  async calculateOptimalTimes(
    request: OptimalTimesRequest,
    config?: RequestConfig,
  ): Promise<OptimalTimesResponse> {
    validateOptimalTimesRequest(request);
    return this.http.post<OptimalTimesRequest, OptimalTimesResponse>(
      this.buildUrl('analysis', 'optimal-times'),
      request,
      config,
    );
  }

  async generateTransitReport(
    request: TarotTransitReportRequest,
    config?: RequestConfig,
  ): Promise<TarotTransitReportResponse> {
    validateTarotTransitReportRequest(request);
    return this.http.post<TarotTransitReportRequest, TarotTransitReportResponse>(
      this.buildUrl('analysis', 'transit-report'),
      request,
      config,
    );
  }

  async generateNatalReport(
    request: TarotNatalReportRequest,
    config?: RequestConfig,
  ): Promise<TarotNatalReportResponse> {
    validateTarotNatalReportRequest(request);
    return this.http.post<TarotNatalReportRequest, TarotNatalReportResponse>(
      this.buildUrl('analysis', 'natal-report'),
      request,
      config,
    );
  }
}

