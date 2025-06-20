import * as _tanstack_react_query from '@tanstack/react-query';
import { UseQueryOptions, UseInfiniteQueryOptions, InfiniteData, UseMutationOptions, QueryClientConfig } from '@tanstack/react-query';
export * from '@tanstack/react-query';
import * as react_hot_toast from 'react-hot-toast';
import { ToasterProps, Toast } from 'react-hot-toast';
import React, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as react_hot_toast_headless from 'react-hot-toast/headless';
import { Renderable, ToastPosition } from 'react-hot-toast/headless';

/**
 * Custom error class for handling HTTP request errors.
 *
 * @class
 * @extends {Error}
 * @param message - The error message.
 * @param status - The HTTP status code associated with the error.
 * @param data - Additional data related to the error.
 *
 * @example
 * try {
 *   // Some code that may throw an error
 * } catch (error) {
 *   throw new CustomError('Failed to fetch resource', 500, error);
 * }
 */
declare class CustomError extends Error {
    readonly message: string;
    readonly status?: number | undefined;
    readonly data?: any;
    constructor(message: string, status?: number | undefined, data?: any);
}

type UndoTypes = 'update-one' | 'update-many' | 'delete-one' | 'delete-many';
type ToastProps = Omit<ToasterProps, 'children'>;
type ToastCustomContent = ToasterProps['children'];
type Headers = Record<string, string>;
type ToastCustomUndoContent = (data: {
    message: string;
    type: UndoTypes;
    onUndo: () => void;
    toast: Toast;
}) => React.JSX.Element;
type OnlyObject = Record<string, unknown>;
type MutationMode = 'many' | 'one';
type FetcherResponse<TData = any> = {
    status: number;
    statusText: string;
    headers: Headers;
    data: TData;
};
type ApiProps = {
    url: string;
    method: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';
    options?: Omit<RequestInit, 'method' | 'body' | 'headers'>;
    headers?: Headers;
    authorization?: string;
    params?: OnlyObject;
    queryParamsSerializer?: (params: OnlyObject) => string;
    queryArrayParamStyle?: 'indexedArray' | 'repeatedParameters';
    data?: any;
    onSuccess?: (data: any, args: Omit<ApiProps, 'onSuccess' | 'onError' | 'context'>, context: ApiProps['context']) => void;
    onError?: (error: CustomError, args: Omit<ApiProps, 'onSuccess' | 'onError' | 'context'>, context: ApiProps['context']) => void;
    context?: any;
};
type ApiClient = <TData = any>(args: ApiProps) => Promise<FetcherResponse<TData>>;
type RQWrapperContextProps = {
    apiUrl: string;
    apiClient: ApiClient;
    apiEnsureTrailingSlash: boolean;
    toastUndo: (data: {
        message: string;
        type: UndoTypes;
    }) => void;
};
type QueryResponse<TData = any> = FetcherResponse<TData> | null;
type UseQueryProps<TData extends QueryResponse, TQueryKey extends any[], TVariables extends object> = (Partial<Omit<UseQueryOptions<TData, Error, TData, TQueryKey>, 'queryKey' | 'queryFn'>>) & {
    queryKey?: any[];
    queryFn?: (data: {
        apiClient: ApiClient;
        apiUrl: string;
        url: string;
        variables: TVariables;
    }) => Promise<QueryResponse> | QueryResponse;
};
type UseInfiniteQueryProps<TData extends QueryResponse, TQueryKey extends any[], TVariables extends object> = (Partial<Omit<UseInfiniteQueryOptions<TData, Error, InfiniteData<TData>, TData, TQueryKey>, 'queryKey' | 'queryFn'>>) & {
    queryKey?: any[];
    queryFn?: (data: {
        apiClient: ApiClient;
        apiUrl: string;
        url: string;
        variables: TVariables;
    }) => Promise<QueryResponse> | QueryResponse;
};
type UseMutateProps<TData extends QueryResponse | QueryResponse[], TVariables = object> = (Partial<Omit<UseMutationOptions<TData, Error, TVariables, any>, 'mutationKey' | 'mutationFn'>>) & {
    mutationKey?: any[];
    mutationFn?: (data: {
        apiClient: ApiClient;
        apiUrl: string;
        variables: TVariables;
        url: string;
    }) => Promise<TData> | TData;
};
type ExtractParams<TPath extends string> = TPath extends `${string}{${infer Param}}${infer Rest}` ? Param | ExtractParams<Rest> : never;
type PathParams<TPath extends string> = ExtractParams<TPath> extends never ? Record<string, never> : {
    [K in ExtractParams<TPath>]: string;
};
/** Represents a resource with a given path and parameters. */
type Resource<TPath extends string> = {
    /** The path of the resource. */
    path: TPath;
    /** The parameters of the resource. */
    params: ExtractParams<TPath> extends never ? Record<string, never> : PathParams<TPath>;
};
/** Defines the mode for mutation operations. */
type MutateMode = {
    /** Indicates whether the operation should use optimistic updates. */
    optimistic?: boolean;
    /** Indicates whether the operation should be undoable. */
    undoable?: boolean;
};
type QueryListKey<TPath extends string> = ['get-list', Resource<TPath>['path'], Resource<TPath>['params'], Record<string, any>, ...any[]];
type QueryInfinitePagination = {
    page: [string];
    per_page: [string, number];
};
type QueryInfiniteListKey<TPath extends string> = ['get-infinite-list', Resource<TPath>['path'], Resource<TPath>['params'], QueryInfinitePagination, Record<string, any>, ...any[]];
type QueryOneKey<TPath extends string> = ['get-one', Resource<TPath>['path'], Resource<TPath>['params'], string, Record<string, any>, ...any[]];
type QueryDataKey<TPath extends string> = ['query-data', Resource<TPath>['path'], Resource<TPath>['params'], Record<string, any>, ...any[]];
type MutateTypes = 'update-one' | 'update-many' | 'delete-one' | 'delete-many' | 'create';
type MutateKey<TPath extends string> = [MutateTypes, Resource<TPath>['path'], ...any[]];
type MutateDataKey<TPath extends string> = ['mutate-data', Resource<TPath>['path'], ...any[]];
/**
 * A utility type that extracts the first `N` elements from a tuple type `T`.
 * If the tuple `T` has fewer than `N` elements, it returns the entire tuple.
 *
 * This type is implemented recursively:
 * - On each step, it adds the first element of the tuple `T` to the result array `R`.
 * - The recursion stops when the length of the result array `R` reaches `N`.
 *
 * @template T - The tuple type from which to extract the first `N` elements.
 * @template N - The number of elements to extract from the start of the tuple.
 * @template R - An accumulator for storing the extracted elements (used internally in the recursion). Defaults to an empty array `[]`.
 *
 * @example
 * // Extracts the first 2 elements from the tuple
 * type Example = TakeFirstKeys<QueryListKey<'post'>, 2>;
 * // Result: ['get-list', 'post']
 */
