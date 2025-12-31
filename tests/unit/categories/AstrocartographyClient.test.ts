import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { AstrocartographyClient } from '../../../src/categories/AstrocartographyClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  AstrocartographyLinesRequest,
  AstrocartographyMapRequest,
  AstrocartographyOptions,
  CompareLocationsRequest,
  LocationAnalysisRequest,
  LocationFilters,
  LocationInput,
  ParanMapRequest,
  PowerZonesRequest,
  RelocationChartRequest,
  RelocationOptions,
  SearchCriteria,
  SearchLocationsRequest,
  Subject,
  VisualOptions,
} from '../../../src/types';
import type {
  AstrocartographyLinesResponse,
  AstrocartographyMapResponse,
  CompareLocationsResponse,
  LineMeaningsResponse,
  LocationAnalysisResponse,
  ParanMapResponse,
  PowerZonesResponse,
  RelocationChartResponse,
  SearchLocationsResponse,
  SupportedFeaturesResponse,
} from '../../../src/types/responses';
import { AxiosHttpHelper } from '../../../src/utils/http';

type HttpHelperWithMock = { helper: AxiosHttpHelper; mock: MockAdapter };

const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'Test Subject',
  birth_data: {
    year: 1990,
    month: 5,
    day: 21,
    hour: 10,
    minute: 30,
    city: 'London',
    country_code: 'GB',
  },
  ...overrides,
});

const createAstroOptions = (overrides: Partial<AstrocartographyOptions> = {}): AstrocartographyOptions => ({
  planets: ['Sun', 'Moon'],
  line_types: ['AC', 'MC'],
  include_parans: false,
  include_local_space: false,
  map_projection: 'mercator',
  coordinate_precision: 2,
  line_orb_tolerance: 2,
  city_selection_algorithm: 'round_robin',
  geographic_diversity: true,
  max_cities_per_country: 4,
  max_cities_per_line: 2,
  region: {
    latitude_range: [-60, 80],
    longitude_range: [-150, 150],
  },
  ...overrides,
});

const createVisualOptions = (overrides: Partial<VisualOptions> = {}): VisualOptions => ({
  width: 1200,
  height: 600,
  theme: 'modern',
  show_countries: true,
  show_cities: true,
  show_grid: true,
  show_legend: true,
  line_width: 2.5,
  city_min_population: 750000,
  city_search_radius_km: 40,
  highlight_power_zones: true,
  max_power_zones: 7,
  min_power_zone_strength: 0.7,
  planet_emoji_count: 1,
  birth_location_label: true,
  legend_position: 'distributed',
  city_label_style: 'emoji',
  line_label_style: 'inline',
  color_scheme: 'planetary',
  ...overrides,
});

const createLocationInput = (overrides: Partial<LocationInput> = {}): LocationInput => ({
  city: 'Los Angeles',
  country_code: 'US',
  ...overrides,
});

const createSearchCriteria = (overrides: Partial<SearchCriteria> = {}): SearchCriteria => ({
  life_area: 'career',
  preferred_planets: ['Sun'],
  preferred_line_types: ['AC'],
  minimum_score: 6,
  avoid_debilitated: true,
  orb_tolerance: 2,
  ...overrides,
});

const createLocationFilters = (overrides: Partial<LocationFilters> = {}): LocationFilters => ({
  min_population: 500000,
  countries: ['US', 'GB'],
  ...overrides,
});

const createSearchRequest = (): SearchLocationsRequest => ({
  subject: createSubject(),
  search_criteria: createSearchCriteria(),
  location_filters: createLocationFilters(),
});

const createRelocationOptions = (overrides: Partial<RelocationOptions> = {}): RelocationOptions => ({
  target_location: createLocationInput(),
  show_changes: true,
  highlight_angular_changes: true,
  include_aspect_changes: true,
  orb_tolerance: 2,
  ...overrides,
});

const createLinesRequest = (): AstrocartographyLinesRequest => ({
  subject: createSubject(),
  options: createAstroOptions(),
  coordinate_density: 100,
});

