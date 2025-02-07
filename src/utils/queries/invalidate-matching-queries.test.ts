import { invalidateMatchingQueries } from './invalidate-matching-queries';
import { getQueryClient } from '../../internal/query-client';
import { QueryClient } from '@tanstack/react-query';

jest.mock('../../internal/query-client', () => ({
  getQueryClient: jest.fn(),
}));

describe('invalidateMatchingQueries', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should invalidate queries matching any key group', () => {
    const keyGroups = [
      ['posts', 'list'],
      ['posts', 'one'],
    ];

    mockQueryClient.setQueryData(['posts', 'list', 'all'], { data: [] });
    mockQueryClient.setQueryData(['posts', 'one', 1], { data: {} });
    mockQueryClient.setQueryData(['comments', 'list'], { data: [] });
    mockQueryClient.setQueryData(['posts'], { data: {} });

    const invalidateQueriesSpy = jest.spyOn(mockQueryClient, 'invalidateQueries');

    invalidateMatchingQueries({ queryKeys: keyGroups });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      predicate: expect.any(Function),
    });

    expect(mockQueryClient.getQueryState(['posts', 'list', 'all'])).toBeTruthy();
    expect(mockQueryClient.getQueryState(['posts', 'one', 1])).toBeTruthy();
    expect(mockQueryClient.getQueryState(['comments', 'list'])).toBeTruthy();
    expect(mockQueryClient.getQueryState(['posts'])).toBeTruthy();
  });
});

