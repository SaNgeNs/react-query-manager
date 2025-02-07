import { addItemsToListQueryCache } from './add-items-to-list-query-cache';
import { getQueryClient } from '../../internal/query-client';
import { QueryClient, InfiniteData } from '@tanstack/react-query';
import { QueryResponse } from '../../type';
import { helpersQueryKeys } from './helpers-query-keys';

jest.mock('../../internal/query-client', () => ({
  getQueryClient: jest.fn(),
}));

describe('addItemsToListQueryCache', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should add items to the start of list query cache', () => {
    const data = [{ id: 4, name: 'Test Item 4' }, { id: 5, name: 'Test Item 5' }];
    const existingData: QueryResponse = {
      data: [{ id: 1, name: 'Test Item 1' }, { id: 2, name: 'Test Item 2' }, { id: 3, name: 'Test Item 3' }],
      headers: {},
      status: 200,
      statusText: 'ok',
    };
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });

    mockQueryClient.setQueryData(queryKeyList, existingData);

    addItemsToListQueryCache({ data, queryKeysList: [queryKeyList], cacheAddItemTo: 'start' });

    expect(mockQueryClient.getQueryData(queryKeyList)).toEqual({
      ...existingData,
      data: [...data, ...existingData.data],
    });
  });

  it('should add items to the end of list query cache', () => {
    const data = [{ id: 4, name: 'Test Item 4' }, { id: 5, name: 'Test Item 5' }];
    const existingData: QueryResponse = {
      data: [{ id: 1, name: 'Test Item 1' }, { id: 2, name: 'Test Item 2' }, { id: 3, name: 'Test Item 3' }],
      headers: {},
      status: 200,
      statusText: 'ok',
    };
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });

    mockQueryClient.setQueryData(queryKeyList, existingData);

    addItemsToListQueryCache({ data, queryKeysList: [queryKeyList], cacheAddItemTo: 'end' });

    expect(mockQueryClient.getQueryData(queryKeyList)).toEqual({
      ...existingData,
      data: [...existingData.data, ...data],
    });
  });

  it('should add items to the start of infinite list query cache', () => {
    const data = [{ id: 4, name: 'Test Item 4' }, { id: 5, name: 'Test Item 5' }];
    const existingData = [{ id: 1, name: 'Test Item 1' }, { id: 2, name: 'Test Item 2' }, { id: 3, name: 'Test Item 3' }];
    const queryKeyInfiniteList = helpersQueryKeys.getInfiniteList({ path: 'posts', params: {} });
    const infiniteData: InfiniteData<QueryResponse<any[]>> = {
      pages: [{ data: existingData, headers: {}, status: 200, statusText: 'ok' }],
      pageParams: [],
    };

    mockQueryClient.setQueryData(queryKeyInfiniteList, infiniteData);

    addItemsToListQueryCache({ data, queryKeysInfiniteList: [queryKeyInfiniteList], cacheAddItemTo: 'start' });

    expect(mockQueryClient.getQueryData(queryKeyInfiniteList)).toEqual({
      ...infiniteData,
      pages: [{ data: [...data, ...existingData], headers: {}, status: 200, statusText: 'ok' }],
    });
  });

  it('should add items to the end of infinite list query cache', () => {
    const data = [{ id: 4, name: 'Test Item 4' }, { id: 5, name: 'Test Item 5' }];
    const existingData = [{ id: 1, name: 'Test Item 1' }, { id: 2, name: 'Test Item 2' }, { id: 3, name: 'Test Item 3' }];
    const queryKeyInfiniteList = helpersQueryKeys.getInfiniteList({ path: 'posts', params: {} });
    const infiniteData: InfiniteData<QueryResponse<any[]>> = {
      pages: [{ data: existingData, headers: {}, status: 200, statusText: 'ok' }],
      pageParams: [],
    };

    mockQueryClient.setQueryData(queryKeyInfiniteList, infiniteData);

    addItemsToListQueryCache({ data, queryKeysInfiniteList: [queryKeyInfiniteList], cacheAddItemTo: 'end' });

    expect(mockQueryClient.getQueryData(queryKeyInfiniteList)).toEqual({
      ...infiniteData,
      pages: [{ data: [...existingData, ...data], headers: {}, status: 200, statusText: 'ok' }],
    });
  });

  it('should handle empty data array', () => {
    const data: any[] = [];
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });
    addItemsToListQueryCache({ data, queryKeysList: [queryKeyList] });
  });

  it('should handle null existing data', () => {
    const data = [{ id: 1, name: 'Test Item 1' }];
    const queryKeyInfiniteList = helpersQueryKeys.getInfiniteList({ path: 'posts', params: {} });

    mockQueryClient.setQueryData(queryKeyInfiniteList, null);

    addItemsToListQueryCache({ data, queryKeysInfiniteList: [queryKeyInfiniteList] });

    expect(mockQueryClient.getQueryData(queryKeyInfiniteList)).toBeNull();
  });

  it('should handle non-array existing data for list query', () => {
    const data = [{ id: 1, name: 'Test Item 1' }];
    const queryKeyList = helpersQueryKeys.getList({ path: 'posts', params: {} });
    const existingData = null;

    mockQueryClient.setQueryData(queryKeyList, existingData);

    addItemsToListQueryCache({ data, queryKeysList: [queryKeyList] });

    expect(mockQueryClient.getQueryData(queryKeyList)).toBeNull();
  });
});