const createMapRequest = (): AstrocartographyMapRequest => ({
  subject: createSubject(),
  map_options: createAstroOptions(),
  visual_options: createVisualOptions(),
});

const createParanMapRequest = (): ParanMapRequest => ({
  subject: createSubject(),
  paran_options: {},
  visual_options: createVisualOptions(),
});

const createLocationAnalysisRequest = (): LocationAnalysisRequest => ({
  subject: createSubject(),
  location: createLocationInput(),
  analysis_options: {},
});

const createCompareLocationsRequest = (): CompareLocationsRequest => ({
  subject: createSubject(),
  locations: [createLocationInput(), createLocationInput({ city: 'New York' })],
  comparison_criteria: {},
});

const createPowerZonesRequest = (): PowerZonesRequest => ({
  subject: createSubject(),
  search_options: {},
});

const createRelocationChartRequest = (): RelocationChartRequest => ({
  subject: createSubject(),
  options: createRelocationOptions(),
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

describe('AstrocartographyClient', () => {
  let client: AstrocartographyClient;
  let mock: MockAdapter;

  beforeEach(() => {
    const { helper, mock: axiosMock } = createHttpHelper();
    client = new AstrocartographyClient(helper);
    mock = axiosMock;
  });

  afterEach(() => {
    mock.reset();
  });

  it('retrieves astrocartography lines', async () => {
    const request = createLinesRequest();
    const response = {
      success: true,
      lines: [
        {
          planet: 'Sun',
          line_type: 'AC',
          coordinates: [{ latitude: 10, longitude: 20 }],
          color: '#FFD700',
          meaning: 'Leadership energy',
          strength: 'strong',
          keywords: ['leadership'],
        },
      ],
      birth_location: {},
      calculation_info: {},
    } as AstrocartographyLinesResponse;
    mock.onPost('/api/v3/astrocartography/lines').reply(200, { data: response });

    await expect(client.getLines(request)).resolves.toEqual(response);
  });

  it('validates coordinate density for lines request', async () => {
    const request = {
      ...createLinesRequest(),
      coordinate_density: 0,
    };

    await expect(client.getLines(request)).rejects.toThrow(AstrologyError);
  });

  it('generates astrocartography map', async () => {
    const request = createMapRequest();
    const response = {
      success: true,
      svg_content: '<svg></svg>',
      map_data: {},
      interactive_data: {},
      svg_metadata: {},
      city_selection_stats: {},
      power_zone_algorithm: 'standard',
      legend_sections: [],
      metadata: {},
    } as AstrocartographyMapResponse;
    mock.onPost('/api/v3/astrocartography/map').reply(200, { data: response });

    await expect(client.generateMap(request)).resolves.toEqual(response);
  });

  it('validates visual options in map request', async () => {
    const request: AstrocartographyMapRequest = {
      subject: createSubject(),
      map_options: createAstroOptions(),
      visual_options: createVisualOptions({ width: 0 }),
    };

    await expect(client.generateMap(request)).rejects.toThrow(AstrologyError);
  });

  it('generates paran astrocartography map', async () => {
    const request = createParanMapRequest();
    const response = {
      success: true,
      svg_content: '<svg></svg>',
      paran_data: {},
      interpretation: 'Paran interpretation',
    } as ParanMapResponse;
    mock.onPost('/api/v3/astrocartography/paran-map').reply(200, { data: response });

    await expect(client.generateParanMap(request)).resolves.toEqual(response);
  });

  it('validates location input for location analysis', async () => {
    const request: LocationAnalysisRequest = {
      subject: createSubject(),
      location: { city: '' },
    };

    await expect(client.analyzeLocation(request)).rejects.toThrow(AstrologyError);
  });

  it('analyzes location', async () => {
    const request = createLocationAnalysisRequest();
    const response = {
      success: true,
      location_info: {},
      nearby_lines: [],
      relocated_chart: {},
      life_area_ratings: {},
      overall_score: 8.2,
      summary: 'Location summary',
      detailed_analysis: {},
    } as LocationAnalysisResponse;
    mock.onPost('/api/v3/astrocartography/location-analysis').reply(200, { data: response });

    await expect(client.analyzeLocation(request)).resolves.toEqual(response);
  });

  it('compares locations', async () => {
    const request = createCompareLocationsRequest();
    const response = {
      success: true,
      comparison: [],
      recommendations: {},
      summary: 'Comparison summary',
    } as CompareLocationsResponse;
    mock.onPost('/api/v3/astrocartography/compare-locations').reply(200, { data: response });

    await expect(client.compareLocations(request)).resolves.toEqual(response);
  });

  it('validates minimum location count for comparison', async () => {
    const request: CompareLocationsRequest = {
      subject: createSubject(),
      locations: [createLocationInput()],
    };

    await expect(client.compareLocations(request)).rejects.toThrow(AstrologyError);
  });

  it('finds power zones', async () => {
    const request = createPowerZonesRequest();
    const response = {
      success: true,
      power_zones: [],
      analysis_summary: 'Summary',
    } as PowerZonesResponse;
    mock.onPost('/api/v3/astrocartography/power-zones').reply(200, { data: response });

    await expect(client.findPowerZones(request)).resolves.toEqual(response);
  });

  it('searches optimal locations', async () => {
    const request = createSearchRequest();
    const response = {
      success: true,
      results: [],
      search_metadata: {},
      recommendations: {},
    } as SearchLocationsResponse;
    mock.onPost('/api/v3/astrocartography/search-locations').reply(200, { data: response });

    await expect(client.searchLocations(request)).resolves.toEqual(response);
  });

  it('validates search criteria orb tolerance', async () => {
    const request: SearchLocationsRequest = {
      subject: createSubject(),
      search_criteria: createSearchCriteria({ orb_tolerance: 0 }),
    };

    await expect(client.searchLocations(request)).rejects.toThrow(AstrologyError);
  });

  it('validates location filter population range', async () => {
    const request: SearchLocationsRequest = {
      subject: createSubject(),
      search_criteria: createSearchCriteria(),
      location_filters: createLocationFilters({ max_population: 100000 }),
    };

    await expect(client.searchLocations(request)).rejects.toThrow(AstrologyError);
  });

  it('accepts location filters with max population above minimum', async () => {
    const request: SearchLocationsRequest = {
      subject: createSubject(),
      search_criteria: createSearchCriteria(),
      location_filters: createLocationFilters({ max_population: 1_000_000 }),
    };
    const response = {
      success: true,
      results: [],
      search_metadata: {},
      recommendations: {},
    } as SearchLocationsResponse;
    mock.onPost('/api/v3/astrocartography/search-locations').reply(200, { data: response });

    await expect(client.searchLocations(request)).resolves.toEqual(response);
  });

  it('generates relocation chart', async () => {
    const request = createRelocationChartRequest();
    const response = {
      success: true,
      relocated_chart: {},
      house_changes: [],
      nearby_lines: [],
      location_analysis: {},
      comparison_summary: 'Relocation summary',
    } as RelocationChartResponse;
    mock.onPost('/api/v3/astrocartography/relocation-chart').reply(200, { data: response });

    await expect(client.generateRelocationChart(request)).resolves.toEqual(response);
  });

  it('validates relocation options target location coordinates', async () => {
    const request: RelocationChartRequest = {
      subject: createSubject(),
      options: createRelocationOptions({
        target_location: { latitude: 45 },
      }),
    };

    await expect(client.generateRelocationChart(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves line meanings', async () => {
    const response = {
      success: true,
      line_meanings: {},
      line_types: {},
      interpretation_guide: {},
    } as LineMeaningsResponse;
    mock.onGet('/api/v3/astrocartography/line-meanings').reply(200, { data: response });

    await expect(client.getLineMeanings()).resolves.toEqual(response);
  });

  it('retrieves supported features', async () => {
    const response = {
      success: true,
      features: { line_types: ['AC', 'MC'] },
      limitations: {},
      version_info: { api_version: '3.1.0' },
    } as SupportedFeaturesResponse;
    mock.onGet('/api/v3/astrocartography/supported-features').reply(200, { data: response });

    await expect(client.getSupportedFeatures()).resolves.toEqual(response);
  });
});

