import { useQuery } from '@tanstack/react-query';
import {
  Resource,
  UseQueryProps, FetcherResponse,
  QueryOneKey,
  ApiProps,
} from '../type';
import { getUrlFromResource } from '../utils/get-url-from-resource';
import { useRQWrapperContext } from '../components/RQWrapper';
import { CustomError } from '../utils/custom-error';

/**
 * A hook that helps you fetch a single resource.
 *
 * The hook uses `useQuery` from `@tanstack/react-query` to fetch data and cache it.
 * It accepts various query options and performs the API request to fetch the resource
 * identified by the given `id`. The hook supports additional query parameters and custom
 * API client parameters.
 *
 * If a custom `queryFn` is provided, it will be used to perform the query; otherwise,
 * the default API client method will be used. The `queryKey` is constructed based on
 * the resource path, ID, and other optional parameters to ensure proper caching and
 * refetching.
 *
 * @example
 * import { useGetOne } from 'react-query-manager';
 *
 * type TData = { id: 1, name: 'Test' };
 * const PATH = 'users/{id}/messages';
 *
 * const queryOne = useGetOne<typeof PATH, TData>({
 *   resource: { path: PATH, params: { id: 1 } },
 *   id: 123,
 *   queryOptions: {
 *     onSuccess: (data) => {
 *       console.log('Data fetched successfully:', data);
 *     },
 *   },
 *   params: { include: 'details' },
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
 */
export const useGetOne = <TPath extends string, TData = any>({
  resource,
  id,
  queryOptions,
  params = {},
  apiClientParams,
}: {
  resource: Resource<TPath>;
  id: string | number;
  queryOptions?: UseQueryProps<
    FetcherResponse<TData>,
    QueryOneKey<TPath>,
    {
      resource: Resource<TPath>;
      id: string | number;
      params: QueryOneKey<TPath>['4'];
      queryKey: QueryOneKey<TPath>;
    }
  >;
  params?: QueryOneKey<TPath>['4'];
  apiClientParams?: Partial<ApiProps>;
}) => {
  const { apiUrl, apiClient } = useRQWrapperContext();

  const query = useQuery<
    FetcherResponse<TData>,
    CustomError,
    FetcherResponse<TData>,
    QueryOneKey<TPath>
  >({
    ...queryOptions,
    queryKey: [
      'get-one',
      resource.path,
      resource.params,
      String(id),
      params,
      ...(queryOptions?.queryKey ? queryOptions.queryKey : []),
    ] as QueryOneKey<TPath>,
    queryFn: async ({ queryKey }) => {
      const variables = {
        id, resource, params, queryKey,
      };

      const url = `${apiUrl}/${getUrlFromResource(variables.resource)}/`;

      if (queryOptions?.queryFn) {
        const results = await queryOptions?.queryFn({ apiClient, variables, url });
        return results;
      }

      const result = await apiClient({
        url: `${url}${variables.id}/`, method: 'GET', params, ...apiClientParams,
      });

      return result;
    },
  });

  return query;
};
