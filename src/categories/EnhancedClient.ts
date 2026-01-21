import type { RequestConfig } from '../types/config';

import type { GlobalAnalysisRequest, PersonalAnalysisRequest } from '../types/requests';
import type { GlobalAnalysisResponse, PersonalAnalysisResponse } from '../types/responses';
import type { HttpHelper } from '../utils/http';
import { validateGlobalAnalysisRequest, validatePersonalAnalysisRequest } from '../utils/validators';
import { BaseCategoryClient } from './BaseCategoryClient';

const ENHANCED_CHARTS_PREFIX = '/api/v3/enhanced_charts';

export class EnhancedClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/enhanced';

  constructor(http: HttpHelper) {
    super(http, EnhancedClient.API_PREFIX);
  }

  async getGlobalAnalysis(
    request: GlobalAnalysisRequest,
    config?: RequestConfig,
  ): Promise<GlobalAnalysisResponse> {
    validateGlobalAnalysisRequest(request);
    return this.http.post<GlobalAnalysisRequest, GlobalAnalysisResponse>(
      this.buildUrl('global-analysis'),
      request,
      config,
    );
  }

  async getPersonalAnalysis(
    request: PersonalAnalysisRequest,
    config?: RequestConfig,
  ): Promise<PersonalAnalysisResponse> {
    validatePersonalAnalysisRequest(request);
    return this.http.post<PersonalAnalysisRequest, PersonalAnalysisResponse>(
      this.buildUrl('personal-analysis'),
      request,
      config,
    );
  }

  async getGlobalAnalysisChart(
    request: GlobalAnalysisRequest,
    config?: RequestConfig,
  ): Promise<GlobalAnalysisResponse> {
    validateGlobalAnalysisRequest(request);
    return this.http.post<GlobalAnalysisRequest, GlobalAnalysisResponse>(
      this.buildCustomUrl(ENHANCED_CHARTS_PREFIX, 'global-analysis'),
      request,
      config,
    );
  }

  async getPersonalAnalysisChart(
    request: PersonalAnalysisRequest,
    config?: RequestConfig,
  ): Promise<PersonalAnalysisResponse> {
    validatePersonalAnalysisRequest(request);
    return this.http.post<PersonalAnalysisRequest, PersonalAnalysisResponse>(
      this.buildCustomUrl(ENHANCED_CHARTS_PREFIX, 'personal-analysis'),
      request,
      config,
    );
  }
}

