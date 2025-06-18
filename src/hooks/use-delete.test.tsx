/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { RQWrapper } from '../components/RQWrapper';
import { CustomError } from '../utils/custom-error';
import { useDeleteOne, useDeleteMany } from './use-delete';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { helpersQueryKeys, invalidateQueries, deleteItemsFromQueryCache } from '../utils/queries';

// Mock the query utilities
jest.mock('../utils/queries', () => ({
  helpersQueryKeys: {
    getOneArray: jest.fn().mockReturnValue(['get-one']),
    getList: jest.fn().mockReturnValue(['get-list']),
    getInfiniteList: jest.fn().mockReturnValue(['get-infinite-list']),
  },
  invalidateQueries: jest.fn(),
  deleteItemsFromQueryCache: jest.fn(),
}));

describe('useDelete', () => {
  const apiClientMock = jest.fn();
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <RQWrapper apiUrl="http://api.example.com" apiClient={apiClientMock}>
        {children}
      </RQWrapper>
    </QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  describe('useDeleteOne', () => {
    it('should delete a single resource', async () => {
      const mockResponse = {
        data: { id: 1, name: 'Deleted Resource' },
      };
      apiClientMock.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useDeleteOne({
        resourcePath: 'users/{id}/messages',
        mode: {
          optimistic: true,
          undoable: false,
        },
      }), { wrapper });

      await act(async () => {
        await result.current.delete({
          id: 123,
          resourceParams: { id: '10' },
        });
      });

      expect(apiClientMock).toHaveBeenCalledWith({
        url: 'http://api.example.com/users/10/messages/123',
        method: 'DELETE',
        authorization: '',
        headers: {},
        onError: expect.any(Function),
        onSuccess: expect.any(Function),
      });

      expect(deleteItemsFromQueryCache).toHaveBeenCalled();
      expect(invalidateQueries).toHaveBeenCalled();
    });

    it('should handle errors correctly', async () => {
      apiClientMock.mockRejectedValue(new CustomError('Error deleting resource'));

      const { result } = renderHook(() => useDeleteOne({
        resourcePath: 'users/{id}/messages',
        mode: {
          optimistic: true,
          undoable: false,
        },
      }), { wrapper });

      await act(async () => {
        await result.current.delete({
          id: 123,
          resourceParams: { id: '10' },
        });
      });

      await waitFor(() => expect(result.current.mutation.isError).toBeTruthy());

      expect(result.current.mutation.isError).toBe(true);
      expect(result.current.mutation.error).toBeInstanceOf(CustomError);
      expect(result.current.mutation.error?.message).toBe('Error deleting resource');
    });

    it('should handle custom mutation function', async () => {
      const customMutationFn = jest.fn().mockResolvedValue({
        data: { id: 1, name: 'Custom Delete' },
      });

      const { result } = renderHook(() => useDeleteOne({
        resourcePath: 'users/{id}/messages',
        mutationOptions: {
          mutationFn: customMutationFn,
        },
        mode: {
          optimistic: true,
          undoable: false,
        },
      }), { wrapper });

      await act(async () => {
        await result.current.delete({
          id: 123,
          resourceParams: { id: '10' },
        });
      });

      expect(customMutationFn).toHaveBeenCalled();
      expect(apiClientMock).not.toHaveBeenCalled();
    });

    it('should handle extra resources for cache invalidation', async () => {
      const mockResponse = {
        data: { id: 1, name: 'Deleted Resource' },
      };
      apiClientMock.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useDeleteOne({
        resourcePath: 'users/{id}/messages',
        extraResources: [{
          path: 'users/{id}/notifications',
          params: { id: '10' },
        }],
        mode: {
          optimistic: true,
          undoable: false,
        },
      }), { wrapper });

      await act(async () => {
        await result.current.delete({
          id: 123,
          resourceParams: { id: '10' },
        });
      });

      await waitFor(() => expect(result.current.mutation.isSuccess).toBeTruthy());

      expect(helpersQueryKeys.getOneArray).toHaveBeenCalledTimes(2);
      expect(helpersQueryKeys.getList).toHaveBeenCalledTimes(4);
      expect(helpersQueryKeys.getInfiniteList).toHaveBeenCalledTimes(4);
    });
  });

  describe('useDeleteMany', () => {
    it('should delete multiple resources', async () => {
      const mockResponse = {
        data: { id: 1, name: 'Deleted Resource' },
      };
      apiClientMock.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useDeleteMany({
        resourcePath: 'users/{id}/messages',
        mode: {
          optimistic: true,
          undoable: false,
        },
      }), { wrapper });

      await act(async () => {
        await result.current.delete({
          ids: [123, 456],
          resourceParams: { id: '10' },
        });
      });

      expect(apiClientMock).toHaveBeenCalledTimes(2);
      expect(deleteItemsFromQueryCache).toHaveBeenCalled();
      expect(invalidateQueries).toHaveBeenCalled();
    });

    it('should handle errors in multiple deletions', async () => {
      apiClientMock
        .mockResolvedValueOnce({ data: { id: 1, name: 'Deleted Resource' } })
        .mockRejectedValueOnce(new CustomError('Error deleting resource'));

      const { result } = renderHook(() => useDeleteMany({
        resourcePath: 'users/{id}/messages',
        mode: {
          optimistic: true,
          undoable: false,
        },
      }), { wrapper });

      await act(async () => {
        await result.current.delete({
          ids: [123, 456],
          resourceParams: { id: '10' },
        });
      });

      await waitFor(() => expect(result.current.mutation.isError).toBeTruthy());

      expect(result.current.mutation.isError).toBe(true);
      expect(result.current.mutation.error).toBeInstanceOf(CustomError);
      expect(result.current.mutation.error?.message).toBe('Error deleting resource');
    });

    it('should handle custom API client parameters', async () => {
      const mockResponse = {
        data: { id: 1, name: 'Deleted Resource' },
      };
      apiClientMock.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useDeleteMany({
        resourcePath: 'users/{id}/messages',
        mode: {
          optimistic: true,
          undoable: false,
        },
      }), { wrapper });

      await act(async () => {
        await result.current.delete({
          ids: [123, 456],
          resourceParams: { id: '10' },
          apiClientParams: {
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
        data: { id: 1, name: 'Deleted Resource' },
      };
      apiClientMock.mockResolvedValue(mockResponse);

      const wrapperWithTrailingSlash = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          <RQWrapper apiUrl="http://api.example.com" apiClient={apiClientMock} apiEnsureTrailingSlash>
            {children}
          </RQWrapper>
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useDeleteMany({
        resourcePath: 'users/{id}/messages',
        mode: {
          optimistic: true,
          undoable: false,
        },
      }), { wrapper: wrapperWithTrailingSlash });

      await act(async () => {
        await result.current.delete({
          ids: [123, 456],
          resourceParams: { id: '10' },
        });
      });

      expect(apiClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://api.example.com/users/10/messages/123/',
        }),
      );
    });
  });
});
