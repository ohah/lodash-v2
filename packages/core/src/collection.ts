/**
 * Collection 카테고리 - lodash와 동일한 API, 플레이스홀더 구현
 * @see https://lodash.com/docs/4.17.23#Collection
 */

export const countBy = (array: unknown[], fn: ((value: unknown) => string | unknown) | string): Record<string, number> => {
  const result: Record<string, number> = {};
  if (!Array.isArray(array)) return result;

  for (const item of array) {
    const key = typeof fn === 'function' ? fn(item) : (item as any)[fn];
    const k = String(key);
    result[k] = (result[k] || 0) + 1;
  }

  return result;
};
export const every = (array: unknown[], fn: (value: unknown) => boolean): boolean => {
  if (!Array.isArray(array)) {
    return true;
  }
  
  for (const item of array) {
    if (!fn(item)) {
      return false;
    }
  }
  
  return true;
};
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
export const includes = (collection: any, value: unknown): boolean => {
  if (collection == null) return false;
  if (Array.isArray(collection)) return collection.includes(value);
  if (typeof collection === 'string') return collection.indexOf(String(value)) !== -1;
  // object: check values
  if (typeof collection === 'object') return Object.values(collection).includes(value);
  return false;
};
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
export const some = (array: unknown[], fn: (value: unknown) => boolean): boolean => {
  if (!Array.isArray(array)) {
    return false;
  }
  for (const item of array) {
    if (fn(item)) return true;
  }
  return false;
};
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
