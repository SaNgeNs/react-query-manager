import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useRQWrapperContext } from '../components/RQWrapper';
import {
  ApiProps, FetcherResponse, QueryInfiniteListKey,
  QueryInfinitePagination,
  Resource, UseInfiniteQueryProps,
} from '../type';
import { CustomError } from '../utils/custom-error';
import { getUrlFromResource } from '../utils/get-url-from-resource';

/**
 * A hook that helps you fetch a infinite list of resources.
 *
 * The hook uses `useInfiniteQuery` from `@tanstack/react-query` to fetch data and cache it.
 * It accepts various query options and performs an API request to fetch a list of resources
 * based on the provided `resource` and `params`. The hook supports additional query parameters
 * and custom API client parameters.
 *
 * If a custom `queryFn` is provided, it will be used to perform the query; otherwise,
 * the default API client method will be used. The `queryKey` is constructed based on
 * the resource path and additional parameters to ensure proper caching and refetching.
 *
 * By default, this hook sets the following options:
 * - `initialPageParam`: 1
 * - `getNextPageParam`: Calculates the next page number based on the length of the data in the last page.
 * - `getPreviousPageParam`: Calculates the previous page number, but prevents it from going below 1.
 *
 * These default options can be overridden if necessary.
 *
 * @example
 * import { useGetInfiniteList } from 'react-query-manager';
 *
 * type TData = { id: 1, name: 'Test' };
 * const PATH = 'users/{id}/messages';
 *
 * const infiniteQuery = useGetInfiniteList<typeof PATH, TData>({
 *   resource: { path: PATH, params: { id: 10 } },
 *   pagination: { page: ['page_number'], per_page: ['count', 20] },
 * });
 *
 * @template TPath - The API path as a string.
 * @template TData - The expected shape of the data returned by the API.
 *
 * @param {} options - The options object for configuring the hook.
 * @param options.queryOptions - Additional options to configure the `useInfiniteQuery` hook.
 * @param options.resource - The resource path and any static parameters for the API request.
 * @param options.params - Dynamic query parameters for the API request.
 * @param options.apiClientParams - Additional options to pass to the API client.
 * @param options.pagination - The pagination configuration.
 *
 * - **`page`** - An array where the first element is the name of the query parameter that represents the page number. The page number will automatically increment with each subsequent request.
 *
 * - **`per_page`** - An array where the first element is the name of the query parameter that represents the number of items per page, and the second element is the value to be used for that parameter.
 *
 * For example:
 *
 * - **`{ page: ['page_number'], per_page: ['count', 20] }`** will result in query parameters like **`?page_number={{pageParam}}&count=20`**.
 *
 * @returns The result of the `useInfiniteQuery` hook.
 */
export const useGetInfiniteList = <TPath extends string, TData = any>({
  queryOptions,
  resource,
  params = {},
  apiClientParams,
  pagination,
}: {
  queryOptions?: UseInfiniteQueryProps<
    FetcherResponse<TData[]>,
    QueryInfiniteListKey<TPath>,
    {
      resource: Resource<TPath>;
      params: QueryInfiniteListKey<TPath>['4'];
      queryKey: QueryInfiniteListKey<TPath>;
    }
  >;
  resource: Resource<TPath>;
  params?: QueryInfiniteListKey<TPath>['4'];
  apiClientParams?: Partial<ApiProps>;
  pagination: QueryInfinitePagination;
}) => {
  const { apiUrl, apiClient } = useRQWrapperContext();

  const query = useInfiniteQuery<
    FetcherResponse<TData[]>,
    CustomError,
    InfiniteData<FetcherResponse<TData[]>>,
    QueryInfiniteListKey<TPath>
  >({
    initialPageParam: 1,
    getNextPageParam: (...args) => {
      const lastPage = args[0];
      const lastPageParam = Number(args[2]);

      if (!lastPage?.data?.length) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    getPreviousPageParam: (...args) => {
      const firstPageParam = Number(args[2]);

      if (firstPageParam <= 1) {
        return undefined;
      }

      return firstPageParam - 1;
    },
    ...queryOptions,
    queryKey: [
      'get-infinite-list',
      resource.path,
      resource.params,
      pagination,
      params,
      ...(queryOptions?.queryKey ? queryOptions.queryKey : []),
    ] as QueryInfiniteListKey<TPath>,
    queryFn: async ({ queryKey, pageParam }) => {
      const variables = {
        resource,
        params: {
          ...params,
          [pagination.page[0]]: pageParam,
          [pagination.per_page[0]]: pagination.per_page[1],
        },
        queryKey,
      };

      const url = `${apiUrl}/${getUrlFromResource(variables.resource)}/`;

      if (queryOptions?.queryFn) {
        const results = await queryOptions?.queryFn({ apiClient, variables, url });
        return results;
      }

      const result = await apiClient({
        url,
        method: 'GET',
        params: variables.params,
        ...apiClientParams,
      });

      return result;
    },
  });

  return query;
};
