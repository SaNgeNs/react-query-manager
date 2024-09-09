"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _createStarExport(obj) { Object.keys(obj) .filter((key) => key !== "default" && key !== "__esModule") .forEach((key) => { if (exports.hasOwnProperty(key)) { return; } Object.defineProperty(exports, key, {enumerable: true, configurable: true, get: () => obj[key]}); }); } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/index.ts
var _reactquery = require('@tanstack/react-query'); _createStarExport(_reactquery);

// src/hooks/use-get-list.ts


// src/internal/utils/remove-first-and-last-slash.ts
function removeFirstAndLastSlash(path) {
  return path.replace(/^\/+/, "").replace(/\/+$/, "");
}

// src/utils/get-url-from-resource.ts
var getUrlFromResource = (resource, ensureTrailingSlash) => {
  const url = removeFirstAndLastSlash(resource.path.replace(/{(\w+)}/g, (_, key) => {
    return resource.params[key].toString();
  }));
  return ensureTrailingSlash ? `${url}/` : url;
};

// src/components/RQWrapper.tsx

var _reactquerydevtools = require('@tanstack/react-query-devtools');





var _react = require('react'); var _react2 = _interopRequireDefault(_react);

// src/utils/custom-error.ts
var CustomError = class _CustomError extends Error {
  constructor(message, status, data) {
    super(message);
    this.message = message;
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, _CustomError.prototype);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
    this.stack = new Error().stack;
    console.error(this.message, this);
  }
};

