/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { RQWrapper } from '../components/RQWrapper';
import { useGetInfiniteList } from './use-get-infinite-list';

describe('useGetInfiniteList', () => {
  const apiClientMock = jest.fn();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RQWrapper apiUrl="http://api.example.com" apiClient={apiClientMock}>
      {children}
    </RQWrapper>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch initial page of resources', async () => {
    const mockResponse = {
      data: [{ id: 1, name: 'John Doe' }],
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetInfiniteList({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      pagination: {
        page: ['page_number'],
        per_page: ['count', 20],
      },
    }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiClientMock).toHaveBeenCalledWith({
      url: 'http://api.example.com/users/10/messages',
      method: 'GET',
      params: {
        page_number: 1,
        count: 20,
      },
      authorization: '',
      headers: {},
      onError: expect.any(Function),
      onSuccess: expect.any(Function),
    });

    expect(result.current.data?.pages[0]).toEqual(mockResponse);
  });

  // it('should handle errors correctly', async () => {
  //   const errorMessage = 'Error fetching resources';
  //   const customError = new CustomError(errorMessage);
  //   apiClientMock.mockRejectedValue(customError);

  //   const { result } = renderHook(() => useGetInfiniteList({
  //     resource: {
  //       path: 'users/{id}/messages',
  //       params: { id: '10' },
  //     },
  //     pagination: {
  //       page: ['page_number'],
  //       per_page: ['count', 20],
  //     },
  //   }), { wrapper });

  //   await waitFor(() => {
  //     expect(result.current.isError).toBe(true);
  //     expect(result.current.error).toBeInstanceOf(CustomError);
  //     expect(result.current.error?.message).toBe(errorMessage);
  //     expect(result.current.data).toBeUndefined();
  //   });
  // });

  it('should handle custom query function', async () => {
    const customQueryFn = jest.fn().mockResolvedValue({
      data: [{ id: 1, name: 'Custom Response' }],
    });

    const { result } = renderHook(() => useGetInfiniteList({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      pagination: {
        page: ['page_number'],
        per_page: ['count', 20],
      },
      queryOptions: {
        queryFn: customQueryFn,
      },
    }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(customQueryFn).toHaveBeenCalled();
    expect(apiClientMock).not.toHaveBeenCalled();
  });

  it('should handle custom query key', async () => {
    const mockResponse = {
      data: [{ id: 1, name: 'John Doe' }],
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetInfiniteList({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      pagination: {
        page: ['page_number'],
        per_page: ['count', 20],
      },
      queryOptions: {
        queryKey: ['custom-key'],
      },
    }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0]).toEqual(mockResponse);
  });

  it('should handle custom API client parameters', async () => {
    const mockResponse = {
      data: [{ id: 1, name: 'John Doe' }],
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetInfiniteList({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      pagination: {
        page: ['page_number'],
        per_page: ['count', 20],
      },
      apiClientParams: {
        headers: { 'Custom-Header': 'value' },
        authorization: 'Bearer token',
      },
    }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiClientMock).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: { 'Custom-Header': 'value' },
        authorization: 'Bearer token',
      }),
    );
  });

  it('should handle trailing slash in URL', async () => {
    const mockResponse = {
      data: [{ id: 1, name: 'John Doe' }],
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const wrapperWithTrailingSlash = ({ children }: { children: React.ReactNode }) => (
      <RQWrapper apiUrl="http://api.example.com" apiClient={apiClientMock} apiEnsureTrailingSlash>
        {children}
      </RQWrapper>
    );

    const { result } = renderHook(() => useGetInfiniteList({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      pagination: {
        page: ['page_number'],
        per_page: ['count', 20],
      },
    }), { wrapper: wrapperWithTrailingSlash });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiClientMock).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'http://api.example.com/users/10/messages/',
      }),
    );
  });

  it('should handle pagination correctly', async () => {
    const mockResponses = [
      { data: [{ id: 1, name: 'Page 1' }] },
      { data: [{ id: 2, name: 'Page 2' }] },
    ];
    apiClientMock
      .mockResolvedValueOnce(mockResponses[0])
      .mockResolvedValueOnce(mockResponses[1]);

    const { result } = renderHook(() => useGetInfiniteList({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      pagination: {
        page: ['page_number'],
        per_page: ['count', 20],
      },
    }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0]).toEqual(mockResponses[0]);

    // Fetch next page
    await result.current.fetchNextPage();

    await waitFor(() => {
      expect(apiClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
          params: {
            page_number: 2,
            count: 20,
          },
        }),
      );
      expect(result.current.data?.pages[1]).toEqual(mockResponses[1]);
    });
  });

  it('should handle empty response data', async () => {
    const mockResponse = {
      data: [],
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetInfiniteList({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      pagination: {
        page: ['page_number'],
        per_page: ['count', 20],
      },
    }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0]).toEqual(mockResponse);
    expect(result.current.hasNextPage).toBe(false);
  });
});
