import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import {
  MutateMode,
  Resource,
  UseMutateProps, FetcherResponse,
  MutationMode,
  MutateKey,
  ApiProps,
} from '../type';
import { useRQWrapperContext } from '../components/RQWrapper';
import { getUrlFromResource } from '../utils/get-url-from-resource';
import { CustomError } from '../utils/custom-error';
import { createSnapshot, undoEventEmitter } from '../internal/utils/internal';
import { Snapshot } from '../internal/type';
import { deleteItemsFromQueryCache, helpersQueryKeys } from '../utils/queries';
import { invalidateQueryCacheKeys } from '../internal/utils/queries';

/** @notExported */
type MutateBaseVariables<TPath extends string, TType> = (
  TType extends 'many' ? {
    ids: (string | number)[];
    resource: Resource<TPath>;
    apiClientParams?: Partial<ApiProps>;
  } : {
    id: string | number;
    resource: Resource<TPath>;
    apiClientParams?: Partial<ApiProps>;
  }
);

/** @notExported */
type DeleteBaseVariables<TPath extends string, TType> = (
  Omit<MutateBaseVariables<TPath, TType>, 'resource'> & {
    resourceParams: Resource<TPath>['params'];
    undoMessage?: string;
  }
);

/** @notExported */
type DeleteBase<
  TPath extends string,
  TData = any,
  TType extends MutationMode = 'many'
> = {
  resourcePath: Resource<TPath>['path'];
  mutationOptions?: UseMutateProps<
    TType extends 'many' ? FetcherResponse<TData>[] : FetcherResponse<TData>,
    MutateBaseVariables<TPath, TType>
  >;
  mode?: MutateMode;
  extraResources?: Resource<any>[];
  type: TType;
};

const useDeleteBase = <
  TPath extends string,
  TData = any,
  TType extends MutationMode = 'many'
