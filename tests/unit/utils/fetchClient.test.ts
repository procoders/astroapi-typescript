import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FetchHttpClient, FetchError } from '../../../src/utils/fetchClient';
import { mockFetch } from '../../utils/mockFetch';

describe('FetchHttpClient', () => {
  let client: FetchHttpClient;

  beforeEach(() => {
    client = new FetchHttpClient({
      baseURL: 'https://api.example.com',
      timeout: 5000,
    });
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('throws FetchError for HTTP errors without interceptor', async () => {
    mockFetch.onGet('/api/test').reply(500, { message: 'Server error' });

    await expect(client.get('/api/test')).rejects.toBeInstanceOf(FetchError);
  });

  it('handles network errors', async () => {
    mockFetch.onGet('/api/test').networkError();

    await expect(client.get('/api/test')).rejects.toBeInstanceOf(FetchError);
  });

  it('handles timeout errors', async () => {
    mockFetch.onGet('/api/test').timeout();

    await expect(client.get('/api/test')).rejects.toThrow();
  });

  it('combines user signal with timeout signal', async () => {
    const controller = new AbortController();
    mockFetch.onGet('/api/test').reply(200, { data: 'ok' });

    // Pass a user signal
    const result = await client.get('/api/test', { signal: controller.signal });
    expect(result).toEqual({ data: 'ok' });
  });

  it('returns combined signal when user signal provided', async () => {
    const controller = new AbortController();
    mockFetch.onGet('/api/test').reply((config) => {
      // Signal should exist (combined from user signal and timeout)
      expect(config.signal).toBeDefined();
      return [200, { data: 'ok' }];
    });

    const result = await client.get('/api/test', { signal: controller.signal });
    expect(result).toEqual({ data: 'ok' });
  });

  it('handles text response type', async () => {
    mockFetch.onGet('/api/test').replyRaw(200, '<html>Test</html>');

    const result = await client.get<string>('/api/test', { responseType: 'text' });
    expect(result).toBe('<html>Test</html>');
  });

  it('builds URL with query params correctly', async () => {
    mockFetch.onGet('/api/test').reply(200, { data: 'ok' });

    await client.get('/api/test', {
      params: { foo: 'bar', num: 42, bool: true, empty: undefined },
    });

    expect(mockFetch.history.get[0].params).toMatchObject({
      foo: 'bar',
      num: '42',
      bool: 'true',
    });
    expect(mockFetch.history.get[0].params?.empty).toBeUndefined();
  });

  it('supports PUT and DELETE methods', async () => {
    mockFetch.onPut('/api/test').reply(200, { data: 'updated' });
    mockFetch.onDelete('/api/delete').reply(200, { data: 'deleted' });

    const putResult = await client.put('/api/test', { value: 1 });
    expect(putResult).toEqual({ data: 'updated' });

    const deleteResult = await client.delete('/api/delete');
    expect(deleteResult).toEqual({ data: 'deleted' });
  });

  it('includes custom headers in requests', async () => {
    mockFetch.onGet('/api/test').reply((config) => {
      expect(config.headers?.['X-Custom']).toBe('value');
      return [200, { data: 'ok' }];
    });

    await client.get('/api/test', {
      headers: { 'X-Custom': 'value' },
    });
  });
});

describe('FetchError', () => {
  it('creates error from response with body', async () => {
    const mockResponse = new Response(
      JSON.stringify({ message: 'Not found', code: 'NOT_FOUND' }),
      { status: 404, statusText: 'Not Found' },
    );

    const error = await FetchError.fromResponse(mockResponse);

    expect(error.status).toBe(404);
    expect(error.statusText).toBe('Not Found');
    expect(error.code).toBe('NOT_FOUND');
    expect(error.message).toBe('Not found');
  });

  it('creates error from response with text body', async () => {
    const mockResponse = new Response('Plain text error', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    const error = await FetchError.fromResponse(mockResponse);

    expect(error.status).toBe(500);
    expect(error.body).toBe('Plain text error');
  });

  it('creates error from network failure', () => {
    const networkError = new TypeError('fetch failed');
    const error = FetchError.fromNetworkError(networkError);

    expect(error.message).toBe('fetch failed');
    expect(error.status).toBeUndefined();
  });

  it('creates error from AbortError', () => {
    const abortError = new Error('The operation was aborted');
    abortError.name = 'AbortError';
    const error = FetchError.fromNetworkError(abortError);

    expect(error.code).toBe('ECONNABORTED');
  });

  it('creates error preserving original error code', () => {
    const errorWithCode = new Error('Connection refused') as Error & { code?: string };
    errorWithCode.code = 'ECONNREFUSED';
    const error = FetchError.fromNetworkError(errorWithCode);

    expect(error.code).toBe('ECONNREFUSED');
  });

  it('ignores non-string code property', () => {
    const errorWithNumericCode = new Error('Some error') as Error & { code?: number };
    (errorWithNumericCode as unknown as { code: number }).code = 123;
    const error = FetchError.fromNetworkError(errorWithNumericCode as unknown as Error);

    expect(error.code).toBeUndefined();
  });

  it('handles error without code property', () => {
    const plainError = new Error('Plain error');
    const error = FetchError.fromNetworkError(plainError);

    expect(error.code).toBeUndefined();
    expect(error.message).toBe('Plain error');
  });
});

describe('FetchHttpClient with interceptors', () => {
  let client: FetchHttpClient;

  beforeEach(() => {
    client = new FetchHttpClient({
      baseURL: 'https://api.example.com',
      timeout: 5000,
    });
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('calls error interceptor when FetchError is caught', async () => {
    const errorInterceptor = vi.fn().mockRejectedValue(new Error('Interceptor error'));
    client.setResponseInterceptor(
      async () => { throw new FetchError('Test error', { status: 400 }); },
      errorInterceptor,
    );

    mockFetch.onGet('/api/test').reply(200, { data: 'ok' });

    await expect(client.get('/api/test')).rejects.toThrow('Interceptor error');
    expect(errorInterceptor).toHaveBeenCalled();
  });
});

describe('FetchHttpClient with pre-aborted signal', () => {
  let client: FetchHttpClient;

  beforeEach(() => {
    client = new FetchHttpClient({
      baseURL: 'https://api.example.com',
      timeout: 5000,
    });
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('handles pre-aborted user signal', async () => {
    const controller = new AbortController();
    controller.abort(); // Pre-abort the signal

    mockFetch.onGet('/api/test').reply(200, { data: 'ok' });

    await expect(
      client.get('/api/test', { signal: controller.signal }),
    ).rejects.toThrow();
  });

  it('propagates abort from user signal to combined signal', async () => {
    const controller = new AbortController();
    let capturedSignal: AbortSignal | undefined;

    mockFetch.onGet('/api/test').reply((config) => {
      capturedSignal = config.signal;
      return [200, { data: 'ok' }];
    });

    await client.get('/api/test', { signal: controller.signal });

    // Abort after request completes to trigger the abort event listener
    controller.abort();

    // Give microtask queue time to process the abort event
    await new Promise((resolve) => setTimeout(resolve, 0));

    // After abort, the combined signal should also be aborted
    expect(capturedSignal?.aborted).toBe(true);
  });
});

describe('FetchError edge cases', () => {
  it('handles response where body parsing completely fails', async () => {
    // Create a response that fails both JSON and text parsing
    const badResponse = {
      clone: () => ({
        json: () => Promise.reject(new Error('JSON parse failed')),
        text: () => Promise.reject(new Error('Text read failed')),
      }),
      status: 500,
      statusText: 'Internal Server Error',
    } as unknown as Response;

    const error = await FetchError.fromResponse(badResponse);

    expect(error.status).toBe(500);
    expect(error.message).toBe('Internal Server Error');
    expect(error.body).toBeUndefined();
  });

  it('uses HTTP Error fallback when statusText is undefined', async () => {
    const responseWithoutStatusText = {
      clone: () => ({
        json: () => Promise.reject(new Error('JSON parse failed')),
        text: () => Promise.reject(new Error('Text read failed')),
      }),
      status: 418,
      statusText: undefined,
    } as unknown as Response;

    const error = await FetchError.fromResponse(responseWithoutStatusText);

    expect(error.status).toBe(418);
    expect(error.message).toBe('HTTP Error 418');
  });

  it('creates error for TypeError network failure', () => {
    const typeError = new TypeError('Failed to fetch');
    const error = FetchError.fromNetworkError(typeError);

    expect(error.message).toBe('Failed to fetch');
    expect(error.code).toBe('ENETWORK');
  });
});

describe('FetchHttpClient URL building', () => {
  let client: FetchHttpClient;

  beforeEach(() => {
    client = new FetchHttpClient({
      baseURL: 'https://api.example.com/',
      timeout: 5000,
    });
  });

  afterEach(() => {
    mockFetch.reset();
  });

  it('handles path without leading slash', async () => {
    mockFetch.onGet('/api/test').reply((config) => {
      expect(config.url).toContain('/api/test');
      return [200, { data: 'ok' }];
    });

    await client.get('api/test');
    expect(mockFetch.history.get[0].url).toContain('/api/test');
  });

  it('handles path with leading slash', async () => {
    mockFetch.onGet('/api/test').reply(200, { data: 'ok' });

    await client.get('/api/test');
    expect(mockFetch.history.get[0].url).toContain('/api/test');
  });

  it('handles baseURL with trailing slash', async () => {
    mockFetch.onGet('/api/test').reply(200, { data: 'ok' });

    await client.get('/api/test');
    // Base URL should have trailing slash stripped
    expect(mockFetch.history.get[0].url).toBe('https://api.example.com/api/test');
  });
});

describe('FetchHttpClient without timeout config', () => {
  it('uses default timeout when not specified', async () => {
    const client = new FetchHttpClient({
      baseURL: 'https://api.example.com',
    });

    mockFetch.onGet('/api/test').reply(200, { data: 'ok' });

    const result = await client.get('/api/test');
    expect(result).toEqual({ data: 'ok' });
  });
});
