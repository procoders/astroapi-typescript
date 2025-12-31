import type { AxiosRequestConfig } from 'axios';

import {
  AnnualProfectionRequest,
  ProfectionTimelineRequest,
  TraditionalAnalysisRequest,
} from '../types/requests';
import {
  AnnualProfectionResponse,
  DignitiesAnalysisResponse,
  ProfectionTimelineResponse,
  ProfectionsAnalysisResponse,
  TraditionalAnalysisResponse,
  TraditionalCapabilitiesResponse,
  TraditionalGlossaryResponse,
  TraditionalLotsResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import {
  validateAnnualProfectionRequest,
  validateProfectionTimelineRequest,
  validateTraditionalAnalysisRequest,
} from '../utils/validators';
import { BaseCategoryClient } from './BaseCategoryClient';

export class TraditionalClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/traditional';

  constructor(http: HttpHelper) {
    super(http, TraditionalClient.API_PREFIX);
  }

  async getAnalysis(
    request: TraditionalAnalysisRequest,
    config?: AxiosRequestConfig,
  ): Promise<TraditionalAnalysisResponse> {
    validateTraditionalAnalysisRequest(request);
    return this.http.post<TraditionalAnalysisRequest, TraditionalAnalysisResponse>(
      this.buildUrl('analysis'),
      request,
      config,
    );
  }

  async getDignitiesAnalysis(
    request: TraditionalAnalysisRequest,
    config?: AxiosRequestConfig,
  ): Promise<DignitiesAnalysisResponse> {
    validateTraditionalAnalysisRequest(request, 'TraditionalDignitiesRequest');
    return this.http.post<TraditionalAnalysisRequest, DignitiesAnalysisResponse>(
      this.buildUrl('dignities'),
      request,
      config,
    );
  }

  async getLotsAnalysis(
    request: TraditionalAnalysisRequest,
    config?: AxiosRequestConfig,
  ): Promise<TraditionalLotsResponse> {
    validateTraditionalAnalysisRequest(request, 'TraditionalLotsRequest');
    return this.http.post<TraditionalAnalysisRequest, TraditionalLotsResponse>(
      this.buildUrl('lots'),
      request,
      config,
    );
  }

  async getProfectionsAnalysis(
    request: TraditionalAnalysisRequest,
    config?: AxiosRequestConfig,
  ): Promise<ProfectionsAnalysisResponse> {
    validateTraditionalAnalysisRequest(request, 'TraditionalProfectionsRequest');
    return this.http.post<TraditionalAnalysisRequest, ProfectionsAnalysisResponse>(
      this.buildUrl('profections'),
      request,
      config,
    );
  }

  async getAnnualProfection(
    request: AnnualProfectionRequest,
    config?: AxiosRequestConfig,
  ): Promise<AnnualProfectionResponse> {
    validateAnnualProfectionRequest(request);
    return this.http.post<AnnualProfectionRequest, AnnualProfectionResponse>(
      this.buildUrl('analysis', 'annual-profection'),
      request,
      config,
    );
  }

  async getProfectionTimeline(
    request: ProfectionTimelineRequest,
    config?: AxiosRequestConfig,
  ): Promise<ProfectionTimelineResponse> {
    validateProfectionTimelineRequest(request);
    return this.http.post<ProfectionTimelineRequest, ProfectionTimelineResponse>(
      this.buildUrl('analysis', 'profection-timeline'),
      request,
      config,
    );
  }

  async getTraditionalPointsGlossary(
    config?: AxiosRequestConfig,
  ): Promise<TraditionalGlossaryResponse> {
    return this.http.get<TraditionalGlossaryResponse>(
      this.buildUrl('glossary', 'traditional-points'),
      config,
    );
  }

  async getDignitiesGlossary(config?: AxiosRequestConfig): Promise<TraditionalGlossaryResponse> {
    return this.http.get<TraditionalGlossaryResponse>(
      this.buildUrl('glossary', 'dignities'),
      config,
    );
  }

  async getProfectionHousesGlossary(
    config?: AxiosRequestConfig,
  ): Promise<TraditionalGlossaryResponse> {
    return this.http.get<TraditionalGlossaryResponse>(
      this.buildUrl('glossary', 'profection-houses'),
      config,
    );
  }

  async getCapabilities(config?: AxiosRequestConfig): Promise<TraditionalCapabilitiesResponse> {
    return this.http.get<TraditionalCapabilitiesResponse>(
      this.buildUrl('capabilities'),
      config,
    );
  }
}


