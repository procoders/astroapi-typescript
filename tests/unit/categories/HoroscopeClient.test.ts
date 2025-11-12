import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { HoroscopeClient } from '../../../src/categories/HoroscopeClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type {
  ChineseHoroscopeRequest,
  PersonalTextHoroscopeRequest,
  PersonalizedHoroscopeRequest,
  SunSignHoroscopeRequest,
  SunSignMonthlyHoroscopeRequest,
  SunSignWeeklyHoroscopeRequest,
  SunSignYearlyHoroscopeRequest,
  TextHoroscopeRequest,
  TextMonthlyHoroscopeRequest,
  TextWeeklyHoroscopeRequest,
} from '../../../src/types';
import type {
  ChineseHoroscopeResponse,
  HoroscopeTextResponse,
  PersonalDailyHoroscopeResponse,
  SunSignMonthlyHoroscopeResponse,
  SunSignWeeklyHoroscopeResponse,
  SunSignYearlyHoroscopeResponse,
} from '../../../src/types/responses';
import { AxiosHttpHelper } from '../../../src/utils/http';

const createHoroscopeClient = () => {
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

  return { client: new HoroscopeClient(helper), mock };
};

const createSubject = () => ({
  name: 'Test User',
  birth_data: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 14,
    minute: 30,
    city: 'London',
    country_code: 'GB',
  },
});

