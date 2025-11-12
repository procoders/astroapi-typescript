import {
  CityDetails,
  LunarMetricsResponse,
  NatalChartResponse,
  NatalReportResponse,
  PaginatedResponse,
  PersonalDailyHoroscopeResponse,
  PlanetaryPositionsResponse,
  SynastryReportResponse,
} from '../../src/types';

export const mockPlanetaryPositionsResponse: PlanetaryPositionsResponse = {
  positions: [
    {
      name: 'Sun',
      sign: 'Ari',
      degree: 15.25,
      absolute_longitude: 15.25,
      house: 7,
      is_retrograde: false,
      speed: 0.98,
    },
    {
      name: 'Moon',
      sign: 'Lib',
      degree: 12.45,
      absolute_longitude: 192.45,
      house: 1,
      is_retrograde: false,
      speed: 13.11,
    },
  ],
};

export const mockLunarMetricsResponse: LunarMetricsResponse = {
  date: '2024-01-15',
  within_perigee_range: false,
  distance: 384400,
  within_apogee_range: true,
  apogee_distance: 405500,
  moon_sign: 'Pisces',
  moon_phase: 'Waxing Crescent',
  moon_age_in_days: 4.5,
  moon_day: 5,
  moon_illumination: 23.5,
};

export const mockNatalChartResponse: NatalChartResponse = {
  subject_data: {
    name: 'Demo',
  },
  chart_data: {
    planetary_positions: mockPlanetaryPositionsResponse.positions,
    house_cusps: [
      {
        house: 1,
        sign: 'Lib',
        degree: 10.5,
        absolute_longitude: 190.5,
      },
    ],
    aspects: [
      {
        point1: 'Sun',
        point2: 'Moon',
        aspect_type: 'opposition',
        orb: 1.5,
      },
    ],
    fixed_stars: null,
  },
};

export const mockNatalReportResponse: NatalReportResponse = {
  subject: {
    name: 'Demo',
  },
  interpretations: [
    {
      title: 'Sun in Aries',
      text: 'Dynamic and action oriented.',
    },
  ],
};

export const mockSynastryReportResponse: SynastryReportResponse = {
  report_title: 'Synastry Overview',
  sections: [
    {
      title: 'Emotional Connection',
      interpretations: [
        {
          factor: 'Moon conjunction Moon',
          text: 'Strong emotional resonance.',
        },
      ],
    },
  ],
};

export const mockPersonalDailyHoroscopeResponse: PersonalDailyHoroscopeResponse = {
  date: '2024-01-15',
  overall_theme: 'Communication breakthroughs',
  overall_rating: 4,
  life_areas: [
    {
      area: 'communication',
      title: 'Expressive Clarity',
      prediction: 'Ideal day for heartfelt conversations.',
      rating: 5,
      keywords: ['clarity', 'confidence'],
    },
  ],
  planetary_influences: [
    {
      planet: 'Mercury',
      aspect_type: 'conjunction',
      description: 'Mercury conjunct Venus enhances communication harmony.',
      strength: 5,
      natal_planet: 'Venus',
      aspect_name: 'Conjunction',
      orb: 1.1,
    },
  ],
  lucky_elements: {
    colors: ['light blue'],
    numbers: [3, 9],
  },
  moon: {
    phase: 'Waxing Crescent',
    sign: 'Pisces',
    prediction: 'Intuition is heightened.',
    illumination: 24,
  },
  tips: ['Write down your insights before midday.'],
};

export const mockCitiesResponse: PaginatedResponse<CityDetails> = {
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
};

