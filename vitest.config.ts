import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'src/types/**', 'src/index.ts', 'src/utils/validators.ts'],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
    clearMocks: true,
    restoreMocks: true,
    setupFiles: ['./tests/setup.ts'],
    alias: {
      '@src': '/Users/serslon/Projects/Procoders/Astrology TS/src',
    },
  },
});

