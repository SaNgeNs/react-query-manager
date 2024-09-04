import {
  QueryDataKey,
  QueryInfiniteListKey,
  QueryListKey,
  QueryOneKey,
  Resource,
  TakeFirstKeys,
} from '../../type';

/**
 * A utility object for generating query keys used in React Query.
 */
export const helpersQueryKeys = {
  /**
   * Generates a query key for fetching a single item by ID.
   *
   * @param itemResource - The resource object containing the path and parameters for the query.
   * @param id - The ID of the item to fetch.
   * @returns The query key for the single item.
   *
   * @example
   * const key = helpersQueryKeys.getOne(resource, 1);
   * // key: ['get-one', 'posts', {}, '1']
   */
  getOne: (
    (itemResource: Resource<any>, id: string | number): TakeFirstKeys<QueryOneKey<any>, 4> => (
      ['get-one', itemResource.path, itemResource.params, String(id)]
    )
  ),

  /**
   * Generates an array of query keys for fetching multiple items by their IDs.
   *
   * @param itemResource - The resource object containing the path and parameters for the query.
   * @param ids - An array of IDs for the items to fetch.
   * @returns An array of query keys for the items.
   *
   * @example
   * const keys = helpersQueryKeys.getOneArray(resource, [1, 2]);
   * // keys: [
   * //   ['get-one', 'posts', {}, '1'],
   * //   ['get-one', 'posts', {}, '2']
   * // ]
   */
  getOneArray: (
    (itemResource: Resource<any>, ids: (string | number)[]): TakeFirstKeys<QueryOneKey<any>, 4>[] => ids.map((id) => (
      ['get-one', itemResource.path, itemResource.params, String(id)]
    ))
  ),

  /**
   * Generates a query key for fetching a list of items.
   *
   * @param itemResource - The resource object containing the path and parameters for the query.
   * @returns The query key for the list of items.
   *
   * @example
   * const key = helpersQueryKeys.getList(resource);
   * // key: ['get-list', 'posts', {}]
   */
  getList: (
    (itemResource: Resource<any>): TakeFirstKeys<QueryListKey<any>, 3> => (
      ['get-list', itemResource.path, itemResource.params]
    )
  ),

  /**
   * Generates a query key for fetching an infinite list of items.
   *
   * @param itemResource - The resource object containing the path and parameters for the query.
   * @returns The query key for the infinite list of items.
   *
   * @example
   * const key = helpersQueryKeys.getInfiniteList(resource);
   * // key: ['get-infinite-list', 'posts', {}]
   */
  getInfiniteList: (
    (itemResource: Resource<any>): TakeFirstKeys<QueryInfiniteListKey<any>, 3> => (
      ['get-infinite-list', itemResource.path, itemResource.params]
    )
  ),

  /**
   * Generates a data query key.
   *
   * @param itemResource - The resource object containing the path and parameters for the query.
   * @returns The data query key.
   *
   * @example
   * const key = helpersQueryKeys.getDataQuery(resource);
   * // key: ['query-data', 'posts', {}]
   */
  getDataQuery: (
    (itemResource: Resource<any>): TakeFirstKeys<QueryDataKey<any>, 3> => (
      ['query-data', itemResource.path, itemResource.params]
    )
  ),
};
