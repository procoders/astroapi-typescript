import { describe, it, expect } from 'vitest';
import {
  validateBirthData,
  validateConfig,
  validateDateTimeLocation,
  validateLocationAnalysisRequest,
  validatePersonalizedHoroscopeRequest,
  validateRelocationChartRequest,
  validateSearchLocationsRequest,
  validateSubject,
} from '../../src/utils/validators';
import { AstrologyError } from '../../src/errors/AstrologyError';

describe('validators', () => {
  it('validates configuration', () => {
    expect(() => validateConfig({ apiKey: 'valid-key' })).not.toThrow();
    expect(() => validateConfig({ apiKey: '' } as any)).toThrow(AstrologyError);
    expect(() => validateConfig({} as any)).not.toThrow();
    expect(() => validateConfig({ logger: () => undefined })).not.toThrow();
    expect(() => validateConfig({ logger: 'oops' } as any)).toThrow(AstrologyError);
  });

  it('validates birth data ranges', () => {
    expect(() =>
      validateBirthData({
        year: 1990,
        month: 5,
        day: 11,
        hour: 18,
        minute: 15,
        latitude: 51.5,
        longitude: -0.12,
      }),
    ).not.toThrow();

    expect(() =>
      validateBirthData({
        year: 1800,
      }),
    ).toThrow(AstrologyError);

    expect(() =>
      validateBirthData({
        year: 1990.5,
      } as any),
    ).toThrow(AstrologyError);
  });

  it('validates subject presence', () => {
    expect(() => validateSubject({ birth_data: { year: 1990 } }, 'test')).not.toThrow();
    expect(() => validateSubject(null as any, 'test')).toThrow(AstrologyError);
    expect(() => validateSubject({} as any, 'test')).toThrow(AstrologyError);
  });

  it('validates date time location ranges', () => {
    expect(() =>
      validateDateTimeLocation(
        {
          year: 2024,
          month: 1,
          day: 15,
          hour: 10,
          minute: 30,
          second: 10,
        },
        'test',
      ),
    ).not.toThrow();

    expect(() =>
      validateDateTimeLocation(
        {
          year: 2024,
          month: 13,
          day: 1,
          hour: 0,
          minute: 0,
        },
        'test',
      ),
    ).toThrow(AstrologyError);
  });

  it('validates personalized horoscope request date format', () => {
    expect(() =>
      validatePersonalizedHoroscopeRequest({
        subject: { birth_data: { year: 1990 } },
        date: '2024-01-15',
      }),
    ).not.toThrow();

    expect(() =>
      validatePersonalizedHoroscopeRequest({
        subject: { birth_data: { year: 1990 } },
        date: '15-01-2024',
      }),
    ).toThrow(AstrologyError);
  });

  it('validates search locations request with filters', () => {
    expect(() =>
      validateSearchLocationsRequest({
        subject: {
          birth_data: {
            year: 1990,
            month: 5,
            day: 15,
            hour: 10,
            minute: 30,
          },
        },
        search_criteria: {
          life_area: 'career',
          preferred_planets: ['Sun'],
          preferred_line_types: ['AC'],
          minimum_score: 5,
          orb_tolerance: 1,
        },
        location_filters: {
          countries: ['US'],
          continents: ['NA'],
          exclude_cities: ['Test'],
          min_population: 1000,
          max_population: 5000,
        },
      }),
    ).not.toThrow();
  });

  it('rejects invalid search criteria life area', () => {
    expect(() =>
      validateSearchLocationsRequest({
        subject: {
          birth_data: {
            year: 1990,
            month: 5,
            day: 15,
            hour: 10,
            minute: 30,
          },
        },
        search_criteria: {
          life_area: 'invalid',
        },
      } as any),
    ).toThrow(AstrologyError);
  });

  it('rejects inconsistent location filter population range', () => {
    expect(() =>
      validateSearchLocationsRequest({
        subject: {
          birth_data: {
            year: 1990,
            month: 5,
            day: 15,
            hour: 10,
            minute: 30,
          },
        },
        location_filters: {
          min_population: 5000,
          max_population: 1000,
        },
      } as any),
    ).toThrow(AstrologyError);
  });

  it('allows search locations request without optional filters', () => {
    expect(() =>
      validateSearchLocationsRequest({
        subject: {
          birth_data: {
            year: 1990,
            month: 5,
            day: 15,
            hour: 10,
            minute: 30,
          },
        },
      }),
    ).not.toThrow();
  });

  it('validates relocation chart options', () => {
    expect(() =>
      validateRelocationChartRequest({
        subject: {
          birth_data: {
            year: 1990,
            month: 5,
            day: 15,
            hour: 10,
            minute: 30,
          },
        },
        options: {
          target_location: {
            city: 'New York',
            country_code: 'US',
          },
          orb_tolerance: 2,
        },
      }),
    ).not.toThrow();
  });

  it('rejects location analysis without city or coordinates', () => {
    expect(() =>
      validateLocationAnalysisRequest({
        subject: {
          birth_data: {
            year: 1990,
            month: 5,
            day: 15,
            hour: 10,
            minute: 30,
          },
        },
        location: {},
      } as any),
    ).toThrow(AstrologyError);
  });

  it('validates location analysis with coordinates', () => {
    expect(() =>
      validateLocationAnalysisRequest({
        subject: {
          birth_data: {
            year: 1990,
            month: 5,
            day: 15,
            hour: 10,
            minute: 30,
          },
        },
        location: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      }),
    ).not.toThrow();
  });
});

