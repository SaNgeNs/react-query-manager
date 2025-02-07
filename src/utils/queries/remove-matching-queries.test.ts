import { removeMatchingQueries } from './remove-matching-queries';
import { getQueryClient } from '../../internal/query-client';
import { QueryClient } from '@tanstack/react-query';

jest.mock('../../internal/query-client', () => ({
  getQueryClient: jest.fn(),
}));

describe('removeMatchingQueries', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should remove queries matching any key group', () => {
    const keyGroups = [
      ['posts', 'list'],
      ['posts', 'one'],
    ];

    mockQueryClient.setQueryData(['posts', 'list', 'all'], { data: [] });
    mockQueryClient.setQueryData(['posts', 'one', 1], { data: {} });
    mockQueryClient.setQueryData(['comments', 'list'], { data: [] });
    mockQueryClient.setQueryData(['posts'], { data: {} });

    removeMatchingQueries({ queryKeys: keyGroups });

    expect(mockQueryClient.getQueryData(['posts', 'list', 'all'])).toBeUndefined();
    expect(mockQueryClient.getQueryData(['posts', 'one', 1])).toBeUndefined();
    expect(mockQueryClient.getQueryData(['comments', 'list'])).toBeDefined();
    expect(mockQueryClient.getQueryData(['posts'])).toBeDefined();
  });
});
