import { afterEach, beforeAll, beforeEach, vi } from 'vitest';
import { mockFetch } from './utils/mockFetch';

beforeAll(() => {
  process.env.ASTROLOGY_API_BASE_URL ??= 'https://api.astrology-api.io';
});

beforeEach(() => {
  mockFetch.install();
});

afterEach(() => {
  mockFetch.restore();
  vi.clearAllMocks();
});
