


import { GlossaryClient } from '../../../src/categories/GlossaryClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  ActivePoint,
  ActivePointsResponse,
  CountriesResponse,
  ElementsResponse,
  FixedStarsResponse,
  HouseSystemsResponse,
  HousesResponse,
  KeywordsResponse,
  LanguagesResponse,
  LifeAreasResponse,
  PaginatedResponse,
  ThemesResponse,
  ZodiacTypesResponse,
} from '../../../src/types/responses';
import type { CityDetails } from '../../../src/types';
import { createTestHttpHelper } from '../../utils/testHelpers';
import { mockFetch } from '../../utils/mockFetch';



const createActivePointsResponse = (): ActivePointsResponse => ({
  items: [
    { id: 'Sun', description: 'Sun description', type: 'planet', strength: 2 },
    { id: 'Ascendant', description: 'Ascendant description', type: 'angle', strength: 2 },
  ],
});

const createCitiesResponse = (): PaginatedResponse<CityDetails> => ({
  items: [
    {
      name: 'London',
      country_code: 'GB',
      latitude: 51.5074,
      longitude: -0.1278,
      population: 8982000,
      timezone: 'Europe/London',
    },
  ],
  total: 1,
  limit: 10,
  offset: 0,
});

const createCountriesResponse = (): CountriesResponse => ({
  items: [
    { name: 'United Kingdom', iso: 'GB', capital: 'London', population: 67886011, continent: 'EU', currency: 'GBP' },
  ],
});

const createElementsResponse = (): ElementsResponse => ({
  items: [{ id: 'fire', description: 'Fire element' }],
});

const createFixedStarsResponse = (): FixedStarsResponse => ({
  items: [{ id: 'Regulus', description: 'Royal star' }],
});

const createHouseSystemsResponse = (): HouseSystemsResponse => ({
  items: [{ id: 'P', description: 'Placidus' }],
});

const createHousesResponse = (): HousesResponse => ({
  house_system: 'P',
  houses: [
    {
      number: 1,
      name: '1st House',
      themes: ['identity'],
      primary_theme: 'identity',
      life_areas: ['personal_identity'],
      traditional_meaning: 'House of self',
      modern_keywords: ['self', 'appearance'],
    },
  ],
  available_systems: [
    { code: 'P', name: 'Placidus', description: 'Quadrant system', category: 'quadrant', usage: 'General', is_default: true },
  ],
});

const createKeywordsResponse = (): KeywordsResponse => ({
  category: 'planets',
  total_concepts: 1,
  keywords: [{ id: 'Sun', name: 'Sun', keywords: ['identity'], total_keywords: 1 }],
});

const createLanguagesResponse = (): LanguagesResponse => ({
  items: [
    { id: 'en', description: 'English' },
    { id: 'de', description: 'German' },
  ],
});

const createLifeAreasResponse = (): LifeAreasResponse => ({
  language: 'en',
  total_areas: 1,
  life_areas: [
    {
      id: 'career_success',
      name: 'Career & Success',
      description: 'Career themes',
      keywords: ['career'],
      category: 'professional',
      emoji: '💼',
      primary_planets: ['Sun'],
      secondary_planets: ['Jupiter'],
      primary_houses: [10],
      secondary_houses: [2],
      preferred_lines: ['MC'],
      strength_weight: 1,
    },
  ],
});

const createThemesResponse = (): ThemesResponse => ({
  items: [
    { id: 'light', description: 'Light theme' },
    { id: 'dark', description: 'Dark theme' },
  ],
});

const createZodiacTypesResponse = (): ZodiacTypesResponse => ({
  items: [
    { id: 'Tropic', description: 'Tropical zodiac' },
    { id: 'Sidereal', description: 'Sidereal zodiac' },
  ],
});

