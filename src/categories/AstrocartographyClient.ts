import type { RequestConfig } from '../types/config';

import {
  AstrocartographyLinesRequest,
  AstrocartographyMapRequest,
  CompareLocationsRequest,
  LocationAnalysisRequest,
  ParanMapRequest,
  PowerZonesRequest,
  RelocationChartRequest,
  SearchLocationsRequest,
} from '../types/requests';
import {
  AstrocartographyLinesResponse,
  AstrocartographyMapResponse,
  CompareLocationsResponse,
  LineMeaningsResponse,
  LocationAnalysisResponse,
  ParanMapResponse,
  PowerZonesResponse,
  RelocationChartResponse,
  SearchLocationsResponse,
  SupportedFeaturesResponse,
} from '../types/responses';
import type { HttpHelper } from '../utils/http';
import { BaseCategoryClient } from './BaseCategoryClient';
import {
  validateAstrocartographyLinesRequest,
  validateAstrocartographyMapRequest,
  validateCompareLocationsRequest,
  validateLocationAnalysisRequest,
  validateParanMapRequest,
  validatePowerZonesRequest,
  validateRelocationChartRequest,
  validateSearchLocationsRequest,
} from '../utils/validators';

export class AstrocartographyClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/astrocartography';

  constructor(http: HttpHelper) {
    super(http, AstrocartographyClient.API_PREFIX);
  }

  async getLines(
    request: AstrocartographyLinesRequest,
    config?: RequestConfig,
  ): Promise<AstrocartographyLinesResponse> {
    validateAstrocartographyLinesRequest(request);
    return this.http.post<AstrocartographyLinesRequest, AstrocartographyLinesResponse>(
      this.buildUrl('lines'),
      request,
      config,
    );
  }

  async generateMap(
    request: AstrocartographyMapRequest,
    config?: RequestConfig,
  ): Promise<AstrocartographyMapResponse> {
    validateAstrocartographyMapRequest(request);
    return this.http.post<AstrocartographyMapRequest, AstrocartographyMapResponse>(
      this.buildUrl('map'),
      request,
      config,
    );
  }

  async generateParanMap(
    request: ParanMapRequest,
    config?: RequestConfig,
  ): Promise<ParanMapResponse> {
    validateParanMapRequest(request);
    return this.http.post<ParanMapRequest, ParanMapResponse>(
      this.buildUrl('paran-map'),
      request,
      config,
    );
  }

  async analyzeLocation(
    request: LocationAnalysisRequest,
    config?: RequestConfig,
  ): Promise<LocationAnalysisResponse> {
    validateLocationAnalysisRequest(request);
    return this.http.post<LocationAnalysisRequest, LocationAnalysisResponse>(
      this.buildUrl('location-analysis'),
      request,
      config,
    );
  }

  async compareLocations(
    request: CompareLocationsRequest,
    config?: RequestConfig,
  ): Promise<CompareLocationsResponse> {
    validateCompareLocationsRequest(request);
    return this.http.post<CompareLocationsRequest, CompareLocationsResponse>(
      this.buildUrl('compare-locations'),
      request,
      config,
    );
  }

  async findPowerZones(
    request: PowerZonesRequest,
    config?: RequestConfig,
  ): Promise<PowerZonesResponse> {
    validatePowerZonesRequest(request);
    return this.http.post<PowerZonesRequest, PowerZonesResponse>(
      this.buildUrl('power-zones'),
      request,
      config,
    );
  }

  async searchLocations(
    request: SearchLocationsRequest,
    config?: RequestConfig,
  ): Promise<SearchLocationsResponse> {
    validateSearchLocationsRequest(request);
    return this.http.post<SearchLocationsRequest, SearchLocationsResponse>(
      this.buildUrl('search-locations'),
      request,
      config,
    );
  }

  async generateRelocationChart(
    request: RelocationChartRequest,
    config?: RequestConfig,
  ): Promise<RelocationChartResponse> {
    validateRelocationChartRequest(request);
    return this.http.post<RelocationChartRequest, RelocationChartResponse>(
      this.buildUrl('relocation-chart'),
      request,
      config,
    );
  }

  async getLineMeanings(config?: RequestConfig): Promise<LineMeaningsResponse> {
    return this.http.get<LineMeaningsResponse>(this.buildUrl('line-meanings'), config);
  }

  async getSupportedFeatures(config?: RequestConfig): Promise<SupportedFeaturesResponse> {
    return this.http.get<SupportedFeaturesResponse>(this.buildUrl('supported-features'), config);
  }
}
