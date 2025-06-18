/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { RQWrapper } from '../components/RQWrapper';
import { useGetOne } from './use-get-one';

describe('useGetOne', () => {
  const apiClientMock = jest.fn();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RQWrapper apiUrl="http://api.example.com" apiClient={apiClientMock}>
      {children}
    </RQWrapper>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch a single resource', async () => {
    const mockResponse = {
      data: { id: 1, name: 'John Doe' },
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetOne({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      id: 123,
      params: { include: 'details' },
    }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiClientMock).toHaveBeenCalledWith({
      url: 'http://api.example.com/users/10/messages/123',
      method: 'GET',
      params: { include: 'details' },
      authorization: '',
      headers: {},
      onError: expect.any(Function),
      onSuccess: expect.any(Function),
    });

    expect(result.current.data).toEqual(mockResponse);
  });

  // it('should handle errors correctly', async () => {
  //   apiClientMock.mockRejectedValue(new CustomError('Error fetching resource'));

  //   const { result } = renderHook(() => useGetOne({
  //     resource: {
  //       path: 'users/{id}/messages',
  //       params: { id: '10' },
  //     },
  //     id: 123,
  //   }), { wrapper });

  //   await waitFor(() => expect(result.current.isError).toBe(true));
  //   expect(result.current.error).toBeInstanceOf(CustomError);
  //   expect(result.current.error?.message).toBe('Error fetching resource');
  // });

  it('should handle custom query function', async () => {
    const customQueryFn = jest.fn().mockResolvedValue({
      data: { id: 1, name: 'Custom Response' },
    });

    const { result } = renderHook(() => useGetOne({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      id: 123,
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
      data: { id: 1, name: 'John Doe' },
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetOne({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      id: 123,
      queryOptions: {
        queryKey: ['custom-key'],
      },
    }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResponse);
  });

  it('should handle custom API client parameters', async () => {
    const mockResponse = {
      data: { id: 1, name: 'John Doe' },
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetOne({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      id: 123,
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
      data: { id: 1, name: 'John Doe' },
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const wrapperWithTrailingSlash = ({ children }: { children: React.ReactNode }) => (
      <RQWrapper apiUrl="http://api.example.com" apiClient={apiClientMock} apiEnsureTrailingSlash>
        {children}
      </RQWrapper>
    );

    const { result } = renderHook(() => useGetOne({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      id: 123,
    }), { wrapper: wrapperWithTrailingSlash });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiClientMock).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'http://api.example.com/users/10/messages/123/',
      }),
    );
  });

  it('should handle numeric ID', async () => {
    const mockResponse = {
      data: { id: 1, name: 'John Doe' },
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetOne({
      resource: {
        path: 'users/{id}/messages',
        params: { id: '10' },
      },
      id: 123,
    }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiClientMock).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'http://api.example.com/users/10/messages/123',
      }),
    );
  });
});
