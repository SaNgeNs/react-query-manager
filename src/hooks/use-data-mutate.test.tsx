/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { RQWrapper } from '../components/RQWrapper';
import { CustomError } from '../utils/custom-error';
import { useDataMutate } from './use-data-mutate';

describe('useDataMutate', () => {
  const apiClientMock = jest.fn();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RQWrapper apiUrl="http://api.example.com" apiClient={apiClientMock}>
      {children}
    </RQWrapper>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should mutate data with default API client', async () => {
    const mockResponse = {
      data: { id: 1, name: 'John Doe' },
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useDataMutate({
      resourcePath: 'users/{id}/messages',
    }), { wrapper });

    await act(async () => {
      await result.current.mutate({
        data: { name: 'John Doe' },
        resourceParams: { id: '10' },
        apiClientParams: { method: 'POST' },
      });
    });

    expect(apiClientMock).toHaveBeenCalledWith({
      url: 'http://api.example.com/users/10/messages',
      method: 'POST',
      data: { name: 'John Doe' },
      authorization: '',
      headers: {},
      onError: expect.any(Function),
      onSuccess: expect.any(Function),
    });
  });

  it('should handle errors correctly', async () => {
    apiClientMock.mockRejectedValue(new CustomError('Error mutating data'));

    const { result } = renderHook(() => useDataMutate({
      resourcePath: 'users/{id}/messages',
    }), { wrapper });

    await act(async () => {
      await result.current.mutate({
        data: { name: 'John Doe' },
        resourceParams: { id: '10' },
        apiClientParams: { method: 'POST' },
      });
    });

    await waitFor(() => expect(result.current.mutation.isError).toBeTruthy());

    expect(result.current.mutation.isError).toBe(true);
    expect(result.current.mutation.error).toBeInstanceOf(CustomError);
    expect(result.current.mutation.error?.message).toBe('Error mutating data');
  });

  it('should handle custom mutation function', async () => {
    const customMutationFn = jest.fn().mockResolvedValue({
      data: { id: 1, name: 'Custom Response' },
    });

    const { result } = renderHook(() => useDataMutate({
      resourcePath: 'users/{id}/messages',
      mutationOptions: {
        mutationFn: customMutationFn,
      },
    }), { wrapper });

    await act(async () => {
      await result.current.mutate({
        data: { name: 'John Doe' },
        resourceParams: { id: '10' },
        apiClientParams: { method: 'POST' },
      });
    });

    expect(customMutationFn).toHaveBeenCalled();
    expect(apiClientMock).not.toHaveBeenCalled();
  });

  it('should handle custom mutation key', async () => {
    const mockResponse = {
      data: { id: 1, name: 'John Doe' },
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useDataMutate({
      resourcePath: 'users/{id}/messages',
      mutationOptions: {
        mutationKey: ['custom-key'],
      },
    }), { wrapper });

    await act(async () => {
      await result.current.mutate({
        data: { name: 'John Doe' },
        resourceParams: { id: '10' },
        apiClientParams: { method: 'POST' },
      });
    });

    await waitFor(() => expect(result.current.mutation.isSuccess).toBeTruthy());

    expect(result.current.mutation.data).toEqual(mockResponse);
  });

  it('should handle custom API client parameters', async () => {
    const mockResponse = {
      data: { id: 1, name: 'John Doe' },
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useDataMutate({
      resourcePath: 'users/{id}/messages',
    }), { wrapper });

    await act(async () => {
      await result.current.mutate({
        data: { name: 'John Doe' },
        resourceParams: { id: '10' },
        apiClientParams: {
          method: 'POST',
          headers: { 'Custom-Header': 'value' },
          authorization: 'Bearer token',
        },
      });
    });

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

    const { result } = renderHook(() => useDataMutate({
      resourcePath: 'users/{id}/messages',
    }), { wrapper: wrapperWithTrailingSlash });

    await act(async () => {
      await result.current.mutate({
        data: { name: 'John Doe' },
        resourceParams: { id: '10' },
        apiClientParams: { method: 'POST' },
      });
    });

    expect(apiClientMock).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'http://api.example.com/users/10/messages/',
      }),
    );
  });

  it('should handle different HTTP methods', async () => {
    const mockResponse = {
      data: { id: 1, name: 'John Doe' },
    };
    apiClientMock.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useDataMutate({
      resourcePath: 'users/{id}/messages',
    }), { wrapper });

    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    for (const method of methods) {
      await act(async () => {
        await result.current.mutate({
          data: { name: 'John Doe' },
          resourceParams: { id: '10' },
          apiClientParams: { method: method as any },
        });
      });

      expect(apiClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method,
        }),
      );
    }
  });
});
