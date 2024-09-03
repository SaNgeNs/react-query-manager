/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */

import { ApiClient } from '../type';
import { CustomError } from './custom-error';

/**
 * Deletes empty parameters from the given object.
 * @param {any} params The object to process.
 * @returns {Record<string, unknown>} The new object with all empty parameters removed.
 */
const deleteEmptyParams = (params: any) => {
  if (params !== null && typeof params === 'object') {
    const optionParams: Record<string, unknown> = {};
    const entries = Object.entries(params);

    entries.forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) { optionParams[key] = value; }
      } else if (value instanceof Object) {
        if (value && Object.keys(value).length > 0) { optionParams[key] = value; }
      } else if (value || typeof value === 'boolean') {
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
function encode(value: string) {
  return encodeURIComponent(value)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

/**
 * A utility function for making API requests.
 *
 * @example
 * import { fetcher } from 'react-query-manager';
 *
 * fetcher({
 *   url: 'https://jsonplaceholder.typicode.com/todos/1',
 *   method: 'GET',
 *   onSuccess: (data, args) => {
 *     console.log(data);
 *   },
 *   onError: (error, args) => {
 *     console.error(error);
 *   },
 * });
 *
 * @param args The request configuration.
 *
 * @returns The response as a promise.
 */
export const fetcher: ApiClient = (args) => {
  const { onSuccess, onError } = args;

  const isFormData = args.data instanceof FormData;

  const apiUrl = (() => {
    let URL = args.url;

    if (args.params) {
      const queryParams = deleteEmptyParams(args.params);

      if (args.queryParamsSerializer) {
        URL += `?${args.queryParamsSerializer(args.params)}`;
      } else if (Object.keys(queryParams).length > 0) {
        const str = [];

        for (const p in queryParams) {
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

    if (startUrl.charAt(startUrl.length - 1) !== '/' && !endUrl) {
      return `${startUrl}/${`${endUrl ? `?${endUrl}` : ''}`}`;
    }

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
        const contentType = response.headers.get('Content-Type')?.toLowerCase() || '';

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
      } catch (error) {
        console.error('Error handling response:', error);
        throw error;
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
        onError(error, args);
      }

      return Promise.reject(error);
    }

    if (onSuccess) { onSuccess(result, args); }

    return Promise.resolve(result);
  }).catch((error) => {
    return Promise.reject(new CustomError(
      error.message,
    ));
  });
};
