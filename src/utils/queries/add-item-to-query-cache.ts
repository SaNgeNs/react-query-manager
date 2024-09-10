import { QueryClient } from '@tanstack/react-query';
import { OnlyObject, QueryOneKey } from '../../type';

/**
 * Adds an item to the query cache based on provided data and cache keys.
 *
 * @template TData - The type of data stored in the cache.
 * @param params - The parameters for the function.
 * @param params.queryClient - The QueryClient instance for interacting with the cache.
 * @param params.data - The new data to add to the corresponding items.
 * @param params.queryKeysOne - Cache keys for single queries that should be updated.
 *
 * @example
 * addItemFromQueryCache({
 *   queryClient,
 *   data: { name: 'New Item' },
 *   queryKeysOne: [['get-one', 'posts', {}, '1']],
 * });
 */
export const addItemToQueryCache = ({
  queryClient,
  data,
  queryKeysOne,
}: {
  queryClient: QueryClient;
  data: OnlyObject;
  queryKeysOne?: [QueryOneKey<''>[0], ...any[]][];
}) => {
  if (queryKeysOne) {
    queryKeysOne.forEach((queryKeyOne) => {
      queryClient.setQueryData(queryKeyOne, data);
    });
  }
};
