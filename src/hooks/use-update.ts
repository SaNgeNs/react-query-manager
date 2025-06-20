import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import {
  MutateMode,
  Resource,
  UseMutateProps,
  QueryResponse,
  OnlyObject,
  MutationMode,
  MutateKey,
  ApiProps,
} from '../type';
import { useRQWrapperContext } from '../components/RQWrapper';
import { getUrlFromResource } from '../utils/get-url-from-resource';
import { CustomError } from '../utils/custom-error';
import { Snapshot } from '../internal/type';
import { helpersQueryKeys, invalidateQueries, updateItemsFromQueryCache } from '../utils/queries';
import { createSnapshot } from '../internal/utils/create-snapshot';
import { undoEventEmitter } from '../internal/utils/undo-event-emitter';
import { IS_TEST_ENV } from '../internal/env';

/** @notExported */
type MutateBaseVariables<TPath extends string, TFormData, TType, TExtraData> = (
  TType extends 'many' ? {
    ids: (string | number)[];
    data: TFormData;
    resource: Resource<TPath>;
    apiClientParams?: Partial<ApiProps>;
    extraData?: TExtraData;
    extraResources?: Resource<any>[];
    transformCacheData?: (data: TFormData) => Record<string, any>;
  } : {
    id: string | number;
    data: TFormData;
    resource: Resource<TPath>;
    apiClientParams?: Partial<ApiProps>;
    extraData?: TExtraData;
    extraResources?: Resource<any>[];
    transformCacheData?: (data: TFormData) => Record<string, any>;
  }
)

/** @notExported */
type UpdateBaseVariables<TPath extends string, TFormData, TType, TExtraData> = (
  Omit<MutateBaseVariables<TPath, TFormData, TType, TExtraData>, 'resource'> & {
    resourceParams: Resource<TPath>['params'];
    undoMessage?: string;
  }
);

/** @notExported */
type UpdateBase<TPath extends string, TData, TFormData, TType extends MutationMode, TExtraData> = {
  resourcePath: Resource<TPath>['path'];
  mutationOptions?: UseMutateProps<
    TType extends 'many' ? QueryResponse<TData>[] : QueryResponse<TData>,
    MutateBaseVariables<TPath, TFormData, TType, TExtraData>
  >;
  mode?: MutateMode;
  extraResources?: Resource<any>[];
  shouldUpdateCurrentResource?: boolean;
  shouldInvalidateCache?: boolean;
  type: TType;
}

const useUpdateBase = <
  TPath extends string,
  TData = any,
  TFormData = OnlyObject,
  TType extends MutationMode = 'many',
  TExtraData = any,
