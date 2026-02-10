/**
 * Math 카테고리 - lodash와 동일한 API, 플레이스홀더 구현
 * @see https://lodash.com/docs/4.17.23#Math
 */

export const add = () => {};
export const ceil = () => {};
export const divide = () => {};
export const floor = () => {};
export const max = (array?: any[]) => {
  if (!array || array.length === 0) return undefined;
  let found = undefined;
  for (let i = 0; i < array.length; i++) {
    const v = array[i];
    if (found === undefined) {
      found = v;
      continue;
    }
    // Use > to compare; matches lodash behavior for numbers/strings
    if (v > found) found = v;
  }
  return found;
};
export const maxBy = () => {};
export const mean = (array?: number[]) => {
  if (!array || array.length === 0) return NaN;
  let total = 0;
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i] as unknown as number;
    count++;
  }
  return total / count;
};
export const meanBy = () => {};
export const min = (array?: any[]) => {
  if (!array || array.length === 0) return undefined;
  let found = undefined;
  for (let i = 0; i < array.length; i++) {
    const v = array[i];
    if (found === undefined) {
      found = v;
      continue;
    }
    if (v < found) found = v;
  }
  return found;
};
export const minBy = () => {};
export const multiply = () => {};
export const round = () => {};
export const subtract = () => {};
export const sum = (array?: number[]) => {
  if (!array || array.length === 0) return 0;
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    // coerce to number; if it's not a number this will produce NaN similar to lodash behavior
    total += array[i] as unknown as number;
  }
  return total;
};
export const sumBy = () => {};