type TakeFirstKeys<T extends any[], N extends number, R extends any[] = []> = R['length'] extends N ? R : T extends [infer First, ...infer Rest] ? TakeFirstKeys<Rest, N, [...R, First]> : R;

/**
 * A utility function for making API requests.
 *
 * @example
 * import { fetcher } from 'react-query-manager';
 *
 * fetcher({
 *   url: 'https://jsonplaceholder.typicode.com/todos/1',
 *   method: 'GET',
 *   onSuccess: (data, args, context) => {
 *     console.log(data);
 *     console.log(args);
 *     console.log(context);
 *   },
 *   onError: (error, args, context) => {
 *     console.error(error);
 *     console.error(args);
 *     console.error(context);
 *   },
 *   context: { value: '1' }
 * });
 *
 * @param args The request configuration.
 *
 * @returns The response as a promise.
 */
declare const fetcher: ApiClient;

/**
 * A hook that helps you fetch a list of resources.
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
 * import { useGetList } from 'react-query-manager';
 *
 * type TData = { id: 1, name: 'Test' };
 * const PATH = 'users/{id}/messages';
 *
 * const queryList = useGetList<typeof PATH, TData>({
 *   resource: { path: PATH, params: { id: 1 } },
 *   queryOptions: {
 *     onSuccess: (data) => {
 *       console.log('Data fetched successfully:', data);
 *     },
 *   },
 *   params: { sortBy: 'price', order: 'asc' },
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
declare const useGetList: <TPath extends string, TData = any>({ queryOptions, resource, params, apiClientParams, }: {
    queryOptions?: UseQueryProps<QueryResponse<TData[]>, QueryListKey<TPath>, {
        resource: Resource<TPath>;
        params: QueryListKey<TPath>["3"];
        queryKey: QueryListKey<TPath>;
    }>;
    resource: Resource<TPath>;
    params?: QueryListKey<TPath>["3"];
    apiClientParams?: Partial<ApiProps>;
}) => _tanstack_react_query.UseQueryResult<QueryResponse<TData[]>, CustomError>;

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
 * @param options - The options object for configuring the hook.
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
declare const useGetInfiniteList: <TPath extends string, TData = any>({ queryOptions, resource, params, apiClientParams, pagination, }: {
    queryOptions?: UseInfiniteQueryProps<QueryResponse<TData[]>, QueryInfiniteListKey<TPath>, {
        resource: Resource<TPath>;
        params: QueryInfiniteListKey<TPath>["4"];
        queryKey: QueryInfiniteListKey<TPath>;
    }>;
    resource: Resource<TPath>;
    params?: QueryInfiniteListKey<TPath>["4"];
    apiClientParams?: Partial<ApiProps>;
    pagination: QueryInfinitePagination;
}) => _tanstack_react_query.UseInfiniteQueryResult<InfiniteData<QueryResponse<TData[]>, unknown>, CustomError>;

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
declare const useGetOne: <TPath extends string, TData = any>({ resource, id, queryOptions, params, apiClientParams, }: {
    resource: Resource<TPath>;
    id: string | number;
    queryOptions?: UseQueryProps<QueryResponse<TData>, QueryOneKey<TPath>, {
        resource: Resource<TPath>;
        id: string | number;
        params: QueryOneKey<TPath>["4"];
        queryKey: QueryOneKey<TPath>;
    }>;
    params?: QueryOneKey<TPath>["4"];
    apiClientParams?: Partial<ApiProps>;
}) => _tanstack_react_query.UseQueryResult<QueryResponse<TData>, CustomError>;

/** @notExported */
type MutateBaseVariables$1<TPath extends string, TType, TExtraData> = (TType extends 'many' ? {
    ids: (string | number)[];
    resource: Resource<TPath>;
    apiClientParams?: Partial<ApiProps>;
    extraData?: TExtraData;
    extraResources?: Resource<any>[];
} : {
    id: string | number;
    resource: Resource<TPath>;
    apiClientParams?: Partial<ApiProps>;
    extraData?: TExtraData;
    extraResources?: Resource<any>[];
});
/** @notExported */
type DeleteBaseVariables<TPath extends string, TType, TExtraData> = (Omit<MutateBaseVariables$1<TPath, TType, TExtraData>, 'resource'> & {
    resourceParams: Resource<TPath>['params'];
    undoMessage?: string;
});
/** @notExported */
type DeleteBase<TPath extends string, TData = any, TType extends MutationMode = 'many', TExtraData = any> = {
    resourcePath: Resource<TPath>['path'];
    mutationOptions?: UseMutateProps<TType extends 'many' ? QueryResponse<TData>[] : QueryResponse<TData>, MutateBaseVariables$1<TPath, TType, TExtraData>>;
    mode?: MutateMode;
    extraResources?: Resource<any>[];
    shouldUpdateCurrentResource?: boolean;
    shouldInvalidateCache?: boolean;
    type: TType;
};
/**
 * A hook that helps you delete a single resource.
 *
 * The hook uses `useMutation` from `@tanstack/react-query` under the hood, so it accepts all the same options.
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
declare const useDeleteOne: <TPath extends string, TData = any, TExtraData = any>(props: Omit<DeleteBase<TPath, TData, "one", TExtraData>, "type">) => {
    mutation: {
        data: undefined;
        variables: undefined;
        error: null;
        isError: false;
        isIdle: true;
        isPending: false;
        isSuccess: false;
        status: "idle";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, {
            id: string | number;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        }, unknown>;
    } | {
        data: undefined;
        variables: {
            id: string | number;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        };
        error: null;
        isError: false;
        isIdle: false;
        isPending: true;
        isSuccess: false;
        status: "pending";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, {
            id: string | number;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        }, unknown>;
    } | {
        data: undefined;
        error: CustomError;
        variables: {
            id: string | number;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        };
        isError: true;
        isIdle: false;
        isPending: false;
        isSuccess: false;
        status: "error";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, {
            id: string | number;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        }, unknown>;
    } | {
        data: QueryResponse<TData>;
        error: null;
        variables: {
            id: string | number;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        };
        isError: false;
        isIdle: false;
        isPending: false;
        isSuccess: true;
        status: "success";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, {
            id: string | number;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        }, unknown>;
    };
    delete: ({ resourceParams, undoMessage, ...variables }: DeleteBaseVariables<TPath, "one", TExtraData>) => Promise<void>;
};
/**
 * A hook that helps you delete multiple resources at once.
 *
 * The hook uses `useMutation` from `@tanstack/react-query under the hood, so it accepts all the same options.
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
declare const useDeleteMany: <TPath extends string, TData = any, TExtraData = any>(props: Omit<DeleteBase<TPath, TData, "many", TExtraData>, "type">) => {
    mutation: {
        data: undefined;
        variables: undefined;
        error: null;
        isError: false;
        isIdle: true;
        isPending: false;
        isSuccess: false;
        status: "idle";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>[], CustomError, {
            ids: (string | number)[];
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        }, unknown>;
    } | {
        data: undefined;
        variables: {
            ids: (string | number)[];
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        };
        error: null;
        isError: false;
        isIdle: false;
        isPending: true;
        isSuccess: false;
        status: "pending";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>[], CustomError, {
            ids: (string | number)[];
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        }, unknown>;
    } | {
        data: undefined;
        error: CustomError;
        variables: {
            ids: (string | number)[];
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        };
        isError: true;
        isIdle: false;
        isPending: false;
        isSuccess: false;
        status: "error";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>[], CustomError, {
            ids: (string | number)[];
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        }, unknown>;
    } | {
        data: QueryResponse<TData>[];
        error: null;
        variables: {
            ids: (string | number)[];
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        };
        isError: false;
        isIdle: false;
        isPending: false;
        isSuccess: true;
        status: "success";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>[], CustomError, {
            ids: (string | number)[];
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
        }, unknown>;
    };
    delete: ({ resourceParams, undoMessage, ...variables }: DeleteBaseVariables<TPath, "many", TExtraData>) => Promise<void>;
};

/** @notExported */
type MutateBaseVariables<TPath extends string, TFormData, TType, TExtraData> = (TType extends 'many' ? {
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
});
/** @notExported */
type UpdateBaseVariables<TPath extends string, TFormData, TType, TExtraData> = (Omit<MutateBaseVariables<TPath, TFormData, TType, TExtraData>, 'resource'> & {
    resourceParams: Resource<TPath>['params'];
    undoMessage?: string;
});
/** @notExported */
type UpdateBase<TPath extends string, TData, TFormData, TType extends MutationMode, TExtraData> = {
    resourcePath: Resource<TPath>['path'];
    mutationOptions?: UseMutateProps<TType extends 'many' ? QueryResponse<TData>[] : QueryResponse<TData>, MutateBaseVariables<TPath, TFormData, TType, TExtraData>>;
    mode?: MutateMode;
    extraResources?: Resource<any>[];
    shouldUpdateCurrentResource?: boolean;
    shouldInvalidateCache?: boolean;
    type: TType;
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
declare const useUpdateOne: <TPath extends string, TData = any, TFormData = OnlyObject, TExtraData = any>(props: Omit<UpdateBase<TPath, TData, TFormData, "one", TExtraData>, "type">) => {
    mutation: {
        data: undefined;
        variables: undefined;
        error: null;
        isError: false;
        isIdle: true;
        isPending: false;
        isSuccess: false;
        status: "idle";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, {
            id: string | number;
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        }, unknown>;
    } | {
        data: undefined;
        variables: {
            id: string | number;
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        };
        error: null;
        isError: false;
        isIdle: false;
        isPending: true;
        isSuccess: false;
        status: "pending";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, {
            id: string | number;
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        }, unknown>;
    } | {
        data: undefined;
        error: CustomError;
        variables: {
            id: string | number;
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        };
        isError: true;
        isIdle: false;
        isPending: false;
        isSuccess: false;
        status: "error";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, {
            id: string | number;
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        }, unknown>;
    } | {
        data: QueryResponse<TData>;
        error: null;
        variables: {
            id: string | number;
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        };
        isError: false;
        isIdle: false;
        isPending: false;
        isSuccess: true;
        status: "success";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, {
            id: string | number;
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        }, unknown>;
    };
    update: ({ resourceParams, undoMessage, ...variables }: UpdateBaseVariables<TPath, TFormData, "one", TExtraData>) => Promise<void>;
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
declare const useUpdateMany: <TPath extends string, TData = any, TFormData = OnlyObject, TExtraData = any>(props: Omit<UpdateBase<TPath, TData, TFormData, "many", TExtraData>, "type">) => {
    mutation: {
        data: undefined;
        variables: undefined;
        error: null;
        isError: false;
        isIdle: true;
        isPending: false;
        isSuccess: false;
        status: "idle";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>[], CustomError, {
            ids: (string | number)[];
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        }, unknown>;
    } | {
        data: undefined;
        variables: {
            ids: (string | number)[];
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        };
        error: null;
        isError: false;
        isIdle: false;
        isPending: true;
        isSuccess: false;
        status: "pending";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>[], CustomError, {
            ids: (string | number)[];
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        }, unknown>;
    } | {
        data: undefined;
        error: CustomError;
        variables: {
            ids: (string | number)[];
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        };
        isError: true;
        isIdle: false;
        isPending: false;
        isSuccess: false;
        status: "error";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>[], CustomError, {
            ids: (string | number)[];
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        }, unknown>;
    } | {
        data: QueryResponse<TData>[];
        error: null;
        variables: {
            ids: (string | number)[];
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        };
        isError: false;
        isIdle: false;
        isPending: false;
        isSuccess: true;
        status: "success";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>[], CustomError, {
            ids: (string | number)[];
            data: TFormData;
            resource: Resource<TPath>;
            apiClientParams?: Partial<ApiProps>;
            extraData?: TExtraData | undefined;
            extraResources?: Resource<any>[];
            transformCacheData?: ((data: TFormData) => Record<string, any>) | undefined;
        }, unknown>;
    };
    update: ({ resourceParams, undoMessage, ...variables }: UpdateBaseVariables<TPath, TFormData, "many", TExtraData>) => Promise<void>;
};

/** @notExported */
type MutateVariables$1<TPath extends string, TFormData, TExtraData> = {
    data: TFormData;
    resource: Resource<TPath>;
    apiClientParams?: Partial<ApiProps>;
    extraData?: TExtraData;
    extraResources?: Resource<any>[];
};
/** @notExported */
type CreateOneVariables<TPath extends string, TFormData, TExtraData> = (Omit<MutateVariables$1<TPath, TFormData, TExtraData>, 'resource'> & {
    resourceParams: Resource<TPath>['params'];
});
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
declare const useCreate: <TPath extends string, TData = any, TFormData = OnlyObject, TExtraData = any>({ resourcePath, mutationOptions, extraResources: extraResourcesProps, shouldUpdateCurrentResource, cacheAddItemTo, shouldInvalidateCache, }: {
    resourcePath: Resource<TPath>["path"];
    mutationOptions?: UseMutateProps<QueryResponse<TData> | QueryResponse<TData>[], MutateVariables$1<TPath, TFormData, TExtraData>>;
    extraResources?: Resource<any>[];
    shouldUpdateCurrentResource?: boolean;
    cacheAddItemTo?: "start" | "end";
    shouldInvalidateCache?: boolean;
}) => {
    mutation: {
        data: undefined;
        variables: undefined;
        error: null;
        isError: false;
        isIdle: true;
        isPending: false;
        isSuccess: false;
        status: "idle";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData> | QueryResponse<TData>[], CustomError, MutateVariables$1<TPath, TFormData, TExtraData>, unknown>;
    } | {
        data: undefined;
        variables: MutateVariables$1<TPath, TFormData, TExtraData>;
        error: null;
        isError: false;
        isIdle: false;
        isPending: true;
        isSuccess: false;
        status: "pending";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData> | QueryResponse<TData>[], CustomError, MutateVariables$1<TPath, TFormData, TExtraData>, unknown>;
    } | {
        data: undefined;
        error: CustomError;
        variables: MutateVariables$1<TPath, TFormData, TExtraData>;
        isError: true;
        isIdle: false;
        isPending: false;
        isSuccess: false;
        status: "error";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData> | QueryResponse<TData>[], CustomError, MutateVariables$1<TPath, TFormData, TExtraData>, unknown>;
    } | {
        data: QueryResponse<TData> | QueryResponse<TData>[];
        error: null;
        variables: MutateVariables$1<TPath, TFormData, TExtraData>;
        isError: false;
        isIdle: false;
        isPending: false;
        isSuccess: true;
        status: "success";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData> | QueryResponse<TData>[], CustomError, MutateVariables$1<TPath, TFormData, TExtraData>, unknown>;
    };
    create: ({ resourceParams, ...variables }: CreateOneVariables<TPath, TFormData, TExtraData>) => void;
};

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
declare const useDataQuery: <TPath extends string, TData = any>({ queryOptions, resource, params, apiClientParams, }: {
    queryOptions?: UseQueryProps<QueryResponse<TData>, QueryDataKey<TPath>, {
        resource: Resource<TPath>;
        params: QueryDataKey<TPath>["3"];
        queryKey: QueryDataKey<TPath>;
    }>;
    resource: Resource<TPath>;
    params?: QueryDataKey<TPath>["3"];
    apiClientParams?: Partial<ApiProps>;
}) => _tanstack_react_query.UseQueryResult<QueryResponse<TData>, CustomError>;

/** @notExported */
type Variables<TPath extends string, TFormData, TExtraData> = {
    data: TFormData;
    resource: Resource<TPath>;
    apiClientParams: Partial<ApiProps> & {
        method: ApiProps['method'];
    };
    extraData?: TExtraData;
};
/** @notExported */
type MutateVariables<TPath extends string, TFormData, TExtraData> = (Omit<Variables<TPath, TFormData, TExtraData>, 'resource'> & {
    resourceParams: Resource<TPath>['params'];
});
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
declare const useDataMutate: <TPath extends string, TData = any, TFormData = any, TExtraData = any>({ resourcePath, mutationOptions, }: {
    resourcePath: Resource<TPath>["path"];
    mutationOptions?: UseMutateProps<QueryResponse<TData>, Variables<TPath, TFormData, TExtraData>>;
}) => {
    mutation: {
        data: undefined;
        variables: undefined;
        error: null;
        isError: false;
        isIdle: true;
        isPending: false;
        isSuccess: false;
        status: "idle";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, Variables<TPath, TFormData, TExtraData>, unknown>;
    } | {
        data: undefined;
        variables: Variables<TPath, TFormData, TExtraData>;
        error: null;
        isError: false;
        isIdle: false;
        isPending: true;
        isSuccess: false;
        status: "pending";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, Variables<TPath, TFormData, TExtraData>, unknown>;
    } | {
        data: undefined;
        error: CustomError;
        variables: Variables<TPath, TFormData, TExtraData>;
        isError: true;
        isIdle: false;
        isPending: false;
        isSuccess: false;
        status: "error";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, Variables<TPath, TFormData, TExtraData>, unknown>;
    } | {
        data: QueryResponse<TData>;
        error: null;
        variables: Variables<TPath, TFormData, TExtraData>;
        isError: false;
        isIdle: false;
        isPending: false;
        isSuccess: true;
        status: "success";
        reset: () => void;
        context: unknown;
        failureCount: number;
        failureReason: CustomError | null;
        isPaused: boolean;
        submittedAt: number;
        mutateAsync: _tanstack_react_query.UseMutateAsyncFunction<QueryResponse<TData>, CustomError, Variables<TPath, TFormData, TExtraData>, unknown>;
    };
    mutate: ({ resourceParams, ...variables }: MutateVariables<TPath, TFormData, TExtraData>) => Promise<void>;
};

/**
 * Get the context for the RQWrapper component.
 *
 * This hook returns the context for the RQWrapper component, which includes the
 * API URL, API client, and toast undo function.
 *
 * @returns The RQWrapper context.
 */
declare const useRQWrapperContext: () => RQWrapperContextProps;
type ReactQueryDevtoolsProps = React.ComponentProps<typeof ReactQueryDevtools>;
/**
 * This component wraps your application and provides the necessary context
 * for the hooks to work.
 *
 * @example
 * import { RQWrapper, ToastCustomContent, ToastBar } from 'react-query-manager';
 *
 * const ToastWrapper: ToastCustomContent = (props) => {
 *  return <ToastBar toast={props} position={props.position} />;
 * };
 *
 * <RQWrapper
 *  isDevTools
 *   devToolsOptions={{
 *     buttonPosition: 'bottom-left',
 *   }}
 *   apiUrl="https://jsonplaceholder.typicode.com"
 *   apiAuthorization={() => 'Bearer 12345'}
 *   apiOnSuccess={(...args) => {
 *     console.log('apiOnSuccess: ', args);
 *   }}
 *   apiOnError={(...args) => {
 *     console.log('apiOnError: ', args);
 *   }}
 *   toast={{
 *     globalProps: {
 *       position: 'bottom-center',
 *     },
 *     wrapper: ToastWrapper,
 *   }}
 * >
 *   <List />
 * </RQWrapper>
 *
 * @param props
 * @param props.children - The children components to render.
 * @param props.config - The configuration for the underlying QueryClient instance.
 * @param props.apiUrl - The base URL for all API requests.
 * @param props.apiClient - The function to use for making API requests.
 *   Defaults to `fetcher` from `react-query-manager`.
 * @param props.apiEnsureTrailingSlash - If `true`, the returned URL will have a trailing slash.
 * @param props.apiAuthorization - A function to get the authorization
 *   token for API requests. If not provided, or if the function returns an empty
 *   string, no authorization token will be used.
 * @param props.apiHeaders - A function to get the headers
 *   for API requests. If not provided, or if the function returns an empty
 *   object, no headers will be used.
 * @param props.apiOnSuccess - A callback to run when an API
 *   request is successful. If not provided, the default behavior will be used.
 * @param props.apiOnError - A callback to run when an API
 *   request fails. If not provided, the default behavior will be used.
 * @param props.isDevTools - Whether to render the React Query devtools.
 *   Defaults to `false`.
 * @param props.devToolsOptions - Options to pass to the
 *   React Query devtools.
 * @param props.toast - Options for the
 *   `toast` utility from `react-hot-toast`.
 *   See the [documentation](https://react-hot-toast.com/docs) for more details.
 *
 *   The `wrapper` property can be used to customize the toast component.
 *
 *   The `globalProps` property can be used to customize the default props for the toast component.
 *
 *   The `ToastCustomUndoContent` property can be used to customize the content of the toast when the user
 *   clicks the "UNDO" button.
 */
declare function RQWrapper({ children, config, apiUrl, apiClient, apiEnsureTrailingSlash, apiAuthorization, apiHeaders, apiOnSuccess, apiOnError, isDevTools, devToolsOptions, toast: toastProps, }: {
    children: ReactNode;
    apiUrl: string;
    config?: QueryClientConfig;
    apiClient?: ApiClient;
    apiAuthorization?: () => string;
    apiHeaders?: () => ApiProps['headers'];
    apiOnSuccess?: ApiProps['onSuccess'];
    apiOnError?: ApiProps['onError'];
    apiEnsureTrailingSlash?: boolean;
    isDevTools?: boolean;
    devToolsOptions?: ReactQueryDevtoolsProps;
    toast?: {
        globalProps?: ToastProps;
        CustomContent?: ToastCustomContent;
        CustomUndoContent?: ToastCustomUndoContent;
    };
}): react_jsx_runtime.JSX.Element;

/** @notExported */
interface ToastBarProps {
    toast: Toast;
    position?: ToastPosition;
    style?: React.CSSProperties;
    children?: (components: {
        icon: Renderable;
        message: Renderable;
    }) => Renderable;
}
/**
 * Export of `toast` from `react-hot-toast/headless`, which is an API for creating notifications,
 *
 * ⚠️ but without the **`remove`** method ⚠️.
 *
 * See the [documentation](https://react-hot-toast.com/docs/toast) for more details.
 */
declare const toast: ((message: Renderable | react_hot_toast_headless.ValueFunction<Renderable, react_hot_toast_headless.Toast>, opts?: Partial<Pick<react_hot_toast_headless.Toast, "position" | "id" | "className" | "style" | "icon" | "duration" | "ariaProps" | "iconTheme" | "removeDelay">> | undefined) => string) & {
    error: (message: Renderable | react_hot_toast_headless.ValueFunction<Renderable, react_hot_toast_headless.Toast>, options?: react_hot_toast_headless.ToastOptions) => string;
    success: (message: Renderable | react_hot_toast_headless.ValueFunction<Renderable, react_hot_toast_headless.Toast>, options?: react_hot_toast_headless.ToastOptions) => string;
    loading: (message: Renderable | react_hot_toast_headless.ValueFunction<Renderable, react_hot_toast_headless.Toast>, options?: react_hot_toast_headless.ToastOptions) => string;
    custom: (message: Renderable | react_hot_toast_headless.ValueFunction<Renderable, react_hot_toast_headless.Toast>, options?: react_hot_toast_headless.ToastOptions) => string;
    dismiss(toastId?: string): void;
    promise<T>(promise: Promise<T> | (() => Promise<T>), msgs: {
        loading: Renderable;
        success?: react_hot_toast_headless.ValueOrFunction<Renderable, T>;
        error?: react_hot_toast_headless.ValueOrFunction<Renderable, any>;
    }, opts?: react_hot_toast_headless.DefaultToastOptions): Promise<T>;
};
/**
 * `ToastBar` is a wrapper for displaying notifications from the `react-hot-toast` library.
 * You can use it or create your own implementation. See the [documentation](https://react-hot-toast.com/docs/toast-bar) for more details.
 */
declare const ToastBar: React.FC<ToastBarProps>;
/**
 * A utility function that resolves the value of a toast message. The value can either be a static value or a function
 * that generates the value based on the provided argument.
 *
 * @example
 * // Resolving a static value
 * const message = resolveToastValue('Hello, World!', toast);
 *
 * @example
 * // Resolving a value from a function
 * const message = resolveToastValue((ctx) => `Hello, ${ctx.userName}!`, toast);
 */
declare const resolveToastValue: <TValue, TArg>(valOrFunction: react_hot_toast.ValueOrFunction<TValue, TArg>, arg: TArg) => TValue;

/**
 * Takes a `Resource` object and returns its path as a string,
 * with any path parameters replaced with their corresponding values.
 * Optionally, it can ensure that the returned URL has a trailing slash.
 *
 * @template TPath - A string literal representing the path template with placeholders.
 *
 * @param {Resource<TPath>} resource - The `Resource` object containing the path and parameters.
 * @param {boolean} ensureTrailingSlash - If `true`, the returned URL will have a trailing slash.
 *
 * @returns {string} The URL with all placeholders replaced by the corresponding values from `params`.
 *
 * @example
 * const resource = {
 *   path: 'users/{id}/messages',
 *   params: { id: 1 },
 * };
 *
 * getUrlFromResource(resource, false); // 'users/1/messages'
 * getUrlFromResource(resource, true);  // 'users/1/messages/'
 */
declare const getUrlFromResource: <TPath extends string>(resource: Resource<TPath>, ensureTrailingSlash?: boolean) => string;

/**
 * Adds an item to the query cache based on provided data and cache keys.
 *
 * @template TData - The type of data stored in the cache.
 * @param params - The parameters for the function.
 * @param params.data - The new data to add to the corresponding items.
 * @param params.queryKeysOne - Cache keys for single queries that should be updated.
 *
 * @example
 * addItemFromQueryCache({
 *   data: { name: 'New Item' },
 *   queryKeysOne: [['get-one', 'posts', {}, '1']],
 * });
 */
declare const addItemToQueryCache: ({ data, queryKeysOne, }: {
    data: OnlyObject;
    queryKeysOne?: [QueryOneKey<"">[0], ...any[]][];
}) => void;

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
declare const addItemsToListQueryCache: ({ data, queryKeysList, queryKeysInfiniteList, cacheAddItemTo, }: {
    data: OnlyObject[];
    queryKeysList?: [QueryListKey<"">[0], ...OnlyObject[]][];
    queryKeysInfiniteList?: [QueryInfiniteListKey<"">[0], ...OnlyObject[]][];
    cacheAddItemTo?: "end" | "start";
}) => void;

/**
 * Deletes items from the query cache based on provided IDs.
 *
 * @template TData - The type of data stored in the cache.
 * @param params - The parameters for the function.
 * @param params.ids - The array of item IDs to delete from the cache.
 * @param params.queryKeysOne - Cache keys for single queries that should be deleted.
 * @param params.queryKeysList - Cache keys for list queries from which items should be deleted.
 * @param params.queryKeysInfiniteList - Cache keys for infinite list queries from which items should be deleted.
 *
 * @example
 * deleteItemsFromQueryCache({
 *   ids: [1, 2, 3],
 *   queryKeysOne: [['get-one', 'posts', {}, '1']],
 *   queryKeysList: [['get-list', 'posts', {}]],
 *   queryKeysInfiniteList: [['get-infinite-list', 'posts', {}]]
 * });
 */
declare const deleteItemsFromQueryCache: <TData = any>({ ids, queryKeysOne, queryKeysList, queryKeysInfiniteList, }: {
    ids: (string | number)[];
    queryKeysOne?: [QueryOneKey<"">[0], ...any[]][];
    queryKeysList?: [QueryListKey<"">[0], ...any[]][];
    queryKeysInfiniteList?: [QueryInfiniteListKey<"">[0], ...any[]][];
}) => void;

/**
 * A utility object for generating query keys used in React Query.
 */
declare const helpersQueryKeys: {
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
    getOne: <TPath extends string>(itemResource: Resource<TPath>, id: string | number) => TakeFirstKeys<QueryOneKey<any>, 4>;
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
    getOneArray: <TPath extends string>(itemResource: Resource<TPath>, ids: (string | number)[]) => TakeFirstKeys<QueryOneKey<any>, 4>[];
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
    getList: <TPath extends string>(itemResource: Resource<TPath>) => TakeFirstKeys<QueryListKey<any>, 3>;
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
    getInfiniteList: <TPath extends string>(itemResource: Resource<TPath>) => TakeFirstKeys<QueryInfiniteListKey<any>, 3>;
    /**
     * Generates a data query key.
     *
     * @param itemResource - The resource object containing the path and parameters for the query.
     * @returns The data query key.
     *
     * @example
     * const key = helpersQueryKeys.getDataQuery(resource);
     * // key: ['query-data', 'posts', {}]
     */
    getDataQuery: <TPath extends string>(itemResource: Resource<TPath>) => TakeFirstKeys<QueryDataKey<any>, 3>;
};

/**
 * Invalidates queries in the cache that match any of the specified key groups.
 *
 * This function uses the `predicate` option to filter queries whose keys match any of the key groups provided.
 * A query's key is considered a match if it contains all the keys from at least one of the key groups.
 * The function then invalidates all such matching queries using `queryClient.invalidateQueries`.
 *
 * @example
 * import { invalidateMatchingQueries } from 'react-query-manager';
 *
 * // Define key groups where each group is an array of keys that must all be present in the queryKey to be considered a match.
 * const keyGroups = [
 *   ['path', 'get-list'],    // Key group 1
 *   ['path', 'get-one'],  // Key group 2
 * ];
 *
 * // Invalidate queries with keys matching any of the key groups
 * invalidateMatchingQueries({ queryKeys: keyGroups });
 *
 * @param params
 * @param params.queryKeys - An array of arrays, where each inner array represents a group of keys that must all be present
 *                           in a query's key for that query to be invalidated.
 *                           Example: `[['path', 'get-list'], ['path', 'get-one']]`.
 *
 * This function:
 * - Retrieves all cached queries.
 * - Checks if the key of each query matches any of the provided key groups.
 * - Invalidates the queries whose keys match any of the specified key groups.
 *
 * @returns {void} - This function does not return a value.
 */
declare const invalidateMatchingQueries: ({ queryKeys, }: {
    queryKeys: any[][];
}) => void;

/**
 * Remove queries in the cache that match any of the specified key groups.
 *
 * This function uses the `predicate` option to filter queries whose keys match any of the key groups provided.
 * A query's key is considered a match if it contains all the keys from at least one of the key groups.
 * The function then remove all such matching queries using `queryClient.removeQueries`.
 *
 * @example
 * import { removeMatchingQueries } from 'react-query-manager';
 *
 * // Define key groups where each group is an array of keys that must all be present in the queryKey to be considered a match.
 * const keyGroups = [
 *   ['path', 'get-list'],    // Key group 1
 *   ['path', 'get-one'],  // Key group 2
 * ];
 *
 * // Remove queries with keys matching any of the key groups
 * removeMatchingQueries({ queryKeys: keyGroups });
 *
 * @param params
 * @param params.queryKeys - An array of arrays, where each inner array represents a group of keys that must all be present
 *                           in a query's key for that query to be removed.
 *                           Example: `[['path', 'get-list'], ['path', 'get-one']]`.
 *
 * This function:
 * - Retrieves all cached queries.
 * - Checks if the key of each query matches any of the provided key groups.
 * - Remove the queries whose keys match any of the specified key groups.
 *
 * @returns {void} - This function does not return a value.
 */
declare const removeMatchingQueries: ({ queryKeys, }: {
    queryKeys: any[][];
}) => void;

/**
 * Invalidates queries in the cache that have a key matching any of the specified `queryKeys`.
 *
 * @param params
 * @param params.queryKeys - An array of arrays of keys for which the corresponding queries should be invalidated.
 *
 * @example
 * invalidateQueries({
 *   queryKeys: [
 *     ['get-list', 'path'],
 *     ['get-one', 'path', '1'],
 *   ],
 * });
 *
 * @returns {void} - This function does not return a value.
 */
declare const invalidateQueries: ({ queryKeys, }: {
    queryKeys: any[][];
}) => void;

/**
 * Remove queries in the cache that have a key matching any of the specified `queryKeys`.
 *
 * @param params
 * @param params.queryKeys - An array of arrays of keys for which the corresponding queries should be removed.
 *
 * @example
 * removeQueries({
 *   queryKeys: [
 *     ['get-list', 'path'],
 *     ['get-one', 'path', '1'],
 *   ],
 * });
 *
 * @returns {void} - This function does not return a value.
 */
declare const removeQueries: ({ queryKeys, }: {
    queryKeys: any[][];
}) => void;

/**
 * Updates items in the query cache based on provided IDs and new data.
 *
 * @template TData - The type of data stored in the cache.
 * @param params - The parameters for the function.
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
declare const updateItemsFromQueryCache: <TData = any>({ data, ids, queryKeysOne, queryKeysList, queryKeysInfiniteList, }: {
    data: OnlyObject;
    ids: (string | number)[];
    queryKeysOne?: [QueryOneKey<"">[0], ...any[]][];
    queryKeysList?: [QueryListKey<"">[0], ...any[]][];
    queryKeysInfiniteList?: [QueryInfiniteListKey<"">[0], ...any[]][];
}) => void;

export { type ApiClient, type ApiProps, CustomError, type ExtractParams, type FetcherResponse, type Headers, type MutateDataKey, type MutateKey, type MutateMode, type MutateTypes, type MutationMode, type OnlyObject, type PathParams, type QueryDataKey, type QueryInfiniteListKey, type QueryInfinitePagination, type QueryListKey, type QueryOneKey, type QueryResponse, RQWrapper, type RQWrapperContextProps, type Resource, type TakeFirstKeys, ToastBar, type ToastCustomContent, type ToastCustomUndoContent, type ToastProps, type UndoTypes, type UseInfiniteQueryProps, type UseMutateProps, type UseQueryProps, addItemToQueryCache, addItemsToListQueryCache, deleteItemsFromQueryCache, fetcher, getUrlFromResource, helpersQueryKeys, invalidateMatchingQueries, invalidateQueries, removeMatchingQueries, removeQueries, resolveToastValue, toast, updateItemsFromQueryCache, useCreate, useDataMutate, useDataQuery, useDeleteMany, useDeleteOne, useGetInfiniteList, useGetList, useGetOne, useRQWrapperContext, useUpdateMany, useUpdateOne };