>({
    resourcePath,
    mutationOptions,
    mode = {
      optimistic: true,
      undoable: true,
    },
    extraResources = [],
    type = 'many' as TType,
  }: DeleteBase<TPath, TData, TType>) => {
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
    TType extends 'many' ? FetcherResponse<TData>[] : FetcherResponse<TData>,
    CustomError,
    MutateBaseVariables<TPath, TType>
  >({
    ...mutationOptions,
    mutationKey: [
      type === 'many' ? 'delete-many' : 'delete-one',
      resourcePath,
      ...(mutationOptions?.mutationKey ? mutationOptions.mutationKey : []),
    ] as MutateKey<TPath>,
    mutationFn: async (variables) => {
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, apiEnsureTrailingSlash)}`;

      if (mutationOptions?.mutationFn) {
        const results = await mutationOptions?.mutationFn({ apiClient, variables, url });
        return results;
      }

      const ids = type === 'many'
        ? (variables as MutateBaseVariables<TPath, 'many'>).ids
        : [(variables as MutateBaseVariables<TPath, 'one'>).id];

      const actions = await Promise.allSettled(ids.map((id) => apiClient<TData>({
        url: `${url}${id}/`,
        method: 'DELETE',
        ...variables.apiClientParams,
      })));

      const result: FetcherResponse<TData>[] = [];

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
      const variables = rest[1];

      const queryKeys = [
        helpersQueryKeys.getList(variables.resource),
        helpersQueryKeys.getInfiniteList(variables.resource),
      ];

      extraResources.forEach((extResource) => {
        queryKeys.push(helpersQueryKeys.getList(extResource));
        queryKeys.push(helpersQueryKeys.getInfiniteList(extResource));
      });

      invalidateQueryCacheKeys({ queryClient, queryKeys });

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

  const deleteBase = async ({ resourceParams, undoMessage, ...variables }: DeleteBaseVariables<TPath, TType>) => {
    const resource: Resource<TPath> = {
      path: resourcePath,
      params: resourceParams,
    };

    const ids = type === 'many'
      ? (variables as any as DeleteBaseVariables<TPath, 'many'>).ids
      : [(variables as any as DeleteBaseVariables<TPath, 'one'>).id];

    if (mode.optimistic) {
      const queryKeysOne = helpersQueryKeys.getOneArray(resource, ids);
      const queryKeysList = [helpersQueryKeys.getList(resource)];
      const queryKeysInfiniteList = [helpersQueryKeys.getInfiniteList(resource)];

      extraResources.forEach((extResource) => {
        queryKeysOne.push(...helpersQueryKeys.getOneArray(extResource, ids));
        queryKeysList.push(helpersQueryKeys.getList(extResource));
        queryKeysInfiniteList.push(helpersQueryKeys.getInfiniteList(extResource));
      });

      snapshot.current = await createSnapshot(queryClient, [
        ...queryKeysOne,
        ...queryKeysList,
        ...queryKeysInfiniteList,
      ]);

      deleteItemsFromQueryCache({
        queryClient,
        ids,
        queryKeysOne,
        queryKeysList,
        queryKeysInfiniteList,
      });
    }

    if (mode.undoable) {
      const isMany = ids.length > 1;

      undoEventEmitter.once('end', (isUndo) => {
        if (isUndo) {
          backToSnapshot();
        } else {
          mutate({ ...variables, resource } as any);
        }
      });

      toastUndo({
        message: undoMessage || `Element${isMany ? 's' : ''} deleted`,
        type: isMany ? 'delete-many' : 'delete-one',
      });
    } else {
      mutate({ ...variables, resource } as any);
    }
  };

  return {
    mutation,
    delete: deleteBase,
  };
};

/**
 * A hook that helps you delete a single resource.
 *
 * The hook uses `useMutation` under the hood, so it accepts all the same options.
 * It performs an optimistic update by removing the resource from the cache before
 * the deletion request is sent. If the deletion fails, the resource is restored in the cache.
 *
 * If the `undoable` mode is enabled, the hook allows the deletion to be undone within a certain
 * period of time. If the undo action is not performed, the resource will be permanently deleted.
 *
 * @example
 * import { useDeleteOne } from 'react-query-manager';
 *
 * type TData = { id: 1, name: 'Test' };
 * const PATH = 'users/{id}/messages';
 *
 * const { delete: deleteOne } = useDeleteOne<typeof PATH, TData>({
 *   resourcePath: PATH,
 * });
 *
 * deleteOne({
 *   id: 123,
 *   resourceParams: { id: 1 },
 *   undoMessage: 'Message deleted',
 * });
 *
 *
 * @template TPath - The API path as a string.
 * @template TData - The expected shape of the data returned by the API.
 *
 * @param props - The options for the hook.
 * @returns An object with properties, `delete` and `mutation`.
 *
 * `delete` is a function that takes the ID and params of the resource to delete,
 * and calls the mutation function with the necessary data.
 *
 * `mutation` is result `useMutation` without propery `mutate`
 */
export const useDeleteOne = <
  TPath extends string,
  TData = any,
>(props: Omit<DeleteBase<TPath, TData, 'one'>, 'type'>) => {
  return useDeleteBase({ ...props, type: 'one' });
};

/**
 * A hook that helps you delete multiple resources at once.
 *
 * The hook uses `useMutation` under the hood, so it accepts all the same options.
 * It performs an optimistic update by removing the resources from the cache before
 * the deletion requests are sent. If any deletion fails, the resources are restored in the cache.
 *
 * If the `undoable` mode is enabled, the hook allows the deletions to be undone within a certain
 * period of time. If the undo action is not performed, the resources will be permanently deleted.
 *
 * @example
 * import { useDeleteMany } from 'react-query-manager';
 *
 * type TData = { id: 1, name: 'Test' };
 * const PATH = 'users/{id}/messages';
 *
 * const { delete: deleteMany } = useDeleteMany<typeof PATH, TData>({
 *   resourcePath: PATH,
 * });
 *
 * deleteMany({
 *   ids: [123, 456],
 *   resourceParams: { id: 1 },
 *   undoMessage: 'Messages deleted',
 * });
 *
 * @template TPath - The API path as a string.
 * @template TData - The expected shape of the data returned by the API.
 *
 * @param props - The options for the hook.
 * @returns An object with properties, `delete` and `mutation`.
 *
 * `delete` is a function that takes the ID and params of the resource to delete,
 * and calls the mutation function with the necessary data.
 *
 * `mutation` is result `useMutation` without propery `mutate`
 */
export const useDeleteMany = <
  TPath extends string,
  TData = any,
>(props: Omit<DeleteBase<TPath, TData, 'many'>, 'type'>) => {
  return useDeleteBase({ ...props, type: 'many' });
};
