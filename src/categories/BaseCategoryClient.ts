import type { HttpHelper } from '../utils/http';

type UrlSegment = string | number | boolean;

export abstract class BaseCategoryClient {
  private readonly prefix: string;

  protected constructor(protected readonly http: HttpHelper, apiPrefix: string) {
    this.prefix = BaseCategoryClient.ensurePrefix(apiPrefix);
  }

  protected buildUrl(...segments: Array<UrlSegment | null | undefined>): string {
    return BaseCategoryClient.joinUrl(this.prefix, segments);
  }

  protected buildCustomUrl(
    prefix: string,
    ...segments: Array<UrlSegment | null | undefined>
  ): string {
    const normalizedPrefix = BaseCategoryClient.ensurePrefix(prefix);
    return BaseCategoryClient.joinUrl(normalizedPrefix, segments);
  }

  private static ensurePrefix(prefix: string): string {
    if (!BaseCategoryClient.isValidPrefix(prefix)) {
      throw new Error(`Invalid API prefix "${prefix}" provided to BaseCategoryClient`);
    }

    return BaseCategoryClient.normalizePrefix(prefix);
  }

  private static joinUrl(prefix: string, segments: Array<UrlSegment | null | undefined>): string {
    const normalizedSegments = segments
      .filter((segment): segment is UrlSegment => segment !== undefined && segment !== null)
      .map((segment) => BaseCategoryClient.stripSlashes(String(segment)));

    if (normalizedSegments.length === 0) {
      return prefix;
    }

    return `${prefix}/${normalizedSegments.join('/')}`;
  }

  private static isValidPrefix(prefix: string | undefined): prefix is string {
    if (typeof prefix !== 'string') {
      return false;
    }

    const trimmed = prefix.trim();
    if (trimmed.length === 0) {
      return false;
    }

    return trimmed.startsWith('/');
  }

  private static normalizePrefix(prefix: string): string {
    const trimmed = prefix.trim();
    const withoutLeading = trimmed.replace(/^\/+/g, '');
    return `/${withoutLeading}`.replace(/\/+$/g, '');
  }

  private static stripSlashes(segment: string): string {
    return segment.replace(/(^\/+|\/+$)/g, '');
  }
}

