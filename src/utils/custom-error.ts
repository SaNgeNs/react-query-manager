/**
 * Custom error class for handling HTTP request errors.
 *
 * @class
 * @extends {Error}
 * @param message - The error message.
 * @param status - The HTTP status code associated with the error.
 * @param data - Additional data related to the error.
 *
 * @example
 * try {
 *   // Some code that may throw an error
 * } catch (error) {
 *   throw new CustomError('Failed to fetch resource', 500, error);
 * }
 */
export class CustomError extends Error {
  constructor(
      public readonly message: string,
      public readonly status?: number,
      public readonly data?: any,
  ) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);

    this.name = this.constructor.name;

    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }

    this.stack = new Error().stack;

    // eslint-disable-next-line no-console
    console.error(this.message, this);
  }
}
