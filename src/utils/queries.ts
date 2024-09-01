import { InfiniteData, QueryClient } from '@tanstack/react-query';
import {
  FetcherResponse,
  OnlyObject,
  QueryInfiniteListKey,
  QueryListKey,
  QueryOneKey,
  Resource,
  TakeFirstKeys,
} from '../type';
import { mergeObjects } from '../internal/utils/internal';

/**
 * Deletes items from the query cache based on provided IDs.
 *
 * @template TData - The type of data stored in the cache.
 * @param params - The parameters for the function.
 * @param params.queryClient - The QueryClient instance for interacting with the cache.
 * @param params.ids - The array of item IDs to delete from the cache.
 * @param params.queryKeysOne - Cache keys for single queries that should be deleted.
 * @param params.queryKeysList - Cache keys for list queries from which items should be deleted.
 * @param params.queryKeysInfiniteList - Cache keys for infinite list queries from which items should be deleted.
 *
 * @example
 * deleteItemsFromQueryCache({
 *   queryClient,
 *   ids: [1, 2, 3],
 *   queryKeysOne: [['get-one', 'posts', {}, '1']],
 *   queryKeysList: [['get-list', 'posts', {}]],
 *   queryKeysInfiniteList: [['get-infinite-list', 'posts', {}]]
 * });
 */
export const deleteItemsFromQueryCache = <TData = any>({
  queryClient,
  ids,
  queryKeysOne,
  queryKeysList,
  queryKeysInfiniteList,
}: {
  queryClient: QueryClient;
  ids: (string | number)[];
  queryKeysOne?: [QueryOneKey<''>[0], ...any[]][];
  queryKeysList?: [QueryListKey<''>[0], ...any[]][];
  queryKeysInfiniteList?: [QueryInfiniteListKey<''>[0], ...any[]][];
}) => {
  const updateListData = (page: FetcherResponse<TData[]> | undefined) => {
    if (!page || !(page.data instanceof Array)) { return page; }

    return {
      ...page,
      data: page.data.filter((item: any) => {
        return !ids.some((id) => String(id) === String(item.id));
      }),
    };
  };

  if (queryKeysOne) {
    queryKeysOne.forEach((queryKeyOne) => {
      queryClient.removeQueries({ queryKey: queryKeyOne });
    });
  }

  if (queryKeysList) {
    queryKeysList.forEach((queryKey) => {
      queryClient.setQueriesData<FetcherResponse<TData[]>>(
        { queryKey },
        updateListData,
      );
    });
  }

  if (queryKeysInfiniteList) {
    queryKeysInfiniteList.forEach((queryKey) => {
      queryClient.setQueriesData<InfiniteData<FetcherResponse<TData[]>>>(
        { queryKey },
        (old) => {
          if (!old) { return old; }

          return {
            ...old,
            pages: old.pages.map(updateListData) as FetcherResponse<TData[]>[],
          };
        },
      );
    });
  }
};

