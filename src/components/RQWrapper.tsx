import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, {
  createContext, ReactNode, useCallback, useContext, useMemo,
} from 'react';
import { fetcher } from '../utils/fetcher';
import {
  ApiProps, ApiClient, ToastProps, ToastCustomWrapper,
  CustomUndoContent,
  RQWrapperContextProps,
} from '../type';
import { Toaster } from '../internal/components/Toaster';
import { toast } from '../utils/toast';
import { undoEventEmitter } from '../internal/utils/undo-event-emitter';
import { removeFirstAndLastSlash } from '../internal/utils/remove-first-and-last-slash';

const Context = createContext<RQWrapperContextProps>({
  apiUrl: '',
  apiEnsureTrailingSlash: false,
  apiClient: fetcher,
  toastUndo: () => {},
});

/**
 * Get the context for the RQWrapper component.
 *
 * This hook returns the context for the RQWrapper component, which includes the
 * API URL, API client, and toast undo function.
 *
 * @returns The RQWrapper context.
 */
export const useRQWrapperContext = () => {
  return useContext(Context);
};

type ReactQueryDevtoolsProps = React.ComponentProps<typeof ReactQueryDevtools>;

/**
 * This component wraps your application and provides the necessary context
 * for the hooks to work.
 *
 * @example
 * import { RQWrapper, ToastCustomWrapper, ToastBar } from 'react-query-manager';
 *
 * const ToastWrapper: ToastCustomWrapper = (props) => {
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
 *   The `customUndoContent` property can be used to customize the content of the toast when the user
 *   clicks the "UNDO" button.
 */
export function RQWrapper({
  children,
  config = {},
  apiUrl,
  apiClient = fetcher,
  apiEnsureTrailingSlash = false,
  apiAuthorization,
  apiHeaders,
  apiOnSuccess,
  apiOnError,
  isDevTools,
  devToolsOptions,
  toast: toastProps,
}: {
  children: ReactNode;
  config?: QueryClientConfig;
  apiUrl: string;
  apiClient?: ApiClient;
  apiAuthorization?: () => string;
  apiHeaders?: () => ApiProps['headers'];
  apiOnSuccess?: ApiProps['onSuccess'];
  apiOnError?: ApiProps['onError'];
  apiEnsureTrailingSlash?: boolean;
  isDevTools?: boolean;
  devToolsOptions?: ReactQueryDevtoolsProps;
  toast?: {
    wrapper?: ToastCustomWrapper;
    globalProps?: ToastProps;
    customUndoContent?: CustomUndoContent;
  };
}) {
  const queryClient = useMemo(() => {
    return new QueryClient({
      ...config,
      defaultOptions: {
        ...config?.defaultOptions,
        queries: {
          gcTime: 5 * 60 * 1000, // 5 minutes,
          staleTime: 5 * 60 * 1000, // 5 minutes
          retry: false,
          ...config?.defaultOptions?.queries,
        },
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetch = useCallback<ApiClient>((args) => {
    const globalAuthorization = apiAuthorization ? apiAuthorization() : '';
    const globalHeaders = apiHeaders ? apiHeaders() : {};

    const onSuccess: ApiProps['onSuccess'] = (...successArgs) => {
      if (apiOnSuccess) {
        apiOnSuccess(...successArgs);
      }

      if (args.onSuccess) {
        args.onSuccess(...successArgs);
      }
    };

    const onError: ApiProps['onError'] = (...errorArgs) => {
      if (apiOnError) {
        apiOnError(...errorArgs);
      }

      if (args.onError) {
        args.onError(...errorArgs);
      }
    };

    return apiClient({
      ...args,
      headers: args.headers ? {
        ...globalHeaders,
        ...args.headers,
      } : globalHeaders,
      authorization: args.authorization || globalAuthorization,
      onSuccess,
      onError,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toastUndo = useCallback<RQWrapperContextProps['toastUndo']>((data) => {
    let isSuccess = false;

    toast.dismiss();

    const onUndo = () => {
      isSuccess = true;
      undoEventEmitter.emit('end', true);
      toast.dismiss();
    };

    const customContent = toastProps?.customUndoContent ? toastProps?.customUndoContent({
      message: data.message,
      onUndo,
      type: data.type,
    }) : null;

    toast.success(
      (t) => {
        if (!t.visible && !isSuccess) {
          isSuccess = true;
          undoEventEmitter.emit('end', false);
        }

        return customContent || (
          <>
            {data.message}

            <span
              style={{ marginLeft: '10px', cursor: 'pointer' }}
              onClick={onUndo}
              role="button"
              tabIndex={0}
              aria-label="Undo"
              title="Undo"
            >
              UNDO
            </span>
          </>
        );
      },
      {
        duration: toastProps?.globalProps?.toastOptions?.duration || 5000,
        extraParams: { closeOutside: true },
      } as any,
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo<RQWrapperContextProps>(() => ({
    apiUrl: removeFirstAndLastSlash(apiUrl),
    apiClient: fetch,
    apiEnsureTrailingSlash,
    toastUndo,
  }), [apiUrl, fetch, toastUndo, apiEnsureTrailingSlash]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster {...toastProps?.globalProps}>
        {toastProps?.wrapper}
      </Toaster>

      <Context.Provider value={contextValue}>
        {children}
      </Context.Provider>

      {isDevTools && (
        <ReactQueryDevtools
          buttonPosition="bottom-right"
          initialIsOpen={false}
          {...devToolsOptions}
        />
      )}
    </QueryClientProvider>
  );
}
