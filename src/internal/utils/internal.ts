/* eslint-disable no-restricted-syntax */
import type { QueryClient } from '@tanstack/react-query';
import EventEmitter from 'eventemitter3';
import { Snapshot } from '../type';

/**
 * Recursively merges two objects together, ensuring that only fields that exist
 * and match in type in the target object are merged from the source object.
 *
 * @template TData - The type of the target object.
 * @param target - The target object that will be merged into.
 * @param source - The source object containing values to merge.
 * Only properties that exist in the target object and have matching types will be merged.
 *
 * @returns A new object with the merged values from the target and source objects.
 *
 * @example
 * const target = { id: '1', name: 'Test' };
 * const source = { id: '1', name: 'Test 2', other: 'Ignored' };
 * const result = mergeObjects(target, source);
 * ---> result: { id: '1', name: 'Test 2' }
 */
export function mergeObjects<TData extends object>(target: TData, source: any): TData {
  const result: any = { ...target };

  if (target instanceof Object && source instanceof Object) {
    for (const key in source) {
      if (key in target) {
        const targetValue = (target as any)[key];
        const sourceValue = source[key];

        const isSameType = typeof targetValue === typeof sourceValue
          && ((Array.isArray(targetValue) && Array.isArray(sourceValue))
          || (targetValue !== null && !Array.isArray(targetValue) && typeof targetValue === 'object'
            && !Array.isArray(sourceValue) && typeof sourceValue === 'object')
          || (typeof targetValue !== 'object' && typeof sourceValue !== 'object'));

        if (isSameType) {
          if (typeof targetValue === 'object' && targetValue !== null && !Array.isArray(targetValue)) {
            result[key] = mergeObjects(targetValue, sourceValue as typeof targetValue);
          } else {
            result[key] = sourceValue;
          }
        }
      }
    }
  }

  return result as TData;
}

/**
 * Creates a snapshot of the current data in the cache.
 *
 * @param queryClient The query client that contains the data to be snapshotted.
 * @param keys The keys to be snapshotted.
 * @returns A snapshot of the current data in the cache.
 */
export const createSnapshot = async (queryClient: QueryClient, keys: any[][]) => {
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

/**
 * Removes leading and trailing slashes from the given string.
 *
 * @param path The string to remove slashes from.
 * @return The string with leading and trailing slashes removed.
 */
export function removeFirstAndLastSlash(path: string): string {
  return path
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
}

const eventEmitter = new EventEmitter();

export const undoEventEmitter = {
  /**
   * Listens for the next 'end' event and then removes the listener.
   *
   * @param type The type of event to listen for. Currently only 'end' is supported.
   * @param callback The callback function to be called when the event is emitted. The callback will receive a boolean indicating whether the event was triggered by an undo action.
   * @return A function that can be called to remove the listener.
   */
  once: (type: 'end', callback: (isUndo: boolean) => void) => {
    eventEmitter.once(type, callback);
  },
  /**
   * Emits an 'end' event, which is used to let any registered callbacks know that an undo/redo action has completed.
   *
   * @param type The type of event to emit. Currently only 'end' is supported.
   * @param isUndo A boolean indicating whether the event was triggered by an undo action.
   */
  emit: (type: 'end', isUndo: boolean) => {
    eventEmitter.emit(type, isUndo);
  },
};
