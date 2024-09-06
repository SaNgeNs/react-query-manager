import { InfiniteData, QueryClient } from '@tanstack/react-query';
import {
  QueryResponse,
  OnlyObject,
  QueryInfiniteListKey,
  QueryListKey,
  QueryOneKey,
} from '../../type';

/**
 * Adds an item to the query cache based on provided data and cache keys.
 *
 * @template TData - The type of data stored in the cache.
 * @param params - The parameters for the function.
 * @param params.queryClient - The QueryClient instance for interacting with the cache.
 * @param params.data - The new data to add to the corresponding items.
 * @param params.queryKeysOne - Cache keys for single queries that should be updated.
 * @param params.queryKeysList - Cache keys for list queries that should be updated.
 * @param params.queryKeysInfiniteList - Cache keys for infinite list queries that should be updated.
 *
 * @example
 * addItemFromQueryCache({
 *   queryClient,
 *   data: { name: 'New Item' },
 *   queryKeysOne: [['get-one', 'posts', {}, '1']],
 *   queryKeysList: [['get-list', 'posts', {}]],
 *   queryKeysInfiniteList: [['get-infinite-list', 'posts', {}]]
 * });
 */
export const addItemFromQueryCache = <TData = any>({
  queryClient,
  data,
  queryKeysOne,
  queryKeysList,
  queryKeysInfiniteList,
}: {
  queryClient: QueryClient;
  data: OnlyObject;
  queryKeysOne?: [QueryOneKey<''>[0], ...any[]][];
  queryKeysList?: [QueryListKey<''>[0], ...any[]][];
  queryKeysInfiniteList?: [QueryInfiniteListKey<''>[0], ...any[]][];
}) => {
  const updateListData = (page: QueryResponse<TData[]>) => {
    if (!page || !(page.data instanceof Array)) { return page; }

    return {
      ...page,
      data: [
        (data as TData),
        ...page.data,
      ],
    };
  };

  if (queryKeysOne) {
    queryKeysOne.forEach((queryKeyOne) => {
      queryClient.setQueryData(queryKeyOne, data);
    });
  }

  if (queryKeysList) {
    queryKeysList.forEach((queryKey) => {
      queryClient.setQueriesData<QueryResponse<TData[]>>(
        { queryKey },
        updateListData,
      );
    });
  }

  if (queryKeysInfiniteList) {
    queryKeysInfiniteList.forEach((queryKey) => {
      queryClient.setQueriesData<InfiniteData<QueryResponse<TData[]>>>(
        { queryKey },
        (old) => {
          if (!old) { return old; }

          return {
            ...old,
            pages: old.pages.map(updateListData),
          };
        },
      );
    });
  }
};