// src/utils/fetcher.ts
var filterEmptyParams = (params) => {
  if (params !== null && typeof params === "object") {
    const optionParams = {};
    const entries = Object.entries(params);
    entries.forEach(([key, value]) => {
      if (value || typeof value === "boolean" || typeof value === "number") {
        optionParams[key] = value;
      }
    });
    return optionParams;
  }
  return {};
};
function encode(value) {
  return encodeURIComponent(value).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var fetcher = (args) => {
  const { onSuccess, onError } = args;
  const isFormData = args.data instanceof FormData;
  const apiUrl = (() => {
    let URL = args.url;
    if (args.params) {
      const queryParams = filterEmptyParams(args.params);
      if (args.queryParamsSerializer) {
        URL += `?${args.queryParamsSerializer(args.params)}`;
      } else if (Object.keys(queryParams).length > 0) {
        const str = [];
        for (const p in queryParams) {
          if (queryParams.hasOwnProperty(p)) {
            if (Array.isArray(queryParams[p])) {
              queryParams[p].forEach((value) => {
                str.push(`${encode(p)}${args.queryArrayParamStyle === "indexedArray" ? "[]" : ""}=${encode(value)}`);
              });
            } else {
              str.push(
                `${encode(p)}=${encode(queryParams[p])}`
              );
            }
          }
        }
        URL += `?${str.join("&")}`;
      }
    }
    const [startUrl, endUrl] = URL.split("?");
    return `${startUrl}${endUrl ? `?${endUrl}` : ""}`;
  })();
  const body = (() => {
    if (isFormData) {
      return args.data;
    }
    if (args.data) {
      return JSON.stringify(args.data);
    }
    return "";
  })();
  const fetchOptions = {
    method: args.method,
    headers: {
      ...!isFormData && { "Content-Type": "application/json" },
      ...args.authorization && { Authorization: args.authorization },
      ...args.headers
    },
    ...body && { body },
    ...args.options
  };
  return fetch(apiUrl, fetchOptions).then(async (response) => {
    const responseData = await (async () => {
      try {
        const contentType = _optionalChain([response, 'access', _2 => _2.headers, 'access', _3 => _3.get, 'call', _4 => _4("Content-Type"), 'optionalAccess', _5 => _5.toLowerCase, 'call', _6 => _6()]) || "";
        if (contentType.includes("application/json")) {
          return await response.json();
        }
        if (contentType.includes("text/plain") || contentType.includes("text/csv") || contentType.includes("application/xml") || contentType.includes("text/xml") || contentType.includes("application/javascript") || contentType.includes("text/html")) {
          return await response.text();
        }
        if (contentType.includes("multipart/form-data")) {
          return await response.formData();
        }
        return await response.blob();
      } catch (error) {
        console.error("Error handling response:", error);
        throw error;
      }
    })();
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return {
      status: response.status,
      statusText: response.statusText,
      headers,
      data: responseData
    };
  }).then((result) => {
    if (result.status < 200 || result.status >= 300) {
      const error = new CustomError(
        `Request failed with status code: ${result.status}`,
        result.status,
        result.data
      );
      if (onError) {
        onError(error, args);
      }
      return Promise.reject(error);
    }
    if (onSuccess) {
      onSuccess(result, args);
    }
    return Promise.resolve(result);
  }).catch((error) => {
    return Promise.reject(new CustomError(
      error.message
    ));
  });
};

// src/internal/components/Toaster.tsx

var _headless = require('react-hot-toast/headless'); var _headless2 = _interopRequireDefault(_headless);

// src/utils/toast.ts

var _reacthottoast = require('react-hot-toast');
var { remove, ...restOfToastApi } = _headless2.default;
var toast = Object.assign(
  (...args) => _headless2.default.call(void 0, ...args),
  restOfToastApi
);
var ToastBar = _reacthottoast.ToastBar;
var resolveToastValue = _reacthottoast.resolveValue;

// src/internal/components/Toaster.tsx
var prefersReducedMotion = /* @__PURE__ */ (() => {
  let shouldReduceMotion;
  return () => {
    if (shouldReduceMotion === void 0 && typeof window !== "undefined") {
      const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }
    return shouldReduceMotion;
  };
})();
function ToastWrapper({
  id,
  visible,
  closeOutside,
  className,
  style,
  onHeightUpdate,
  children
}) {
  const ref = _react.useCallback.call(void 0, 
    (el) => {
      if (el) {
        const updateHeight = () => {
          const { height } = el.getBoundingClientRect();
          onHeightUpdate(id, height);
        };
        updateHeight();
        new MutationObserver(updateHeight).observe(el, {
          subtree: true,
          childList: true,
          characterData: true
        });
      }
    },
    [id, onHeightUpdate]
  );
  _react.useEffect.call(void 0, () => {
    const callback = (event) => {
      const target = event.target;
      const isInsideToast = target.closest(`[data-toast-id="${id}"]`);
      if (!isInsideToast) {
        toast.dismiss(id);
      }
    };
    if (closeOutside) {
      setTimeout(() => {
        document.addEventListener("click", callback);
      }, 0);
    }
    return () => {
      if (closeOutside) {
        setTimeout(() => {
          document.removeEventListener("click", callback);
        }, 0);
      }
    };
  }, [visible, id, closeOutside]);
  return /* @__PURE__ */ _react2.default.createElement("div", { "data-toast-id": id, ref, className, style }, children);
}
var getPositionStyle = (position, offset) => {
  const top = position.includes("top");
  const verticalStyle = top ? { top: 0 } : { bottom: 0 };
  const horizontalStyle = position.includes("center") ? { justifyContent: "center" } : position.includes("right") ? { justifyContent: "flex-end" } : {};
  return {
    left: 0,
    right: 0,
    display: "flex",
    position: "absolute",
    transition: prefersReducedMotion() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle
  };
};
var DEFAULT_OFFSET = 16;
function Toaster({
  reverseOrder,
  position = "top-center",
  toastOptions,
  gutter,
  children,
  containerStyle,
  containerClassName
}) {
  const { toasts, handlers } = _headless.useToaster.call(void 0, toastOptions);
  return /* @__PURE__ */ _react2.default.createElement(
    "div",
    {
      style: {
        position: "fixed",
        zIndex: 9999,
        top: DEFAULT_OFFSET,
        left: DEFAULT_OFFSET,
        right: DEFAULT_OFFSET,
        bottom: DEFAULT_OFFSET,
        pointerEvents: "none",
        ...containerStyle
      },
      className: containerClassName,
      onMouseEnter: handlers.startPause,
      onMouseLeave: handlers.endPause
    },
    toasts.map((t) => {
      const toastPosition = t.position || position;
      const toast2 = { ...t, position: toastPosition };
      const offset = handlers.calculateOffset(toast2, {
        reverseOrder,
        gutter,
        defaultPosition: position
      });
      const positionStyle = getPositionStyle(toastPosition, offset);
      const Component = children;
      return /* @__PURE__ */ _react2.default.createElement(
        ToastWrapper,
        {
          id: toast2.id,
          key: toast2.id,
          visible: toast2.visible,
          closeOutside: _optionalChain([toast2, 'optionalAccess', _7 => _7.extraParams, 'optionalAccess', _8 => _8.closeOutside]) || false,
          onHeightUpdate: handlers.updateHeight,
          style: {
            ...positionStyle,
            pointerEvents: "auto"
          }
        },
        toast2.type === "custom" ? _headless.resolveValue.call(void 0, t.message, toast2) : Component ? /* @__PURE__ */ _react2.default.createElement(Component, { ...toast2 }) : /* @__PURE__ */ _react2.default.createElement("div", { style: { display: t.visible ? "flex" : "none" } }, _headless.resolveValue.call(void 0, toast2.message, toast2))
      );
    })
  );
}

// src/internal/utils/undo-event-emitter.ts
var _eventemitter3 = require('eventemitter3'); var _eventemitter32 = _interopRequireDefault(_eventemitter3);
var eventEmitter = new (0, _eventemitter32.default)();
var undoEventEmitter = {
  /**
   * Listens for the next 'end' event and then removes the listener.
   *
   * @param type The type of event to listen for. Currently only 'end' is supported.
   * @param callback The callback function to be called when the event is emitted. The callback will receive a boolean indicating whether the event was triggered by an undo action.
   * @return A function that can be called to remove the listener.
   */
  once: (type, callback) => {
    eventEmitter.once(type, callback);
  },
  /**
   * Emits an 'end' event, which is used to let any registered callbacks know that an undo/redo action has completed.
   *
   * @param type The type of event to emit. Currently only 'end' is supported.
   * @param isUndo A boolean indicating whether the event was triggered by an undo action.
   */
  emit: (type, isUndo) => {
    eventEmitter.emit(type, isUndo);
  }
};

// src/components/RQWrapper.tsx
var Context = _react.createContext.call(void 0, {
  apiUrl: "",
  apiEnsureTrailingSlash: false,
  apiClient: fetcher,
  toastUndo: () => {
  }
});
var useRQWrapperContext = () => {
  return _react.useContext.call(void 0, Context);
};
function RQWrapper({
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
  toast: toastProps
}) {
  const queryClient = _react.useMemo.call(void 0, () => {
    return new (0, _reactquery.QueryClient)({
      ...config,
      defaultOptions: {
        ..._optionalChain([config, 'optionalAccess', _9 => _9.defaultOptions]),
        queries: {
          gcTime: 5 * 60 * 1e3,
          // 5 minutes,
          staleTime: 5 * 60 * 1e3,
          // 5 minutes
          retry: false,
          ..._optionalChain([config, 'optionalAccess', _10 => _10.defaultOptions, 'optionalAccess', _11 => _11.queries])
        }
      }
    });
  }, []);
  const fetch2 = _react.useCallback.call(void 0, (args) => {
    const globalAuthorization = apiAuthorization ? apiAuthorization() : "";
    const globalHeaders = apiHeaders ? apiHeaders() : {};
    const onSuccess = (...successArgs) => {
      if (apiOnSuccess) {
        apiOnSuccess(...successArgs);
      }
      if (args.onSuccess) {
        args.onSuccess(...successArgs);
      }
    };
    const onError = (...errorArgs) => {
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
        ...args.headers
      } : globalHeaders,
      authorization: args.authorization || globalAuthorization,
      onSuccess,
      onError
    });
  }, []);
  const toastUndo = _react.useCallback.call(void 0, (data) => {
    let isSuccess = false;
    toast.dismiss();
    const onUndo = () => {
      isSuccess = true;
      undoEventEmitter.emit("end", true);
      toast.dismiss();
    };
    toast.success(
      (t) => {
        const CustomContent = _optionalChain([toastProps, 'optionalAccess', _12 => _12.CustomUndoContent]);
        if (!t.visible && !isSuccess) {
          isSuccess = true;
          undoEventEmitter.emit("end", false);
        }
        return CustomContent ? /* @__PURE__ */ _react2.default.createElement(CustomContent, { message: data.message, onUndo, type: data.type }) : /* @__PURE__ */ _react2.default.createElement(_react2.default.Fragment, null, data.message, /* @__PURE__ */ _react2.default.createElement(
          "span",
          {
            style: { marginLeft: "10px", cursor: "pointer" },
            onClick: onUndo,
            role: "button",
            tabIndex: 0,
            "aria-label": "Undo",
            title: "Undo"
          },
          "UNDO"
        ));
      },
      {
        duration: _optionalChain([toastProps, 'optionalAccess', _13 => _13.globalProps, 'optionalAccess', _14 => _14.toastOptions, 'optionalAccess', _15 => _15.duration]) || 5e3,
        extraParams: { closeOutside: true }
      }
    );
  }, []);
  const contextValue = _react.useMemo.call(void 0, () => ({
    apiUrl: removeFirstAndLastSlash(apiUrl),
    apiClient: fetch2,
    apiEnsureTrailingSlash,
    toastUndo
  }), [apiUrl, fetch2, toastUndo, apiEnsureTrailingSlash]);
  return /* @__PURE__ */ _react2.default.createElement(_reactquery.QueryClientProvider, { client: queryClient }, /* @__PURE__ */ _react2.default.createElement(Toaster, { ..._optionalChain([toastProps, 'optionalAccess', _16 => _16.globalProps]) }, _optionalChain([toastProps, 'optionalAccess', _17 => _17.CustomContent])), /* @__PURE__ */ _react2.default.createElement(Context.Provider, { value: contextValue }, children), isDevTools && /* @__PURE__ */ _react2.default.createElement(
    _reactquerydevtools.ReactQueryDevtools,
    {
      buttonPosition: "bottom-right",
      initialIsOpen: false,
      ...devToolsOptions
    }
  ));
}

