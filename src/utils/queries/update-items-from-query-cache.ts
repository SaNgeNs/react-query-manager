import { InfiniteData } from '@tanstack/react-query';
import {
  QueryResponse,
  OnlyObject,
  QueryInfiniteListKey,
  QueryListKey,
  QueryOneKey,
} from '../../type';
import { mergeObjects } from '../../internal/utils/merge-objects';
import { getQueryClient } from '../../internal/query-client';

/**
 * Updates items in the query cache based on provided IDs and new data.
 *
 * @template TData - The type of data stored in the cache.
 * @param params - The parameters for the function.
 * @param params.data - The new data to update the corresponding items.
 * @param params.ids - The array of item IDs to update.
 * @param params.queryKeysOne - Cache keys for single queries that should be updated.
 * @param params.queryKeysList - Cache keys for list queries that should be updated.
 * @param params.queryKeysInfiniteList - Cache keys for infinite list queries that should be updated.
 * @param params.overwriteOnTypeMismatch - If true, allows merging of properties even if their types mismatch between target and source.
 *
 * @example
 * updateItemsFromQueryCache({
 *   queryClient,
 *   data: { name: 'Updated Name' },
 *   ids: [1, 2, 3],
 *   queryKeysOne: [['get-one', 'posts', {}, '1']],
 *   queryKeysList: [['get-list', 'posts', {}]],
 *   queryKeysInfiniteList: [['get-infinite-list', 'posts', {}]]
 * });
 */
export const updateItemsFromQueryCache = <TData = any>({
  data,
  ids,
  queryKeysOne,
  queryKeysList,
  queryKeysInfiniteList,
  overwriteOnTypeMismatch,
  overwriteOnTypeMismatchKeys,
}: {
  data: OnlyObject;
  ids: (string | number)[];
  queryKeysOne?: [QueryOneKey<''>[0], ...any[]][];
  queryKeysList?: [QueryListKey<''>[0], ...any[]][];
  queryKeysInfiniteList?: [QueryInfiniteListKey<''>[0], ...any[]][];
  overwriteOnTypeMismatch?: boolean;
  overwriteOnTypeMismatchKeys?: string[];
}) => {
  const queryClient = getQueryClient();

  const updateListData = (page: QueryResponse<TData[]> | undefined) => {
    if (!page || !(page.data instanceof Array)) { return page; }

    return {
      ...page,
      data: page.data.map((item: any) => {
        return ids.some((id) => String(id) === String(item.id))
          ? mergeObjects(item, data, { overwriteOnTypeMismatch, overwriteOnTypeMismatchKeys })
          : item;
      }),
    };
  };

  if (queryKeysOne) {
    queryKeysOne.forEach((queryKeyOne) => {
      queryClient.setQueriesData<QueryResponse<TData>>(
        { queryKey: queryKeyOne },
        (old) => {
          if (!old || !(old.data instanceof Object) || !(data instanceof Object)) {
            return old;
          }

          return { ...old, data: mergeObjects(old.data, data, { overwriteOnTypeMismatch, overwriteOnTypeMismatchKeys }) };
        },
      );
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