>({
    resourcePath,
    mutationOptions,
    mode = {
      optimistic: true,
      undoable: true,
    },
    extraResources: extraResourcesProps = [],
    shouldUpdateCurrentResource = true,
    shouldInvalidateCache = true,
    type = 'many' as TType,
  }: UpdateBase<TPath, TData, TFormData, TType, TExtraData>) => {
  const {
    apiUrl, apiClient, apiEnsureTrailingSlash, toastUndo,
  } = useRQWrapperContext();
  const queryClient = useQueryClient();

  const snapshot = useRef<Snapshot>([]);
  const backToSnapshot = () => {
    snapshot.current.forEach(([key, value]) => {
      queryClient.setQueryData(key, value);
    });
  };

  const { mutate, ...mutation } = useMutation<
    TType extends 'many' ? QueryResponse<TData>[] : QueryResponse<TData>,
    CustomError,
    MutateBaseVariables<TPath, TFormData, TType, TExtraData>
  >({
    ...mutationOptions,
    mutationKey: [
      type === 'many' ? 'update-many' : 'update-one',
      resourcePath,
      ...(mutationOptions?.mutationKey ? mutationOptions.mutationKey : []),
    ] as MutateKey<TPath>,
    mutationFn: async (variables) => {
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, true)}`;

      if (mutationOptions?.mutationFn) {
        const results = await mutationOptions?.mutationFn({
          apiClient, apiUrl, variables, url,
        });
        return results;
      }

      const ids = type === 'many'
        ? (variables as MutateBaseVariables<TPath, TFormData, 'many', TExtraData>).ids
        : [(variables as MutateBaseVariables<TPath, TFormData, 'one', TExtraData>).id];

      const actions = await Promise.allSettled(ids.map((id) => apiClient<TData>({
        url: `${url}${id}${apiEnsureTrailingSlash ? '/' : ''}`,
        method: 'PATCH',
        data: variables.data,
        ...variables.apiClientParams,
      })));

      const result: QueryResponse<TData>[] = [];

      actions.forEach((response) => {
        if (response.status === 'fulfilled') {
          result.push(response.value);
        } else {
          throw response.reason;
        }
      });

      return (type === 'many' ? result : result[0]) as any;
    },
    onSuccess: (...rest) => {
      if (shouldInvalidateCache) {
        const variables = rest[1];

        const extraResources = variables.extraResources ? [
          ...extraResourcesProps,
          ...variables.extraResources,
        ] : extraResourcesProps;

        const ids = type === 'many'
          ? (variables as MutateBaseVariables<TPath, TFormData, 'many', TExtraData>).ids
          : [(variables as MutateBaseVariables<TPath, TFormData, 'one', TExtraData>).id];

        const queryKeys = [
          ...helpersQueryKeys.getOneArray(variables.resource, ids),
          helpersQueryKeys.getList(variables.resource),
          helpersQueryKeys.getInfiniteList(variables.resource),
        ];

        extraResources.forEach((extResource) => {
          queryKeys.push(...helpersQueryKeys.getOneArray(extResource, ids));
          queryKeys.push(helpersQueryKeys.getList(extResource));
          queryKeys.push(helpersQueryKeys.getInfiniteList(extResource));
        });

        invalidateQueries({ queryKeys });
      }

      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(...rest);
      }
    },
    onError: (...rest) => {
      if (mutationOptions?.onError) {
        mutationOptions.onError(...rest);
      }

      backToSnapshot();
    },
  });

  const update = async ({ resourceParams, undoMessage, ...variables }: UpdateBaseVariables<TPath, TFormData, TType, TExtraData>) => {
    const resource: Resource<TPath> = {
      path: resourcePath,
      params: resourceParams,
    };

    const ids = type === 'many'
      ? (variables as any as UpdateBaseVariables<TPath, TFormData, 'many', TExtraData>).ids
      : [(variables as any as UpdateBaseVariables<TPath, TFormData, 'one', TExtraData>).id];

    if (mode.optimistic) {
      const extraResources = variables.extraResources ? [
        ...extraResourcesProps,
        ...variables.extraResources,
      ] : extraResourcesProps;

      const queryKeysOne = shouldUpdateCurrentResource ? helpersQueryKeys.getOneArray(resource, ids) : [];
      const queryKeysList = shouldUpdateCurrentResource ? [helpersQueryKeys.getList(resource)] : [];
      const queryKeysInfiniteList = shouldUpdateCurrentResource ? [helpersQueryKeys.getInfiniteList(resource)] : [];

      extraResources.forEach((extResource) => {
        queryKeysOne.push(...helpersQueryKeys.getOneArray(extResource, ids));
        queryKeysList.push(helpersQueryKeys.getList(extResource));
        queryKeysInfiniteList.push(helpersQueryKeys.getInfiniteList(extResource));
      });

      snapshot.current = await createSnapshot([
        ...queryKeysOne,
        ...queryKeysList,
        ...queryKeysInfiniteList,
      ]);

      const transformedCacheData = variables?.transformCacheData
        ? variables.transformCacheData(variables.data)
        : undefined;

      updateItemsFromQueryCache({
        data: transformedCacheData || variables.data as any,
        ids,
        queryKeysOne,
        queryKeysList,
        queryKeysInfiniteList,
      });
    }

    if (mode.undoable && !IS_TEST_ENV) {
      const isMany = ids.length > 1;

      undoEventEmitter.once('end', (isUndo) => {
        if (isUndo) {
          backToSnapshot();
        } else {
          mutate({ ...variables, resource } as any);
        }
      });

      toastUndo({
        message: undoMessage || `Element${isMany ? 's' : ''} updated`,
        type: isMany ? 'update-many' : 'update-one',
      });
    } else {
      mutate({ ...variables, resource } as any);
    }
  };

  return {
    mutation,
    update,
  };
};

/**
 * A hook that helps you update a single resource.
 *
 * The hook uses `useMutation` from `@tanstack/react-query` under the hood, so it accepts all the same options.
 * It performs an optimistic update by immediately applying the update to the cache before
 * the update request is sent. If the update request fails, the previous state is restored
 * in the cache.
 *
 * If the `undoable` mode is enabled, the hook allows the update to be undone within a certain
 * period of time. If the undo action is not performed, the update will be applied permanently.
 *
 * @example
 * import { useUpdateOne } from 'react-query-manager';
 *
 * type TData = { id: 1, name: 'Test' };
 * type TFormData = { name: string };
 * const PATH = 'users/{id}/messages';
 *
 * const { update } = useUpdateOne<typeof PATH, TData, TFormData>({
 *   resourcePath: PATH,
 * });
 *
 * update({
 *   id: 123,
 *   data: { name: 'John Doe' },
 *   resourceParams: { id: 1 },
 *   undoMessage: 'Message updated',
 * });
 *
 * @template TPath - The API path as a string.
 * @template TData - The expected shape of the data returned by the API.
 * @template TFormData - The shape of the data that will be sent to the API during the mutation.
 *
 * @param props The options for the hook.
 * @returns An object with a single properties, `update` and `mutation`.
 *
 * `update` is a function to perform the update operation.
 * Accepts the ID, data, and params of the resource.
 *
 * `mutation` is result `useMutation` without propery `mutate`
 */
export const useUpdateOne = <
  TPath extends string,
  TData = any,
  TFormData = OnlyObject,
  TExtraData = any,
>(props: Omit<UpdateBase<TPath, TData, TFormData, 'one', TExtraData>, 'type'>) => {
  return useUpdateBase({ ...props, type: 'one' });
};

/**
 * A hook that helps you update multiple resources.
 *
 * The hook uses `useMutation` from `@tanstack/react-query` under the hood, so it accepts all the same options.
 * It performs an optimistic update by immediately applying the update to the cache before
 * the update request is sent. If the update request fails, the previous state is restored
 * in the cache.
 *
 * If the `undoable` mode is enabled, the hook allows the update to be undone within a certain
 * period of time. If the undo action is not performed, the updates will be applied permanently.
 *
 * @example
 * import { useUpdateMany } from 'react-query-manager';
 *
 * type TData = { id: 1, name: 'Test' };
 * type TFormData = { status: 'active' | 'inactive' };
 * const PATH = 'users/{id}/messages';
 *
 * const { update } = useUpdateMany<typeof PATH, TData, TFormData>({
 *   resourcePath: PATH,
 * });
 *
 * update({
 *   ids: [123, 456],
 *   data: { status: 'active' },
 *   resourceParams: { id: 1 },
 *   undoMessage: 'Messages updated',
 * });
 *
 * @template TPath - The API path as a string.
 * @template TData - The expected shape of the data returned by the API.
 * @template TFormData - The shape of the data that will be sent to the API during the mutation.
 *
 * @param props The options for the hook.
 *
 * `update` is a function to perform the update operation.
 * Accepts the array of IDs, data, and params of the resources.
 *
 * `mutation` is result `useMutation` without propery `mutate`
 */
export const useUpdateMany = <
  TPath extends string,
  TData = any,
  TFormData = OnlyObject,
  TExtraData = any,
>(props: Omit<UpdateBase<TPath, TData, TFormData, 'many', TExtraData>, 'type'>) => {
  return useUpdateBase({ ...props, type: 'many' });
};
