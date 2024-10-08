import { useQuery } from '@tanstack/react-query';
import {
  Resource,
  UseQueryProps,
  QueryResponse,
  QueryDataKey,
  ApiProps,
} from '../type';
import { getUrlFromResource } from '../utils/get-url-from-resource';
import { useRQWrapperContext } from '../components/RQWrapper';
import { CustomError } from '../utils/custom-error';

/**
 * A hook that helps you fetch a resource.
 *
 * The hook uses `useQuery` from `@tanstack/react-query` to fetch data and cache it.
 * It accepts various query options and performs an API request to fetch a list of resources
 * based on the provided `resource` and `params`. The hook supports additional query parameters
 * and custom API client parameters.
 *
 * If a custom `queryFn` is provided, it will be used to perform the query; otherwise,
 * the default API client method will be used. The `queryKey` is constructed based on
 * the resource path and additional parameters to ensure proper caching and refetching.
 *
 * @example
 * import { useDataQuery } from 'react-query-manager';
 *
 * type TData = { id: 1, name: 'Test' };
 * const PATH = 'users/{id}/messages';
 *
 * const queryList = useDataQuery<typeof PATH, TData>({
 *   resource: { path: PATH, params: { id: 1 } },
 *   queryOptions: {
 *     onSuccess: (data) => {
 *       console.log('Data fetched successfully:', data);
 *     },
 *   },
 *   params: { sortBy: 'date', order: 'asc' },
 * });
 *
 * @template TPath - The API path as a string.
 * @template TData - The expected shape of the data returned by the API.
 *
 * @param params The parameters for the hook.
 * @param params.queryOptions - Additional options to configure the `useQuery`
 * @param params.resource - The resource path and any static parameters for the API request.
 * @param params.params - Dynamic query parameters for the API request.
 * @param params.apiClientParams - Additional options to pass to the API client.
 *
 * @returns The result of the `useQuery` hook.
 */
export const useDataQuery = <TPath extends string, TData = any>({
  queryOptions,
  resource,
  params = {},
  apiClientParams,
}: {
  queryOptions?: UseQueryProps<
    QueryResponse<TData>,
    QueryDataKey<TPath>,
    {
      resource: Resource<TPath>;
      params: QueryDataKey<TPath>['3'];
      queryKey: QueryDataKey<TPath>;
    }
  >;
  resource: Resource<TPath>;
  params?: QueryDataKey<TPath>['3'];
  apiClientParams?: Partial<ApiProps>;
}) => {
  const { apiUrl, apiClient, apiEnsureTrailingSlash } = useRQWrapperContext();

  const query = useQuery<
    QueryResponse<TData>,
    CustomError,
    QueryResponse<TData>,
    QueryDataKey<TPath>
  >({
    ...queryOptions,
    queryKey: [
      'query-data',
      resource.path,
      resource.params,
      params,
      ...(queryOptions?.queryKey ? queryOptions.queryKey : []),
    ] as QueryDataKey<TPath>,
    queryFn: async ({ queryKey }) => {
      const variables = { resource, params, queryKey };

      const url = `${apiUrl}/${getUrlFromResource(variables.resource, apiEnsureTrailingSlash)}`;

      if (queryOptions?.queryFn) {
        const results = await queryOptions?.queryFn({
          apiClient, apiUrl, variables, url,
        });
        return results;
      }

      const result = await apiClient({
        url, method: 'GET', params, ...apiClientParams,
      });

      return result;
    },
  });

  return query;
};
