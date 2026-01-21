import type { RequestConfig } from '../types/config';

import {
  BaZiRequest,
  ChineseYearlyRequest,
  LuckPillarsRequest,
  MultipleSubjectsRequest,
  SingleSubjectRequest,
} from '../types/requests';
import {
  BaZiResponse,
  ChineseCompatibilityResponse,
  ChineseElementsResponse,
  ChineseSolarTermsResponse,
  ChineseYearlyForecastResponse,
  ChineseZodiacResponse,
  LuckPillarsResponse,
  MingGuaResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import { BaseCategoryClient } from './BaseCategoryClient';
import {
  normalizeChineseZodiacAnimal,
  validateBaZiRequest,
  validateChineseCompatibilityRequest,
  validateChineseSolarTermsParams,
  validateChineseSolarTermsYear,
  validateChineseYearElementsParams,
  validateChineseYearElementsYear,
  validateChineseYearlyRequest,
  validateChineseZodiacParams,
  validateLuckPillarsRequest,
  validateMingGuaRequest,
} from '../utils/validators';

type ChineseYearElementsParams = Parameters<typeof validateChineseYearElementsParams>[0];
type ChineseSolarTermsParams = Parameters<typeof validateChineseSolarTermsParams>[0];
type ChineseZodiacParams = Parameters<typeof validateChineseZodiacParams>[0];

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

export class ChineseClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/chinese';

  constructor(http: HttpHelper) {
    super(http, ChineseClient.API_PREFIX);
  }

  async calculateBaZi(request: BaZiRequest, config?: RequestConfig): Promise<BaZiResponse> {
    validateBaZiRequest(request);
    return this.http.post<BaZiRequest, BaZiResponse>(this.buildUrl('bazi'), request, config);
  }

  async calculateCompatibility(
    request: MultipleSubjectsRequest,
    config?: RequestConfig,
  ): Promise<ChineseCompatibilityResponse> {
    validateChineseCompatibilityRequest(request);
    return this.http.post<MultipleSubjectsRequest, ChineseCompatibilityResponse>(
      this.buildUrl('compatibility'),
      request,
      config,
    );
  }

  async calculateLuckPillars(
    request: LuckPillarsRequest,
    config?: RequestConfig,
  ): Promise<LuckPillarsResponse> {
    validateLuckPillarsRequest(request);
    return this.http.post<LuckPillarsRequest, LuckPillarsResponse>(
      this.buildUrl('luck-pillars'),
      request,
      config,
    );
  }

  async calculateMingGua(
    request: SingleSubjectRequest,
    config?: RequestConfig,
  ): Promise<MingGuaResponse> {
    validateMingGuaRequest(request);
    return this.http.post<SingleSubjectRequest, MingGuaResponse>(
      this.buildUrl('ming-gua'),
      request,
      config,
    );
  }

  async getYearlyForecast(
    request: ChineseYearlyRequest,
    config?: RequestConfig,
  ): Promise<ChineseYearlyForecastResponse> {
    validateChineseYearlyRequest(request);
    return this.http.post<ChineseYearlyRequest, ChineseYearlyForecastResponse>(
      this.buildUrl('yearly-forecast'),
      request,
      config,
    );
  }

  async analyzeYearElements(
    year: number,
    params?: ChineseYearElementsParams,
    config?: RequestConfig,
  ): Promise<ChineseElementsResponse> {
    validateChineseYearElementsYear(year);
    const normalizedParams = validateChineseYearElementsParams(params);
    const requestConfig = mergeConfigWithParams(config, normalizedParams);

    return this.http.get<ChineseElementsResponse>(
      this.buildUrl('elements', 'balance', year),
      requestConfig,
    );
  }

  async getSolarTerms(
    year: number,
    params?: ChineseSolarTermsParams,
    config?: RequestConfig,
  ): Promise<ChineseSolarTermsResponse> {
    validateChineseSolarTermsYear(year);
    const normalizedParams = validateChineseSolarTermsParams(params);
    const requestConfig = mergeConfigWithParams(config, normalizedParams);

    return this.http.get<ChineseSolarTermsResponse>(
      this.buildUrl('calendar', 'solar-terms', year),
      requestConfig,
    );
  }

  async getZodiacAnimal(
    animal: string,
    params?: ChineseZodiacParams,
    config?: RequestConfig,
  ): Promise<ChineseZodiacResponse> {
    const normalizedAnimal = normalizeChineseZodiacAnimal(animal);
    validateChineseZodiacParams(params);
    const requestConfig = mergeConfigWithParams(config, params ?? undefined);

    return this.http.get<ChineseZodiacResponse>(
      this.buildUrl('zodiac', normalizedAnimal),
      requestConfig,
    );
  }
}

