import { useMutation } from '@tanstack/react-query';
import {
  Resource,
  UseMutateProps,
  QueryResponse,
  MutateDataKey,
  ApiProps,
} from '../type';
import { useRQWrapperContext } from '../components/RQWrapper';
import { getUrlFromResource } from '../utils/get-url-from-resource';
import { CustomError } from '../utils/custom-error';

/** @notExported */
type Variables<TPath extends string, TFormData> = {
  data: TFormData;
  resource: Resource<TPath>;
  apiClientParams: Partial<ApiProps> & {
    method: ApiProps['method']
  };
  extraData?: any;
}

/** @notExported */
type MutateVariables<TPath extends string, TFormData> = (
  Omit<Variables<TPath, TFormData>, 'resource'> & {
    resourceParams: Resource<TPath>['params'];
  }
);

/**
 * A hook that helps you mutate a resource.
 *
 * The hook uses `useMutation` from `@tanstack/react-query` under the hood, so it accepts all the same options.
 *
 * @example
 * import { useDataMutate } from 'react-query-manager';
 *
 * type TData = { id: 1, name: 'Test' };
 * type TFormData = { name: string; email: string };
 * const PATH = 'users/{id}/messages';
 *
 * const { mutate } = useDataMutate<typeof PATH, TData, TFormData>({
 *   resourcePath: PATH,
 * });
 *
 * mutate({
 *   data: {
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *   },
 *   resourceParams: {
 *     id: 10,
 *   },
 *   apiClientParams: { method: 'POST' },
 * });
 *
 * @template TPath - The API path as a string.
 * @template TData - The expected shape of the data returned by the API.
 * @template TFormData - The shape of the data that will be sent to the API during the mutation.
 *
 * @param props The options for the hook.
 *
 * @returns An object with `mutate` and `mutation`.
 *
 * `mutate` is a function to perform the update operation.
 * Accepts the data and params of the resource.
 *
 * `mutation` is result `useMutation` without propery `mutate`
 */
export const useDataMutate = <TPath extends string, TData = any, TFormData = any>({
  resourcePath,
  mutationOptions,
}: {
  resourcePath: Resource<TPath>['path'];
  mutationOptions?: UseMutateProps<
    QueryResponse<TData>,
    Variables<TPath, TFormData>
  >;
}) => {
  const {
    apiUrl, apiClient, apiEnsureTrailingSlash,
  } = useRQWrapperContext();

  const { mutate: onMutate, ...mutation } = useMutation<
    QueryResponse<TData>,
    CustomError,
    Variables<TPath, TFormData>
  >({
    ...mutationOptions,
    mutationKey: [
      'mutate-data',
      resourcePath,
      ...(mutationOptions?.mutationKey ? mutationOptions.mutationKey : []),
    ] as MutateDataKey<TPath>,
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
        data: variables.data,
        ...variables.apiClientParams,
      });

      return result;
    },
  });

  const mutate = async ({ resourceParams, ...variables }: MutateVariables<TPath, TFormData>) => {
    const resource: Resource<TPath> = {
      path: resourcePath,
      params: resourceParams,
    };

    onMutate({ ...variables, resource });
  };

  return {
    mutation,
    mutate,
  };
};
