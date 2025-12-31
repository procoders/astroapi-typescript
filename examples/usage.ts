import { AstrologyClient } from '../src';
import type {
  DateTimeLocation,
  GlobalAnalysisRequest,
  PersonalizedHoroscopeRequest,
  PlanetaryPositionsRequest,
  Subject,
  SynastryReportRequest,
} from '../src/types';

export async function runExample(): Promise<void> {
  const client = new AstrologyClient({
    apiKey: process.env.RAPIDAPI_KEY,
    retry: { attempts: 2, delayMs: 250 },
    debug: process.env.ASTROLOGY_DEBUG === 'true',
  });

  const baseSubject: Subject = {
    name: 'Demo User',
    birth_data: {
      year: 1990,
      month: 5,
      day: 11,
      hour: 18,
      minute: 15,
      city: 'London',
      country_code: 'GB',
      timezone: 'Europe/London',
    },
  };

  const partner: Subject = {
    ...baseSubject,
    name: 'Partner',
    birth_data: {
      ...baseSubject.birth_data,
      year: 1992,
      month: 3,
      day: 27,
    },
  };

  const transitMoment: DateTimeLocation = {
    year: 2024,
    month: 5,
    day: 11,
    hour: 12,
    minute: 30,
    city: 'New York',
    country_code: 'US',
    timezone: 'America/New_York',
  };

  const positionsRequest: PlanetaryPositionsRequest = { subject: baseSubject };
  const positions = await client.data.getPositions(positionsRequest);
  console.log(
    'Positions planets:',
    positions.planets?.map((p) => p.name),
  );

  const natalChart = await client.charts.getNatalChart({ subject: baseSubject });
  console.log('Natal chart houses count:', natalChart.houses?.length);

  const synastryRequest: SynastryReportRequest = {
    subject1: baseSubject,
    subject2: partner,
  };
  const synastry = await client.analysis.getSynastryReport(synastryRequest);
  console.log('Synastry sections:', synastry.sections?.length);

  const horoscopeRequest: PersonalizedHoroscopeRequest = { subject: baseSubject };
  const horoscope = await client.horoscope.getPersonalDailyHoroscope(horoscopeRequest);
  console.log('Daily horoscope life areas:', horoscope.life_areas);

  const relationshipInsights = await client.insights.relationship.getCompatibility({
    subjects: [baseSubject, partner],
  });
  console.log('Relationship compatibility keys:', Object.keys(relationshipInsights));

  const svg = await client.svg.getNatalChartSvg({
    subject: baseSubject,
    svg_options: { theme: 'dark', language: 'en' },
  });
  console.log('SVG size:', svg.length);

  const enhancedRequest: GlobalAnalysisRequest = {
    options: {
      house_system: 'W',
      zodiac_type: 'Tropic',
      precision: 3,
      active_points: ['Sun', 'Moon', 'Mercury'],
    },
    orbs: { major_aspects_deg: 2 },
  };
  const enhanced = await client.enhanced.getGlobalAnalysis(enhancedRequest);
  console.log('Enhanced planets:', enhanced.planets.length);

  const transits = await client.charts.getTransitChart({
    natal_subject: baseSubject,
    transit_datetime: transitMoment,
  });
  console.log('Transit chart aspects:', transits.aspects?.length);
}

if (process.env.RUN_ASTROLOGY_EXAMPLE === 'true') {
  runExample().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Example execution failed', error);
  });
}
