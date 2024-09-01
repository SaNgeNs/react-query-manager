import { Resource } from '../type';
import { removeFirstAndLastSlash } from '../internal/utils/internal';

/**
 * Takes a `Resource` object and returns its path as a string,
 * with any path parameters replaced with their corresponding values.
 *
 * @example
 * const resource = {
 *   path: 'users/{id}/messages',
 *   params: { id: 1 },
 * };
 *
 * getUrlFromResource(resource); // 'users/1/messages'
 */
export const getUrlFromResource = <TPath extends string>(resource: Resource<TPath>) => {
  const url = resource.path.replace(/{(\w+)}/g, (_, key: keyof Resource<TPath>['params']) => {
    return resource.params[key]!.toString();
  });

  return removeFirstAndLastSlash(url);
};
