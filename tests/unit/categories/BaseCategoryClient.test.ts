import { describe, expect, it, vi } from 'vitest';

import { BaseCategoryClient } from '../../../src/categories/BaseCategoryClient';
import type { HttpHelper } from '../../../src/utils/http';

const createHttpHelper = (): HttpHelper =>
  ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  }) as unknown as HttpHelper;

class TestCategoryClient extends BaseCategoryClient {
  constructor(prefix: string) {
    super(createHttpHelper(), prefix);
  }

  build(...segments: Array<string | number | boolean | null | undefined>): string {
    return this.buildUrl(...segments);
  }

  buildWithCustomPrefix(
    prefix: string,
    ...segments: Array<string | number | boolean | null | undefined>
  ): string {
    return this.buildCustomUrl(prefix, ...segments);
  }
}

describe('BaseCategoryClient', () => {
  it('normalizes prefix and joins segments', () => {
    const client = new TestCategoryClient('/api/v3/demo/');
    expect(client.build('items', '/42/')).toBe('/api/v3/demo/items/42');
  });

  it('returns normalized prefix when no segments provided', () => {
    const client = new TestCategoryClient(' /api/v3/demo/ ');
    expect(client.build()).toBe('/api/v3/demo');
  });

  it('throws when constructed with prefix missing leading slash', () => {
    expect(() => new TestCategoryClient('api/v3/demo')).toThrow(
      'Invalid API prefix "api/v3/demo" provided to BaseCategoryClient',
    );
  });

  it('throws when constructed with blank prefix', () => {
    expect(() => new TestCategoryClient('   ')).toThrow(
      'Invalid API prefix "   " provided to BaseCategoryClient',
    );
  });

  it('throws when buildCustomUrl receives non-string prefix', () => {
    const client = new TestCategoryClient('/api/v3/demo');
    expect(() =>
      client.buildWithCustomPrefix(undefined as unknown as string, 'extra'),
    ).toThrow('Invalid API prefix "undefined" provided to BaseCategoryClient');
  });
});

