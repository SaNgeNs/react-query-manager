import { addItemToQueryCache } from './add-item-to-query-cache';
import { getQueryClient } from '../../internal/query-client';
import { QueryClient } from '@tanstack/react-query';
import { helpersQueryKeys } from './helpers-query-keys';

jest.mock('../../internal/query-client', () => ({
  getQueryClient: jest.fn(),
}));

describe('addItemToQueryCache', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should add item to the cache for given query key', () => {
    const data = { id: 1, name: 'Test Item' };
    const queryKey = helpersQueryKeys.getOne({ path: 'posts', params: {} }, '1');

    addItemToQueryCache({ data, queryKeysOne: [queryKey] });

    expect(mockQueryClient.getQueryData(queryKey)).toEqual(data);
  });

  it('should do nothing if queryKeysOne is not provided', () => {
    const data = { id: 1, name: 'Test Item' };
    const queryKey = helpersQueryKeys.getOne({ path: 'posts', params: {} }, '1');

    addItemToQueryCache({ data });

    expect(mockQueryClient.getQueryData(queryKey)).toBeUndefined();
  });

  it('should add items for multiple query keys', () => {
    const data1 = { id: 1, name: 'Test Item 1' };
    const queryKey1 = helpersQueryKeys.getOne({ path: 'posts', params: {} }, '1');

    const data2 = { id: 2, name: 'Test Item 2' };
    const queryKey2 = helpersQueryKeys.getOne({ path: 'comments', params: {} }, '2');

    addItemToQueryCache({ data: data1, queryKeysOne: [queryKey1] });
    addItemToQueryCache({ data: data2, queryKeysOne: [queryKey2] });

    expect(mockQueryClient.getQueryData(queryKey1)).toEqual(data1);
    expect(mockQueryClient.getQueryData(queryKey2)).toEqual(data2);
  });
});

