import type { AxiosRequestConfig } from 'axios';

import {
  EclipseInterpretationRequest,
  EclipseNatalCheckRequest,
  UpcomingEclipsesParams,
} from '../types/requests';
import {
  EclipseInterpretationResponse,
  EclipseNatalCheckResponse,
  EclipseUpcomingResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import { BaseCategoryClient } from './BaseCategoryClient';
import {
  validateEclipseInterpretationRequest,
  validateEclipseNatalCheckRequest,
  validateUpcomingEclipsesParams,
} from '../utils/validators';

const mergeConfigWithParams = (
  config: AxiosRequestConfig | undefined,
  params?: Record<string, unknown>,
): AxiosRequestConfig | undefined => {
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

export class EclipsesClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/eclipses';

  constructor(http: HttpHelper) {
    super(http, EclipsesClient.API_PREFIX);
  }

  async getUpcoming(
    params?: UpcomingEclipsesParams,
    config?: AxiosRequestConfig,
  ): Promise<EclipseUpcomingResponse> {
    const normalizedParams = validateUpcomingEclipsesParams(params);
    const requestConfig = mergeConfigWithParams(config, normalizedParams as Record<string, unknown>);
    return this.http.get<EclipseUpcomingResponse>(this.buildUrl('upcoming'), requestConfig);
  }

  async checkNatalImpact(
    request: EclipseNatalCheckRequest,
    config?: AxiosRequestConfig,
  ): Promise<EclipseNatalCheckResponse> {
    validateEclipseNatalCheckRequest(request);
    return this.http.post<EclipseNatalCheckRequest, EclipseNatalCheckResponse>(
      this.buildUrl('natal-check'),
      request,
      config,
    );
  }

  async getInterpretation(
    request: EclipseInterpretationRequest,
    config?: AxiosRequestConfig,
  ): Promise<EclipseInterpretationResponse> {
    validateEclipseInterpretationRequest(request);
    return this.http.post<EclipseInterpretationRequest, EclipseInterpretationResponse>(
      this.buildUrl('interpretation'),
      request,
      config,
    );
  }
}

