import { describe, it, expect } from 'vitest';
import { AstrologyError } from '../../src/errors/AstrologyError';
import { FetchError } from '../../src/utils/fetchClient';

const buildFetchError = (
  status: number,
  message: string,
  body: Record<string, unknown> = { message },
): FetchError => {
  return new FetchError(message, {
    status,
    statusText: message,
    code: 'ERR_BAD_RESPONSE',
    body,
  });
};

describe('AstrologyError', () => {
  it('creates error with metadata', () => {
    const error = new AstrologyError('Oops', { statusCode: 400, code: 'E400', details: { foo: 'bar' } });

    expect(error.name).toBe('AstrologyError');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('E400');
    expect(error.details).toEqual({ foo: 'bar' });
    expect(error.isClientError()).toBe(true);
    expect(error.isServerError()).toBe(false);
  });

  it('normalizes fetch errors', () => {
    const fetchError = buildFetchError(422, 'Invalid data');
    const astrologyError = AstrologyError.fromFetchError(fetchError);

    expect(astrologyError.statusCode).toBe(422);
    expect(astrologyError.code).toBe('ERR_BAD_RESPONSE');
    expect(astrologyError.details).toMatchObject({ message: 'Invalid data' });
  });

  it('falls back to fetch error message when response message missing', () => {
    const fetchError = buildFetchError(400, 'Generic failure');
    const response = AstrologyError.fromFetchError(fetchError);
    expect(response.message).toBe('Generic failure');
  });

  it('defaults to generic message when no context available', () => {
    const fetchError = buildFetchError(500, '', {});
    (fetchError as any).message = undefined;
    const response = AstrologyError.fromFetchError(fetchError);
    expect(response.message).toBe('Unknown error occurred while communicating with Astrology API');
  });

  it('handles fetch errors without response data', () => {
    const fetchError = new FetchError('Network fail', { code: 'ERR_NETWORK' });
    const response = AstrologyError.fromFetchError(fetchError);
    expect(response.statusCode).toBeUndefined();
    expect(response.message).toBe('Network fail');
    expect(response.details).toBeUndefined();
  });

  it('normalizes non-fetch errors', () => {
    const result = AstrologyError.normalize(new Error('Boom'));
    expect(result).toBeInstanceOf(AstrologyError);
    expect(result.message).toBe('Boom');
  });

  it('returns same instance when normalizing AstrologyError', () => {
    const original = new AstrologyError('Existing', { statusCode: 400 });
    const normalized = AstrologyError.normalize(original);
    expect(normalized).toBe(original);
  });

  it('handles unknown values in normalize', () => {
    const result = AstrologyError.normalize({ unexpected: true });
    expect(result.message).toBe('Unknown error');
    expect(result.details).toEqual({ unexpected: true });
  });

  it('detects server errors', () => {
    const serverError = AstrologyError.normalize(buildFetchError(503, 'Unavailable'));
    expect(serverError.isServerError()).toBe(true);
  });
});