describe('HoroscopeClient', () => {
  let client: HoroscopeClient;
  let mock: MockAdapter;

  beforeEach(() => {
    const factory = createHoroscopeClient();
    client = factory.client;
    mock = factory.mock;
  });

  afterEach(() => {
    mock.reset();
  });

  it('retrieves personal daily horoscope', async () => {
    const request: PersonalizedHoroscopeRequest = { subject: createSubject(), date: '2024-03-15' };
    const response: PersonalDailyHoroscopeResponse = {
      date: '2024-03-15',
      overall_theme: 'Great day',
      overall_rating: 5,
      life_areas: [],
      planetary_influences: [],
    };

    mock.onPost('/api/v3/horoscope/personal/daily').reply(200, { data: response });

    await expect(client.getPersonalDailyHoroscope(request)).resolves.toEqual(response);
  });

  it('validates personal daily horoscope subject', async () => {
    const request = {
      subject: {
        name: 'Invalid',
        birth_data: {
          year: 1990,
          month: 13,
          day: 10,
        },
      },
    } as unknown as PersonalizedHoroscopeRequest;

    await expect(client.getPersonalDailyHoroscope(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves personal daily text horoscope', async () => {
    const request: PersonalTextHoroscopeRequest = { subject: createSubject(), format: 'paragraph' };
    const response: HoroscopeTextResponse = { text: 'A wonderful day awaits.' };

    mock.onPost('/api/v3/horoscope/personal/daily/text').reply(200, { result: response });

    await expect(client.getPersonalDailyHoroscopeText(request)).resolves.toEqual(response);
  });

  it('validates personal text horoscope request date', async () => {
    const request = {
      subject: createSubject(),
      date: '15-03-2024',
    } as unknown as PersonalTextHoroscopeRequest;

    await expect(client.getPersonalDailyHoroscopeText(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves sign daily horoscope', async () => {
    const request: SunSignHoroscopeRequest = { sign: 'Aries', date: '2024-03-15' };
    const response: PersonalDailyHoroscopeResponse = {
      date: '2024-03-15',
      overall_theme: 'Energy and action',
      overall_rating: 4,
      life_areas: [],
      planetary_influences: [],
    };

    mock.onPost('/api/v3/horoscope/sign/daily').reply(200, response);

    await expect(client.getSignDailyHoroscope(request)).resolves.toEqual(response);
  });

  it('validates sign daily horoscope sign', async () => {
    const request = {
      sign: 'NotASign',
      date: '2024-03-15',
    } as unknown as SunSignHoroscopeRequest;

    await expect(client.getSignDailyHoroscope(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves sign daily text horoscope', async () => {
    const request: TextHoroscopeRequest = { sign: 'Tau', format: 'short' };
    const response: HoroscopeTextResponse = { text: 'Stay focused on essentials today.' };

    mock.onPost('/api/v3/horoscope/sign/daily/text').reply(200, { data: response });

    await expect(client.getSignDailyHoroscopeText(request)).resolves.toEqual(response);
  });

  it('retrieves sign weekly horoscope', async () => {
    const request: SunSignWeeklyHoroscopeRequest = { sign: 'Gem', start_date: '2024-03-11' };
    const response: SunSignWeeklyHoroscopeResponse = { week_start: '2024-03-11' };

    mock.onPost('/api/v3/horoscope/sign/weekly').reply(200, response);

    await expect(client.getSignWeeklyHoroscope(request)).resolves.toEqual(response);
  });

  it('validates sign weekly horoscope start date', async () => {
    const request = {
      sign: 'Gemini',
      start_date: '11-03-2024',
    } as SunSignWeeklyHoroscopeRequest;

    await expect(client.getSignWeeklyHoroscope(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves sign weekly text horoscope', async () => {
    const request: TextWeeklyHoroscopeRequest = { sign: 'Cancer', format: 'paragraph' };
    const response: HoroscopeTextResponse = { text: 'A balanced week awaits you.' };

    mock.onPost('/api/v3/horoscope/sign/weekly/text').reply(200, { result: response });

    await expect(client.getSignWeeklyHoroscopeText(request)).resolves.toEqual(response);
  });

  it('retrieves sign monthly horoscope', async () => {
    const request: SunSignMonthlyHoroscopeRequest = { sign: 'Leo', month: '2024-03' };
    const response: SunSignMonthlyHoroscopeResponse = { month: '2024-03' };

    mock.onPost('/api/v3/horoscope/sign/monthly').reply(200, { data: response });

    await expect(client.getSignMonthlyHoroscope(request)).resolves.toEqual(response);
  });

  it('validates sign monthly horoscope month format', async () => {
    const request = {
      sign: 'Leo',
      month: '2024/03',
    } as SunSignMonthlyHoroscopeRequest;

    await expect(client.getSignMonthlyHoroscope(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves sign monthly text horoscope', async () => {
    const request: TextMonthlyHoroscopeRequest = { sign: 'Virgo', month: '2024-04' };
    const response: HoroscopeTextResponse = { text: 'Focus on practical improvements this month.' };

    mock.onPost('/api/v3/horoscope/sign/monthly/text').reply(200, response);

    await expect(client.getSignMonthlyHoroscopeText(request)).resolves.toEqual(response);
  });

  it('retrieves sign yearly horoscope', async () => {
    const request: SunSignYearlyHoroscopeRequest = { sign: 'Capricorn', year: 2025 };
    const response: SunSignYearlyHoroscopeResponse = { year: 2025 };

    mock.onPost('/api/v3/horoscope/sign/yearly').reply(200, { data: response });

    await expect(client.getSignYearlyHoroscope(request)).resolves.toEqual(response);
  });

  it('validates sign yearly horoscope year range', async () => {
    const request = {
      sign: 'Capricorn',
      year: 1800,
    } as SunSignYearlyHoroscopeRequest;

    await expect(client.getSignYearlyHoroscope(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves Chinese horoscope', async () => {
    const request: ChineseHoroscopeRequest = {
      subject: {
        name: 'Test',
        birth_data: { year: 1990, month: 5, day: 15 },
      },
      year: 2024,
    };
    const response: ChineseHoroscopeResponse = { pillars: [] };

    mock.onPost('/api/v3/horoscope/chinese/bazi').reply(200, { result: response });

    await expect(client.getChineseHoroscope(request)).resolves.toEqual(response);
  });

  it('validates Chinese horoscope gender', async () => {
    const request = {
      subject: {
        birth_data: {
          year: 1990,
          gender: 'unknown',
        },
      },
    } as unknown as ChineseHoroscopeRequest;

    await expect(client.getChineseHoroscope(request)).rejects.toThrow(AstrologyError);
  });

  it('validates text horoscope emoji flag', async () => {
    const request = {
      sign: 'Aries',
      use_emoji: 'yes',
    } as unknown as TextHoroscopeRequest;

    await expect(client.getSignDailyHoroscopeText(request)).rejects.toThrow(AstrologyError);
  });
});

