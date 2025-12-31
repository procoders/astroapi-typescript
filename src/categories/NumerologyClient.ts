import type { AxiosRequestConfig } from 'axios';

import { MultipleSubjectsRequest, SingleSubjectRequest } from '../types/requests';
import {
  NumerologyCompatibilityResponse,
  NumerologyComprehensiveResponse,
  NumerologyCoreResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import {
  validateNumerologyCompatibilityRequest,
  validateNumerologyComprehensiveRequest,
  validateNumerologyCoreRequest,
} from '../utils/validators';
import { BaseCategoryClient } from './BaseCategoryClient';

export class NumerologyClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/numerology';

  constructor(http: HttpHelper) {
    super(http, NumerologyClient.API_PREFIX);
  }

  async getCoreNumbers(
    request: SingleSubjectRequest,
    config?: AxiosRequestConfig,
  ): Promise<NumerologyCoreResponse> {
    validateNumerologyCoreRequest(request);
    return this.http.post<SingleSubjectRequest, NumerologyCoreResponse>(
      this.buildUrl('core-numbers'),
      request,
      config,
    );
  }

  async getComprehensiveReport(
    request: SingleSubjectRequest,
    config?: AxiosRequestConfig,
  ): Promise<NumerologyComprehensiveResponse> {
    validateNumerologyComprehensiveRequest(request);
    return this.http.post<SingleSubjectRequest, NumerologyComprehensiveResponse>(
      this.buildUrl('comprehensive'),
      request,
      config,
    );
  }

  async analyzeCompatibility(
    request: MultipleSubjectsRequest,
    config?: AxiosRequestConfig,
  ): Promise<NumerologyCompatibilityResponse> {
    validateNumerologyCompatibilityRequest(request);
    return this.http.post<MultipleSubjectsRequest, NumerologyCompatibilityResponse>(
      this.buildUrl('compatibility'),
      request,
      config,
    );
  }
}

