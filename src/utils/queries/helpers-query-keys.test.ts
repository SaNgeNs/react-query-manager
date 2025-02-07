import { helpersQueryKeys } from './helpers-query-keys';
import { Resource } from '../../type';

describe('helpersQueryKeys', () => {
  const resource: Resource<'posts'> = { path: 'posts', params: {} };
  const resourceWithParams: Resource<'posts'> = {
    path: 'posts',
    params: {},
  };

  it('should generate correct getOne key', () => {
    const expectedKey = ['get-one', 'posts', {}, '1'];
    expect(helpersQueryKeys.getOne(resource, 1)).toEqual(expectedKey);
  });

  it('should generate correct getOne key with params', () => {
    const expectedKey = ['get-one', 'posts', {}, '1'];
    expect(helpersQueryKeys.getOne(resourceWithParams, 1)).toEqual(expectedKey);
  });

  it('should generate correct getOneArray keys', () => {
    const expectedKeys = [
      ['get-one', 'posts', {}, '1'],
      ['get-one', 'posts', {}, '2'],
      ['get-one', 'posts', {}, '3'],
    ];
    expect(helpersQueryKeys.getOneArray(resource, [1, 2, 3])).toEqual(expectedKeys);
  });

  it('should generate correct getList key', () => {
    const expectedKey = ['get-list', 'posts', {}];
    expect(helpersQueryKeys.getList(resource)).toEqual(expectedKey);
  });

  it('should generate correct getList key with params', () => {
    const expectedKey = ['get-list', 'posts', {}];
    expect(helpersQueryKeys.getList(resourceWithParams)).toEqual(expectedKey);
  });

  it('should generate correct getInfiniteList key', () => {
    const expectedKey = ['get-infinite-list', 'posts', {}];
    expect(helpersQueryKeys.getInfiniteList(resource)).toEqual(expectedKey);
  });

  it('should generate correct getInfiniteList key with params', () => {
    const expectedKey = ['get-infinite-list', 'posts', {}];
    expect(helpersQueryKeys.getInfiniteList(resourceWithParams)).toEqual(expectedKey);
  });

  it('should generate correct getDataQuery key', () => {
    const expectedKey = ['query-data', 'posts', {}];
    expect(helpersQueryKeys.getDataQuery(resource)).toEqual(expectedKey);
  });

  it('should generate correct getDataQuery key with params', () => {
    const expectedKey = ['query-data', 'posts', {}];
    expect(helpersQueryKeys.getDataQuery(resourceWithParams)).toEqual(expectedKey);
  });

  it('should convert number ids to string in getOneArray', () => {
    const ids = [1, 2, 3];
    const result = helpersQueryKeys.getOneArray(resource, ids);
    result.forEach((key) => {
      expect(typeof key[3]).toBe('string');
    });
  });
});

