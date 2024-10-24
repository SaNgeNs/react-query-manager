import { CustomError } from './custom-error';
import { encode, fetcher, filterEmptyParams } from './fetcher';

global.fetch = jest.fn();

describe('fetcher', () => {
  describe('filterEmptyParams', () => {
    it('should return an empty object when params is null', () => {
      expect(filterEmptyParams(null)).toEqual({});
    });

    it('should return an empty object when params is not an object', () => {
      expect(filterEmptyParams(42)).toEqual({});
      expect(filterEmptyParams('string')).toEqual({});
      expect(filterEmptyParams(true)).toEqual({});
      expect(filterEmptyParams(undefined)).toEqual({});
    });

    it('should return an empty object when params is an empty object', () => {
      expect(filterEmptyParams({})).toEqual({});
    });

    it('should filter out empty values and return only non-empty values', () => {
      const params = {
        a: '',
        b: null,
        c: undefined,
        d: 0,
        e: false,
        f: true,
        g: 'string',
        h: 42,
      };

      expect(filterEmptyParams(params)).toEqual({
        d: 0,
        e: false,
        f: true,
        g: 'string',
        h: 42,
      });
    });
  });

  describe('encode', () => {
    it('should encode special characters correctly', () => {
      expect(encode('Hello World!')).toEqual('Hello+World!');
      expect(encode('Value:100')).toEqual('Value:100');
      expect(encode('$100')).toEqual('$100');
      expect(encode('100%')).toEqual('100%25');
      expect(encode('A,B,C')).toEqual('A,B,C');
      expect(encode('Array[1,2,3]')).toEqual('Array[1,2,3]');
    });
  });

  describe('fetcher', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should make a GET request and return response data', async () => {
      const mockResponse = { data: 'mock data' };
      const onSuccess = jest.fn();
      const onError = jest.fn();

      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
        onSuccess,
        onError,
      });

      expect(fetch).toHaveBeenCalledWith('https://example.com/api', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      expect(onSuccess).toHaveBeenCalledWith(
        {
          status: 200,
          statusText: 'OK',
          headers: { 'content-type': 'application/json' },
          data: mockResponse,
        },
        { url: 'https://example.com/api', method: 'GET' },
        undefined,
      );

      expect(result).toEqual({
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
        },
        data: mockResponse,
      });
    });

    it('should handle API errors and call onError', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const onSuccess = jest.fn();
      const onError = jest.fn();
      const mockErrorResponse = { message: 'Not Found' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 404,
        statusText: 'Not Found',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      });

      await expect(
        fetcher({
          url: 'https://example.com/api',
          method: 'GET',
          onSuccess,
          onError,
        }),
      ).rejects.toThrow(CustomError);

      expect(onError).toHaveBeenCalled();

      jest.spyOn(console, 'error').mockRestore();
    });

    it('should correctly encode URL parameters', async () => {
      const mockResponse = { data: 'mock data' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
        params: { search: 'test', filter: null },
      });

      expect(fetch).toHaveBeenCalledWith('https://example.com/api?search=test', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should handle FormData correctly', async () => {
      const mockResponse = { data: 'mock data' };
      const formData = new FormData();
      formData.append('file', new Blob(['file content'], { type: 'text/plain' }));

      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      await fetcher({
        url: 'https://example.com/api',
        method: 'POST',
        data: formData,
      });

      expect(fetch).toHaveBeenCalledWith('https://example.com/api', {
        method: 'POST',
        body: formData,
        headers: {},
      });
    });

    it('should serialize data to JSON when data is provided', async () => {
      const mockResponse = { data: 'mock data' };
      const data = { name: 'mock name' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      await fetcher({
        url: 'https://example.com/api',
        method: 'POST',
        data: data,
      });

      expect(fetch).toHaveBeenCalledWith('https://example.com/api', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should make a GET request and return response Blob', async () => {
      const mockResponse = new Blob(['file content'], { type: 'text/plain' });

      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/octet-stream' }),
        blob: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
      });

      expect(result).toEqual({
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/octet-stream',
        },
        data: mockResponse,
      });
    });

    it('should make a GET request and return response Text', async () => {
      const mockResponse = 'Text';

      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'text/plain' }),
        text: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
      });

      expect(result).toEqual({
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'text/plain',
        },
        data: mockResponse,
      });
    });

    it('should make a GET request and return response Text', async () => {
      const mockResponse = new FormData();

      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
        formData: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
      });

      expect(result).toEqual({
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'multipart/form-data',
        },
        data: mockResponse,
      });
    });

    it('should handle without Content Type correctly', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({}),
      });

      await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
      });

      expect(fetch).toHaveBeenCalledWith('https://example.com/api', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should handle with response error', async () => {
      const error = new Error('error');

      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: jest.fn().mockRejectedValueOnce(error),
      });

      const response = await fetcher({ url: 'https://example.com/api', method: 'GET' });

      expect(response).toEqual({
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        data: null,
      });
    });

    it('should construct URL with params and queryParamsSerializer', async () => {
      const mockResponse = { data: 'mock data' };
      const params = { id: 1, name: '' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
        params,
        queryParamsSerializer: jest.fn().mockReturnValue('id=1'),
      });

      expect(fetch).toHaveBeenCalledWith('https://example.com/api?id=1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should handle array query parameters correctly', async () => {
      const mockResponse = { data: 'mock data' };
      const params = {
        filter: ['active', 'pending'],
      };

      (fetch as jest.Mock).mockResolvedValue({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
        params,
        queryArrayParamStyle: 'indexedArray',
      });

      expect(fetch).toHaveBeenCalledWith(
        'https://example.com/api?filter[]=active&filter[]=pending', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

      await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
        params,
      });

      expect(fetch).toHaveBeenCalledWith(
        'https://example.com/api?filter=active&filter=pending', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
    });

    it('should handle array query parameters correctly', async () => {
      const mockResponse = { data: 'mock data' };

      (fetch as jest.Mock).mockResolvedValue({
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      await fetcher({
        url: 'https://example.com/api',
        method: 'GET',
        authorization: 'Bearer token123',
      });

      expect(fetch).toHaveBeenCalledWith(
        'https://example.com/api', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token123',
          },
        });
    });
  });
});
