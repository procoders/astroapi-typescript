


import { NumerologyClient } from '../../../src/categories/NumerologyClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type { MultipleSubjectsRequest, Subject, SingleSubjectRequest } from '../../../src/types';
import type {
  NumerologyCompatibilityResponse,
  NumerologyComprehensiveResponse,
  NumerologyCoreResponse,
} from '../../../src/types/responses';
import { createTestHttpHelper } from '../../utils/testHelpers';
import { mockFetch } from '../../utils/mockFetch';


const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'Test Person',
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

const createCoreRequest = (overrides: Partial<SingleSubjectRequest> = {}): SingleSubjectRequest => ({
  subject: createSubject(),
  options: {
    system: 'pythagorean',
    target_year: 2024,
  } as unknown as SingleSubjectRequest['options'],
  ...overrides,
});

const createComprehensiveRequest = (
  overrides: Partial<SingleSubjectRequest> = {},
): SingleSubjectRequest => ({
  subject: createSubject({ name: 'Comprehensive Person' }),
  options: {
    system: 'both',
    target_year: 2025,
  } as unknown as SingleSubjectRequest['options'],
  ...overrides,
});

const createCompatibilityRequest = (
  overrides: Partial<MultipleSubjectsRequest> = {},
): MultipleSubjectsRequest => ({
  subjects: [createSubject({ name: 'First Person' }), createSubject({ name: 'Second Person' })],
  options: {
    analysis_type: 'romantic',
  } as unknown as MultipleSubjectsRequest['options'],
  ...overrides,
});


describe('NumerologyClient', () => {
  let client: NumerologyClient;
  

  beforeEach(() => {
    const helper = createTestHttpHelper();
    client = new NumerologyClient(helper);
    
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('retrieves numerology core numbers', async () => {
    const request = createCoreRequest();
    const response = { core_numbers: {} } as NumerologyCoreResponse;
    mockFetch.onPost('/api/v3/numerology/core-numbers').reply(200, { data: response });

    await expect(client.getCoreNumbers(request)).resolves.toEqual(response);
  });

  it('validates numerology subject name presence', async () => {
    const request = createCoreRequest({ subject: createSubject({ name: '' }) });

    await expect(client.getCoreNumbers(request)).rejects.toThrow(AstrologyError);
  });

  it('retrieves comprehensive numerology report', async () => {
    const request = createComprehensiveRequest();
    const response = { report: {} } as NumerologyComprehensiveResponse;
    mockFetch.onPost('/api/v3/numerology/comprehensive').reply(200, { data: response });

    await expect(client.getComprehensiveReport(request)).resolves.toEqual(response);
  });

  it('retrieves numerology compatibility', async () => {
    const request = createCompatibilityRequest();
    const response = { compatibility: {} } as NumerologyCompatibilityResponse;
    mockFetch.onPost('/api/v3/numerology/compatibility').reply(200, { data: response });

    await expect(client.analyzeCompatibility(request)).resolves.toEqual(response);
  });

  it('validates compatibility subject count', async () => {
    const request = createCompatibilityRequest({
      subjects: [createSubject({ name: 'Single Person' })],
    });

    await expect(client.analyzeCompatibility(request)).rejects.toThrow(AstrologyError);
  });

  it('validates compatibility analysis type', async () => {
    const request = createCompatibilityRequest({
      options: { analysis_type: 'invalid' } as unknown as MultipleSubjectsRequest['options'],
    });

    await expect(client.analyzeCompatibility(request)).rejects.toThrow(AstrologyError);
  });
});

