import { InfiniteData } from '@tanstack/react-query';
import {
  QueryResponse,
  QueryInfiniteListKey,
  QueryListKey,
  QueryOneKey,
} from '../../type';
import { removeQueries } from './remove-queries';
import { getQueryClient } from '../../internal/query-client';

/**
 * Deletes items from the query cache based on provided IDs.
 *
 * @template TData - The type of data stored in the cache.
 * @param params - The parameters for the function.
 * @param params.ids - The array of item IDs to delete from the cache.
 * @param params.queryKeysOne - Cache keys for single queries that should be deleted.
 * @param params.queryKeysList - Cache keys for list queries from which items should be deleted.
 * @param params.queryKeysInfiniteList - Cache keys for infinite list queries from which items should be deleted.
 *
 * @example
 * deleteItemsFromQueryCache({
 *   ids: [1, 2, 3],
 *   queryKeysOne: [['get-one', 'posts', {}, '1']],
 *   queryKeysList: [['get-list', 'posts', {}]],
 *   queryKeysInfiniteList: [['get-infinite-list', 'posts', {}]]
 * });
 */
export const deleteItemsFromQueryCache = <TData = any>({
  ids,
  queryKeysOne,
  queryKeysList,
  queryKeysInfiniteList,
}: {
  ids: (string | number)[];
  queryKeysOne?: [QueryOneKey<''>[0], ...any[]][];
  queryKeysList?: [QueryListKey<''>[0], ...any[]][];
  queryKeysInfiniteList?: [QueryInfiniteListKey<''>[0], ...any[]][];
}) => {
  const queryClient = getQueryClient();

  const updateListData = (page: QueryResponse<TData[]> | undefined) => {
    if (!page || !(page.data instanceof Array)) { return page; }

    return {
      ...page,
      data: page.data.filter((item: any) => {
        return !ids.some((id) => String(id) === String(item.id));
      }),
    };
  };

  if (queryKeysOne) {
    removeQueries({ queryKeys: queryKeysOne });
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
      queryClient.setQueriesData<InfiniteData<QueryResponse<TData[]> | undefined>>(
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
