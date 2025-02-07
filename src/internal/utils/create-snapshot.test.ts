import { createSnapshot } from './create-snapshot';
import { getQueryClient } from '../query-client';
import { QueryClient } from '@tanstack/react-query';

jest.mock('../query-client', () => ({
  getQueryClient: jest.fn(),
}));

describe('createSnapshot', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should create a snapshot of the specified keys', async () => {
    const keys = [
      ['posts', 1],
      ['posts', 'list'],
    ];

    mockQueryClient.setQueryData(keys[0], { id: 1, title: 'Post 1' });
    mockQueryClient.setQueryData(keys[1], [{ id: 2, title: 'Post 2' }]);

    const snapshot = await createSnapshot(keys);

    expect(snapshot).toEqual([
      [['posts', 1], { id: 1, title: 'Post 1' }],
      [['posts', 'list'], [{ id: 2, title: 'Post 2' }]],
    ]);
  });

  it('should cancel outgoing queries for the specified keys', async () => {
    const keys = [
      ['posts', 1],
      ['posts', 'list'],
    ];
    const cancelQueriesSpy = jest.spyOn(mockQueryClient, 'cancelQueries');

    mockQueryClient.setQueryData(keys[0], { id: 1, title: 'Post 1' });
    mockQueryClient.setQueryData(keys[1], [{ id: 2, title: 'Post 2' }]);

    await createSnapshot(keys);

    expect(cancelQueriesSpy).toHaveBeenCalledTimes(2);
    expect(cancelQueriesSpy).toHaveBeenNthCalledWith(1, { queryKey: keys[0] });
    expect(cancelQueriesSpy).toHaveBeenNthCalledWith(2, { queryKey: keys[1] });
  });

  it('should handle empty keys array', async () => {
    const snapshot = await createSnapshot([]);
    expect(snapshot).toEqual([]);
  });
});
