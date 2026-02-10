/**
 * Lang 카테고리 - lodash와 동일한 API, 플레이스홀더 구현
 * @see https://lodash.com/docs/4.17.23#Lang
 */

export const castArray = () => {};
export const clone = () => {};
export const cloneDeep = <T>(value: T): T => {
  // Prefer structuredClone when available (Node 17+, Bun), fallback to JSON for plain objects
  try {
    if (typeof (globalThis as any).structuredClone === 'function') {
      return (globalThis as any).structuredClone(value);
    }
  } catch (e) {
    // ignore and fallback
  }
  // Fallback: JSON deep clone (note: won't handle functions or special types)
  return JSON.parse(JSON.stringify(value));
};
export const cloneDeepWith = () => {};
export const cloneWith = () => {};
export const conformsTo = () => {};
export const eq = () => {};
export const gt = () => {};
export const gte = () => {};
export const isArguments = () => {};
export const isArray = (value: unknown): boolean => {
  return Array.isArray(value);
};
export const isArrayBuffer = () => {};
export const isArrayLike = () => {};
export const isArrayLikeObject = () => {};
export const isBoolean = () => {};
export const isBuffer = () => {};
export const isDate = () => {};
export const isElement = () => {};
export const isEmpty = (value: unknown): boolean => {
  if (value == null) return true;
  if (Array.isArray(value) || typeof value === 'string') return (value as any).length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
};
export const isEqual = () => {};
export const isEqualWith = () => {};
export const isError = () => {};
export const isFinite = () => {};
export const isFunction = () => {};
export const isInteger = () => {};
export const isLength = () => {};
export const isMap = () => {};
export const isMatch = () => {};
export const isMatchWith = () => {};
export const isNaN = () => {};
export const isNative = () => {};
export const isNil = () => {};
export const isNull = () => {};
export const isNumber = (value: unknown): boolean => {
  return typeof value === 'number' && !Number.isNaN(value);
};
export const isObject = () => {};
export const isObjectLike = () => {};
export const isPlainObject = () => {};
export const isRegExp = () => {};
export const isSafeInteger = () => {};
export const isSet = () => {};
export const isString = () => {};
export const isSymbol = () => {};
export const isTypedArray = () => {};
export const isUndefined = () => {};
export const isWeakMap = () => {};
export const isWeakSet = () => {};
export const lt = () => {};
export const lte = () => {};
export const toArray = (value: any): any[] => {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return value.split('');
  if (typeof value === 'object') return Object.values(value);
  return [value];
};
export const toFinite = () => {};
export const toInteger = () => {};
export const toLength = () => {};
export const toNumber = () => {};
export const toPlainObject = () => {};
export const toSafeInteger = () => {};
export const toString = () => {};
