import type { RequestConfig } from '../types/config';

import type {
  ChineseHoroscopeRequest,
  PersonalTextHoroscopeRequest,
  PersonalizedHoroscopeRequest,
  SunSignHoroscopeRequest,
  SunSignMonthlyHoroscopeRequest,
  SunSignWeeklyHoroscopeRequest,
  SunSignYearlyHoroscopeRequest,
  TextHoroscopeRequest,
  TextMonthlyHoroscopeRequest,
  TextWeeklyHoroscopeRequest,
} from '../types';
import type {
  ChineseHoroscopeResponse,
  HoroscopeTextResponse,
  PersonalDailyHoroscopeResponse,
  SunSignMonthlyHoroscopeResponse,
  SunSignWeeklyHoroscopeResponse,
  SunSignYearlyHoroscopeResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import { BaseCategoryClient } from './BaseCategoryClient';
import {
  validateChineseHoroscopeRequest,
  validatePersonalTextHoroscopeRequest,
  validatePersonalizedHoroscopeRequest,
  validateSunSignHoroscopeRequest,
  validateSunSignMonthlyHoroscopeRequest,
  validateSunSignWeeklyHoroscopeRequest,
  validateSunSignYearlyHoroscopeRequest,
  validateTextHoroscopeRequest,
  validateTextMonthlyHoroscopeRequest,
  validateTextWeeklyHoroscopeRequest,
} from '../utils/validators';

export class HoroscopeClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/horoscope';

  constructor(http: HttpHelper) {
    super(http, HoroscopeClient.API_PREFIX);
  }

  async getPersonalDailyHoroscope(
    request: PersonalizedHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<PersonalDailyHoroscopeResponse> {
    validatePersonalizedHoroscopeRequest(request);
    return this.http.post<PersonalizedHoroscopeRequest, PersonalDailyHoroscopeResponse>(
      this.buildUrl('personal', 'daily'),
      request,
      config,
    );
  }

  async getPersonalDailyHoroscopeText(
    request: PersonalTextHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<HoroscopeTextResponse> {
    validatePersonalTextHoroscopeRequest(request);
    return this.http.post<PersonalTextHoroscopeRequest, HoroscopeTextResponse>(
      this.buildUrl('personal', 'daily', 'text'),
      request,
      config,
    );
  }

  async getSignDailyHoroscope(
    request: SunSignHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<PersonalDailyHoroscopeResponse> {
    validateSunSignHoroscopeRequest(request);
    return this.http.post<SunSignHoroscopeRequest, PersonalDailyHoroscopeResponse>(
      this.buildUrl('sign', 'daily'),
      request,
      config,
    );
  }

  async getSignDailyHoroscopeText(
    request: TextHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<HoroscopeTextResponse> {
    validateTextHoroscopeRequest(request);
    return this.http.post<TextHoroscopeRequest, HoroscopeTextResponse>(
      this.buildUrl('sign', 'daily', 'text'),
      request,
      config,
    );
  }

  async getSignWeeklyHoroscope(
    request: SunSignWeeklyHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<SunSignWeeklyHoroscopeResponse> {
    validateSunSignWeeklyHoroscopeRequest(request);
    return this.http.post<SunSignWeeklyHoroscopeRequest, SunSignWeeklyHoroscopeResponse>(
      this.buildUrl('sign', 'weekly'),
      request,
      config,
    );
  }

  async getSignWeeklyHoroscopeText(
    request: TextWeeklyHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<HoroscopeTextResponse> {
    validateTextWeeklyHoroscopeRequest(request);
    return this.http.post<TextWeeklyHoroscopeRequest, HoroscopeTextResponse>(
      this.buildUrl('sign', 'weekly', 'text'),
      request,
      config,
    );
  }

  async getSignMonthlyHoroscope(
    request: SunSignMonthlyHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<SunSignMonthlyHoroscopeResponse> {
    validateSunSignMonthlyHoroscopeRequest(request);
    return this.http.post<SunSignMonthlyHoroscopeRequest, SunSignMonthlyHoroscopeResponse>(
      this.buildUrl('sign', 'monthly'),
      request,
      config,
    );
  }

  async getSignMonthlyHoroscopeText(
    request: TextMonthlyHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<HoroscopeTextResponse> {
    validateTextMonthlyHoroscopeRequest(request);
    return this.http.post<TextMonthlyHoroscopeRequest, HoroscopeTextResponse>(
      this.buildUrl('sign', 'monthly', 'text'),
      request,
      config,
    );
  }

  async getSignYearlyHoroscope(
    request: SunSignYearlyHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<SunSignYearlyHoroscopeResponse> {
    validateSunSignYearlyHoroscopeRequest(request);
    return this.http.post<SunSignYearlyHoroscopeRequest, SunSignYearlyHoroscopeResponse>(
      this.buildUrl('sign', 'yearly'),
      request,
      config,
    );
  }

  async getChineseHoroscope(
    request: ChineseHoroscopeRequest,
    config?: RequestConfig,
  ): Promise<ChineseHoroscopeResponse> {
    validateChineseHoroscopeRequest(request);
    return this.http.post<ChineseHoroscopeRequest, ChineseHoroscopeResponse>(
      this.buildUrl('chinese', 'bazi'),
      request,
      config,
    );
  }
}

