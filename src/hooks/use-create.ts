import { useMutation } from '@tanstack/react-query';
import {
  Resource,
  UseMutateProps,
  QueryResponse,
  OnlyObject,
  MutateKey,
  ApiProps,
} from '../type';
import { useRQWrapperContext } from '../components/RQWrapper';
import { getUrlFromResource } from '../utils/get-url-from-resource';
import { CustomError } from '../utils/custom-error';
import {
  addItemsToListQueryCache, addItemToQueryCache, helpersQueryKeys, invalidateQueries,
} from '../utils/queries';

/** @notExported */
type MutateVariables<TPath extends string, TFormData, TExtraData> = {
  data: TFormData;
  resource: Resource<TPath>;
  apiClientParams?: Partial<ApiProps>;
  extraData?: TExtraData;
}

/** @notExported */
type CreateOneVariables<TPath extends string, TFormData, TExtraData> = (
  Omit<MutateVariables<TPath, TFormData, TExtraData>, 'resource'> & {
    resourceParams: Resource<TPath>['params'];
  }
);

/**
 * A hook that helps you create a new resource.
 *
 * The hook uses `useMutation` from `@tanstack/react-query` under the hood, so it accepts all the same options.
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
  TFormData = OnlyObject,
  TExtraData = any
>({
    resourcePath,
    mutationOptions,
    extraResources = [],
    shouldUpdateCurrentResource = true,
    cacheAddItemTo = 'start',
    isInvalidateCache = true,
  } : {
  resourcePath: Resource<TPath>['path'];
  mutationOptions?: UseMutateProps<
    QueryResponse<TData> | QueryResponse<TData>[],
    MutateVariables<TPath, TFormData, TExtraData>
  >;
  extraResources?: Resource<any>[];
  shouldUpdateCurrentResource?: boolean;
  cacheAddItemTo?: 'start' | 'end';
  isInvalidateCache?: boolean;
}) => {
  const { apiUrl, apiClient, apiEnsureTrailingSlash } = useRQWrapperContext();

  const { mutate, ...mutation } = useMutation<
    QueryResponse<TData> | QueryResponse<TData>[],
    CustomError,
    MutateVariables<TPath, TFormData, TExtraData>
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
        const results = await mutationOptions?.mutationFn({
          apiClient, apiUrl, variables, url,
        });
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

      if (data) {
        const variables = rest[1];

        const queryKeysList = shouldUpdateCurrentResource ? [helpersQueryKeys.getList(variables.resource)] : [];
        const queryKeysInfiniteList = shouldUpdateCurrentResource ? [helpersQueryKeys.getInfiniteList(variables.resource)] : [];

        extraResources.forEach((extResource) => {
          queryKeysList.push(helpersQueryKeys.getList(extResource));
          queryKeysInfiniteList.push(helpersQueryKeys.getInfiniteList(extResource));
        });

        const responses = Array.isArray(data) ? data : [data];

        responses.forEach((response) => {
          const { id } = response!.data as any;

          const queryKeysOne = shouldUpdateCurrentResource ? [helpersQueryKeys.getOne(variables.resource, id)] : [];

          extraResources.forEach((extResource) => {
            queryKeysOne.push(helpersQueryKeys.getOne(extResource, id));
          });

          addItemToQueryCache({
            data: response!.data || {},
            queryKeysOne: queryKeysOne.map((item) => ([...item, {}])),
          });
        });

        addItemsToListQueryCache({
          data: responses.map((response) => (response?.data || {})),
          cacheAddItemTo,
          queryKeysInfiniteList,
          queryKeysList,
        });

        if (isInvalidateCache) {
          invalidateQueries({
            queryKeys: [...queryKeysList, ...queryKeysInfiniteList],
          });
        }
      }

      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(...rest);
      }
    },
  });

  const create = ({ resourceParams, ...variables }: CreateOneVariables<TPath, TFormData, TExtraData>) => {
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
