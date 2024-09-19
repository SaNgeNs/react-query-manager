import { QueryClient } from '@tanstack/react-query';

/**
 * Remove queries in the cache that have a key matching any of the specified `queryKeys`.
 *
 * @param params
 * @param params.queryClient - The `QueryClient` instance from `@tanstack/react-query` used to interact with the query cache.
 * @param params.queryKeys - An array of arrays of keys for which the corresponding queries should be removed.
 *
 * @example
 * removeQueries({
 *   queryClient,
 *   queryKeys: [
 *     ['get-list', 'path'],
 *     ['get-one', 'path', '1'],
 *   ],
 * });
 *
 * @returns {void} - This function does not return a value.
 */
export const removeQueries = ({
  queryClient,
  queryKeys,
}: {
  queryClient: QueryClient,
  queryKeys: any[][],
}) => {
  queryKeys.forEach((queryKey) => {
    queryClient.removeQueries({ queryKey });
  });
};