// src/hooks/use-get-list.ts
var useGetList = ({
  queryOptions,
  resource,
  params = {},
  apiClientParams
}) => {
  const { apiUrl, apiClient, apiEnsureTrailingSlash } = useRQWrapperContext();
  const query = _reactquery.useQuery.call(void 0, {
    ...queryOptions,
    queryKey: [
      "get-list",
      resource.path,
      resource.params,
      params,
      ..._optionalChain([queryOptions, 'optionalAccess', _18 => _18.queryKey]) ? queryOptions.queryKey : []
    ],
    queryFn: async ({ queryKey }) => {
      const variables = { resource, params, queryKey };
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, apiEnsureTrailingSlash)}`;
      if (_optionalChain([queryOptions, 'optionalAccess', _19 => _19.queryFn])) {
        const results = await _optionalChain([queryOptions, 'optionalAccess', _20 => _20.queryFn, 'call', _21 => _21({
          apiClient,
          apiUrl,
          variables,
          url
        })]);
        return results;
      }
      const result = await apiClient({
        url,
        method: "GET",
        params,
        ...apiClientParams
      });
      return result;
    }
  });
  return query;
};

// src/hooks/use-get-infinite-list.ts

var useGetInfiniteList = ({
  queryOptions,
  resource,
  params = {},
  apiClientParams,
  pagination
}) => {
  const { apiUrl, apiClient, apiEnsureTrailingSlash } = useRQWrapperContext();
  const query = _reactquery.useInfiniteQuery.call(void 0, {
    initialPageParam: 1,
    getNextPageParam: (...args) => {
      const lastPage = args[0];
      const lastPageParam = Number(args[2]);
      if (!_optionalChain([lastPage, 'optionalAccess', _22 => _22.data, 'optionalAccess', _23 => _23.length])) {
        return void 0;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (...args) => {
      const firstPageParam = Number(args[2]);
      if (firstPageParam <= 1) {
        return void 0;
      }
      return firstPageParam - 1;
    },
    ...queryOptions,
    queryKey: [
      "get-infinite-list",
      resource.path,
      resource.params,
      pagination,
      params,
      ..._optionalChain([queryOptions, 'optionalAccess', _24 => _24.queryKey]) ? queryOptions.queryKey : []
    ],
    queryFn: async ({ queryKey, pageParam }) => {
      const variables = {
        resource,
        params: {
          ...params,
          [pagination.page[0]]: pageParam,
          [pagination.per_page[0]]: pagination.per_page[1]
        },
        queryKey
      };
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, apiEnsureTrailingSlash)}`;
      if (_optionalChain([queryOptions, 'optionalAccess', _25 => _25.queryFn])) {
        const results = await _optionalChain([queryOptions, 'optionalAccess', _26 => _26.queryFn, 'call', _27 => _27({
          apiClient,
          apiUrl,
          variables,
          url
        })]);
        return results;
      }
      const result = await apiClient({
        url,
        method: "GET",
        params: variables.params,
        ...apiClientParams
      });
      return result;
    }
  });
  return query;
};

