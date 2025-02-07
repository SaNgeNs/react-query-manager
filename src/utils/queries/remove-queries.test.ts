import { removeQueries } from './remove-queries';
import { getQueryClient } from '../../internal/query-client';
import { QueryClient } from '@tanstack/react-query';
import { helpersQueryKeys } from './helpers-query-keys';

jest.mock('../../internal/query-client', () => ({
  getQueryClient: jest.fn(),
}));

describe('removeQueries', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should remove queries for the given query keys', () => {
    const queryKey1 = helpersQueryKeys.getList({ path: 'posts', params: {} });
    const queryKey2 = helpersQueryKeys.getOne({ path: 'posts', params: {} }, 1);

    mockQueryClient.setQueryData(queryKey1, { data: [] });
    mockQueryClient.setQueryData(queryKey2, { data: {} });

    removeQueries({ queryKeys: [queryKey1, queryKey2] });

    expect(mockQueryClient.getQueryData(queryKey1)).toBeUndefined();
    expect(mockQueryClient.getQueryData(queryKey2)).toBeUndefined();
  });

  it('should call removeQueries for each provided query key', () => {
    const queryKey1 = helpersQueryKeys.getList({ path: 'posts', params: {} });
    const queryKey2 = helpersQueryKeys.getOne({ path: 'posts', params: {} }, 1);
    const removeQueriesSpy = jest.spyOn(mockQueryClient, 'removeQueries');

    removeQueries({ queryKeys: [queryKey1, queryKey2] });

    expect(removeQueriesSpy).toHaveBeenCalledTimes(2);
    expect(removeQueriesSpy).toHaveBeenNthCalledWith(1, { queryKey: queryKey1 });
    expect(removeQueriesSpy).toHaveBeenNthCalledWith(2, { queryKey: queryKey2 });

    removeQueriesSpy.mockRestore();
  });
});