/**
 * Updates items in the query cache based on provided IDs and new data.
 *
 * @template TData - The type of data stored in the cache.
 * @param params - The parameters for the function.
 * @param params.queryClient - The QueryClient instance for interacting with the cache.
 * @param params.data - The new data to update the corresponding items.
 * @param params.ids - The array of item IDs to update.
 * @param params.queryKeysOne - Cache keys for single queries that should be updated.
 * @param params.queryKeysList - Cache keys for list queries that should be updated.
 * @param params.queryKeysInfiniteList - Cache keys for infinite list queries that should be updated.
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
  queryClient,
  data,
  ids,
  queryKeysOne,
  queryKeysList,
  queryKeysInfiniteList,
}: {
  queryClient: QueryClient;
  data: OnlyObject;
  ids: (string | number)[];
  queryKeysOne?: [QueryOneKey<''>[0], ...any[]][];
  queryKeysList?: [QueryListKey<''>[0], ...any[]][];
  queryKeysInfiniteList?: [QueryInfiniteListKey<''>[0], ...any[]][];
}) => {
  const updateListData = (page: FetcherResponse<TData[]> | undefined) => {
    if (!page || !(page.data instanceof Array)) { return page; }

    return {
      ...page,
      data: page.data.map((item: any) => {
        return ids.some((id) => String(id) === String(item.id))
          ? mergeObjects(item, data)
          : item;
      }),
    };
  };

  if (queryKeysOne) {
    queryKeysOne.forEach((queryKeyOne) => {
      queryClient.setQueriesData<FetcherResponse<TData>>(
        { queryKey: queryKeyOne },
        (old) => {
          if (!old || !(old.data instanceof Object) || !(data instanceof Object)) {
            return old;
          }

          return { ...old, data: mergeObjects(old.data, data) };
        },
      );
    });
  }

  if (queryKeysList) {
    queryKeysList.forEach((queryKey) => {
      queryClient.setQueriesData<FetcherResponse<TData[]>>(
        { queryKey },
        updateListData,
      );
    });
  }

  if (queryKeysInfiniteList) {
    queryKeysInfiniteList.forEach((queryKey) => {
      queryClient.setQueriesData<InfiniteData<FetcherResponse<TData[]>>>(
        { queryKey },
        (old) => {
          if (!old) { return old; }

          return {
            ...old,
            pages: old.pages.map(updateListData) as FetcherResponse<TData[]>[],
          };
        },
      );
    });
  }
};

/**
 * A utility object for generating query keys used in React Query.
 */
export const helpersQueryKeys = {
  /**
   * Generates a query key for fetching a single item by ID.
   *
   * @param itemResource - The resource object containing the path and parameters for the query.
   * @param id - The ID of the item to fetch.
   * @returns The query key for the single item.
   *
   * @example
   * const key = helpersQueryKeys.getOne(resource, 1);
   * // key: ['get-one', 'posts', {}, '1']
   */
  getOne: (
    (itemResource: Resource<any>, id: string | number): TakeFirstKeys<QueryOneKey<any>, 4> => (
      ['get-one', itemResource.path, itemResource.params, String(id)]
    )
  ),

  /**
   * Generates an array of query keys for fetching multiple items by their IDs.
   *
   * @param itemResource - The resource object containing the path and parameters for the query.
   * @param ids - An array of IDs for the items to fetch.
   * @returns An array of query keys for the items.
   *
   * @example
   * const keys = helpersQueryKeys.getOneArray(resource, [1, 2]);
   * // keys: [
   * //   ['get-one', 'posts', {}, '1'],
   * //   ['get-one', 'posts', {}, '2']
   * // ]
   */
  getOneArray: (
    (itemResource: Resource<any>, ids: (string | number)[]): TakeFirstKeys<QueryOneKey<any>, 4>[] => ids.map((id) => (
      ['get-one', itemResource.path, itemResource.params, String(id)]
    ))
  ),

  /**
   * Generates a query key for fetching a list of items.
   *
   * @param itemResource - The resource object containing the path and parameters for the query.
   * @returns The query key for the list of items.
   *
   * @example
   * const key = helpersQueryKeys.getList(resource);
   * // key: ['get-list', 'posts', {}]
   */
  getList: (
    (itemResource: Resource<any>): TakeFirstKeys<QueryListKey<any>, 3> => (
      ['get-list', itemResource.path, itemResource.params]
    )
  ),

  /**
   * Generates a query key for fetching an infinite list of items.
   *
   * @param itemResource - The resource object containing the path and parameters for the query.
   * @returns The query key for the infinite list of items.
   *
   * @example
   * const key = helpersQueryKeys.getInfiniteList(resource);
   * // key: ['get-infinite-list', 'posts', {}]
   */
  getInfiniteList: (
    (itemResource: Resource<any>): TakeFirstKeys<QueryInfiniteListKey<any>, 3> => (
      ['get-infinite-list', itemResource.path, itemResource.params]
    )
  ),
};
