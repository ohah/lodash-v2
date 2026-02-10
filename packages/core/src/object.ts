/**
 * Object 카테고리 - lodash와 동일한 API, 플레이스홀더 구현
 * @see https://lodash.com/docs/4.17.23#Object
 */

export const assign = () => {};
export const assignIn = () => {};
export const assignInWith = () => {};
export const assignWith = () => {};
export const at = () => {};
export const create = () => {};
export const defaults = () => {};
export const defaultsDeep = () => {};
export const findKey = () => {};
export const findLastKey = () => {};
export const forIn = () => {};
export const forInRight = () => {};
export const forOwn = () => {};
export const forOwnRight = () => {};
export const functions = () => {};
export const functionsIn = () => {};
export const get = (obj: any, path: string | string[], defaultValue?: any) => {
  if (obj == null) return defaultValue;
  const pathArr = Array.isArray(path) ? path : String(path).split('.');
  let cur = obj;
  for (let i = 0; i < pathArr.length; i++) {
    const key = pathArr[i];
    if (cur == null) return defaultValue;
    if (Object.prototype.hasOwnProperty.call(cur, key)) {
      cur = cur[key];
    } else {
      // try numeric index if key is a number-like string
      if (cur[key] !== undefined) {
        cur = cur[key];
      } else {
        return defaultValue;
      }
    }
  }
  return cur;
};
export const has = () => {};
export const hasIn = () => {};
export const invert = () => {};
export const invertBy = () => {};
export const invoke = () => {};
export const keys = (obj: any) => {
  if (obj == null) return [];
  return Object.keys(obj);
};
export const keysIn = () => {};
export const mapKeys = () => {};
export const mapValues = () => {};
export const merge = () => {};
export const mergeWith = () => {};
export const omit = (obj: any, keys: string[]) => {
  if (obj == null) return {};
  const res: any = {};
  for (const k of Object.keys(obj)) {
    if (!keys.includes(k)) res[k] = obj[k];
  }
  return res;
};
export const omitBy = () => {};
export const pick = (obj: any, keys: string[]) => {
  if (obj == null) return {};
  const res: any = {};
  for (const k of keys) {
    if (k in obj) res[k] = obj[k];
  }
  return res;
};
export const pickBy = () => {};
export const result = () => {};
export const set = () => {};
export const setWith = () => {};
export const toPairs = () => {};
export const toPairsIn = () => {};
export const transform = () => {};
export const unset = () => {};
export const update = () => {};
export const updateWith = () => {};
export const values = (obj: any) => {
  if (obj == null) return [];
  return Object.keys(obj).map((k) => obj[k]);
};
export const valuesIn = () => {};
