import { getQueryClient } from '../../internal/query-client';

/**
 * Invalidates queries in the cache that have a key matching any of the specified `queryKeys`.
 *
 * @param params
 * @param params.queryKeys - An array of arrays of keys for which the corresponding queries should be invalidated.
 *
 * @example
 * invalidateQueries({
 *   queryKeys: [
 *     ['get-list', 'path'],
 *     ['get-one', 'path', '1'],
 *   ],
 * });
 *
 * @returns {void} - This function does not return a value.
 */
export const invalidateQueries = ({
  queryKeys,
}: {
  queryKeys: any[][],
}) => {
  const queryClient = getQueryClient();

  queryKeys.forEach((queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  });
};
