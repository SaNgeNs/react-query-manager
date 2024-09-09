/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
export function isEqual(data1: unknown, data2: unknown): boolean {
  if (typeof data1 !== typeof data2) {
    return false;
  }

  if (data1 instanceof Object && data2 instanceof Object) {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const value1 = (data1 as Record<string, unknown>)[key];
      const value2 = (data2 as Record<string, unknown>)[key];

      if (value1 !== value2 && !isEqual(value1, value2)) {
        return false;
      }
    }

    return true;
  }

  if (Array.isArray(data1) && Array.isArray(data2)) {
    if (data1.length !== data2.length) {
      return false;
    }

    for (let i = 0; i < data1.length; i++) {
      if (data1[i] !== data2[i] && !isEqual(data1[i], data2[i])) {
        return false;
      }
    }

    return true;
  }

  return data1 === data2;
}
