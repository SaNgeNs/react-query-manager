import {
  InfiniteData, UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions,
} from '@tanstack/react-query';
import type { Toast, ToasterProps } from 'react-hot-toast';
import React from 'react';
import { CustomError } from './utils/custom-error';

export type UndoTypes = 'update-one' | 'update-many' | 'delete-one' | 'delete-many';

export type ToastProps = Omit<ToasterProps, 'children'>;

export type ToastCustomContent = ToasterProps['children'];

export type Headers = Record<string, string>;

export type ToastCustomUndoContent = (data: {
  message: string;
  type: UndoTypes;
  onUndo: () => void;
  toast: Toast;
}) => React.JSX.Element;

export type OnlyObject = Record<string, unknown>;

export type MutationMode = 'many' | 'one';

export type FetcherResponse<TData = any> = {
  status: number;
  statusText: string;
  headers: Headers;
  data: TData;
};

export type ApiProps = {
  url: string;
  method:
    | 'GET'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'PURGE'
    | 'LINK'
    | 'UNLINK';
  options?: Omit<RequestInit, 'method' | 'body' | 'headers'>;
  headers?: Headers;
  authorization?: string;
  params?: OnlyObject;
  queryParamsSerializer?: (params: OnlyObject) => string,
  queryArrayParamStyle?: 'indexedArray' | 'repeatedParameters',
  data?: any;
  onSuccess?: (data: any, args: Omit<ApiProps, 'onSuccess' | 'onError' | 'context'>, context: ApiProps['context']) => void;
  onError?: (error: CustomError, args: Omit<ApiProps, 'onSuccess' | 'onError' | 'context'>, context: ApiProps['context']) => void;
  context?: any;
};

export type ApiClient = <TData = any>(args: ApiProps) => Promise<FetcherResponse<TData>>;

export type RQWrapperContextProps = {
  apiUrl: string;
  apiClient: ApiClient;
  apiEnsureTrailingSlash: boolean;
  toastUndo: (data: {
    message: string;
    type: UndoTypes;
  }) => void;
};

export type QueryResponse<TData = any> = FetcherResponse<TData> | null;

export type UseQueryProps<TData extends QueryResponse, TQueryKey extends any[], TVariables extends {}> = (
  Partial<
    Omit<
    UseQueryOptions<TData, Error, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >>
) & {
  queryKey?: any[];
  queryFn?: (data: {
    apiClient: ApiClient;
    apiUrl: string;
    url: string;
    variables: TVariables;
  }) => Promise<QueryResponse> | QueryResponse;
};

export type UseInfiniteQueryProps<TData extends QueryResponse, TQueryKey extends any[], TVariables extends {}> = (
  Partial<Omit<
    UseInfiniteQueryOptions<TData, Error, InfiniteData<TData>, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >>
) & {
  queryKey?: any[];
  queryFn?: (data: {
    apiClient: ApiClient;
    apiUrl: string;
    url: string;
    variables: TVariables;
  }) => Promise<QueryResponse> | QueryResponse;
};

export type UseMutateProps<TData extends QueryResponse | QueryResponse[], TVariables = {}> = (
  Partial<Omit<
    UseMutationOptions<TData, Error, TVariables, any>,
    'mutationKey' | 'mutationFn'
  >>
) & {
  mutationKey?: any[];
  mutationFn?: (data: {
    apiClient: ApiClient;
    apiUrl: string;
    variables: TVariables;
    url: string;
  }) => Promise<TData> | TData;
};

export type ExtractParams<TPath extends string> = TPath extends `${string}{${infer Param}}${infer Rest}`
  ? Param | ExtractParams<Rest>
  : never;

export type PathParams<TPath extends string> = ExtractParams<TPath> extends never
  ? Record<string, never>
  : {
      [K in ExtractParams<TPath>]: string;
    };

/** Represents a resource with a given path and parameters. */
export type Resource<TPath extends string> = {
  /** The path of the resource. */
  path: TPath;
  /** The parameters of the resource. */
  params: ExtractParams<TPath> extends never
    ? Record<string, never>
    : PathParams<TPath>;
}

/** Defines the mode for mutation operations. */
export type MutateMode = {
  /** Indicates whether the operation should use optimistic updates. */
  optimistic?: boolean;
  /** Indicates whether the operation should be undoable. */
  undoable?: boolean;
};

export type QueryListKey<TPath extends string> = ['get-list', Resource<TPath>['path'], Resource<TPath>['params'], Record<string, any>, ...any[]];

export type QueryInfinitePagination = { page: [string], per_page: [string, number] }

export type QueryInfiniteListKey<TPath extends string> = ['get-infinite-list', Resource<TPath>['path'], Resource<TPath>['params'], QueryInfinitePagination, Record<string, any>, ...any[]];

export type QueryOneKey<TPath extends string> = ['get-one', Resource<TPath>['path'], Resource<TPath>['params'], string, Record<string, any>, ...any[]];

export type QueryDataKey<TPath extends string> = ['query-data', Resource<TPath>['path'], Resource<TPath>['params'], Record<string, any>, ...any[]];

export type MutateTypes = 'update-one' | 'update-many' | 'delete-one' | 'delete-many' | 'create';

export type MutateKey<TPath extends string> = [MutateTypes, Resource<TPath>['path'], ...any[]];

export type MutateDataKey<TPath extends string> = ['mutate-data', Resource<TPath>['path'], ...any[]];

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
export type TakeFirstKeys<T extends any[], N extends number, R extends any[] = []> =
  R['length'] extends N ? R : T extends [infer First, ...infer Rest] ? TakeFirstKeys<Rest, N, [...R, First]> : R;
