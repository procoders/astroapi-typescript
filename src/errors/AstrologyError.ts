import { AxiosError, isAxiosError } from 'axios';

export interface AstrologyErrorOptions {
  statusCode?: number;
  code?: string;
  details?: unknown;
  cause?: unknown;
}

export class AstrologyError extends Error {
  public readonly statusCode?: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(message: string, options: AstrologyErrorOptions = {}) {
    super(message);
    this.name = 'AstrologyError';
    this.statusCode = options.statusCode;
    this.code = options.code;
    this.details = options.details;

    if (options.cause !== undefined) {
      // @ts-expect-error cause is supported in modern runtimes
      this.cause = options.cause;
    }
  }

  static fromAxiosError(error: AxiosError): AstrologyError {
    const statusCode = error.response?.status;
    const code = error.code ?? (error.response?.data as { code?: string })?.code;
    const details = error.response?.data ?? error.toJSON();
    const message =
      (error.response?.data as { message?: string })?.message ??
      error.message ??
      'Unknown error occurred while communicating with Astrology API';

    return new AstrologyError(message, {
      statusCode,
      code,
      details,
      cause: error,
    });
  }

  static normalize(error: unknown): AstrologyError {
    if (error instanceof AstrologyError) {
      return error;
    }

    if (isAxiosError(error)) {
      return AstrologyError.fromAxiosError(error);
    }

    if (error instanceof Error) {
      return new AstrologyError(error.message, { cause: error });
    }

    return new AstrologyError('Unknown error', { details: error });
  }

  isClientError(): boolean {
    return Boolean(this.statusCode && this.statusCode >= 400 && this.statusCode < 500);
  }

  isServerError(): boolean {
    return Boolean(this.statusCode && this.statusCode >= 500);
  }
}
