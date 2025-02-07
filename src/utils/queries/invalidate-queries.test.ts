import { invalidateQueries } from './invalidate-queries';
import { getQueryClient } from '../../internal/query-client';
import { QueryClient } from '@tanstack/react-query';
import { helpersQueryKeys } from './helpers-query-keys';

jest.mock('../../internal/query-client', () => ({
  getQueryClient: jest.fn(),
}));

describe('invalidateQueries', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should invalidate queries for the given query keys', () => {
    const queryKey1 = helpersQueryKeys.getList({ path: 'posts', params: {} });
    const queryKey2 = helpersQueryKeys.getOne({ path: 'posts', params: {} }, 1);

    mockQueryClient.setQueryData(queryKey1, { data: [] });
    mockQueryClient.setQueryData(queryKey2, { data: {} });

    invalidateQueries({ queryKeys: [queryKey1, queryKey2] });

    expect(mockQueryClient.getQueryState(queryKey1)).toBeTruthy();
    expect(mockQueryClient.getQueryState(queryKey2)).toBeTruthy();
  });

  it('should call invalidateQueries for each provided query key', () => {
    const queryKey1 = helpersQueryKeys.getList({ path: 'posts', params: {} });
    const queryKey2 = helpersQueryKeys.getOne({ path: 'posts', params: {} }, 1);
    const spy = jest.spyOn(mockQueryClient, 'invalidateQueries');

    invalidateQueries({ queryKeys: [queryKey1, queryKey2] });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, { queryKey: queryKey1 });
    expect(spy).toHaveBeenNthCalledWith(2, { queryKey: queryKey2 });
    spy.mockRestore();
  });
});