describe('GlossaryClient', () => {
  let client: GlossaryClient;
  

  beforeEach(() => {
    const helper = createTestHttpHelper();
    client = new GlossaryClient(helper);
    
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('retrieves active points', async () => {
    const response = createActivePointsResponse();
    mockFetch.onGet('/api/v3/glossary/active-points').reply(200, { data: response });

    await expect(client.getActivePoints()).resolves.toEqual(response);
  });

  it('validates active points query type', async () => {
    await expect(client.getActivePoints({ type: 'invalid' as unknown as ActivePoint['type'] })).rejects.toThrow(
      AstrologyError,
    );
  });

  it('retrieves primary active points', async () => {
    const response = createActivePointsResponse();
    mockFetch.onGet('/api/v3/glossary/active-points/primary').reply(200, { data: response });

    await expect(client.getPrimaryActivePoints()).resolves.toEqual(response);
  });

  it('merges primary active points params with config', async () => {
    const response = createActivePointsResponse();
    mockFetch.onGet('/api/v3/glossary/active-points/primary').reply((config) => {
      expect(config.params).toMatchObject({ type: 'angle', include: 'featured' });
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.getPrimaryActivePoints(
        { type: 'angle' },
        { params: { include: 'featured' }, headers: { Authorization: 'Bearer token' } },
      ),
    ).resolves.toEqual(response);
  });

  it('merges active points params with config', async () => {
    const response = createActivePointsResponse();
    mockFetch.onGet('/api/v3/glossary/active-points').reply((config) => {
      expect(config.params).toMatchObject({ type: 'planet', include: 'popular' });
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.getActivePoints(
        { type: 'planet' },
        { params: { include: 'popular' }, headers: { Authorization: 'Bearer token' } },
      ),
    ).resolves.toEqual(response);
  });

  it('merges active points params with custom config', async () => {
    const response = createActivePointsResponse();
    mockFetch.onGet('/api/v3/glossary/active-points').reply((config) => {
      expect(config.params).toMatchObject({ type: 'planet', include: 'popular' });
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.getActivePoints(
        { type: 'planet' },
        { params: { include: 'popular' }, headers: { Authorization: 'Bearer token' } },
      ),
    ).resolves.toEqual(response);
  });

  it('validates primary active points query type', async () => {
    await expect(client.getPrimaryActivePoints({ type: 'fixed-star' as any })).rejects.toThrow(AstrologyError);
  });

  it('retrieves cities with parameters', async () => {
    const response = createCitiesResponse();
    mockFetch.onGet('/api/v3/glossary/cities').reply((config) => {
      expect(config.params).toMatchObject({ search: 'Lon', limit: '5' });
      return [200, { data: response }];
    });

    await expect(client.getCities({ search: 'Lon', limit: 5 })).resolves.toEqual(response);
  });

  it('merges city params with config', async () => {
    const response = createCitiesResponse();
    mockFetch.onGet('/api/v3/glossary/cities').reply((config) => {
      expect(config.params).toMatchObject({ search: 'Berlin', offset: '1', limit: '10' });
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.getCities(
        { search: 'Berlin', offset: 1 },
        { params: { limit: 10 }, headers: { Authorization: 'Bearer token' } },
      ),
    ).resolves.toEqual(response);
  });

  it('merges city params with request config', async () => {
    const response = createCitiesResponse();
    mockFetch.onGet('/api/v3/glossary/cities').reply((config) => {
      expect(config.params).toMatchObject({ search: 'Paris', offset: '1', limit: '10' });
      expect(config.headers?.Authorization).toBe('Bearer token');
      return [200, { data: response }];
    });

    await expect(
      client.getCities(
        { search: 'Paris', offset: 1 },
        { params: { limit: 10 }, headers: { Authorization: 'Bearer token' } },
      ),
    ).resolves.toEqual(response);
  });

  it('validates city request limit', async () => {
    await expect(client.getCities({ limit: 0 })).rejects.toThrow(AstrologyError);
  });

  it('retrieves countries', async () => {
    const response = createCountriesResponse();
    mockFetch.onGet('/api/v3/glossary/countries').reply(200, { data: response });

    await expect(client.getCountries()).resolves.toEqual(response);
  });

  it('retrieves elements', async () => {
    const response = createElementsResponse();
    mockFetch.onGet('/api/v3/glossary/elements').reply(200, { data: response });

    await expect(client.getElements()).resolves.toEqual(response);
  });

  it('retrieves fixed stars', async () => {
    const response = createFixedStarsResponse();
    mockFetch.onGet('/api/v3/glossary/fixed-stars').reply(200, { data: response });

    await expect(client.getFixedStars()).resolves.toEqual(response);
  });

  it('retrieves house systems', async () => {
    const response = createHouseSystemsResponse();
    mockFetch.onGet('/api/v3/glossary/house-systems').reply(200, { data: response });

    await expect(client.getHouseSystems()).resolves.toEqual(response);
  });

  it('retrieves houses', async () => {
    const response = createHousesResponse();
    mockFetch.onGet('/api/v3/glossary/houses').reply((config) => {
      expect(config.params).toMatchObject({ house_system: 'W' });
      return [200, { data: response }];
    });

    await expect(client.getHouses({ house_system: 'W' })).resolves.toEqual(response);
  });

  it('merges house params with config', async () => {
    const response = createHousesResponse();
    mockFetch.onGet('/api/v3/glossary/houses').reply((config) => {
      expect(config.params).toMatchObject({ house_system: 'W', language: 'en' });
      return [200, { data: response }];
    });

    await expect(client.getHouses({ house_system: 'W' }, { params: { language: 'en' } })).resolves.toEqual(response);
  });

  it('merges houses request with existing params', async () => {
    const response = createHousesResponse();
    mockFetch.onGet('/api/v3/glossary/houses').reply((config) => {
      expect(config.params).toMatchObject({ house_system: 'W', language: 'en' });
      return [200, { data: response }];
    });

    await expect(client.getHouses({ house_system: 'W' }, { params: { language: 'en' } })).resolves.toEqual(response);
  });

  it('returns houses without house system filter when omitted', async () => {
    const response = createHousesResponse();
    mockFetch.onGet('/api/v3/glossary/houses').reply((config) => {
      expect(config.params).not.toHaveProperty('house_system');
      expect(config.params).toMatchObject({ language: 'en' });
      return [200, { data: response }];
    });

    await expect(client.getHouses(undefined, { params: { language: 'en' } })).resolves.toEqual(response);
  });

  it('validates house system parameter', async () => {
    await expect(client.getHouses({ house_system: 'Z' as any })).rejects.toThrow(AstrologyError);
  });

  it('retrieves keyword collections', async () => {
    const response = createKeywordsResponse();
    mockFetch.onGet('/api/v3/glossary/keywords').reply((config) => {
      expect(config.params).toMatchObject({ category: 'planets' });
      return [200, { data: response }];
    });

    await expect(client.getKeywords({ category: 'planets' })).resolves.toEqual(response);
  });

  it('merges keyword params with config', async () => {
    const response = createKeywordsResponse();
    mockFetch.onGet('/api/v3/glossary/keywords').reply((config) => {
      expect(config.params).toMatchObject({ category: 'planets', language: 'en' });
      return [200, { data: response }];
    });

    await expect(client.getKeywords({ category: 'planets' }, { params: { language: 'en' } })).resolves.toEqual(response);
  });

  it('returns keywords without category filter when omitted', async () => {
    const response = createKeywordsResponse();
    mockFetch.onGet('/api/v3/glossary/keywords').reply((config) => {
      expect(config.params).not.toHaveProperty('category');
      expect(config.params).toMatchObject({ language: 'en' });
      return [200, { data: response }];
    });

    await expect(client.getKeywords(undefined, { params: { language: 'en' } })).resolves.toEqual(response);
  });

  it('merges keyword params with config', async () => {
    const response = createKeywordsResponse();
    mockFetch.onGet('/api/v3/glossary/keywords').reply((config) => {
      expect(config.params).toMatchObject({ category: 'planets', language: 'en' });
      return [200, { data: response }];
    });

    await expect(client.getKeywords({ category: 'planets' }, { params: { language: 'en' } })).resolves.toEqual(response);
  });

  it('validates keyword category', async () => {
    await expect(client.getKeywords({ category: 'invalid' as any })).rejects.toThrow(AstrologyError);
  });

  it('retrieves languages', async () => {
    const response = createLanguagesResponse();
    mockFetch.onGet('/api/v3/glossary/languages').reply(200, { data: response });

    await expect(client.getLanguages()).resolves.toEqual(response);
  });

  it('retrieves life areas', async () => {
    const response = createLifeAreasResponse();
    mockFetch.onGet('/api/v3/glossary/life-areas').reply((config) => {
      expect(config.params).toMatchObject({ language: 'de' });
      return [200, { data: response }];
    });

    await expect(client.getLifeAreas({ language: 'de' })).resolves.toEqual(response);
  });

  it('merges life areas params with config', async () => {
    const response = createLifeAreasResponse();
    mockFetch.onGet('/api/v3/glossary/life-areas').reply((config) => {
      expect(config.params).toMatchObject({ language: 'en', audience: 'developers' });
      return [200, { data: response }];
    });

    await expect(
      client.getLifeAreas({ language: 'en' }, { params: { audience: 'developers' } }),
    ).resolves.toEqual(response);
  });

  it('merges life area params with config', async () => {
    const response = createLifeAreasResponse();
    mockFetch.onGet('/api/v3/glossary/life-areas').reply((config) => {
      expect(config.params).toMatchObject({ language: 'en', audience: 'developers' });
      return [200, { data: response }];
    });

    await expect(
      client.getLifeAreas({ language: 'en' }, { params: { audience: 'developers' } }),
    ).resolves.toEqual(response);
  });

  it('returns life areas without language filter when omitted', async () => {
    const response = createLifeAreasResponse();
    mockFetch.onGet('/api/v3/glossary/life-areas').reply((config) => {
      expect(config.params).not.toHaveProperty('language');
      expect(config.params).toMatchObject({ audience: 'developers' });
      return [200, { data: response }];
    });

    await expect(client.getLifeAreas(undefined, { params: { audience: 'developers' } })).resolves.toEqual(response);
  });

  it('validates life areas language', async () => {
    await expect(client.getLifeAreas({ language: 'it' as any })).rejects.toThrow(AstrologyError);
  });

  it('retrieves themes', async () => {
    const response = createThemesResponse();
    mockFetch.onGet('/api/v3/glossary/themes').reply(200, { data: response });

    await expect(client.getThemes()).resolves.toEqual(response);
  });

  it('retrieves zodiac types', async () => {
    const response = createZodiacTypesResponse();
    mockFetch.onGet('/api/v3/glossary/zodiac-types').reply(200, { data: response });

    await expect(client.getZodiacTypes()).resolves.toEqual(response);
  });
});

