


import { EclipsesClient } from '../../../src/categories/EclipsesClient';
import { AstrologyError } from '../../../src/errors/AstrologyError';
import type { EclipseInterpretationRequest, EclipseNatalCheckRequest, Subject } from '../../../src/types';
import type {
  EclipseInterpretationResponse,
  EclipseNatalCheckResponse,
  EclipseUpcomingResponse,
} from '../../../src/types/responses';
import { createTestHttpHelper } from '../../utils/testHelpers';
import { mockFetch } from '../../utils/mockFetch';


const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
  name: 'John Doe',
  birth_data: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 10,
    minute: 45,
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

const createNatalCheckRequest = (
  overrides: Partial<EclipseNatalCheckRequest> = {},
): EclipseNatalCheckRequest => ({
  subject: createSubject(),
  max_orb: 3,
  date_range: undefined,
  ...overrides,
});

const createInterpretationRequest = (
  overrides: Partial<EclipseInterpretationRequest> = {},
): EclipseInterpretationRequest => ({
  eclipse_id: '2024Apr08T',
  birth_data: undefined,
  ...overrides,
});


describe('EclipsesClient', () => {
  let client: EclipsesClient;
  

  beforeEach(() => {
    const helper = createTestHttpHelper();
    client = new EclipsesClient(helper);
    
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('retrieves upcoming eclipses', async () => {
    const response = {
      success: true,
      eclipses: [],
    } as EclipseUpcomingResponse;
    mockFetch.onGet('/api/v3/eclipses/upcoming').reply(200, { data: response });

    await expect(client.getUpcoming({ count: 5 })).resolves.toEqual(response);
    expect(mockFetch.history.get[0].params).toMatchObject({ count: '5' });
  });

  it('preserves request config when upcoming params omitted', async () => {
    const response = { success: true, eclipses: [] } as EclipseUpcomingResponse;
    mockFetch.onGet('/api/v3/eclipses/upcoming').reply(200, { data: response });

    await expect(
      client.getUpcoming(undefined, { headers: { 'X-Test': 'true' } }),
    ).resolves.toEqual(response);

    expect(mockFetch.history.get[0].headers['X-Test']).toBe('true');
    expect(mockFetch.history.get[0].params).toBeUndefined();
  });

  it('validates upcoming eclipses params', async () => {
    await expect(client.getUpcoming({ count: 0 })).rejects.toThrow(AstrologyError);
  });

  it('checks eclipse natal impact', async () => {
    const request = createNatalCheckRequest();
    const response = {
      success: true,
      subject_name: 'John Doe',
      search_period: '2024-01-01 to 2024-12-31',
      impactful_eclipses: [],
    } as EclipseNatalCheckResponse;
    mockFetch.onPost('/api/v3/eclipses/natal-check').reply(200, { data: response });

    await expect(client.checkNatalImpact(request)).resolves.toEqual(response);
  });

  it('validates max orb for natal impact', async () => {
    const request = createNatalCheckRequest({ max_orb: 0 });

    await expect(client.checkNatalImpact(request)).rejects.toThrow(AstrologyError);
  });

  it('gets eclipse interpretation', async () => {
    const request = createInterpretationRequest();
    const response = {
      success: true,
      eclipse_id: '2024Apr08T',
      saros_information: {},
      astronomical_data: {},
      astrological_data: {},
      interpretation: { overview: 'Detailed interpretation' },
    } as unknown as EclipseInterpretationResponse;
    mockFetch.onPost('/api/v3/eclipses/interpretation').reply(200, { data: response });

    await expect(client.getInterpretation(request)).resolves.toEqual(response);
  });

  it('validates eclipse interpretation id', async () => {
    const request = createInterpretationRequest({ eclipse_id: '   ' });

    await expect(client.getInterpretation(request)).rejects.toThrow(AstrologyError);
  });
});

