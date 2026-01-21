## Astrology API TypeScript SDK

[![CI](https://github.com/procoders/astrology-typescript/actions/workflows/ci.yml/badge.svg)](https://github.com/procoders/astrology-typescript/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@procoders/astrology-api-client.svg)](https://www.npmjs.com/package/@procoders/astrology-api-client)
[![npm downloads](https://img.shields.io/npm/dm/@procoders/astrology-api-client.svg)](https://www.npmjs.com/package/@procoders/astrology-api-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Type-safe Node.js client for the [Astrology API v3.2.10](https://api.astrology-api.io/rapidoc). The package ships as an ESM build, exposes a modular architecture with dedicated sub-clients per endpoint family, and enforces 100 % test coverage. Publish-ready as `@procoders/astrology-api-client`.

### Highlights
- Axios-powered HTTP layer with retry/backoff, header normalization, and response unwrapping
- Strong TypeScript types generated from the local OpenAPI spec (`docs-openapi.json`)
- Exhaustive runtime validation via `src/utils/validators.ts` to prevent invalid API calls
- Rich category coverage: data, charts, horoscopes, analysis, astrocartography, insights, SVG, enhanced traditional analytics, and more
- Debug-friendly logging pipeline with configurable logger and opt-in verbosity

### Installation
```bash
npm install @procoders/astrology-api-client
```

### Usage

#### ES Modules
```ts
import { AstrologyClient } from '@procoders/astrology-api-client';
```

#### CommonJS
```js
const { AstrologyClient } = require('@procoders/astrology-api-client');
```

### Environment Variables
| Variable | Required | Description |
| --- | --- | --- |
| `ASTROLOGY_API_KEY` | **required** | Your API key for Bearer token authentication |
| `ASTROLOGY_API_BASE_URL` | optional | Override the full API base URL (default: https://api.astrology-api.io) |
| `ASTROLOGY_DEBUG` | optional | Set to `true` to enable debug logging |
| `RUN_ASTROLOGY_EXAMPLE` | optional | Set to `true` to execute `examples/usage.ts` |

### Client Architecture
```ts
import { AstrologyClient } from '@procoders/astrology-api-client';

const client = new AstrologyClient({
  apiKey: 'your-api-key-here', // or set ASTROLOGY_API_KEY env var
  retry: { attempts: 2, delayMs: 250 },
  debug: process.env.ASTROLOGY_DEBUG === 'true',
});

// Category sub-clients
client.data.getPositions(...);
client.charts.getNatalChart(...);
client.analysis.getNatalReport(...);
client.horoscope.getPersonalDailyHoroscope(...);
client.insights.relationship.getCompatibility(...);
client.svg.getNatalChartSvg(...);
client.enhanced.getGlobalAnalysis(...);
```

| Sub-client | Path prefix | Sample methods |
| --- | --- | --- |
| `data` | `/api/v3/data` | `getPositions`, `getGlobalPositions`, `getLunarMetrics` |
| `charts` | `/api/v3/charts` | `getNatalChart`, `getTransitChart`, `getSolarReturnChart` |
| `horoscope` | `/api/v3/horoscope` | `getPersonalDailyHoroscope`, `getSignWeeklyHoroscopeText` |
| `analysis` | `/api/v3/analysis` | `getSynastryReport`, `getCompatibilityAnalysis`, `getProgressionReport` |
| `glossary` | `/api/v3/glossary` | `getCities`, `getActivePoints`, `getHouseSystems` |
| `astrocartography` | `/api/v3/astrocartography` | `getLines`, `getMap`, `getRelocationChart` |
| `chinese` | `/api/v3/chinese` | `getBaZi`, `getYearlyForecast`, `getCompatibility` |
| `eclipses` | `/api/v3/eclipses` | `getUpcoming`, `getNatalCheck`, `getInterpretation` |
| `lunar` | `/api/v3/lunar` | `getCalendar`, `getPhases`, `getVoidOfCourse` |
| `numerology` | `/api/v3/numerology` | `getCoreNumbers`, `getComprehensiveReport`, `getCompatibility` |
| `tarot` | `/api/v3/tarot` | `drawCards`, `getTreeOfLife`, `getTimingAnalysis` |
| `traditional` | `/api/v3/traditional` | `getAnalysis`, `getAnnualProfection`, `getLots` |
| `fixedStars` | `/api/v3/fixed-stars` | `getPositions`, `getConjunctions`, `getReport` |
| `insights` | `/api/v3/insights` | relationship/pet/wellness/financial/business suites |
| `svg` | `/api/v3/svg` | `getNatalChartSvg`, `getSynastryChartSvg`, `getTransitChartSvg` |
| `enhanced` | `/api/v3/enhanced*` | `getGlobalAnalysis`, `getPersonalAnalysis`, chart variants |

Each category client inherits from a shared base that enforces the API prefix contract and provides a consistent `buildUrl` helper, so request construction stays uniform across the SDK.

### Category Examples
```ts
// Data: planetary positions
const subject = {
  name: 'Demo User',
  birth_data: {
    year: 1990,
    month: 5,
    day: 11,
    hour: 18,
    minute: 15,
    city: 'London',
    country_code: 'GB',
  },
};
const subjectA = subject;
const subjectB = { ...subject, name: 'Partner' };

const positions = await client.data.getPositions({ subject });

// Charts: natal chart SVG export
const natalSvg = await client.svg.getNatalChartSvg({ subject, svg_options: { theme: 'dark' } });

// Analysis: synastry report
const synastry = await client.analysis.getSynastryReport({ subject1: subjectA, subject2: subjectB });

// Horoscope: personalized daily forecast
const daily = await client.horoscope.getPersonalDailyHoroscope({ subject });

// Insights: relationship compatibility
const compatibility = await client.insights.relationship.getCompatibility({ subjects: [subjectA, subjectB] });

// Enhanced: global traditional analysis
const global = await client.enhanced.getGlobalAnalysis({
  options: { house_system: 'W', zodiac_type: 'Tropic', active_points: ['Sun', 'Moon', 'Mercury'], precision: 3 },
  orbs: { major_aspects_deg: 2 },
});
```

See `examples/usage.ts` for a full script that conditionally runs when `RUN_ASTROLOGY_EXAMPLE=true`.

### Debug Logging

Pass `debug: true` and optionally supply a custom `logger` function. Setting `ASTROLOGY_DEBUG=true` enables the same behaviour globally. The client logs request metadata, retry attempts, and responses (status and url).

### Testing & Linting
```bash
npm run lint            # ESLint with @typescript-eslint + Prettier
npm run test            # Vitest watch mode
npm run test:coverage   # Vitest with V8 coverage (enforced at 100 %)
npm run build           # tsup build emitting ESM (.js) + CJS (.cjs)
```

### Project Structure
```
├── src/
│   ├── categories/              # Modular sub-clients per API family
│   ├── client.ts                # Root client wiring sub-clients & interceptors
│   ├── errors/AstrologyError.ts # Custom error hierarchy
│   ├── types/                   # Generated and hand-written typings
│   └── utils/validators.ts      # Runtime payload guards
├── tests/unit/                  # Vitest suites with axios-mock-adapter
├── examples/usage.ts            # Usage example (guarded by env flag)
├── docs-openapi.json            # Cached OpenAPI specification
└── README.md
```

### Publishing Checklist
1. Ensure `npm run test:coverage` passes with 100 % coverage.
2. Run `npm run build` and review the emitted `dist/` bundle.
3. Update version, changelog, and documentation as needed.

### License
Released under the MIT License. See [`LICENSE`](./LICENSE) for details.

