/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { RQWrapper } from '../components/RQWrapper';
import { CustomError } from '../utils/custom-error';
import { addItemToQueryCache, addItemsToListQueryCache, invalidateQueries } from '../utils/queries';
import { useCreate } from './use-create';

jest.mock('../utils/queries', () => {
  const actual = jest.requireActual('../utils/queries');

  return {
    ...actual,
    addItemToQueryCache: jest.fn(),
    addItemsToListQueryCache: jest.fn(),
    invalidateQueries: jest.fn(),
  };
});

describe('useCreate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const apiClientMock = jest.fn();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RQWrapper apiUrl="http://api.example.com" apiClient={apiClientMock}>
      {children}
    </RQWrapper>
  );

  it('should create a new resource and update the cache', async () => {
    apiClientMock.mockResolvedValue({ data: { id: 1, name: 'John Doe' } });

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
      });
    });

    await waitFor(() => expect(apiClientMock).toHaveBeenCalledTimes(1));

    expect(apiClientMock).toHaveBeenCalledWith({
      url: 'http://api.example.com/users/10/messages',
      method: 'POST',
      data: { name: 'John Doe', email: 'john@example.com' },
      authorization: '',
      headers: {},
      onError: expect.any(Function),
      onSuccess: expect.any(Function),
    });

    expect(addItemToQueryCache).toHaveBeenCalled();
    expect(addItemsToListQueryCache).toHaveBeenCalled();
    expect(invalidateQueries).toHaveBeenCalled();
  });

  it('should handle errors correctly', async () => {
    apiClientMock.mockRejectedValue(new CustomError('Error creating resource'));

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
      });
    });

    await waitFor(() => expect(apiClientMock).toHaveBeenCalledTimes(1));

    expect(apiClientMock).toHaveBeenCalledWith({
      url: 'http://api.example.com/users/10/messages',
      method: 'POST',
      data: { name: 'John Doe', email: 'john@example.com' },
      authorization: '',
      headers: {},
      onError: expect.any(Function),
      onSuccess: expect.any(Function),
    });
  });

  it('should handle custom mutation function', async () => {
    const customMutationFn = jest.fn().mockResolvedValue({ data: { id: 1, name: 'John Doe' } });

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
      mutationOptions: {
        mutationFn: customMutationFn,
      },
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
      });
    });

    await waitFor(() => expect(customMutationFn).toHaveBeenCalledTimes(1));
    expect(apiClientMock).not.toHaveBeenCalled();
  });

  it('should handle extra resources for cache invalidation', async () => {
    apiClientMock.mockResolvedValue({ data: { id: 1, name: 'John Doe' } });

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
      extraResources: [{ path: 'posts/{id}', params: { id: '1' } }],
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
        extraResources: [{ path: 'comments/{id}', params: { id: '1' } }],
      });
    });

    await waitFor(() => expect(apiClientMock).toHaveBeenCalledTimes(1));
    expect(invalidateQueries).toHaveBeenCalled();
  });

  it('should handle custom mutation key', async () => {
    apiClientMock.mockResolvedValue({ data: { id: 1, name: 'John Doe' } });

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
      mutationOptions: {
        mutationKey: ['custom-key'],
      },
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
      });
    });

    await waitFor(() => expect(apiClientMock).toHaveBeenCalledTimes(1));
  });

  it('should handle array response data', async () => {
    apiClientMock.mockResolvedValue([
      { data: { id: 1, name: 'John Doe' } },
      { data: { id: 2, name: 'Jane Doe' } },
    ]);

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
      shouldUpdateCurrentResource: true,
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
      });
    });

    await waitFor(() => expect(apiClientMock).toHaveBeenCalledTimes(1));
    expect(addItemToQueryCache).toHaveBeenCalledTimes(2);
    expect(addItemsToListQueryCache).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({ id: 1, name: 'John Doe' }),
          expect.objectContaining({ id: 2, name: 'Jane Doe' }),
        ]),
      }),
    );
  });

  it('should handle custom onSuccess callback', async () => {
    apiClientMock.mockResolvedValue({ data: { id: 1, name: 'John Doe' } });
    const onSuccessMock = jest.fn();

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
      mutationOptions: {
        onSuccess: onSuccessMock,
      },
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
      });
    });

    await waitFor(() => expect(apiClientMock).toHaveBeenCalledTimes(1));
    expect(onSuccessMock).toHaveBeenCalled();
  });

  it('should handle shouldUpdateCurrentResource: false', async () => {
    const response = { data: { id: 1, name: 'John Doe' } };

    apiClientMock.mockResolvedValue(response);

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
      shouldUpdateCurrentResource: false,
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
      });
    });

    await waitFor(() => expect(apiClientMock).toHaveBeenCalledTimes(1));

    expect(addItemToQueryCache).toHaveBeenCalledWith({
      data: response,
      queryKeysOne: [],
    });
    expect(addItemsToListQueryCache).toHaveBeenCalledWith({
      data: [response.data],
      cacheAddItemTo: 'start',
      queryKeysInfiniteList: [],
      queryKeysList: [],
    });
  });
});
