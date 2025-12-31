import type { AxiosRequestConfig } from 'axios';

import type {
  GlobalDataRequest,
  LunarMetricsRequest,
  PlanetaryPositionsRequest,
} from '../types/requests';
import type {
  AspectsResponse,
  CurrentMomentResponse,
  EnhancedAspectsResponse,
  EnhancedLunarMetricsResponse,
  EnhancedPositionsResponse,
  GlobalPositionsResponse,
  HouseCuspsResponse,
  LunarMetricsResponse,
  PlanetaryPositionsResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import { BaseCategoryClient } from './BaseCategoryClient';
import {
  validateDateTimeLocation,
  validateGlobalDataRequest,
  validateSubject,
} from '../utils/validators';

export class DataClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/data';

  constructor(http: HttpHelper) {
    super(http, DataClient.API_PREFIX);
  }

  async getPositions(
    request: PlanetaryPositionsRequest,
    config?: AxiosRequestConfig,
  ): Promise<PlanetaryPositionsResponse> {
    validateSubject(request.subject, 'PlanetaryPositionsRequest');
    return this.http.post<PlanetaryPositionsRequest, PlanetaryPositionsResponse>(
      this.buildUrl('positions'),
      request,
      config,
    );
  }

  async getEnhancedPositions(
    request: PlanetaryPositionsRequest,
    config?: AxiosRequestConfig,
  ): Promise<EnhancedPositionsResponse> {
    validateSubject(request.subject, 'EnhancedPositionsRequest');
    return this.http.post<PlanetaryPositionsRequest, EnhancedPositionsResponse>(
      this.buildUrl('positions', 'enhanced'),
      request,
      config,
    );
  }

  async getGlobalPositions(
    request: GlobalDataRequest,
    config?: AxiosRequestConfig,
  ): Promise<GlobalPositionsResponse> {
    validateGlobalDataRequest(request, 'GlobalDataRequest');
    return this.http.post<GlobalDataRequest, GlobalPositionsResponse>(
      this.buildUrl('global-positions'),
      request,
      config,
    );
  }

  async getAspects(
    request: PlanetaryPositionsRequest,
    config?: AxiosRequestConfig,
  ): Promise<AspectsResponse> {
    validateSubject(request.subject, 'AspectsRequest');
    return this.http.post<PlanetaryPositionsRequest, AspectsResponse>(
      this.buildUrl('aspects'),
      request,
      config,
    );
  }

  async getEnhancedAspects(
    request: PlanetaryPositionsRequest,
    config?: AxiosRequestConfig,
  ): Promise<EnhancedAspectsResponse> {
    validateSubject(request.subject, 'EnhancedAspectsRequest');
    return this.http.post<PlanetaryPositionsRequest, EnhancedAspectsResponse>(
      this.buildUrl('aspects', 'enhanced'),
      request,
      config,
    );
  }

  async getHouseCusps(
    request: PlanetaryPositionsRequest,
    config?: AxiosRequestConfig,
  ): Promise<HouseCuspsResponse> {
    validateSubject(request.subject, 'HouseCuspsRequest');
    return this.http.post<PlanetaryPositionsRequest, HouseCuspsResponse>(
      this.buildUrl('house-cusps'),
      request,
      config,
    );
  }

  async getLunarMetrics(
    request: LunarMetricsRequest,
    config?: AxiosRequestConfig,
  ): Promise<LunarMetricsResponse> {
    validateDateTimeLocation(request.datetime_location, 'LunarMetricsRequest.datetime_location');
    return this.http.post<LunarMetricsRequest, LunarMetricsResponse>(
      this.buildUrl('lunar-metrics'),
      request,
      config,
    );
  }

  async getEnhancedLunarMetrics(
    request: LunarMetricsRequest,
    config?: AxiosRequestConfig,
  ): Promise<EnhancedLunarMetricsResponse> {
    validateDateTimeLocation(
      request.datetime_location,
      'EnhancedLunarMetricsRequest.datetime_location',
    );
    return this.http.post<LunarMetricsRequest, EnhancedLunarMetricsResponse>(
      this.buildUrl('lunar-metrics', 'enhanced'),
      request,
      config,
    );
  }

  async getCurrentMoment(config?: AxiosRequestConfig): Promise<CurrentMomentResponse> {
    return this.http.get<CurrentMomentResponse>(this.buildUrl('now'), config);
  }
}

