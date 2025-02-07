import { isEqual } from './is-equal';

describe('isEqual', () => {
  it('should return true for primitive values that are strictly equal', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it('should return false for primitive values that are not strictly equal', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('hello', 'world')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
    expect(isEqual(1, '1')).toBe(false);
  });

  it('should return true for objects with the same properties and values', () => {
    const obj1 = { a: 1, b: 'hello', c: true };
    const obj2 = { a: 1, b: 'hello', c: true };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for objects with different properties or values', () => {
    const obj1 = { a: 1, b: 'hello' };
    const obj2 = { a: 1, b: 'world' };
    const obj3 = { a: 1, c: 'hello', d: 'world' };
    expect(isEqual(obj1, obj2)).toBe(false);
    expect(isEqual(obj1, obj3)).toBe(false);
  });

  it('should return true for arrays with the same elements', () => {
    const arr1 = [1, 'hello', true];
    const arr2 = [1, 'hello', true];
    expect(isEqual(arr1, arr2)).toBe(true);
  });

  it('should return false for arrays with different elements or lengths', () => {
    const arr1 = [1, 'hello'];
    const arr2 = [1, 'world'];
    const arr3 = [1, 'hello', true];

    expect(isEqual(arr1, arr2)).toBe(false);
    expect(isEqual(arr1, arr3)).toBe(false);
  });

  it('should return false for different types', () => {
    expect(isEqual(1, '1')).toBe(false);
    expect(isEqual({}, [])).toBe(false);
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual(undefined, [])).toBe(false);
  });

  it('should handle nested objects and arrays correctly', () => {
    const obj1 = { a: 1, b: [2, { c: 'hello' }] };
    const obj2 = { a: 1, b: [2, { c: 'hello' }] };
    const obj3 = { a: 1, b: [2, { c: 'world' }] };

    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false);
  });
});
