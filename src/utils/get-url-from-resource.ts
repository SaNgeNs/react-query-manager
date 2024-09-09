import { removeFirstAndLastSlash } from '../internal/utils/remove-first-and-last-slash';
import { Resource } from '../type';

/**
 * Takes a `Resource` object and returns its path as a string,
 * with any path parameters replaced with their corresponding values.
 * Optionally, it can ensure that the returned URL has a trailing slash.
 *
 * @template TPath - A string literal representing the path template with placeholders.
 *
 * @param {Resource<TPath>} resource - The `Resource` object containing the path and parameters.
 * @param {boolean} ensureTrailingSlash - If `true`, the returned URL will have a trailing slash.
 *
 * @returns {string} The URL with all placeholders replaced by the corresponding values from `params`.
 *
 * @example
 * const resource = {
 *   path: 'users/{id}/messages',
 *   params: { id: 1 },
 * };
 *
 * getUrlFromResource(resource, false); // 'users/1/messages'
 * getUrlFromResource(resource, true);  // 'users/1/messages/'
 */
export const getUrlFromResource = <TPath extends string>(resource: Resource<TPath>, ensureTrailingSlash?: boolean) => {
  const url = removeFirstAndLastSlash(resource.path.replace(/{(\w+)}/g, (_, key: keyof Resource<TPath>['params']) => {
    return resource.params[key]!.toString();
  }));

  return ensureTrailingSlash ? `${url}/` : url;
};
