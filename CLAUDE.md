# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeScript SDK (`@procoders/astrology-api-client`) for the Astrology API v3.0.0. The OpenAPI spec is cached locally in `docs-openapi.json`.

- **Runtime**: Node.js 22+ (ES modules)
- **HTTP layer**: Axios with request/response interceptors, automatic retry with backoff
- **Tests**: Vitest with 100% coverage enforced
- **Build**: tsup emitting ESM (.js) + CJS (.cjs)

## Commands

```bash
npm run build           # Build with tsup
npm run lint            # ESLint check
npm run lint:fix        # ESLint with auto-fix
npm run test            # Vitest watch mode
npm run test:coverage   # Vitest with V8 coverage (enforced at 100%)
npm run generate:types  # Regenerate types from docs-openapi.json
```

Run a single test file:
```bash
npx vitest run tests/unit/client.test.ts
```

Run tests matching a pattern:
```bash
npx vitest run -t "should retry"
```

## Architecture

### Client Structure

`AstrologyClient` ([src/client.ts](src/client.ts)) is the entry point. It creates an Axios instance with interceptors for:
- API key injection (`X-API-Key` header)
- Debug logging
- Automatic retry on 429/500/502/503/504 and network errors
- Response unwrapping (extracts `data` or `result` from response payloads)

### Category Sub-Clients

Each API family has a dedicated client in [src/categories/](src/categories/) that extends `BaseCategoryClient`:

| Sub-client | API Prefix | File |
|------------|-----------|------|
| `data` | `/api/v3/data` | DataClient.ts |
| `charts` | `/api/v3/charts` | ChartsClient.ts |
| `horoscope` | `/api/v3/horoscope` | HoroscopeClient.ts |
| `analysis` | `/api/v3/analysis` | AnalysisClient.ts |
| `glossary` | `/api/v3/glossary` | GlossaryClient.ts |
| `astrocartography` | `/api/v3/astrocartography` | AstrocartographyClient.ts |
| `chinese` | `/api/v3/chinese` | ChineseClient.ts |
| `eclipses` | `/api/v3/eclipses` | EclipsesClient.ts |
| `lunar` | `/api/v3/lunar` | LunarClient.ts |
| `numerology` | `/api/v3/numerology` | NumerologyClient.ts |
| `tarot` | `/api/v3/tarot` | TarotClient.ts |
| `traditional` | `/api/v3/traditional` | TraditionalClient.ts |
| `fixedStars` | `/api/v3/fixed-stars` | FixedStarsClient.ts |
| `insights` | `/api/v3/insights` | InsightsClient.ts |
| `svg` | `/api/v3/svg` | SvgClient.ts |
| `enhanced` | `/api/v3/enhanced*` | EnhancedClient.ts |

`BaseCategoryClient` ([src/categories/BaseCategoryClient.ts](src/categories/BaseCategoryClient.ts)) provides `buildUrl()` for consistent URL construction with the API prefix.

### HTTP Helper

`HttpHelper` interface and `AxiosHttpHelper` implementation ([src/utils/http.ts](src/utils/http.ts)) abstract HTTP operations (`get`, `post`) and handle response normalization. Category clients use this instead of raw Axios.

### Types

- [src/types/generated/api.ts](src/types/generated/api.ts) - Auto-generated from OpenAPI spec
- [src/types/config.ts](src/types/config.ts) - Client configuration types
- [src/types/requests.ts](src/types/requests.ts) - Request payload types
- [src/types/responses.ts](src/types/responses.ts) - Response types

### Error Handling

`AstrologyError` ([src/errors/AstrologyError.ts](src/errors/AstrologyError.ts)) normalizes Axios errors and provides a consistent error interface with status codes and messages.

## Testing Guidelines

- Tests live in [tests/unit/](tests/unit/) mirroring source structure
- Use `axios-mock-adapter` for HTTP mocks (setup in [tests/setup.ts](tests/setup.ts))
- Shared mock responses in [tests/mocks/responses.ts](tests/mocks/responses.ts)
- Coverage must remain at 100% - add tests instead of lowering thresholds

## Adding New Endpoints

1. Check `docs-openapi.json` for the endpoint schema
2. Add or update request/response types in [src/types/](src/types/)
3. Implement method in the appropriate category client (or create new client if needed)
4. Export new types via [src/types/index.ts](src/types/index.ts) and [src/index.ts](src/index.ts)
5. Add tests maintaining 100% coverage
6. Run `npm run lint && npm run test:coverage` before completing

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RAPIDAPI_KEY` | RapidAPI key (auto-injected if not passed to constructor) |
| `RAPIDAPI_HOST` | Override the default RapidAPI host |
| `ASTROLOGY_API_BASE_URL` | Override the full API base URL |
| `ASTROLOGY_DEBUG` | Set to `true` to enable debug logging |
