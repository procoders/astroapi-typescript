import { describe, it, expect, afterEach } from 'vitest';
import { FetchHttpClient } from '../../../src/utils/fetchClient';
import { FetchHttpHelper } from '../../../src/utils/http';
import { mockFetch } from '../../utils/mockFetch';

describe('FetchHttpHelper', () => {
  afterEach(() => {
    mockFetch.reset();
  });

  it('wraps put and delete requests and normalizes responses', async () => {
    const client = new FetchHttpClient({
      baseURL: 'https://api.test.com',
      timeout: 5000,
    });

    const helper = new FetchHttpHelper(
      client,
      <T>(payload: unknown): T => {
        if (payload && typeof payload === 'object' && 'data' in (payload as Record<string, unknown>)) {
          return (payload as { data: T }).data;
        }
        return payload as T;
      },
    );

    mockFetch.onPut('/resource/1').reply(200, { data: { updated: true } });
    mockFetch.onDelete('/resource/1').reply(200, { data: { deleted: true } });

    await expect(helper.put('/resource/1', { value: 1 })).resolves.toEqual({ updated: true });
    await expect(helper.delete('/resource/1')).resolves.toEqual({ deleted: true });

    expect(mockFetch.history.put).toHaveLength(1);
    expect(mockFetch.history.delete).toHaveLength(1);
  });
});
