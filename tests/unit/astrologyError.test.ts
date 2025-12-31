import { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { describe, it, expect } from 'vitest';
import { AstrologyError } from '../../src/errors/AstrologyError';

const buildAxiosError = (status: number, message: string, data: Record<string, unknown> = { message }): AxiosError => {
  const config: AxiosRequestConfig = { url: '/test', method: 'get' };
  const internalConfig = config as InternalAxiosRequestConfig;
  return new AxiosError(
    message,
    'ERR_BAD_RESPONSE',
    internalConfig,
    undefined,
    {
      status,
      statusText: message,
      headers: {},
      config: internalConfig,
      data,
    },
  );
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

  it('normalizes axios errors', () => {
    const axiosError = buildAxiosError(422, 'Invalid data');
    const astrologyError = AstrologyError.fromAxiosError(axiosError);

    expect(astrologyError.statusCode).toBe(422);
    expect(astrologyError.code).toBe('ERR_BAD_RESPONSE');
    expect(astrologyError.details).toMatchObject({ message: 'Invalid data' });
  });

  it('falls back to axios error message when response message missing', () => {
    const axiosError = buildAxiosError(400, 'Generic failure');
    const response = AstrologyError.fromAxiosError(axiosError);
    expect(response.message).toBe('Generic failure');
  });

  it('defaults to generic message when no context available', () => {
    const axiosError = buildAxiosError(500, '', {});
    (axiosError as any).message = undefined;
    const response = AstrologyError.fromAxiosError(axiosError);
    expect(response.message).toBe('Unknown error occurred while communicating with Astrology API');
  });

  it('handles axios errors without response data', () => {
    const axiosError = new AxiosError('Network fail', 'ERR_NETWORK');
    const response = AstrologyError.fromAxiosError(axiosError);
    expect(response.statusCode).toBeUndefined();
    expect(response.message).toBe('Network fail');
    expect(response.details).toBeDefined();
  });

  it('normalizes non-axios errors', () => {
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
    const serverError = AstrologyError.normalize(buildAxiosError(503, 'Unavailable'));
    expect(serverError.isServerError()).toBe(true);
  });
});

