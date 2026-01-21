import type { RequestConfig } from '../types/config';

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
  config: RequestConfig | undefined,
  params?: Record<string, string | number | boolean | null | undefined>,
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

export class EclipsesClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/eclipses';

  constructor(http: HttpHelper) {
    super(http, EclipsesClient.API_PREFIX);
  }

  async getUpcoming(
    params?: UpcomingEclipsesParams,
    config?: RequestConfig,
  ): Promise<EclipseUpcomingResponse> {
    const normalizedParams = validateUpcomingEclipsesParams(params);
    const requestConfig = mergeConfigWithParams(config, normalizedParams as Record<string, string | number | boolean | null | undefined>);
    return this.http.get<EclipseUpcomingResponse>(this.buildUrl('upcoming'), requestConfig);
  }

  async checkNatalImpact(
    request: EclipseNatalCheckRequest,
    config?: RequestConfig,
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
    config?: RequestConfig,
  ): Promise<EclipseInterpretationResponse> {
    validateEclipseInterpretationRequest(request);
    return this.http.post<EclipseInterpretationRequest, EclipseInterpretationResponse>(
      this.buildUrl('interpretation'),
      request,
      config,
    );
  }
}

