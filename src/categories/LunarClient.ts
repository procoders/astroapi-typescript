import type { RequestConfig } from '../types/config';

import {
  LunarCalendarParams,
  LunarEventsRequest,
  LunarMansionsRequest,
  LunarPhasesRequest,
  VoidOfCourseRequest,
} from '../types/requests';
import {
  LunarCalendarResponse,
  LunarEventsResponse,
  LunarMansionsResponse,
  LunarPhasesResponse,
  VoidOfCourseResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import {
  validateLunarCalendarParams,
  validateLunarCalendarYear,
  validateLunarEventsRequest,
  validateLunarMansionsRequest,
  validateLunarPhasesRequest,
  validateVoidOfCourseRequest,
} from '../utils/validators';
import { BaseCategoryClient } from './BaseCategoryClient';

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

export class LunarClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/lunar';

  constructor(http: HttpHelper) {
    super(http, LunarClient.API_PREFIX);
  }

  async getPhases(
    request: LunarPhasesRequest,
    config?: RequestConfig,
  ): Promise<LunarPhasesResponse> {
    validateLunarPhasesRequest(request);
    return this.http.post<LunarPhasesRequest, LunarPhasesResponse>(
      this.buildUrl('phases'),
      request,
      config,
    );
  }

  async getEvents(
    request: LunarEventsRequest,
    config?: RequestConfig,
  ): Promise<LunarEventsResponse> {
    validateLunarEventsRequest(request);
    return this.http.post<LunarEventsRequest, LunarEventsResponse>(
      this.buildUrl('events'),
      request,
      config,
    );
  }

  async getMansions(
    request: LunarMansionsRequest,
    config?: RequestConfig,
  ): Promise<LunarMansionsResponse> {
    validateLunarMansionsRequest(request);
    return this.http.post<LunarMansionsRequest, LunarMansionsResponse>(
      this.buildUrl('mansions'),
      request,
      config,
    );
  }

  async getVoidOfCourse(
    request: VoidOfCourseRequest,
    config?: RequestConfig,
  ): Promise<VoidOfCourseResponse> {
    validateVoidOfCourseRequest(request);
    return this.http.post<VoidOfCourseRequest, VoidOfCourseResponse>(
      this.buildUrl('void-of-course'),
      request,
      config,
    );
  }

  async getCalendar(
    year: number,
    params?: LunarCalendarParams,
    config?: RequestConfig,
  ): Promise<LunarCalendarResponse> {
    validateLunarCalendarYear(year);
    const normalizedParams = validateLunarCalendarParams(params);
    const requestConfig = mergeConfigWithParams(
      config,
      normalizedParams as Record<string, string | number | boolean | null | undefined> | undefined,
    );

    return this.http.get<LunarCalendarResponse>(this.buildUrl('calendar', year), requestConfig);
  }
}

