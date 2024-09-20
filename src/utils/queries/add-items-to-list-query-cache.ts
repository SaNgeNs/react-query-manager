import { InfiniteData } from '@tanstack/react-query';
import {
  OnlyObject, QueryInfiniteListKey, QueryListKey,
  QueryResponse,
} from '../../type';
import { getQueryClient } from '../../internal/query-client';

/**
 * Adds items to the query cache for list and infinite list queries.
 *
 * @example
 * addItemsToListQueryCache({
 *   data: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }],
 *   queryKeysList: [['get-list', 'posts', {}]],
 *   queryKeysInfiniteList: [['get-infinite-list', 'posts', {}]],
 *   cacheAddItemTo: 'end'
 * });
 */
export const addItemsToListQueryCache = ({
  data,
  queryKeysList,
  queryKeysInfiniteList,
  cacheAddItemTo = 'start',
}: {
  data: OnlyObject[];
  queryKeysList?: [QueryListKey<''>[0], ...OnlyObject[]][];
  queryKeysInfiniteList?: [QueryInfiniteListKey<''>[0], ...OnlyObject[]][];
  cacheAddItemTo?: 'end' | 'start';
}) => {
  const queryClient = getQueryClient();

  const updateListData = (page: QueryResponse<OnlyObject[]> | undefined) => {
    if (!page || !(page.data instanceof Array)) { return page; }

    return {
      ...page,
      data: cacheAddItemTo === 'start'
        ? [...data, ...page.data]
        : [...page.data, ...data],
    };
  };

  if (queryKeysList) {
    queryKeysList.forEach((queryKey) => {
      queryClient.setQueriesData<QueryResponse<OnlyObject[]>>(
        { queryKey },
        updateListData,
      );
    });
  }

  if (queryKeysInfiniteList) {
    queryKeysInfiniteList.forEach((queryKey) => {
      queryClient.setQueriesData<InfiniteData<QueryResponse<OnlyObject[]> | undefined>>(
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
