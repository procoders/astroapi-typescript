


import { SvgClient } from '../../../src/categories/SvgClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  CompositeChartSVGRequest,
  NatalChartSVGRequest,
  SynastryChartSVGRequest,
  TransitChartSVGRequest,
  Subject,
  DateTimeLocation,
} from '../../../src/types';
import { createTestHttpHelper } from '../../utils/testHelpers';
import { mockFetch } from '../../utils/mockFetch';


const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'Sample Subject',
  birth_data: {
    year: 1990,
    month: 5,
    day: 21,
    hour: 10,
    minute: 30,
    second: 0,
    city: 'London',
    country_code: 'GB',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
    ...overrides.birth_data,
  },
  ...overrides,
});

const createDateTimeLocation = (
  overrides: Partial<DateTimeLocation> = {},
): DateTimeLocation => ({
  year: 2024,
  month: 1,
  day: 15,
  hour: 12,
  minute: 0,
  second: 0,
  city: 'London',
  country_code: 'GB',
  latitude: 51.5074,
  longitude: -0.1278,
  timezone: 'Europe/London',
  ...overrides,
});

const createNatalRequest = (
  overrides: Partial<NatalChartSVGRequest> = {},
): NatalChartSVGRequest => ({
  subject: createSubject(),
  options: {
    house_system: 'P',
    zodiac_type: 'Tropic',
    active_points: ['Sun', 'Moon', 'Mercury'],
    precision: 2,
  },
  svg_options: {
    theme: 'classic',
    language: 'en',
  },
  ...overrides,
});

const createSynastryRequest = (
  overrides: Partial<SynastryChartSVGRequest> = {},
): SynastryChartSVGRequest => ({
  subject1: createSubject({ name: 'Person One' }),
  subject2: createSubject({ name: 'Person Two' }),
  svg_options: {
    theme: 'dark',
    language: 'en',
  },
  ...overrides,
});

const createCompositeRequest = (
  overrides: Partial<CompositeChartSVGRequest> = {},
): CompositeChartSVGRequest => ({
  subject1: createSubject({ name: 'Partner A' }),
  subject2: createSubject({ name: 'Partner B' }),
  svg_options: {
    theme: 'light',
    language: 'fr',
  },
  ...overrides,
});

const createTransitRequest = (
  overrides: Partial<TransitChartSVGRequest> = {},
): TransitChartSVGRequest => ({
  natal_subject: createSubject(),
  transit_datetime: createDateTimeLocation(),
  svg_options: {
    theme: 'dark',
    language: 'en',
  },
  ...overrides,
});


describe('SvgClient', () => {
  let client: SvgClient;
  

  beforeEach(() => {
    const helper = createTestHttpHelper();
    client = new SvgClient(helper);
    
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('retrieves natal chart SVG', async () => {
    const svg = '<svg>Natal</svg>';
    mockFetch.onPost('/api/v3/svg/natal').replyRaw(200, svg);

    await expect(client.getNatalChartSvg(createNatalRequest())).resolves.toEqual(svg);
  });

  it('validates natal chart subject presence', async () => {
    const request = createNatalRequest({ subject: undefined as unknown as Subject });

    await expect(client.getNatalChartSvg(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves synastry chart SVG', async () => {
    const svg = '<svg>Synastry</svg>';
    mockFetch.onPost('/api/v3/svg/synastry').replyRaw(200, svg);

    await expect(client.getSynastryChartSvg(createSynastryRequest())).resolves.toEqual(svg);
  });

  it('preserves provided config headers', async () => {
    const svg = '<svg>Custom</svg>';
    mockFetch.onPost('/api/v3/svg/natal').replyRaw(200, svg);

    await client.getNatalChartSvg(createNatalRequest(), {
      headers: { 'X-Test': 'true' },
    });

    expect(mockFetch.history.post[0].headers['X-Test']).toBe('true');
  });

  it('preserves custom responseType when provided in config', async () => {
    const svg = '<svg>Custom</svg>';
    mockFetch.onPost('/api/v3/svg/natal').replyRaw(200, svg);

    // When responseType is explicitly provided, it should be preserved
    const result = await client.getNatalChartSvg(createNatalRequest(), {
      responseType: 'text',
      headers: { 'X-Custom': 'value' },
    });

    expect(result).toBe(svg);
  });

  it('returns svg as text response', async () => {
    const svg = '<svg>Default</svg>';
    mockFetch.onPost('/api/v3/svg/synastry').replyRaw(200, svg);

    const result = await client.getSynastryChartSvg(createSynastryRequest());

    expect(result).toBe(svg);
    expect(typeof result).toBe('string');
  });

  it('validates synastry chart requires second subject', async () => {
    const request = createSynastryRequest({ subject2: undefined as unknown as Subject });

    await expect(client.getSynastryChartSvg(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves composite chart SVG', async () => {
    const svg = '<svg>Composite</svg>';
    mockFetch.onPost('/api/v3/svg/composite').replyRaw(200, svg);

    await expect(client.getCompositeChartSvg(createCompositeRequest())).resolves.toEqual(svg);
  });

  it('validates composite chart SVG options theme', async () => {
    const request = createCompositeRequest({
      svg_options: { theme: 'invalid' as 'light', language: 'en' },
    });

    await expect(client.getCompositeChartSvg(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves transit chart SVG', async () => {
    const svg = '<svg>Transit</svg>';
    mockFetch.onPost('/api/v3/svg/transit').replyRaw(200, svg);

    await expect(client.getTransitChartSvg(createTransitRequest())).resolves.toEqual(svg);
  });

  it('validates transit chart requires transit datetime', async () => {
    const request = createTransitRequest({ transit_datetime: undefined as unknown as DateTimeLocation });

    await expect(client.getTransitChartSvg(request)).rejects.toThrow(AstrologyError);
  });
});

