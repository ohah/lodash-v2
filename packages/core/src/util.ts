/**
 * Util 카테고리 - lodash와 동일한 API, 플레이스홀더 구현
 * @see https://lodash.com/docs/4.17.23#Util
 */

export const attempt = () => {};
export const bindAll = () => {};
export const cond = () => {};
export const conforms = () => {};
export const constant = () => {};
export const defaultTo = () => {};
export const flow = () => {};
export const flowRight = () => {};
export const identity = <T>(v: T) => v;
export const iteratee = () => {};
export const matches = () => {};
export const matchesProperty = () => {};
export const method = () => {};
export const methodOf = () => {};
export const mixin = () => {};
export const noConflict = () => {};
export const noop = () => {};
export const nthArg = () => {};
export const over = () => {};
export const overEvery = () => {};
export const overSome = () => {};
export const property = () => {};
export const propertyOf = () => {};
export const range = (start?: number, end?: number, step?: number) => {
  if (end === undefined) {
    end = start as number;
    start = 0 as any;
  }
  const s = Number(start) || 0;
  const e = Number(end) || 0;
  const st = step === undefined ? 1 : Number(step);
  const res: number[] = [];
  if (st === 0) return res;
  if (st > 0) {
    for (let i = s; i < e; i += st) res.push(i);
  } else {
    for (let i = s; i > e; i += st) res.push(i);
  }
  return res;
};
export const rangeRight = () => {};
export const runInContext = () => {};
export const stubArray = () => {};
export const stubFalse = () => {};
export const stubObject = () => {};
export const stubString = () => {};
export const stubTrue = () => {};
export const times = () => {};
export const toPath = () => {};
export const uniqueId = () => {};
