import type { AxiosRequestConfig } from 'axios';

import type {
  CompositeChartSVGRequest,
  NatalChartSVGRequest,
  SynastryChartSVGRequest,
  TransitChartSVGRequest,
} from '../types/requests';
import type { SvgString } from '../types/responses';
import type { HttpHelper } from '../utils/http';
import {
  validateCompositeChartSvgRequest,
  validateNatalChartSvgRequest,
  validateSynastryChartSvgRequest,
  validateTransitChartSvgRequest,
} from '../utils/validators';
import { BaseCategoryClient } from './BaseCategoryClient';

export class SvgClient extends BaseCategoryClient {
  private static readonly API_PREFIX = '/api/v3/svg';

  constructor(http: HttpHelper) {
    super(http, SvgClient.API_PREFIX);
  }

  private ensureSvgResponseConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    if (!config) {
      return { responseType: 'text' };
    }

    if (config.responseType) {
      return config;
    }

    return { ...config, responseType: 'text' };
  }

  async getNatalChartSvg(
    request: NatalChartSVGRequest,
    config?: AxiosRequestConfig,
  ): Promise<SvgString> {
    validateNatalChartSvgRequest(request);
    const requestConfig = this.ensureSvgResponseConfig(config);
    return this.http.post<NatalChartSVGRequest, SvgString>(
      this.buildUrl('natal'),
      request,
      requestConfig,
    );
  }

  async getSynastryChartSvg(
    request: SynastryChartSVGRequest,
    config?: AxiosRequestConfig,
  ): Promise<SvgString> {
    validateSynastryChartSvgRequest(request);
    const requestConfig = this.ensureSvgResponseConfig(config);
    return this.http.post<SynastryChartSVGRequest, SvgString>(
      this.buildUrl('synastry'),
      request,
      requestConfig,
    );
  }

  async getCompositeChartSvg(
    request: CompositeChartSVGRequest,
    config?: AxiosRequestConfig,
  ): Promise<SvgString> {
    validateCompositeChartSvgRequest(request);
    const requestConfig = this.ensureSvgResponseConfig(config);
    return this.http.post<CompositeChartSVGRequest, SvgString>(
      this.buildUrl('composite'),
      request,
      requestConfig,
    );
  }

  async getTransitChartSvg(
    request: TransitChartSVGRequest,
    config?: AxiosRequestConfig,
  ): Promise<SvgString> {
    validateTransitChartSvgRequest(request);
    const requestConfig = this.ensureSvgResponseConfig(config);
    return this.http.post<TransitChartSVGRequest, SvgString>(
      this.buildUrl('transit'),
      request,
      requestConfig,
    );
  }
}

