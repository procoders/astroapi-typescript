import type { AxiosRequestConfig } from 'axios';

import {
  ActivePointsQuery,
  CitySearchParams,
  HousesRequest,
  KeywordsRequest,
  LifeAreasRequest,
  PrimaryActivePointsQuery,
} from '../types/requests';
import {
  ActivePointsResponse,
  CountriesResponse,
  ElementsResponse,
  FixedStarsResponse,
  HouseSystemsResponse,
  HousesResponse,
  KeywordsResponse,
  LanguagesResponse,
  LifeAreasResponse,
  PaginatedResponse,
  ThemesResponse,
  ZodiacTypesResponse,
  CityDetails,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import { BaseCategoryClient } from './BaseCategoryClient';
import {
  validateActivePointsQuery,
  validateCitySearchParams,
  validateHousesRequest,
  validateKeywordsRequest,
  validateLifeAreasRequest,
  validatePrimaryActivePointsQuery,
} from '../utils/validators';

export class GlossaryClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/glossary';

  constructor(http: HttpHelper) {
    super(http, GlossaryClient.API_PREFIX);
  }

  async getActivePoints(
    query?: ActivePointsQuery,
    config?: AxiosRequestConfig,
  ): Promise<ActivePointsResponse> {
    validateActivePointsQuery(query);
    const requestConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...(config?.params ?? {}),
        ...(query?.type ? { type: query.type } : {}),
      },
    };

    return this.http.get<ActivePointsResponse>(this.buildUrl('active-points'), requestConfig);
  }

  async getPrimaryActivePoints(
    query?: PrimaryActivePointsQuery,
    config?: AxiosRequestConfig,
  ): Promise<ActivePointsResponse> {
    validatePrimaryActivePointsQuery(query);
    const requestConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...(config?.params ?? {}),
        ...(query?.type ? { type: query.type } : {}),
      },
    };

    return this.http.get<ActivePointsResponse>(
      this.buildUrl('active-points', 'primary'),
      requestConfig,
    );
  }

  async getCities(
    params: CitySearchParams = {},
    config?: AxiosRequestConfig,
  ): Promise<PaginatedResponse<CityDetails>> {
    validateCitySearchParams(params);
    const requestConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...(config?.params ?? {}),
        ...params,
      },
    };

    return this.http.get<PaginatedResponse<CityDetails>>(this.buildUrl('cities'), requestConfig);
  }

  async getCountries(config?: AxiosRequestConfig): Promise<CountriesResponse> {
    return this.http.get<CountriesResponse>(this.buildUrl('countries'), config);
  }

  async getElements(config?: AxiosRequestConfig): Promise<ElementsResponse> {
    return this.http.get<ElementsResponse>(this.buildUrl('elements'), config);
  }

  async getFixedStars(config?: AxiosRequestConfig): Promise<FixedStarsResponse> {
    return this.http.get<FixedStarsResponse>(this.buildUrl('fixed-stars'), config);
  }

  async getHouseSystems(config?: AxiosRequestConfig): Promise<HouseSystemsResponse> {
    return this.http.get<HouseSystemsResponse>(this.buildUrl('house-systems'), config);
  }

  async getHouses(request?: HousesRequest, config?: AxiosRequestConfig): Promise<HousesResponse> {
    validateHousesRequest(request);
    const requestConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...(config?.params ?? {}),
        ...(request?.house_system ? { house_system: request.house_system } : {}),
      },
    };

    return this.http.get<HousesResponse>(this.buildUrl('houses'), requestConfig);
  }

  async getKeywords(request?: KeywordsRequest, config?: AxiosRequestConfig): Promise<KeywordsResponse> {
    validateKeywordsRequest(request);
    const requestConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...(config?.params ?? {}),
        ...(request?.category ? { category: request.category } : {}),
      },
    };

    return this.http.get<KeywordsResponse>(this.buildUrl('keywords'), requestConfig);
  }

  async getLanguages(config?: AxiosRequestConfig): Promise<LanguagesResponse> {
    return this.http.get<LanguagesResponse>(this.buildUrl('languages'), config);
  }

  async getLifeAreas(request?: LifeAreasRequest, config?: AxiosRequestConfig): Promise<LifeAreasResponse> {
    validateLifeAreasRequest(request);
    const requestConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...(config?.params ?? {}),
        ...(request?.language ? { language: request.language } : {}),
      },
    };

    return this.http.get<LifeAreasResponse>(this.buildUrl('life-areas'), requestConfig);
  }

  async getThemes(config?: AxiosRequestConfig): Promise<ThemesResponse> {
    return this.http.get<ThemesResponse>(this.buildUrl('themes'), config);
  }

  async getZodiacTypes(config?: AxiosRequestConfig): Promise<ZodiacTypesResponse> {
    return this.http.get<ZodiacTypesResponse>(this.buildUrl('zodiac-types'), config);
  }
}

