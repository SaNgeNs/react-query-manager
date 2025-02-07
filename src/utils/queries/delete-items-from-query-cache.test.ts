import { deleteItemsFromQueryCache } from './delete-items-from-query-cache';
import { getQueryClient } from '../../internal/query-client';
import { QueryClient, InfiniteData } from '@tanstack/react-query';
import { QueryResponse } from '../../type';
import { removeQueries } from './remove-queries'; // Import the mocked function
import { helpersQueryKeys } from './helpers-query-keys';

jest.mock('../../internal/query-client', () => ({
  getQueryClient: jest.fn(),
}));

jest.mock('./remove-queries', () => ({
  removeQueries: jest.fn(),
}));

describe('deleteItemsFromQueryCache', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should remove items from list query cache', () => {
    const ids = ['2', '4'];
    const data = [{ id: 1, name: 'Test Item 1' }, { id: 2, name: 'Test Item 2' }, { id: 3, name: 'Test Item 3' }, { id: 4, name: 'Test Item 4' }];
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });
    mockQueryClient.setQueryData(queryKeyList, { data, headers: {}, status: 200, statusText: 'ok' });

    deleteItemsFromQueryCache({ ids, queryKeysList: [queryKeyList] });

    expect(mockQueryClient.getQueryData(queryKeyList)).toEqual({
      data: [{ id: 1, name: 'Test Item 1' }, { id: 3, name: 'Test Item 3' }],
      headers: {},
      status: 200,
      statusText: 'ok',
    });
  });

  it('should remove items from infinite list query cache', () => {
    const ids = ['2', '4'];
    const data = [{ id: 1, name: 'Test Item 1' }, { id: 2, name: 'Test Item 2' }, { id: 3, name: 'Test Item 3' }, { id: 4, name: 'Test Item 4' }];
    const queryKeyInfiniteList = helpersQueryKeys.getInfiniteList({ path: 'posts', params: {} });
    const infiniteData: InfiniteData<QueryResponse<any[]>> = {
      pages: [{ data, headers: {}, status: 200, statusText: 'ok' }],
      pageParams: [],
    };
    mockQueryClient.setQueryData(queryKeyInfiniteList, infiniteData);

    deleteItemsFromQueryCache({ ids, queryKeysInfiniteList: [queryKeyInfiniteList] });

    expect(mockQueryClient.getQueryData(queryKeyInfiniteList)).toEqual({
      pages: [{ data: [{ id: 1, name: 'Test Item 1' }, { id: 3, name: 'Test Item 3' }], headers: {}, status: 200, statusText: 'ok' }],
      pageParams: [],
    });
  });

  it('should remove queries for queryKeysOne', () => {
    const ids = ['1'];
    const queryKeyOne = helpersQueryKeys.getOne({ path: 'posts', params: {} }, 1);
    deleteItemsFromQueryCache({ ids, queryKeysOne: [queryKeyOne] });

    expect(removeQueries).toHaveBeenCalledWith({ queryKeys: [queryKeyOne] });
  });

  it('should handle empty ids array', () => {
    const ids: any[] = [];
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });

    deleteItemsFromQueryCache({ ids, queryKeysList: [queryKeyList] });
  });

  it('should handle null existing data for list query', () => {
    const ids = ['1'];
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });

    mockQueryClient.setQueryData(queryKeyList, null);

    deleteItemsFromQueryCache({ ids, queryKeysList: [queryKeyList] });

    expect(mockQueryClient.getQueryData(queryKeyList)).toBeNull();
  });

  it('should handle null existing data for infinite list query', () => {
    const ids = ['1'];
    const queryKeyInfiniteList = helpersQueryKeys.getInfiniteList({ path: 'posts', params: {} });

    mockQueryClient.setQueryData(queryKeyInfiniteList, null);

    deleteItemsFromQueryCache({ ids, queryKeysInfiniteList: [queryKeyInfiniteList] });

    expect(mockQueryClient.getQueryData(queryKeyInfiniteList)).toBeNull();
  });

  it('should handle non-array existing data for list query', () => {
    const ids = ['1'];
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });
    const existingData = null;

    mockQueryClient.setQueryData(queryKeyList, existingData);

    deleteItemsFromQueryCache({ ids, queryKeysList: [queryKeyList] });

    expect(mockQueryClient.getQueryData(queryKeyList)).toBeNull();
  });
});
