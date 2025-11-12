import type { AxiosRequestConfig } from 'axios';

import {
  FixedStarsConjunctionsRequest,
  FixedStarsPositionsRequest,
  FixedStarsReportRequest,
} from '../types/requests';
import {
  FixedStarsConjunctionsResponse,
  FixedStarsPositionsResponse,
  FixedStarsPresetsResponse,
  FixedStarsReportResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import {
  validateFixedStarsConjunctionsRequest,
  validateFixedStarsPositionsRequest,
  validateFixedStarsReportRequest,
} from '../utils/validators';
import { BaseCategoryClient } from './BaseCategoryClient';

export class FixedStarsClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/fixed-stars';

  constructor(http: HttpHelper) {
    super(http, FixedStarsClient.API_PREFIX);
  }

  async getPositions(
    request: FixedStarsPositionsRequest,
    config?: AxiosRequestConfig,
  ): Promise<FixedStarsPositionsResponse> {
    validateFixedStarsPositionsRequest(request);
    return this.http.post<FixedStarsPositionsRequest, FixedStarsPositionsResponse>(
      this.buildUrl('positions'),
      request,
      config,
    );
  }

  async getConjunctions(
    request: FixedStarsConjunctionsRequest,
    config?: AxiosRequestConfig,
  ): Promise<FixedStarsConjunctionsResponse> {
    validateFixedStarsConjunctionsRequest(request);
    return this.http.post<FixedStarsConjunctionsRequest, FixedStarsConjunctionsResponse>(
      this.buildUrl('conjunctions'),
      request,
      config,
    );
  }

  async generateReport(
    request: FixedStarsReportRequest,
    config?: AxiosRequestConfig,
  ): Promise<FixedStarsReportResponse> {
    validateFixedStarsReportRequest(request);
    return this.http.post<FixedStarsReportRequest, FixedStarsReportResponse>(
      this.buildUrl('report'),
      request,
      config,
    );
  }

  async getPresets(config?: AxiosRequestConfig): Promise<FixedStarsPresetsResponse> {
    return this.http.get<FixedStarsPresetsResponse>(this.buildUrl('presets'), config);
  }
}

