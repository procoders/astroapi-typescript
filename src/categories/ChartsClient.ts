import type { AxiosRequestConfig } from 'axios';

import type {
  CompositeChartRequest,
  DirectionRequest,
  LunarReturnRequest,
  LunarReturnTransitRequest,
  NatalChartRequest,
  NatalTransitRequest,
  ProgressionRequest,
  SolarReturnRequest,
  SolarReturnTransitRequest,
  SynastryChartRequest,
  TransitChartRequest,
} from '../types';
import type {
  CompositeChartResponse,
  DirectionChartResponse,
  LunarReturnChartResponse,
  LunarReturnTransitChartResponse,
  NatalChartResponse,
  NatalTransitChartResponse,
  ProgressionChartResponse,
  SolarReturnChartResponse,
  SolarReturnTransitChartResponse,
  SynastryChartResponse,
  TransitChartResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import { BaseCategoryClient } from './BaseCategoryClient';
import {
  validateArcRate,
  validateDateRange,
  validateDateTimeLocation,
  validateDirectionTypeValue,
  validateIsoDateString,
  validateOptionalDateRange,
  validateOptionalDateTimeLocation,
  validateOrbValue,
  validateProgressionTypeValue,
  validateReturnYear,
  validateSubject,
} from '../utils/validators';

export class ChartsClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/charts';

  constructor(http: HttpHelper) {
    super(http, ChartsClient.API_PREFIX);
  }

  async getNatalChart(
    request: NatalChartRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalChartResponse> {
    validateSubject(request.subject, 'NatalChartRequest.subject');
    return this.http.post<NatalChartRequest, NatalChartResponse>(
      this.buildUrl('natal'),
      request,
      config,
    );
  }

  async getCompositeChart(
    request: CompositeChartRequest,
    config?: AxiosRequestConfig,
  ): Promise<CompositeChartResponse> {
    validateSubject(request.subject1, 'CompositeChartRequest.subject1');
    validateSubject(request.subject2, 'CompositeChartRequest.subject2');
    return this.http.post<CompositeChartRequest, CompositeChartResponse>(
      this.buildUrl('composite'),
      request,
      config,
    );
  }

  async getSynastryChart(
    request: SynastryChartRequest,
    config?: AxiosRequestConfig,
  ): Promise<SynastryChartResponse> {
    validateSubject(request.subject1, 'SynastryChartRequest.subject1');
    validateSubject(request.subject2, 'SynastryChartRequest.subject2');
    return this.http.post<SynastryChartRequest, SynastryChartResponse>(
      this.buildUrl('synastry'),
      request,
      config,
    );
  }

  async getTransitChart(
    request: TransitChartRequest,
    config?: AxiosRequestConfig,
  ): Promise<TransitChartResponse> {
    validateSubject(request.natal_subject, 'TransitChartRequest.natal_subject');
    validateDateTimeLocation(request.transit_datetime, 'TransitChartRequest.transit_datetime');
    return this.http.post<TransitChartRequest, TransitChartResponse>(
      this.buildUrl('transit'),
      request,
      config,
    );
  }

  async getSolarReturnChart(
    request: SolarReturnRequest,
    config?: AxiosRequestConfig,
  ): Promise<SolarReturnChartResponse> {
    validateSubject(request.subject, 'SolarReturnRequest.subject');
    validateReturnYear(request.return_year, 'SolarReturnRequest.return_year');
    validateOptionalDateTimeLocation(request.return_location, 'SolarReturnRequest.return_location');
    return this.http.post<SolarReturnRequest, SolarReturnChartResponse>(
      this.buildUrl('solar-return'),
      request,
      config,
    );
  }

  async getLunarReturnChart(
    request: LunarReturnRequest,
    config?: AxiosRequestConfig,
  ): Promise<LunarReturnChartResponse> {
    validateSubject(request.subject, 'LunarReturnRequest.subject');
    validateIsoDateString(request.return_date, 'LunarReturnRequest.return_date');
    validateOptionalDateTimeLocation(request.return_location, 'LunarReturnRequest.return_location');
    return this.http.post<LunarReturnRequest, LunarReturnChartResponse>(
      this.buildUrl('lunar-return'),
      request,
      config,
    );
  }

  async getSolarReturnTransits(
    request: SolarReturnTransitRequest,
    config?: AxiosRequestConfig,
  ): Promise<SolarReturnTransitChartResponse> {
    validateSubject(request.subject, 'SolarReturnTransitRequest.subject');
    validateReturnYear(request.return_year, 'SolarReturnTransitRequest.return_year');
    validateOptionalDateTimeLocation(request.return_location, 'SolarReturnTransitRequest.return_location');
    validateDateRange(request.date_range, 'SolarReturnTransitRequest.date_range');
    validateOrbValue(request.orb, 'SolarReturnTransitRequest.orb');
    return this.http.post<SolarReturnTransitRequest, SolarReturnTransitChartResponse>(
      this.buildUrl('solar-return-transits'),
      request,
      config,
    );
  }

  async getLunarReturnTransits(
    request: LunarReturnTransitRequest,
    config?: AxiosRequestConfig,
  ): Promise<LunarReturnTransitChartResponse> {
    validateSubject(request.subject, 'LunarReturnTransitRequest.subject');
    validateIsoDateString(request.return_date, 'LunarReturnTransitRequest.return_date');
    validateOptionalDateTimeLocation(request.return_location, 'LunarReturnTransitRequest.return_location');
    validateDateRange(request.date_range, 'LunarReturnTransitRequest.date_range');
    validateOrbValue(request.orb, 'LunarReturnTransitRequest.orb');
    return this.http.post<LunarReturnTransitRequest, LunarReturnTransitChartResponse>(
      this.buildUrl('lunar-return-transits'),
      request,
      config,
    );
  }

  async getProgressions(
    request: ProgressionRequest,
    config?: AxiosRequestConfig,
  ): Promise<ProgressionChartResponse> {
    validateSubject(request.subject, 'ProgressionRequest.subject');
    validateIsoDateString(request.target_date, 'ProgressionRequest.target_date');
    validateProgressionTypeValue(request.progression_type, 'ProgressionRequest.progression_type');
    validateOptionalDateTimeLocation(request.location ?? undefined, 'ProgressionRequest.location');
    return this.http.post<ProgressionRequest, ProgressionChartResponse>(
      this.buildUrl('progressions'),
      request,
      config,
    );
  }

  async getDirections(
    request: DirectionRequest,
    config?: AxiosRequestConfig,
  ): Promise<DirectionChartResponse> {
    validateSubject(request.subject, 'DirectionRequest.subject');
    validateIsoDateString(request.target_date, 'DirectionRequest.target_date');
    validateDirectionTypeValue(request.direction_type, 'DirectionRequest.direction_type');
    validateArcRate(request.arc_rate, 'DirectionRequest.arc_rate');
    return this.http.post<DirectionRequest, DirectionChartResponse>(
      this.buildUrl('directions'),
      request,
      config,
    );
  }

  async getNatalTransits(
    request: NatalTransitRequest,
    config?: AxiosRequestConfig,
  ): Promise<NatalTransitChartResponse> {
    validateSubject(request.subject, 'NatalTransitRequest.subject');
    validateOptionalDateRange(request.date_range ?? undefined, 'NatalTransitRequest.date_range');
    validateOrbValue(request.orb, 'NatalTransitRequest.orb');
    return this.http.post<NatalTransitRequest, NatalTransitChartResponse>(
      this.buildUrl('natal-transits'),
      request,
      config,
    );
  }
}

