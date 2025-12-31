import type { AxiosRequestConfig } from 'axios';

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
    config?: AxiosRequestConfig,
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
    config?: AxiosRequestConfig,
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
    config?: AxiosRequestConfig,
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
    config?: AxiosRequestConfig,
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
    config?: AxiosRequestConfig,
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
    config?: AxiosRequestConfig,
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
    config?: AxiosRequestConfig,
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
    config?: AxiosRequestConfig,
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
    config?: AxiosRequestConfig,
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
    config?: AxiosRequestConfig,
  ): Promise<ChineseHoroscopeResponse> {
    validateChineseHoroscopeRequest(request);
    return this.http.post<ChineseHoroscopeRequest, ChineseHoroscopeResponse>(
      this.buildUrl('chinese', 'bazi'),
      request,
      config,
    );
  }
}

