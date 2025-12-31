import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, expect } from 'vitest';

import { AxiosHttpHelper } from '../../../src/utils/http';

describe('AxiosHttpHelper', () => {
  it('wraps put and delete requests and normalizes responses', async () => {
    const axiosInstance = axios.create();
    const mock = new MockAdapter(axiosInstance);
    const helper = new AxiosHttpHelper(
      axiosInstance,
      <T>(payload: unknown): T => {
        if (payload && typeof payload === 'object' && 'data' in (payload as Record<string, unknown>)) {
          return (payload as { data: T }).data;
        }
        return payload as T;
      },
    );

    mock.onPut('/resource/1').reply(200, { data: { updated: true } });
    mock.onDelete('/resource/1').reply(200, { data: { deleted: true } });

    await expect(helper.put('/resource/1', { value: 1 })).resolves.toEqual({ updated: true });
    await expect(helper.delete('/resource/1')).resolves.toEqual({ deleted: true });

    expect(mock.history.put).toHaveLength(1);
    expect(mock.history.delete).toHaveLength(1);
  });
});

