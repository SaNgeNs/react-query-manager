import { updateItemsFromQueryCache } from './update-items-from-query-cache';
import { getQueryClient } from '../../internal/query-client';
import { QueryClient, InfiniteData } from '@tanstack/react-query';
import { QueryResponse } from '../../type';
import { mergeObjects } from '../../internal/utils/merge-objects';
import { helpersQueryKeys } from './helpers-query-keys';

jest.mock('../../internal/query-client', () => ({
  getQueryClient: jest.fn(),
}));

jest.mock('../../internal/utils/merge-objects', () => ({
  mergeObjects: jest.fn((oldObj, newObj) => ({ ...oldObj, ...newObj })),
}));

describe('updateItemsFromQueryCache', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    jest.clearAllMocks();
  });

  it('should update items in list query cache', () => {
    const ids = ['2', '4'];
    const data = { updated: true };
    const existingData = [{ id: 1, name: 'Test Item 1' }, { id: 2, name: 'Test Item 2' }, { id: 3, name: 'Test Item 3' }, { id: 4, name: 'Test Item 4' }];
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });

    mockQueryClient.setQueryData(queryKeyList, { data: existingData, headers: {}, status: 200, statusText: 'ok' });

    updateItemsFromQueryCache({ data, ids, queryKeysList: [queryKeyList] });

    expect(mockQueryClient.getQueryData(queryKeyList)).toEqual({
      data: [
        { id: 1, name: 'Test Item 1' },
        { id: 2, name: 'Test Item 2', updated: true },
        { id: 3, name: 'Test Item 3' },
        { id: 4, name: 'Test Item 4', updated: true },
      ],
      headers: {},
      status: 200,
      statusText: 'ok',
    });
  });

  it('should update items in infinite list query cache', () => {
    const ids = ['2', '4'];
    const data = { updated: true };
    const existingData = [{ id: 1, name: 'Test Item 1' }, { id: 2, name: 'Test Item 2' }, { id: 3, name: 'Test Item 3' }, { id: 4, name: 'Test Item 4' }];
    const queryKeyInfiniteList = helpersQueryKeys.getInfiniteList({ path: 'posts', params: {} });
    const infiniteData: InfiniteData<QueryResponse<any[]>> = {
      pages: [{ data: existingData, headers: {}, status: 200, statusText: 'ok' }],
      pageParams: [],
    };

    mockQueryClient.setQueryData(queryKeyInfiniteList, infiniteData);

    updateItemsFromQueryCache({ data, ids, queryKeysInfiniteList: [queryKeyInfiniteList] });

    expect(mockQueryClient.getQueryData(queryKeyInfiniteList)).toEqual({
      pages: [{
        data: [
          { id: 1, name: 'Test Item 1' },
          { id: 2, name: 'Test Item 2', updated: true },
          { id: 3, name: 'Test Item 3' },
          { id: 4, name: 'Test Item 4', updated: true },
        ], headers: {}, status: 200, statusText: 'ok',
      }],
      pageParams: [],
    });
  });

  it('should update items for queryKeysOne', () => {
    const ids = ['1'];
    const data = { updated: true };
    const existingData = { id: 1, name: 'Test Item 1' };
    const queryKeyOne = helpersQueryKeys.getOne({ path: 'posts', params: {} }, 1);
    mockQueryClient.setQueryData(queryKeyOne, { data: existingData, headers: {}, status: 200, statusText: 'ok' });

    updateItemsFromQueryCache({ data, ids, queryKeysOne: [queryKeyOne] });

    expect(mockQueryClient.getQueryData(queryKeyOne)).toEqual({
      data: { id: 1, name: 'Test Item 1', updated: true },
      headers: {},
      status: 200,
      statusText: 'ok',
    });
    expect(mergeObjects).toHaveBeenCalledWith(existingData, data, {
      overwriteOnTypeMismatch: undefined,
      overwriteOnTypeMismatchKeys: undefined,
    });
  });

  it('should handle empty ids array', () => {
    const ids: any[] = [];
    const data = { updated: true };
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });

    updateItemsFromQueryCache({ data, ids, queryKeysList: [queryKeyList] });
  });

  it('should handle null existing data for list query', () => {
    const ids = ['1'];
    const data = { updated: true };
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });

    mockQueryClient.setQueryData(queryKeyList, null);

    updateItemsFromQueryCache({ data, ids, queryKeysList: [queryKeyList] });

    expect(mockQueryClient.getQueryData(queryKeyList)).toBeNull();
  });

  it('should handle null existing data for infinite list query', () => {
    const ids = ['1'];
    const data = { updated: true };
    const queryKeyInfiniteList = helpersQueryKeys.getInfiniteList({ path: 'posts', params: {} });

    mockQueryClient.setQueryData(queryKeyInfiniteList, null);

    updateItemsFromQueryCache({ data, ids, queryKeysInfiniteList: [queryKeyInfiniteList] });

    expect(mockQueryClient.getQueryData(queryKeyInfiniteList)).toBeNull();
  });

  it('should handle null existing data for one query', () => {
    const ids = ['1'];
    const data = { updated: true };
    const queryKeyOne = helpersQueryKeys.getOne({ path: 'posts', params: {} }, 1);
    mockQueryClient.setQueryData(queryKeyOne, null);

    updateItemsFromQueryCache({ data, ids, queryKeysOne: [queryKeyOne] });

    expect(mockQueryClient.getQueryData(queryKeyOne)).toEqual(null);
    expect(mergeObjects).not.toHaveBeenCalled();
  });

  it('should handle non-array existing data for list query', () => {
    const ids = ['1'];
    const data = { updated: true };
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });

    mockQueryClient.setQueryData(queryKeyList, null);

    updateItemsFromQueryCache({ data, ids, queryKeysList: [queryKeyList] });

    expect(mockQueryClient.getQueryData(queryKeyList)).toBeNull();
  });
});
