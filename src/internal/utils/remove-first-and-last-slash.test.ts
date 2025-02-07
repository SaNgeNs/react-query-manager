import { removeFirstAndLastSlash } from './remove-first-and-last-slash';

describe('removeFirstAndLastSlash', () => {
  it('should remove leading and trailing slashes', () => {
    expect(removeFirstAndLastSlash('/test/path/')).toBe('test/path');
    expect(removeFirstAndLastSlash('//test/path//')).toBe('test/path');
  });

  it('should handle no slashes', () => {
    expect(removeFirstAndLastSlash('test/path')).toBe('test/path');
  });

  it('should handle only leading slash', () => {
    expect(removeFirstAndLastSlash('/test/path')).toBe('test/path');
  });

  it('should handle only trailing slash', () => {
    expect(removeFirstAndLastSlash('test/path/')).toBe('test/path');
  });

  it('should handle empty string', () => {
    expect(removeFirstAndLastSlash('')).toBe('');
  });

  it('should handle string with only slashes', () => {
    expect(removeFirstAndLastSlash('///')).toBe('');
  });

  it('should handle URL-like strings', () => {
    expect(removeFirstAndLastSlash('/users/123/profile/')).toBe('users/123/profile');
    expect(removeFirstAndLastSlash('//api/v1/data//')).toBe('api/v1/data');
  });

  it('should not remove slashes in the middle', () => {
    expect(removeFirstAndLastSlash('/test/path/to/resource/')).toBe('test/path/to/resource');
  });

  it('should handle non-string values by returning an empty string', () => {
    expect(removeFirstAndLastSlash(null as any)).toBe('');
    expect(removeFirstAndLastSlash(undefined as any)).toBe('');
    expect(removeFirstAndLastSlash(123 as any)).toBe('');
    expect(removeFirstAndLastSlash({} as any)).toBe('');
    expect(removeFirstAndLastSlash([] as any)).toBe('');
  });
});
