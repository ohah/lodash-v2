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
export const difference = () => {};
export const differenceBy = () => {};
export const differenceWith = () => {};
export const drop = () => {};
export const dropRight = () => {};
export const dropRightWhile = () => {};
export const dropWhile = () => {};
export const fill = () => {};
export const findIndex = () => {};
export const findLastIndex = () => {};
export const flatten = () => {};
export const flattenDeep = () => {};
export const flattenDepth = () => {};
export const fromPairs = () => {};
export const head = () => {};
export const indexOf = () => {};
export const initial = () => {};
export const intersection = () => {};
export const intersectionBy = () => {};
export const intersectionWith = () => {};
export const join = () => {};
export const last = () => {};
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
export const take = () => {};
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
