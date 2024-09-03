import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Resource,
  UseMutateProps,
  FetcherResponse,
  OnlyObject,
  MutateKey,
  ApiProps,
} from '../type';
import { useRQWrapperContext } from '../components/RQWrapper';
import { getUrlFromResource } from '../utils/get-url-from-resource';
import { CustomError } from '../utils/custom-error';
import { helpersQueryKeys } from '../utils/queries';
import { invalidateQueryCacheKeys, setQueryCacheData } from '../internal/utils/queries';

/** @notExported */
type MutateVariables<TPath extends string, TFormData> = {
  data: TFormData;
  resource: Resource<TPath>;
  apiClientParams?: Partial<ApiProps>;
}

/** @notExported */
type CreateOneVariables<TPath extends string, TFormData> = (
  Omit<MutateVariables<TPath, TFormData>, 'resource'> & {
    resourceParams: Resource<TPath>['params'];
  }
);

/**
 * A hook that helps you create a new resource.
 *
 * The hook uses `useMutation` under the hood, so it accepts all the same options.
 *
 * The hook returns an object with a single property, `create`, which is a function
 * that takes the data and params of the resource to create, and calls the mutation
 * function with the data and the resource.
 *
 * The hook also sets the query data for the created resource and invalidates the list
 * of resources, so that the list is refetched when the mutation is successful.
 *
 * @example
 * import { useCreate } from '@tanstack/react-query-paginate';
 *
 * type TData = { id: 1, name: 'Test' };
 * type TFormData = { name: string; email: string };
 * const PATH = 'users/{id}/messages';
 *
 * const { create } = useCreate<typeof PATH, TData, TFormData>({
 *   resourcePath: PATH,
 * });
 *
 * create({
 *   data: {
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *   },
 *  resourceParams: {
 *    id: 10,
 *  },
 *   params: {
 *     teamId: 1,
 *   },
 * });
 *
 * @template TPath - The API path as a string.
 * @template TData - The expected shape of the data returned by the API.
 * @template TFormData - The shape of the data that will be sent to the API during the mutation.
 *
 * @param options The options for the hook.
 * @returns An object with a single properties, `create` and `mutation`.
 *
 * `create` is a function that takes the data and params of the resource to create,
 * and calls the mutation function with the data and the resource.
 *
 * `mutation` is result `useMutation` without propery `mutate`
 */
export const useCreate = <
  TPath extends string,
  TData = any,
  TFormData = OnlyObject
>({
    resourcePath,
    mutationOptions,
    extraResources = [],
  } : {
  resourcePath: Resource<TPath>['path'];
  mutationOptions?: UseMutateProps<
    FetcherResponse<TData>,
    MutateVariables<TPath, TFormData>
  >;
  extraResources?: Resource<any>[];
}) => {
  const { apiUrl, apiClient, apiEnsureTrailingSlash } = useRQWrapperContext();
  const queryClient = useQueryClient();

  const { mutate, ...mutation } = useMutation<
    FetcherResponse<TData>,
    CustomError,
    MutateVariables<TPath, TFormData>
  >({
    ...mutationOptions,
    mutationKey: [
      'create',
      resourcePath,
      ...(mutationOptions?.mutationKey ? mutationOptions.mutationKey : []),
    ] as MutateKey<TPath>,
    mutationFn: async (variables) => {
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, apiEnsureTrailingSlash)}`;

      if (mutationOptions?.mutationFn) {
        const results = await mutationOptions?.mutationFn({ apiClient, variables, url });
        return results;
      }

      const result = await apiClient<TData>({
        url,
        method: 'POST',
        data: variables.data,
        ...variables.apiClientParams,
      });

      return result;
    },
    onSuccess: (...rest) => {
      const data = rest[0];
      const variables = rest[1];

      const { id } = data.data as any;

      const queryKeysOne = [helpersQueryKeys.getOne(variables.resource, id)];
      const queryKeysList = [helpersQueryKeys.getList(variables.resource)];
      const queryKeysInfiniteList = [helpersQueryKeys.getInfiniteList(variables.resource)];

      extraResources.forEach((extResource) => {
        queryKeysOne.push(helpersQueryKeys.getOne(extResource, id));
        queryKeysList.push(helpersQueryKeys.getList(extResource));
        queryKeysInfiniteList.push(helpersQueryKeys.getInfiniteList(extResource));
      });

      setQueryCacheData({
        queryClient,
        queryKeys: queryKeysOne.map((item) => ([...item, {}])),
        data: rest[0],
      });

      invalidateQueryCacheKeys({
        queryClient,
        queryKeys: [...queryKeysList, ...queryKeysInfiniteList],
      });

      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(...rest);
      }
    },
  });

  const create = ({ resourceParams, ...variables }: CreateOneVariables<TPath, TFormData>) => {
    const resource: Resource<TPath> = {
      path: resourcePath,
      params: resourceParams,
    };

    mutate({ ...variables, resource });
  };

  return {
    mutation,
    create,
  };
};
