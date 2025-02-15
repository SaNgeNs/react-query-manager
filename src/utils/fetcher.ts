import { ApiClient } from '../type';
import { CustomError } from './custom-error';

/**
 * Filters out null, undefined, and empty string values from the provided parameters object,
 * while keeping boolean and numeric values intact. The function returns a new object containing
 * only the non-empty parameters.
 *
 * @param {Record<string, any>} params - The object containing the parameters to be filtered.
 * @returns {Record<string, unknown>} A new object with only the non-empty parameters.
 */
export const filterEmptyParams = (params: any) => {
  if (params !== null && typeof params === 'object') {
    const optionParams: Record<string, unknown> = {};
    const entries = Object.entries(params);

    entries.forEach(([key, value]) => {
      if (value || typeof value === 'boolean' || typeof value === 'number') {
        optionParams[key] = value;
      }
    });

    return optionParams;
  }

  return {};
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param value The value to be encoded.
 *
 * @returns The encoded value.
 */
export const encode = (value: string) => {
  return encodeURIComponent(value)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
};

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
export const fetcher: ApiClient = ({
  onSuccess, onError, context, ...args
}) => {
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
          // eslint-disable-next-line no-prototype-builtins
          if (queryParams.hasOwnProperty(p)) {
            if (Array.isArray(queryParams[p])) {
              queryParams[p].forEach((value) => {
                str.push(`${encode(p)}${args.queryArrayParamStyle === 'indexedArray' ? '[]' : ''}=${encode(value)}`);
              });
            } else {
              str.push(
                `${encode(p)}=${encode((queryParams as any)[p])}`,
              );
            }
          }
        }

        URL += `?${str.join('&')}`;
      }
    }

    const [startUrl, endUrl] = URL.split('?');

    return `${startUrl}${endUrl ? `?${endUrl}` : ''}`;
  })();

  const body = (() => {
    if (isFormData) {
      return args.data;
    }

    if (args.data) {
      return JSON.stringify(args.data);
    }

    return '';
  })();

  const fetchOptions = {
    method: args.method,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(args.authorization && { Authorization: args.authorization }),
      ...args.headers,
    },
    ...(body && { body }),
    ...args.options,
  };

  return fetch(apiUrl, fetchOptions).then(async (response) => {
    const responseData = await (async () => {
      try {
        const contentLength = response.headers.get('Content-Length');
        const contentType = response.headers.get('Content-Type')?.toLowerCase();

        if (
          response.status === 204 ||
          response.status === 304 ||
          contentLength === '0' ||
          !contentType
        ) {
          return null;
        }

        if (contentType.includes('application/json')) {
          return await response.json();
        }

        if (
          contentType.includes('text/plain')
          || contentType.includes('text/csv')
          || contentType.includes('application/xml')
          || contentType.includes('text/xml')
          || contentType.includes('application/javascript')
          || contentType.includes('text/html')
        ) {
          return await response.text();
        }

        if (contentType.includes('multipart/form-data')) {
          return await response.formData();
        }

        return await response.blob();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return null;
      }
    })();

    const headers: Record<string, string> = {};

    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      status: response.status,
      statusText: response.statusText,
      headers,
      data: responseData,
    };
  }).then((result) => {
    if (result.status < 200 || result.status >= 300) {
      const error = new CustomError(
        `Request failed with status code: ${result.status}`,
        result.status,
        result.data,
      );

      if (onError) {
        onError(error, args, context);
      }

      return Promise.reject(error);
    }

    if (onSuccess) {
      onSuccess(result, args, context);
    }

    return Promise.resolve(result);
  }).catch((error) => {
    return Promise.reject(new CustomError(
      error.message,
    ));
  });
};