// src/hooks/use-get-one.ts

var useGetOne = ({
  resource,
  id,
  queryOptions,
  params = {},
  apiClientParams
}) => {
  const { apiUrl, apiClient, apiEnsureTrailingSlash } = useRQWrapperContext();
  const query = _reactquery.useQuery.call(void 0, {
    ...queryOptions,
    queryKey: [
      "get-one",
      resource.path,
      resource.params,
      String(id),
      params,
      ..._optionalChain([queryOptions, 'optionalAccess', _28 => _28.queryKey]) ? queryOptions.queryKey : []
    ],
    queryFn: async ({ queryKey }) => {
      const variables = {
        id,
        resource,
        params,
        queryKey
      };
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, true)}`;
      if (_optionalChain([queryOptions, 'optionalAccess', _29 => _29.queryFn])) {
        const results = await _optionalChain([queryOptions, 'optionalAccess', _30 => _30.queryFn, 'call', _31 => _31({
          apiClient,
          apiUrl,
          variables,
          url
        })]);
        return results;
      }
      const result = await apiClient({
        url: `${url}${variables.id}${apiEnsureTrailingSlash ? "/" : ""}`,
        method: "GET",
        params,
        ...apiClientParams
      });
      return result;
    }
  });
  return query;
};

// src/hooks/use-delete.ts



// src/utils/queries/add-item-from-query-cache.ts
var addItemFromQueryCache = ({
  queryClient,
  data,
  queryKeysOne,
  queryKeysList,
  queryKeysInfiniteList,
  cacheAddItemTo = "start"
}) => {
  const updateListData = (page) => {
    if (!page || !(page.data instanceof Array)) {
      return page;
    }
    return {
      ...page,
      data: cacheAddItemTo === "start" ? [data, ...page.data] : [...page.data, data]
    };
  };
  if (queryKeysOne) {
    queryKeysOne.forEach((queryKeyOne) => {
      queryClient.setQueryData(queryKeyOne, data);
    });
  }
  if (queryKeysList) {
    queryKeysList.forEach((queryKey) => {
      queryClient.setQueriesData(
        { queryKey },
        updateListData
      );
    });
  }
  if (queryKeysInfiniteList) {
    queryKeysInfiniteList.forEach((queryKey) => {
      queryClient.setQueriesData(
        { queryKey },
        (old) => {
          if (!old) {
            return old;
          }
          return {
            ...old,
            pages: old.pages.map(updateListData)
          };
        }
      );
    });
  }
};

// src/utils/queries/delete-items-from-query-cache.ts
var deleteItemsFromQueryCache = ({
  queryClient,
  ids,
  queryKeysOne,
  queryKeysList,
  queryKeysInfiniteList
}) => {
  const updateListData = (page) => {
    if (!page || !(page.data instanceof Array)) {
      return page;
    }
    return {
      ...page,
      data: page.data.filter((item) => {
        return !ids.some((id) => String(id) === String(item.id));
      })
    };
  };
  if (queryKeysOne) {
    queryKeysOne.forEach((queryKeyOne) => {
      queryClient.removeQueries({ queryKey: queryKeyOne });
    });
  }
  if (queryKeysList) {
    queryKeysList.forEach((queryKey) => {
      queryClient.setQueriesData(
        { queryKey },
        updateListData
      );
    });
  }
  if (queryKeysInfiniteList) {
    queryKeysInfiniteList.forEach((queryKey) => {
      queryClient.setQueriesData(
        { queryKey },
        (old) => {
          if (!old) {
            return old;
          }
          return {
            ...old,
            pages: old.pages.map(updateListData)
          };
        }
      );
    });
  }
};

// src/utils/queries/helpers-query-keys.ts
var helpersQueryKeys = {
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
  getOne: (itemResource, id) => ["get-one", itemResource.path, itemResource.params, String(id)],
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
  getOneArray: (itemResource, ids) => ids.map((id) => ["get-one", itemResource.path, itemResource.params, String(id)]),
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
  getList: (itemResource) => ["get-list", itemResource.path, itemResource.params],
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
  getInfiniteList: (itemResource) => ["get-infinite-list", itemResource.path, itemResource.params],
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
  getDataQuery: (itemResource) => ["query-data", itemResource.path, itemResource.params]
};

// src/internal/utils/is-equal.ts
function isEqual(data1, data2) {
  if (typeof data1 !== typeof data2) {
    return false;
  }
  if (data1 instanceof Object && data2 instanceof Object) {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const value1 = data1[key];
      const value2 = data2[key];
      if (value1 !== value2 && !isEqual(value1, value2)) {
        return false;
      }
    }
    return true;
  }
  if (Array.isArray(data1) && Array.isArray(data2)) {
    if (data1.length !== data2.length) {
      return false;
    }
    for (let i = 0; i < data1.length; i++) {
      if (data1[i] !== data2[i] && !isEqual(data1[i], data2[i])) {
        return false;
      }
    }
    return true;
  }
  return data1 === data2;
}

// src/utils/queries/invalidate-matching-queries.ts
var invalidateMatchingQueries = ({
  queryClient,
  queryKeys
}) => {
  queryClient.invalidateQueries({
    predicate: (query) => {
      const keys = query.queryKey;
      return queryKeys.some((keyGroup) => keyGroup.every((matchKey) => keys.some((key) => isEqual(key, matchKey))));
    }
  });
};

// src/utils/queries/invalidate-queries.ts
var invalidateQueries = ({
  queryClient,
  queryKeys
}) => {
  queryKeys.forEach((queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  });
};

// src/internal/utils/merge-objects.ts
function mergeObjects(target, source) {
  const result = { ...target };
  if (target instanceof Object && source instanceof Object) {
    for (const key in source) {
      if (key in target) {
        const targetValue = target[key];
        const sourceValue = source[key];
        const isSameType = typeof targetValue === typeof sourceValue && (Array.isArray(targetValue) && Array.isArray(sourceValue) || targetValue !== null && !Array.isArray(targetValue) && typeof targetValue === "object" && !Array.isArray(sourceValue) && typeof sourceValue === "object" || typeof targetValue !== "object" && typeof sourceValue !== "object");
        if (isSameType) {
          if (typeof targetValue === "object" && targetValue !== null && !Array.isArray(targetValue)) {
            result[key] = mergeObjects(targetValue, sourceValue);
          } else {
            result[key] = sourceValue;
          }
        }
      }
    }
  }
  return result;
}

// src/utils/queries/update-items-from-query-cache.ts
var updateItemsFromQueryCache = ({
  queryClient,
  data,
  ids,
  queryKeysOne,
  queryKeysList,
  queryKeysInfiniteList
}) => {
  const updateListData = (page) => {
    if (!page || !(page.data instanceof Array)) {
      return page;
    }
    return {
      ...page,
      data: page.data.map((item) => {
        return ids.some((id) => String(id) === String(item.id)) ? mergeObjects(item, data) : item;
      })
    };
  };
  if (queryKeysOne) {
    queryKeysOne.forEach((queryKeyOne) => {
      queryClient.setQueriesData(
        { queryKey: queryKeyOne },
        (old) => {
          if (!old || !(old.data instanceof Object) || !(data instanceof Object)) {
            return old;
          }
          return { ...old, data: mergeObjects(old.data, data) };
        }
      );
    });
  }
  if (queryKeysList) {
    queryKeysList.forEach((queryKey) => {
      queryClient.setQueriesData(
        { queryKey },
        updateListData
      );
    });
  }
  if (queryKeysInfiniteList) {
    queryKeysInfiniteList.forEach((queryKey) => {
      queryClient.setQueriesData(
        { queryKey },
        (old) => {
          if (!old) {
            return old;
          }
          return {
            ...old,
            pages: old.pages.map(updateListData)
          };
        }
      );
    });
  }
};

// src/internal/utils/create-snapshot.ts
var createSnapshot = async (queryClient, keys) => {
  const snapshot = keys.reduce(
    (prev, queryKey) => prev.concat(queryClient.getQueriesData({ queryKey })),
    []
  );
  await Promise.all(
    snapshot.map(([queryKey]) => queryClient.cancelQueries({ queryKey }))
  );
  return snapshot;
};

// src/hooks/use-delete.ts
var useDeleteBase = ({
  resourcePath,
  mutationOptions,
  mode = {
    optimistic: true,
    undoable: true
  },
  extraResources = [],
  shouldUpdateCurrentResource = true,
  isInvalidateCache = true,
  type = "many"
}) => {
  const {
    apiUrl,
    apiClient,
    apiEnsureTrailingSlash,
    toastUndo
  } = useRQWrapperContext();
  const queryClient = _reactquery.useQueryClient.call(void 0, );
  const snapshot = _react.useRef.call(void 0, []);
  const backToSnapshot = () => {
    snapshot.current.forEach(([key, value]) => {
      queryClient.setQueryData(key, value);
    });
  };
  const { mutate, ...mutation } = _reactquery.useMutation.call(void 0, {
    ...mutationOptions,
    mutationKey: [
      type === "many" ? "delete-many" : "delete-one",
      resourcePath,
      ..._optionalChain([mutationOptions, 'optionalAccess', _32 => _32.mutationKey]) ? mutationOptions.mutationKey : []
    ],
    mutationFn: async (variables) => {
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, true)}`;
      if (_optionalChain([mutationOptions, 'optionalAccess', _33 => _33.mutationFn])) {
        const results = await _optionalChain([mutationOptions, 'optionalAccess', _34 => _34.mutationFn, 'call', _35 => _35({
          apiClient,
          apiUrl,
          variables,
          url
        })]);
        return results;
      }
      const ids = type === "many" ? variables.ids : [variables.id];
      const actions = await Promise.allSettled(ids.map((id) => apiClient({
        url: `${url}${id}${apiEnsureTrailingSlash ? "/" : ""}`,
        method: "DELETE",
        ...variables.apiClientParams
      })));
      const result = [];
      actions.forEach((response) => {
        if (response.status === "fulfilled") {
          result.push(response.value);
        } else {
          throw response.reason;
        }
      });
      return type === "many" ? result : result[0];
    },
    onSuccess: (...rest) => {
      const variables = rest[1];
      const queryKeys = [
        helpersQueryKeys.getList(variables.resource),
        helpersQueryKeys.getInfiniteList(variables.resource)
      ];
      extraResources.forEach((extResource) => {
        queryKeys.push(helpersQueryKeys.getList(extResource));
        queryKeys.push(helpersQueryKeys.getInfiniteList(extResource));
      });
      if (isInvalidateCache) {
        invalidateQueries({ queryClient, queryKeys });
      }
      if (_optionalChain([mutationOptions, 'optionalAccess', _36 => _36.onSuccess])) {
        mutationOptions.onSuccess(...rest);
      }
    },
    onError: (...rest) => {
      if (_optionalChain([mutationOptions, 'optionalAccess', _37 => _37.onError])) {
        mutationOptions.onError(...rest);
      }
      backToSnapshot();
    }
  });
  const deleteBase = async ({ resourceParams, undoMessage, ...variables }) => {
    const resource = {
      path: resourcePath,
      params: resourceParams
    };
    const ids = type === "many" ? variables.ids : [variables.id];
    if (mode.optimistic) {
      const queryKeysOne = shouldUpdateCurrentResource ? helpersQueryKeys.getOneArray(resource, ids) : [];
      const queryKeysList = shouldUpdateCurrentResource ? [helpersQueryKeys.getList(resource)] : [];
      const queryKeysInfiniteList = shouldUpdateCurrentResource ? [helpersQueryKeys.getInfiniteList(resource)] : [];
      extraResources.forEach((extResource) => {
        queryKeysOne.push(...helpersQueryKeys.getOneArray(extResource, ids));
        queryKeysList.push(helpersQueryKeys.getList(extResource));
        queryKeysInfiniteList.push(helpersQueryKeys.getInfiniteList(extResource));
      });
      snapshot.current = await createSnapshot(queryClient, [
        ...queryKeysOne,
        ...queryKeysList,
        ...queryKeysInfiniteList
      ]);
      deleteItemsFromQueryCache({
        queryClient,
        ids,
        queryKeysOne,
        queryKeysList,
        queryKeysInfiniteList
      });
    }
    if (mode.undoable) {
      const isMany = ids.length > 1;
      undoEventEmitter.once("end", (isUndo) => {
        if (isUndo) {
          backToSnapshot();
        } else {
          mutate({ ...variables, resource });
        }
      });
      toastUndo({
        message: undoMessage || `Element${isMany ? "s" : ""} deleted`,
        type: isMany ? "delete-many" : "delete-one"
      });
    } else {
      mutate({ ...variables, resource });
    }
  };
  return {
    mutation,
    delete: deleteBase
  };
};
var useDeleteOne = (props) => {
  return useDeleteBase({ ...props, type: "one" });
};
var useDeleteMany = (props) => {
  return useDeleteBase({ ...props, type: "many" });
};

