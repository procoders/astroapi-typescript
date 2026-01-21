import { FetchHttpClient } from '../../src/utils/fetchClient';
import { FetchHttpHelper, type HttpHelper } from '../../src/utils/http';

const DEFAULT_BASE_URL = 'https://api.astrology-api.io';

export const createTestHttpHelper = (): HttpHelper => {
  const client = new FetchHttpClient({
    baseURL: process.env.ASTROLOGY_API_BASE_URL ?? DEFAULT_BASE_URL,
    timeout: 10000,
  });

  const normalizePayload = <T>(payload: unknown): T => {
    if (payload && typeof payload === 'object') {
      const record = payload as Record<string, unknown>;
      if (record.data !== undefined) {
        return record.data as T;
      }
      if (record.result !== undefined) {
        return record.result as T;
      }
    }
    return payload as T;
  };

  return new FetchHttpHelper(client, normalizePayload);
};
