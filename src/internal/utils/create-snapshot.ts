import { getQueryClient } from '../query-client';
import { Snapshot } from '../type';

/**
 * Creates a snapshot of the current data in the cache.
 *
 * @param keys The keys to be snapshotted.
 * @returns A snapshot of the current data in the cache.
 */
export const createSnapshot = async (keys: any[][]) => {
  const queryClient = getQueryClient();

  const snapshot: Snapshot = keys.reduce(
    (prev, queryKey) => prev.concat(queryClient.getQueriesData({ queryKey })),
    [] as any,
  );

  // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
  await Promise.all(
    snapshot.map(([queryKey]) => queryClient.cancelQueries({ queryKey })),
  );

  return snapshot;
};
