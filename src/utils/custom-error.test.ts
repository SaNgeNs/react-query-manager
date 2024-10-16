import { CustomError } from './custom-error';

describe('CustomError', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let originalCaptureStackTrace: any;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    originalCaptureStackTrace = (Error as any).captureStackTrace;
  });

  afterEach(() => {
    jest.clearAllMocks();
    (Error as any).captureStackTrace = originalCaptureStackTrace;
  });

  it('should create an instance of CustomError with the provided message', () => {
    const errorMessage = 'Test error message';
    const customError = new CustomError(errorMessage);

    expect(customError).toBeInstanceOf(CustomError);
    expect(customError.message).toBe(errorMessage);
    expect(customError.name).toBe('CustomError');
  });

  it('should set the status and data properties if provided', () => {
    const errorMessage = 'Test error message';
    const errorStatus = 404;
    const errorData = { detail: 'Not found' };
    const customError = new CustomError(errorMessage, errorStatus, errorData);

    expect(customError.status).toBe(errorStatus);
    expect(customError.data).toEqual(errorData);
  });

  it('should capture the stack trace if captureStackTrace is available', () => {
    const errorMessage = 'Stack trace test';
    const customError = new CustomError(errorMessage);

    expect(customError.stack).toBeDefined();
    expect(customError.stack).toContain('CustomError');
  });

  it('should log the error message and the error instance', () => {
    const errorMessage = 'Test error message for logging';
    const customError = new CustomError(errorMessage);

    expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage, customError);
  });

  it('should set the stack trace manually if captureStackTrace is not available', () => {
    (Error as any).captureStackTrace = undefined;
    const errorMessage = 'Manual stack trace test';
    const customError = new CustomError(errorMessage);

    expect(customError.stack).toBeDefined();
    expect(customError.stack).toContain('CustomError');
    expect(customError.message).toBe(errorMessage);
  });
});
