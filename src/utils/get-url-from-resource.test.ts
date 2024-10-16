import { getUrlFromResource } from './get-url-from-resource';
import { Resource } from '../type';

describe('getUrlFromResource', () => {
  it('should return a URL with path parameters replaced by corresponding values', () => {
    const resource: Resource<'users/{id}/messages'> = {
      path: 'users/{id}/messages',
      params: { id: '1' },
    };

    const result = getUrlFromResource(resource);
    expect(result).toBe('users/1/messages');
  });

  it('should add a trailing slash when ensureTrailingSlash is true', () => {
    const resource: Resource<'users/{id}/messages'> = {
      path: 'users/{id}/messages',
      params: { id: '1' },
    };

    const result = getUrlFromResource(resource, true);
    expect(result).toBe('users/1/messages/');
  });

  it('should handle multiple path parameters', () => {
    const resource: Resource<'users/{userId}/messages/{messageId}'> = {
      path: 'users/{userId}/messages/{messageId}',
      params: { userId: '1', messageId: '123' },
    };

    const result = getUrlFromResource(resource);
    expect(result).toBe('users/1/messages/123');
  });

  it('should return a URL without a trailing slash when ensureTrailingSlash is false', () => {
    const resource: Resource<'users/{id}/messages'> = {
      path: 'users/{id}/messages',
      params: { id: '1' },
    };

    const result = getUrlFromResource(resource, false);
    expect(result).toBe('users/1/messages');
  });

  it('should work correctly with no placeholders in the path', () => {
    const resource: Resource<'users/all/messages'> = {
      path: 'users/all/messages',
      params: {},
    };

    const result = getUrlFromResource(resource);
    expect(result).toBe('users/all/messages');
  });

  it('should handle empty params and return a correctly formatted path', () => {
    const resource: Resource<'users/{id}/messages'> = {
      path: 'users/{id}/messages',
      params: { id: '' },
    };

    const result = getUrlFromResource(resource);
    expect(result).toBe('users//messages');
  });
});
