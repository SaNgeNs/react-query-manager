import { mergeObjects } from './merge-objects';

describe('mergeObjects', () => {
  it('should merge objects correctly', () => {
    expect(
      mergeObjects(
        { id: 1, name: 'Test', value: 10 },
        { name: 'Updated', value: '12', other: 'Ignored' },
      ),
    ).toEqual(
      { id: 1, name: 'Updated', value: '12' },
    );
  });

  it('should merge nested objects correctly', () => {
    const target = { id: 1, nested: { name: 'Test', value: 10 } };
    const source = { nested: { name: 'Updated', value: '12' } };
    const expected = { id: 1, nested: { name: 'Updated', value: '12' } };
    const result = mergeObjects(target, source);
    expect(result).toEqual(expected);
  });

  it('should handle different types correctly', () => {
    const target = { id: 1, name: 'Test', value: 10 };
    const source = { id: '2', value: true };
    const expected = { id: '2', name: 'Test', value: 10 };

    const result = mergeObjects(target, source);
    expect(result).toEqual(expected);
  });

  it('should handle null and undefined values', () => {
    const target = { id: 1, name: 'Test', value: null };
    const source = { value: undefined, other: 'Ignored' };
    const expected = { id: 1, name: 'Test', value: null };

    const result = mergeObjects(target, source);
    expect(result).toEqual(expected);
  });

  it('should only merge fields present in target object', () => {
    const target = { id: 1, name: 'test' };
    const source = { id: 2, name: 'new name', other: 'other value' };
    const result = mergeObjects(target, source);

    expect(result).toEqual({ id: 2, name: 'new name' });
  });

  it('should return target object when source is not an object', () => {
    const target = { id: 1, name: 'test' };
    const source = 'not an object';
    const result = mergeObjects(target, source);

    expect(result).toEqual(target);
  });

  it('should return target object when source is null or undefined', () => {
    const target = { id: 1, name: 'test' };
    expect(mergeObjects(target, null)).toEqual(target);
    expect(mergeObjects(target, undefined)).toEqual(target);
  });

  it('should merge objects with array properties correctly', () => {
    expect(
      mergeObjects(
        { id: 1, items: [1, 2] },
        { items: [3, 4] },
      ),
    ).toEqual({ id: 1, items: [3, 4] });

    expect(
      mergeObjects(
        { id: 1, items: [1, 2] },
        { items: [3] },
      ),
    ).toEqual(
      { id: 1, items: [3] },
    );
  });

  it('should correctly merge when types can be coerced to numbers', () => {
    const target = { id: 1, value: 10 };
    const source = { value: '12' };
    const expected = { id: 1, value: '12' };

    const result = mergeObjects(target, source);
    expect(result).toEqual(expected);
  });

  it('should handle nested objects and arrays with type coercion correctly', () => {
    const target = { id: 1, nested: { value: 10, arr: ['1', 2] } };
    const source = { nested: { value: '12', arr: [3, 4] } };
    const expected = { id: 1, nested: { value: '12', arr: [3, 4] } };

    const result = mergeObjects(target, source);
    expect(result).toEqual(expected);
  });
});
