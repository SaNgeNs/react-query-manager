/* eslint-disable no-restricted-syntax */

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
