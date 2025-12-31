import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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
import { AxiosHttpHelper } from '../../../src/utils/http';

type HttpHelperWithMock = { helper: AxiosHttpHelper; mock: MockAdapter };

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

const createHttpHelper = (): HttpHelperWithMock => {
  const axiosInstance = axios.create();
  const mock = new MockAdapter(axiosInstance);
  const helper = new AxiosHttpHelper(
    axiosInstance,
    <T>(payload: unknown): T => {
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
    },
  );

  return { helper, mock };
};

describe('SvgClient', () => {
  let client: SvgClient;
  let mock: MockAdapter;

  beforeEach(() => {
    const { helper, mock: axiosMock } = createHttpHelper();
    client = new SvgClient(helper);
    mock = axiosMock;
  });

  afterEach(() => {
    mock.reset();
  });

  it('retrieves natal chart SVG', async () => {
    const svg = '<svg>Natal</svg>';
    mock.onPost('/api/v3/svg/natal').reply(200, svg);

    await expect(client.getNatalChartSvg(createNatalRequest())).resolves.toEqual(svg);
  });

  it('validates natal chart subject presence', async () => {
    const request = createNatalRequest({ subject: undefined as unknown as Subject });

    await expect(client.getNatalChartSvg(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves synastry chart SVG', async () => {
    const svg = '<svg>Synastry</svg>';
    mock.onPost('/api/v3/svg/synastry').reply(200, svg);

    await expect(client.getSynastryChartSvg(createSynastryRequest())).resolves.toEqual(svg);
  });

  it('preserves provided responseType on config', async () => {
    const svg = '<svg>Custom</svg>';
    mock.onPost('/api/v3/svg/natal').reply(200, svg);

    await client.getNatalChartSvg(createNatalRequest(), {
      responseType: 'arraybuffer',
      headers: { 'X-Test': 'true' },
    });

    expect(mock.history.post[0].responseType).toBe('arraybuffer');
  });

  it('defaults responseType to text when omitted', async () => {
    const svg = '<svg>Default</svg>';
    mock.onPost('/api/v3/svg/synastry').reply(200, svg);

    await client.getSynastryChartSvg(createSynastryRequest(), { headers: { 'X-Test': 'true' } });

    expect(mock.history.post[0].responseType).toBe('text');
  });

  it('validates synastry chart requires second subject', async () => {
    const request = createSynastryRequest({ subject2: undefined as unknown as Subject });

    await expect(client.getSynastryChartSvg(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves composite chart SVG', async () => {
    const svg = '<svg>Composite</svg>';
    mock.onPost('/api/v3/svg/composite').reply(200, svg);

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
    mock.onPost('/api/v3/svg/transit').reply(200, svg);

    await expect(client.getTransitChartSvg(createTransitRequest())).resolves.toEqual(svg);
  });

  it('validates transit chart requires transit datetime', async () => {
    const request = createTransitRequest({ transit_datetime: undefined as unknown as DateTimeLocation });

    await expect(client.getTransitChartSvg(request)).rejects.toThrow(AstrologyError);
  });
});

