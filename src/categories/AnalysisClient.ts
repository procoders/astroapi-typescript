import type { AxiosRequestConfig } from 'axios';

import {
  CompatibilityRequest,
  CompositeReportRequest,
  DirectionReportRequest,
  LunarAnalysisRequest,
  LunarReturnReportRequest,
  LunarReturnTransitRequest,
  NatalReportRequest,
  NatalTransitRequest,
  ProgressionReportRequest,
  RelationshipAnalysisRequest,
  SolarReturnReportRequest,
  SolarReturnTransitRequest,
  SynastryChartRequest,
  SynastryReportRequest,
} from '../types/requests';
import {
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
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import { BaseCategoryClient } from './BaseCategoryClient';
import {
  validateCompatibilityRequest,
  validateCompositeReportRequest,
  validateDirectionReportRequest,
  validateLunarAnalysisRequest,
  validateLunarReturnReportRequest,
  validateLunarReturnTransitRequest,
  validateNatalReportRequest,
  validateNatalTransitRequest,
  validateProgressionReportRequest,
  validateRelationshipAnalysisRequest,
  validateSolarReturnReportRequest,
  validateSolarReturnTransitRequest,
  validateSynastryChartRequest,
  validateSynastryReportRequest,
} from '../utils/validators';

export class AnalysisClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/analysis';

  constructor(http: HttpHelper) {
    super(http, AnalysisClient.API_PREFIX);
  }

  async getNatalReport(
    request: NatalReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalReportResponse> {
    validateNatalReportRequest(request);
    return this.http.post<NatalReportRequest, NatalReportResponse>(
      this.buildUrl('natal-report'),
      request,
      config,
    );
  }

  async getSynastryReport(
    request: SynastryReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<SynastryReportResponse> {
    validateSynastryReportRequest(request);
    return this.http.post<SynastryReportRequest, SynastryReportResponse>(
      this.buildUrl('synastry-report'),
      request,
      config,
    );
  }

  async getCompositeReport(
    request: CompositeReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<CompositeReportResponse> {
    validateCompositeReportRequest(request);
    return this.http.post<CompositeReportRequest, CompositeReportResponse>(
      this.buildUrl('composite-report'),
      request,
      config,
    );
  }

  async getCompatibilityAnalysis(
    request: CompatibilityRequest,
    config?: AxiosRequestConfig,
  ): Promise<SynastryReportResponse> {
    validateCompatibilityRequest(request);
    return this.http.post<CompatibilityRequest, SynastryReportResponse>(
      this.buildUrl('compatibility'),
      request,
      config,
    );
  }

  async getCompatibilityScore(
    request: SynastryChartRequest,
    config?: AxiosRequestConfig,
  ): Promise<RelationshipScoreResponse> {
    validateSynastryChartRequest(request, 'CompatibilityScoreRequest');
    return this.http.post<SynastryChartRequest, RelationshipScoreResponse>(
      this.buildUrl('compatibility-score'),
      request,
      config,
    );
  }

  async getRelationshipAnalysis(
    request: RelationshipAnalysisRequest,
    config?: AxiosRequestConfig,
  ): Promise<SynastryReportResponse> {
    validateRelationshipAnalysisRequest(request);
    return this.http.post<RelationshipAnalysisRequest, SynastryReportResponse>(
      this.buildUrl('relationship'),
      request,
      config,
    );
  }

  async getRelationshipScore(
    request: SynastryChartRequest,
    config?: AxiosRequestConfig,
  ): Promise<RelationshipScoreResponse> {
    validateSynastryChartRequest(request, 'RelationshipScoreRequest');
    return this.http.post<SynastryChartRequest, RelationshipScoreResponse>(
      this.buildUrl('relationship-score'),
      request,
      config,
    );
  }

  async getTransitReport(
    request: NatalTransitRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalTransitReportResponse> {
    validateNatalTransitRequest(request);
    return this.http.post<NatalTransitRequest, NatalTransitReportResponse>(
      this.buildUrl('transit-report'),
      request,
      config,
    );
  }

  async getNatalTransitReport(
    request: NatalTransitRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalTransitReportResponse> {
    validateNatalTransitRequest(request);
    return this.http.post<NatalTransitRequest, NatalTransitReportResponse>(
      this.buildUrl('natal-transit-report'),
      request,
      config,
    );
  }

  async getProgressionReport(
    request: ProgressionReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<ProgressionReportResponse> {
    validateProgressionReportRequest(request);
    return this.http.post<ProgressionReportRequest, ProgressionReportResponse>(
      this.buildUrl('progression-report'),
      request,
      config,
    );
  }

  async getDirectionReport(
    request: DirectionReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<DirectionReportResponse> {
    validateDirectionReportRequest(request);
    return this.http.post<DirectionReportRequest, DirectionReportResponse>(
      this.buildUrl('direction-report'),
      request,
      config,
    );
  }

  async getLunarReturnReport(
    request: LunarReturnReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<LunarReturnReportResponse> {
    validateLunarReturnReportRequest(request);
    return this.http.post<LunarReturnReportRequest, LunarReturnReportResponse>(
      this.buildUrl('lunar-return-report'),
      request,
      config,
    );
  }

  async getSolarReturnReport(
    request: SolarReturnReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<SolarReturnReportResponse> {
    validateSolarReturnReportRequest(request);
    return this.http.post<SolarReturnReportRequest, SolarReturnReportResponse>(
      this.buildUrl('solar-return-report'),
      request,
      config,
    );
  }

  async getLunarReturnTransitReport(
    request: LunarReturnTransitRequest,
    config?: AxiosRequestConfig,
  ): Promise<LunarReturnTransitReportResponse> {
    validateLunarReturnTransitRequest(request);
    return this.http.post<LunarReturnTransitRequest, LunarReturnTransitReportResponse>(
      this.buildUrl('lunar-return-transit-report'),
      request,
      config,
    );
  }

  async getSolarReturnTransitReport(
    request: SolarReturnTransitRequest,
    config?: AxiosRequestConfig,
  ): Promise<SolarReturnTransitReportResponse> {
    validateSolarReturnTransitRequest(request);
    return this.http.post<SolarReturnTransitRequest, SolarReturnTransitReportResponse>(
      this.buildUrl('solar-return-transit-report'),
      request,
      config,
    );
  }

  async getCareerAnalysis(
    request: NatalReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalReportResponse> {
    validateNatalReportRequest(request);
    return this.http.post<NatalReportRequest, NatalReportResponse>(
      this.buildUrl('career'),
      request,
      config,
    );
  }

  async getHealthAnalysis(
    request: NatalReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalReportResponse> {
    validateNatalReportRequest(request);
    return this.http.post<NatalReportRequest, NatalReportResponse>(
      this.buildUrl('health'),
      request,
      config,
    );
  }

  async getKarmicAnalysis(
    request: NatalReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalReportResponse> {
    validateNatalReportRequest(request);
    return this.http.post<NatalReportRequest, NatalReportResponse>(
      this.buildUrl('karmic'),
      request,
      config,
    );
  }

  async getPsychologicalAnalysis(
    request: NatalReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalReportResponse> {
    validateNatalReportRequest(request);
    return this.http.post<NatalReportRequest, NatalReportResponse>(
      this.buildUrl('psychological'),
      request,
      config,
    );
  }

  async getSpiritualAnalysis(
    request: NatalReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalReportResponse> {
    validateNatalReportRequest(request);
    return this.http.post<NatalReportRequest, NatalReportResponse>(
      this.buildUrl('spiritual'),
      request,
      config,
    );
  }

  async getPredictiveAnalysis(
    request: NatalTransitRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalTransitReportResponse> {
    validateNatalTransitRequest(request);
    return this.http.post<NatalTransitRequest, NatalTransitReportResponse>(
      this.buildUrl('predictive'),
      request,
      config,
    );
  }

  async getVocationalAnalysis(
    request: NatalReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalReportResponse> {
    validateNatalReportRequest(request);
    return this.http.post<NatalReportRequest, NatalReportResponse>(
      this.buildUrl('vocational'),
      request,
      config,
    );
  }

  async getLunarAnalysis(
    request: LunarAnalysisRequest,
    config?: AxiosRequestConfig,
  ): Promise<LunarAnalysisResponse> {
    validateLunarAnalysisRequest(request);
    return this.http.post<LunarAnalysisRequest, LunarAnalysisResponse>(
      this.buildUrl('lunar-analysis'),
      request,
      config,
    );
  }

  async getRelocationAnalysis(
    request: NatalReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalReportResponse> {
    validateNatalReportRequest(request);
    return this.http.post<NatalReportRequest, NatalReportResponse>(
      this.buildUrl('relocation'),
      request,
      config,
    );
  }
}
