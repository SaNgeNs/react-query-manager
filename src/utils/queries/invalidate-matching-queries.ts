import { getQueryClient } from '../../internal/query-client';
import { isEqual } from '../../internal/utils/is-equal';

/**
 * Invalidates queries in the cache that match any of the specified key groups.
 *
 * This function uses the `predicate` option to filter queries whose keys match any of the key groups provided.
 * A query's key is considered a match if it contains all the keys from at least one of the key groups.
 * The function then invalidates all such matching queries using `queryClient.invalidateQueries`.
 *
 * @example
 * import { invalidateMatchingQueries } from 'react-query-manager';
 *
 * // Define key groups where each group is an array of keys that must all be present in the queryKey to be considered a match.
 * const keyGroups = [
 *   ['path', 'get-list'],    // Key group 1
 *   ['path', 'get-one'],  // Key group 2
 * ];
 *
 * // Invalidate queries with keys matching any of the key groups
 * invalidateMatchingQueries({ queryKeys: keyGroups });
 *
 * @param params
 * @param params.queryKeys - An array of arrays, where each inner array represents a group of keys that must all be present
 *                           in a query's key for that query to be invalidated.
 *                           Example: `[['path', 'get-list'], ['path', 'get-one']]`.
 *
 * This function:
 * - Retrieves all cached queries.
 * - Checks if the key of each query matches any of the provided key groups.
 * - Invalidates the queries whose keys match any of the specified key groups.
 *
 * @returns {void} - This function does not return a value.
 */
export const invalidateMatchingQueries = ({
  queryKeys,
}: {
  queryKeys: any[][],
}) => {
  const queryClient = getQueryClient();

  queryClient.invalidateQueries({
    predicate: (query) => {
      const keys = query.queryKey;

      return queryKeys.some((keyGroup) => (
        keyGroup.every((matchKey) => keys.some((key) => isEqual(key, matchKey)))
      ));
    },
  });
};
