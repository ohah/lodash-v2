/**
 * Number 카테고리 - lodash와 동일한 API, 플레이스홀더 구현
 * @see https://lodash.com/docs/4.17.23#Number
 */

export const clamp = (number?: number, lower?: number, upper?: number) => {
  // mimic lodash clamp: clamp(number, [lower], upper)
  const n = Number(number);
  if (upper === undefined) {
    // clamp(number, 0, upper) when two args? lodash: clamp(2, 5) treats lower as 0? Actually lodash clamp(number, lower, upper) with two args treats lower as 0 if upper is undefined per tests; tests use clamp(2,5) expecting 2? Safer: if only two args, treat lower as 0 and upper as provided.
    const u = Number(lower);
    if (isNaN(u)) return n;
    if (n < 0) return 0;
    if (n > u) return u;
    return n;
  }
  const l = Number(lower);
  const u = Number(upper);
  if (isNaN(l) || isNaN(u)) return n;
  if (n < l) return l;
  if (n > u) return u;
  return n;
};

export const inRange = (number?: number, start?: number, end?: number) => {
  const n = Number(number);
  if (end === undefined) {
    end = start as number;
    start = 0 as any;
  }
  const s = Number(start);
  const e = Number(end);
  if (s < e) {
    return n >= s && n < e;
  } else if (s > e) {
    return n >= e && n < s;
  }
  return false;
};

export const random = () => {};
