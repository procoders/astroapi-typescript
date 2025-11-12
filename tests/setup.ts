import { afterEach, beforeAll } from 'vitest';

beforeAll(() => {
  process.env.ASTROLOGY_API_BASE_URL ??= 'https://api.astrology-api.io';
});

afterEach(() => {
  vi.clearAllMocks();
});