// src/hooks/use-update.ts


var useUpdateBase = ({
  resourcePath,
  mutationOptions,
  mode = {
    optimistic: true,
    undoable: true
  },
  extraResources = [],
  shouldUpdateCurrentResource = true,
  type = "many"
}) => {
  const {
    apiUrl,
    apiClient,
    apiEnsureTrailingSlash,
    toastUndo
  } = useRQWrapperContext();
  const queryClient = _reactquery.useQueryClient.call(void 0, );
  const snapshot = _react.useRef.call(void 0, []);
  const backToSnapshot = () => {
    snapshot.current.forEach(([key, value]) => {
      queryClient.setQueryData(key, value);
    });
  };
  const { mutate, ...mutation } = _reactquery.useMutation.call(void 0, {
    ...mutationOptions,
    mutationKey: [
      type === "many" ? "update-many" : "update-one",
      resourcePath,
      ..._optionalChain([mutationOptions, 'optionalAccess', _38 => _38.mutationKey]) ? mutationOptions.mutationKey : []
    ],
    mutationFn: async (variables) => {
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, true)}`;
      if (_optionalChain([mutationOptions, 'optionalAccess', _39 => _39.mutationFn])) {
        const results = await _optionalChain([mutationOptions, 'optionalAccess', _40 => _40.mutationFn, 'call', _41 => _41({
          apiClient,
          apiUrl,
          variables,
          url
        })]);
        return results;
      }
      const ids = type === "many" ? variables.ids : [variables.id];
      const actions = await Promise.allSettled(ids.map((id) => apiClient({
        url: `${url}${id}${apiEnsureTrailingSlash ? "/" : ""}`,
        method: "PATCH",
        data: variables.data,
        ...variables.apiClientParams
      })));
      const result = [];
      actions.forEach((response) => {
        if (response.status === "fulfilled") {
          result.push(response.value);
        } else {
          throw response.reason;
        }
      });
      return type === "many" ? result : result[0];
    },
    onSuccess: (...rest) => {
      const variables = rest[1];
      if (!mode.optimistic) {
        const ids = type === "many" ? variables.ids : [variables.id];
        const queryKeys = [
          ...helpersQueryKeys.getOneArray(variables.resource, ids),
          helpersQueryKeys.getList(variables.resource),
          helpersQueryKeys.getInfiniteList(variables.resource)
        ];
        extraResources.forEach((extResource) => {
          queryKeys.push(...helpersQueryKeys.getOneArray(extResource, ids));
          queryKeys.push(helpersQueryKeys.getList(extResource));
          queryKeys.push(helpersQueryKeys.getInfiniteList(extResource));
        });
        invalidateQueries({ queryClient, queryKeys });
      }
      if (_optionalChain([mutationOptions, 'optionalAccess', _42 => _42.onSuccess])) {
        mutationOptions.onSuccess(...rest);
      }
    },
    onError: (...rest) => {
      if (_optionalChain([mutationOptions, 'optionalAccess', _43 => _43.onError])) {
        mutationOptions.onError(...rest);
      }
      backToSnapshot();
    }
  });
  const update = async ({ resourceParams, undoMessage, ...variables }) => {
    const resource = {
      path: resourcePath,
      params: resourceParams
    };
    const ids = type === "many" ? variables.ids : [variables.id];
    if (mode.optimistic) {
      const queryKeysOne = shouldUpdateCurrentResource ? helpersQueryKeys.getOneArray(resource, ids) : [];
      const queryKeysList = shouldUpdateCurrentResource ? [helpersQueryKeys.getList(resource)] : [];
      const queryKeysInfiniteList = shouldUpdateCurrentResource ? [helpersQueryKeys.getInfiniteList(resource)] : [];
      extraResources.forEach((extResource) => {
        queryKeysOne.push(...helpersQueryKeys.getOneArray(extResource, ids));
        queryKeysList.push(helpersQueryKeys.getList(extResource));
        queryKeysInfiniteList.push(helpersQueryKeys.getInfiniteList(extResource));
      });
      snapshot.current = await createSnapshot(queryClient, [
        ...queryKeysOne,
        ...queryKeysList,
        ...queryKeysInfiniteList
      ]);
      updateItemsFromQueryCache({
        queryClient,
        data: variables.data,
        ids,
        queryKeysOne,
        queryKeysList,
        queryKeysInfiniteList
      });
    }
    if (mode.undoable) {
      const isMany = ids.length > 1;
      undoEventEmitter.once("end", (isUndo) => {
        if (isUndo) {
          backToSnapshot();
        } else {
          mutate({ ...variables, resource });
        }
      });
      toastUndo({
        message: undoMessage || `Element${isMany ? "s" : ""} updated`,
        type: isMany ? "update-many" : "update-one"
      });
    } else {
      mutate({ ...variables, resource });
    }
  };
  return {
    mutation,
    update
  };
};
var useUpdateOne = (props) => {
  return useUpdateBase({ ...props, type: "one" });
};
var useUpdateMany = (props) => {
  return useUpdateBase({ ...props, type: "many" });
};

// src/hooks/use-create.ts

var useCreate = ({
  resourcePath,
  mutationOptions,
  extraResources = [],
  shouldUpdateCurrentResource = true,
  cacheAddItemTo = "start",
  isInvalidateCache = true
}) => {
  const { apiUrl, apiClient, apiEnsureTrailingSlash } = useRQWrapperContext();
  const queryClient = _reactquery.useQueryClient.call(void 0, );
  const { mutate, ...mutation } = _reactquery.useMutation.call(void 0, {
    ...mutationOptions,
    mutationKey: [
      "create",
      resourcePath,
      ..._optionalChain([mutationOptions, 'optionalAccess', _44 => _44.mutationKey]) ? mutationOptions.mutationKey : []
    ],
    mutationFn: async (variables) => {
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, apiEnsureTrailingSlash)}`;
      if (_optionalChain([mutationOptions, 'optionalAccess', _45 => _45.mutationFn])) {
        const results = await _optionalChain([mutationOptions, 'optionalAccess', _46 => _46.mutationFn, 'call', _47 => _47({
          apiClient,
          apiUrl,
          variables,
          url
        })]);
        return results;
      }
      const result = await apiClient({
        url,
        method: "POST",
        data: variables.data,
        ...variables.apiClientParams
      });
      return result;
    },
    onSuccess: (...rest) => {
      const data = rest[0];
      if (data) {
        const variables = rest[1];
        const { id } = data.data;
        const queryKeysOne = shouldUpdateCurrentResource ? [helpersQueryKeys.getOne(variables.resource, id)] : [];
        const queryKeysList = shouldUpdateCurrentResource ? [helpersQueryKeys.getList(variables.resource)] : [];
        const queryKeysInfiniteList = shouldUpdateCurrentResource ? [helpersQueryKeys.getInfiniteList(variables.resource)] : [];
        extraResources.forEach((extResource) => {
          queryKeysOne.push(helpersQueryKeys.getOne(extResource, id));
          queryKeysList.push(helpersQueryKeys.getList(extResource));
          queryKeysInfiniteList.push(helpersQueryKeys.getInfiniteList(extResource));
        });
        addItemFromQueryCache({
          queryClient,
          data: data.data || {},
          queryKeysOne: queryKeysOne.map((item) => [...item, {}]),
          queryKeysList,
          queryKeysInfiniteList,
          cacheAddItemTo
        });
        if (isInvalidateCache) {
          invalidateQueries({
            queryClient,
            queryKeys: [...queryKeysList, ...queryKeysInfiniteList]
          });
        }
      }
      if (_optionalChain([mutationOptions, 'optionalAccess', _48 => _48.onSuccess])) {
        mutationOptions.onSuccess(...rest);
      }
    }
  });
  const create = ({ resourceParams, ...variables }) => {
    const resource = {
      path: resourcePath,
      params: resourceParams
    };
    mutate({ ...variables, resource });
  };
  return {
    mutation,
    create
  };
};

