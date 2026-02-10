/**
 * Array 카테고리 - lodash와 동일한 API, 플레이스홀더 구현
 * @see https://lodash.com/docs/4.17.23#Array
 */

export const chunk = (array: unknown[], size: number = 1): unknown[][] => {
  if (!Array.isArray(array) || size <= 0) {
    return [];
  }

  const result: unknown[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
export const compact = (array: unknown[]): unknown[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.filter(item => {
    const type = typeof item;
    // Filter out: false, null, 0, -0, 0n, "", undefined, NaN
    if (type === 'boolean' && item === false) return false;
    if (item === null) return false;
    if (type === 'number' && item === 0) return false;
    if (type === 'bigint' && item === 0n) return false;
    if (type === 'string' && item === '') return false;
    if (type === 'undefined') return false;
    if (Number.isNaN(item)) return false;
    return true;
  });
};
export const concat = (array: unknown[] = [], ...values: unknown[]): unknown[] => {
  if (!Array.isArray(array)) {
    array = [];
  }

  const result: unknown[] = [...array];

  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...value);
    } else {
      result.push(value);
    }
  }

  return result;
};
export const difference = (array: unknown[], ...values: unknown[]): unknown[] => {
  if (!Array.isArray(array)) {
    return [];
  }

  // Flatten all values into a single array
  const valuesArray: unknown[] = [];
  for (const value of values) {
    if (Array.isArray(value)) {
      valuesArray.push(...value);
    } else {
      valuesArray.push(value);
    }
  }

  // Filter out elements that are in valuesArray
  return array.filter(item => !valuesArray.includes(item));
};
export const differenceBy = () => {};
export const differenceWith = () => {};
export const drop = (array: unknown[], n: number = 1): unknown[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  
  if (n <= 0) {
    return [...array];
  }
  
  return array.slice(n);
};
export const dropRight = (array: unknown[], n: number = 1): unknown[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  
  if (n <= 0) {
    return [...array];
  }
  
  const dropCount = Math.min(n, array.length);
  return array.slice(0, array.length - dropCount);
};
export const dropRightWhile = () => {};
export const dropWhile = () => {};
export const fill = () => {};
export const findIndex = () => {};
export const findLastIndex = () => {};
export const flatten = (array: unknown[]): unknown[] => {
  if (!Array.isArray(array)) {
    return array;
  }
  
  const result: unknown[] = [];
  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  }
  return result;
};
export const flattenDeep = () => {};
export const flattenDepth = () => {};
export const fromPairs = () => {};
export const head = (array?: unknown[]): unknown | undefined => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  return array[0];
};
export const indexOf = () => {};
export const initial = (array?: unknown[]): unknown[] => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  return array.slice(0, array.length - 1);
};
export const intersection = () => {};
export const intersectionBy = () => {};
export const intersectionWith = () => {};
export const join = () => {};
export const last = (array?: unknown[]): unknown | undefined => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  return array[array.length - 1];
};
export const lastIndexOf = () => {};
export const nth = () => {};
export const pull = () => {};
export const pullAll = () => {};
export const pullAllBy = () => {};
export const pullAllWith = () => {};
export const pullAt = () => {};
export const remove = () => {};
export const reverse = () => {};
export const slice = () => {};
export const sortedIndex = () => {};
export const sortedIndexBy = () => {};
export const sortedIndexOf = () => {};
export const sortedLastIndex = () => {};
export const sortedLastIndexBy = () => {};
export const sortedLastIndexOf = () => {};
export const sortedUniq = () => {};
export const sortedUniqBy = () => {};
export const tail = () => {};
export const take = (array: unknown[], n: number = 1): unknown[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  
  const takeCount = Math.min(n, array.length);
  return array.slice(0, takeCount);
};
export const takeRight = () => {};
export const takeRightWhile = () => {};
export const takeWhile = () => {};
export const union = () => {};
export const unionBy = () => {};
export const unionWith = () => {};
export const uniq = () => {};
export const uniqBy = () => {};
export const uniqWith = () => {};
export const unzip = () => {};
export const unzipWith = () => {};
export const without = () => {};
export const xor = () => {};
export const xorBy = () => {};
export const xorWith = () => {};
export const zip = () => {};
export const zipObject = () => {};
export const zipObjectDeep = () => {};
export const zipWith = () => {};
