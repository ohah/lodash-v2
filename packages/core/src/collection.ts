/**
 * Collection 카테고리 - lodash와 동일한 API, 플레이스홀더 구현
 * @see https://lodash.com/docs/4.17.23#Collection
 */

export const countBy = () => {};
export const every = () => {};
export const filter = (array: unknown[], fn: (value: unknown) => boolean): unknown[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  
  const result: unknown[] = [];
  for (const item of array) {
    if (fn(item)) {
      result.push(item);
    }
  }
  
  return result;
};
export const find = (array: unknown[], fn: (value: unknown) => boolean): unknown | undefined => {
  if (!Array.isArray(array)) {
    return undefined;
  }
  
  for (const item of array) {
    if (fn(item)) {
      return item;
    }
  }
  
  return undefined;
};
export const findLast = () => {};
export const flatMap = () => {};
export const flatMapDeep = () => {};
export const flatMapDepth = () => {};
export const forEach = () => {};
export const forEachRight = () => {};
export const groupBy = (array: unknown[], fn: (value: unknown) => string | unknown): Record<string, unknown[]> => {
  const result: Record<string, unknown[]> = {};
  
  if (!Array.isArray(array)) {
    return result;
  }
  
  for (const item of array) {
    const key = typeof fn === 'function' ? fn(item) : (item as any)[fn];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  
  return result;
};
export const includes = () => {};
export const invokeMap = () => {};
export const keyBy = (array: unknown[], fn: (value: unknown) => string | unknown): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  
  if (!Array.isArray(array)) {
    return result;
  }
  
  for (const item of array) {
    const key = typeof fn === 'function' ? fn(item) : (item as any)[fn];
    result[key] = item;
  }
  
  return result;
};
export const map = (array: unknown[], fn: (value: unknown) => unknown): unknown[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  
  const result: unknown[] = [];
  for (const item of array) {
    result.push(fn(item));
  }
  
  return result;
};
export const orderBy = () => {};
export const partition = () => {};
export const reduce = (array: unknown[], fn: (acc: unknown, value: unknown) => unknown, init?: unknown): unknown => {
  if (!Array.isArray(array)) {
    return init as unknown;
  }
  
  let result = init as unknown;
  for (const item of array) {
    result = fn(result, item);
  }
  
  return result as unknown;
};
export const reduceRight = () => {};
export const reject = () => {};
export const sample = () => {};
export const sampleSize = () => {};
export const shuffle = () => {};
export const size = () => {};
export const some = () => {};
export const sortBy = (array: unknown[], fn: (value: unknown) => number | string): unknown[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  
  // Create array of [value, sortKey] pairs
  const pairs = array.map(item => [item, fn(item)]);
  
  // Sort by the sortKey
  pairs.sort((a, b) => {
    const aKey = a[1];
    const bKey = b[1];
    
    if (aKey < bKey) return -1;
    if (aKey > bKey) return 1;
    return 0;
  });
  
  // Return only the values, sorted
  return pairs.map(pair => pair[0]);
};