// src/hooks/use-data-query.ts

var useDataQuery = ({
  queryOptions,
  resource,
  params = {},
  apiClientParams
}) => {
  const { apiUrl, apiClient, apiEnsureTrailingSlash } = useRQWrapperContext();
  const query = _reactquery.useQuery.call(void 0, {
    ...queryOptions,
    queryKey: [
      "query-data",
      resource.path,
      resource.params,
      params,
      ..._optionalChain([queryOptions, 'optionalAccess', _49 => _49.queryKey]) ? queryOptions.queryKey : []
    ],
    queryFn: async ({ queryKey }) => {
      const variables = { resource, params, queryKey };
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, apiEnsureTrailingSlash)}`;
      if (_optionalChain([queryOptions, 'optionalAccess', _50 => _50.queryFn])) {
        const results = await _optionalChain([queryOptions, 'optionalAccess', _51 => _51.queryFn, 'call', _52 => _52({
          apiClient,
          apiUrl,
          variables,
          url
        })]);
        return results;
      }
      const result = await apiClient({
        url,
        method: "GET",
        params,
        ...apiClientParams
      });
      return result;
    }
  });
  return query;
};

// src/hooks/use-data-mutate.ts

var useDataMutate = ({
  resourcePath,
  mutationOptions
}) => {
  const {
    apiUrl,
    apiClient,
    apiEnsureTrailingSlash
  } = useRQWrapperContext();
  const { mutate: onMutate, ...mutation } = _reactquery.useMutation.call(void 0, {
    ...mutationOptions,
    mutationKey: [
      "mutate-data",
      resourcePath,
      ..._optionalChain([mutationOptions, 'optionalAccess', _53 => _53.mutationKey]) ? mutationOptions.mutationKey : []
    ],
    mutationFn: async (variables) => {
      const url = `${apiUrl}/${getUrlFromResource(variables.resource, apiEnsureTrailingSlash)}`;
      if (_optionalChain([mutationOptions, 'optionalAccess', _54 => _54.mutationFn])) {
        const results = await _optionalChain([mutationOptions, 'optionalAccess', _55 => _55.mutationFn, 'call', _56 => _56({
          apiClient,
          apiUrl,
          variables,
          url
        })]);
        return results;
      }
      const result = await apiClient({
        url,
        data: variables.data,
        ...variables.apiClientParams
      });
      return result;
    }
  });
  const mutate = async ({ resourceParams, ...variables }) => {
    const resource = {
      path: resourcePath,
      params: resourceParams
    };
    onMutate({ ...variables, resource });
  };
  return {
    mutation,
    mutate
  };
};

























exports.CustomError = CustomError; exports.RQWrapper = RQWrapper; exports.ToastBar = ToastBar; exports.addItemFromQueryCache = addItemFromQueryCache; exports.deleteItemsFromQueryCache = deleteItemsFromQueryCache; exports.fetcher = fetcher; exports.getUrlFromResource = getUrlFromResource; exports.helpersQueryKeys = helpersQueryKeys; exports.invalidateMatchingQueries = invalidateMatchingQueries; exports.invalidateQueries = invalidateQueries; exports.resolveToastValue = resolveToastValue; exports.toast = toast; exports.updateItemsFromQueryCache = updateItemsFromQueryCache; exports.useCreate = useCreate; exports.useDataMutate = useDataMutate; exports.useDataQuery = useDataQuery; exports.useDeleteMany = useDeleteMany; exports.useDeleteOne = useDeleteOne; exports.useGetInfiniteList = useGetInfiniteList; exports.useGetList = useGetList; exports.useGetOne = useGetOne; exports.useRQWrapperContext = useRQWrapperContext; exports.useUpdateMany = useUpdateMany; exports.useUpdateOne = useUpdateOne;
//# sourceMappingURL=index.js.map