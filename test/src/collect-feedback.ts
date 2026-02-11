/**
 * 결과 동등성 실패를 수집해 AI 셀프 피드백용 구조를 반환합니다.
 * generate-feedback-report.ts에서 사용합니다.
 * - 구현된 Phase 1 46개 함수 케이스만 포함합니다.
 */

import * as _ from 'lodash';
import * as core from '@lodash-v2/core';
import {
  chunk,
  compact,
  concat,
  difference,
  drop,
  dropRight,
  flatten,
  head,
  initial,
  last,
  tail,
  take,
  uniq,
  without,
  fromPairs,
  map,
  filter,
  reduce,
  find,
  keyBy,
  groupBy,
  sortBy,
  countBy,
  every,
  some,
  includes,
  isArray,
  isNumber,
  isEmpty,
  cloneDeep,
  toArray,
  sum,
  max,
  min,
  mean,
  clamp,
  inRange,
  get,
  pick,
  omit,
  keys,
  values,
  camelCase,
  trim,
  identity,
  range,
} from '@lodash-v2/core';
import { runResultTest } from './result';

export interface ResultFailure {
  function: string;
  caseName: string;
  args: string;
  expected: string;
  actual: string;
}

export interface FeedbackData {
  timestamp: string;
  resultFailures: ResultFailure[];
  resultTotal: number;
  resultPassed: number;
}

/** result-equivalence.test.ts와 동일한 구현된 46개 함수 × 케이스 */
const resultCases: Array<{
  function: string;
  ours: (...args: unknown[]) => unknown;
  lodashFn: (...args: unknown[]) => unknown;
  cases: Array<{ name: string; args: unknown[] }>;
}> = [
  {
    function: 'chunk',
    ours: (a: number[], b: number) => (chunk as (a: number[], b: number) => unknown)(a, b),
    lodashFn: _.chunk,
    cases: [
      { name: 'size 2', args: [[1, 2, 3, 4], 2] },
      { name: 'size 3', args: [[1, 2, 3, 4, 5], 3] },
      { name: 'size 1', args: [[1, 2, 3], 1] },
    ],
  },
  {
    function: 'compact',
    ours: (a: unknown[]) => (compact as (a: unknown[]) => unknown)(a),
    lodashFn: _.compact,
    cases: [
      { name: 'falsy 제거', args: [[0, 1, false, 2, '', 3, null, undefined, NaN]] },
      { name: '빈 배열', args: [[]] },
    ],
  },
  {
    function: 'concat',
    ours: (a: unknown[], ...b: unknown[]) => (concat as (...args: unknown[]) => unknown)(a, ...b),
    lodashFn: _.concat,
    cases: [
      { name: '배열 + 값', args: [[1], 2, [3], [[4]]] },
      { name: '빈 배열', args: [[], 1, 2] },
    ],
  },
  {
    function: 'difference',
    ours: (a: number[], b: number[]) => (difference as (a: number[], b: number[]) => unknown)(a, b),
    lodashFn: _.difference,
    cases: [
      { name: '기본', args: [[2, 1], [2, 3]] },
      { name: '중복 제외', args: [[1, 2, 2, 3], [2]] },
    ],
  },
  {
    function: 'drop',
    ours: (a: number[], n?: number) => (drop as (a: number[], n?: number) => unknown)(a, n),
    lodashFn: _.drop,
    cases: [
      { name: 'n=1', args: [[1, 2, 3]] },
      { name: 'n=2', args: [[1, 2, 3], 2] },
    ],
  },
  {
    function: 'dropRight',
    ours: (a: number[], n?: number) => (dropRight as (a: number[], n?: number) => unknown)(a, n),
    lodashFn: _.dropRight,
    cases: [
      { name: 'n=1', args: [[1, 2, 3]] },
      { name: 'n=2', args: [[1, 2, 3], 2] },
    ],
  },
  {
    function: 'take',
    ours: (a: number[], n?: number) => (take as (a: number[], n?: number) => unknown)(a, n),
    lodashFn: _.take,
    cases: [
      { name: 'n=2', args: [[1, 2, 3], 2] },
      { name: 'n=0', args: [[1, 2, 3], 0] },
    ],
  },
  {
    function: 'flatten',
    ours: (a: unknown[]) => (flatten as (a: unknown[]) => unknown)(a),
    lodashFn: _.flatten,
    cases: [{ name: '1단계', args: [[1, [2, [3, [4]], 5]]] }],
  },
  {
    function: 'head',
    ours: (a: number[]) => (head as (a: number[]) => unknown)(a),
    lodashFn: _.head,
    cases: [
      { name: '일반', args: [[1, 2, 3]] },
      { name: '빈 배열', args: [[]] },
    ],
  },
  {
    function: 'last',
    ours: (a: number[]) => (last as (a: number[]) => unknown)(a),
    lodashFn: _.last,
    cases: [
      { name: '일반', args: [[1, 2, 3]] },
      { name: '빈 배열', args: [[]] },
    ],
  },
  {
    function: 'initial',
    ours: (a: number[]) => (initial as (a: number[]) => unknown)(a),
    lodashFn: _.initial,
    cases: [{ name: '일반', args: [[1, 2, 3]] }],
  },
  {
    function: 'tail',
    ours: (a: number[]) => (tail as (a: number[]) => unknown)(a),
    lodashFn: _.tail,
    cases: [{ name: '일반', args: [[1, 2, 3]] }],
  },
  {
    function: 'uniq',
    ours: (a: number[]) => (uniq as (a: number[]) => unknown)(a),
    lodashFn: _.uniq,
    cases: [
      { name: '중복 제거', args: [[2, 1, 2, 3, 1]] },
      { name: '빈 배열', args: [[]] },
    ],
  },
  {
    function: 'without',
    ours: (a: number[], ...b: number[]) => (without as (a: number[], ...b: number[]) => unknown)(a, ...b),
    lodashFn: _.without,
    cases: [{ name: '기본', args: [[2, 1, 2, 3], 1, 2] }],
  },
  {
    function: 'fromPairs',
    ours: (a: [string, number][]) => (fromPairs as (a: [string, number][]) => unknown)(a),
    lodashFn: _.fromPairs,
    cases: [{ name: '기본', args: [[['a', 1], ['b', 2]]] }],
  },
  {
    function: 'map',
    ours: (a: number[], fn: (n: number) => number) =>
      (map as (a: number[], fn: (n: number) => number) => unknown)(a, fn),
    lodashFn: _.map,
    cases: [
      { name: 'x2', args: [[1, 2, 3], (x: number) => x * 2] },
      { name: '빈 배열', args: [[], (x: number) => x] },
    ],
  },
  {
    function: 'filter',
    ours: (a: number[], fn: (n: number) => boolean) =>
      (filter as (a: number[], fn: (n: number) => boolean) => unknown)(a, fn),
    lodashFn: _.filter,
    cases: [
      { name: '짝수', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] },
      { name: '빈 배열', args: [[], (x: number) => x > 0] },
    ],
  },
  {
    function: 'reduce',
    ours: (a: number[], fn: (acc: number, n: number) => number, init: number) =>
      (reduce as (a: number[], fn: (acc: number, n: number) => number, init: number) => unknown)(a, fn, init),
    lodashFn: _.reduce,
    cases: [
      { name: '합', args: [[1, 2, 3], (acc: number, n: number) => acc + n, 0] },
      { name: '빈 배열', args: [[], (acc: number, n: number) => acc + n, 10] },
    ],
  },
  {
    function: 'find',
    ours: (a: { a: number }[], fn: (o: { a: number }) => boolean) =>
      (find as (a: { a: number }[], fn: (o: { a: number }) => boolean) => unknown)(a, fn),
    lodashFn: _.find,
    cases: [{ name: 'a===2', args: [[{ a: 1 }, { a: 2 }, { a: 3 }], (o: { a: number }) => o.a === 2] }],
  },
  {
    function: 'keyBy',
    ours: (a: { id: string; v: number }[], key: string) =>
      (keyBy as (a: { id: string; v: number }[], key: string) => unknown)(a, key),
    lodashFn: _.keyBy,
    cases: [{ name: 'id 기준', args: [[{ id: 'a', v: 1 }, { id: 'b', v: 2 }], 'id'] }],
  },
  {
    function: 'groupBy',
    ours: (a: number[], fn: (n: number) => string) =>
      (groupBy as (a: number[], fn: (n: number) => string) => unknown)(a, fn),
    lodashFn: _.groupBy,
    cases: [{ name: '짝홀', args: [[1, 2, 3, 4], (n: number) => (n % 2 === 0 ? 'even' : 'odd')] }],
  },
  {
    function: 'sortBy',
    ours: (a: number[], fn: (n: number) => number) =>
      (sortBy as (a: number[], fn: (n: number) => number) => unknown)(a, fn),
    lodashFn: _.sortBy,
    cases: [{ name: '음수로 역순', args: [[1, 2, 3], (n: number) => -n] }],
  },
  {
    function: 'countBy',
    ours: (a: string[], fn: (s: string) => string) =>
      (countBy as (a: string[], fn: (s: string) => string) => unknown)(a, fn),
    lodashFn: _.countBy,
    cases: [{ name: '길이', args: [['a', 'bb', 'c'], (s: string) => s.length.toString()] }],
  },
  {
    function: 'every',
    ours: (a: number[], fn: (n: number) => boolean) =>
      (every as (a: number[], fn: (n: number) => boolean) => unknown)(a, fn),
    lodashFn: _.every,
    cases: [
      { name: '전부 참', args: [[2, 4, 6], (n: number) => n % 2 === 0] },
      { name: '하나 거짓', args: [[2, 3, 6], (n: number) => n % 2 === 0] },
    ],
  },
  {
    function: 'some',
    ours: (a: number[], fn: (n: number) => boolean) =>
      (some as (a: number[], fn: (n: number) => boolean) => unknown)(a, fn),
    lodashFn: _.some,
    cases: [
      { name: '하나 참', args: [[1, 3, 5], (n: number) => n % 2 === 0] },
      { name: '전부 거짓', args: [[1, 3, 5], (n: number) => n % 2 === 0] },
    ],
  },
  {
    function: 'includes',
    ours: (a: number[], v: number) => (includes as (a: number[], v: number) => unknown)(a, v),
    lodashFn: _.includes,
    cases: [
      { name: '있음', args: [[1, 2, 3], 2] },
      { name: '없음', args: [[1, 2, 3], 4] },
    ],
  },
  {
    function: 'isArray',
    ours: (a: unknown) => (isArray as (a: unknown) => unknown)(a),
    lodashFn: _.isArray,
    cases: [
      { name: '배열', args: [[]] },
      { name: '객체', args: [{}] },
      { name: 'null', args: [null] },
    ],
  },
  {
    function: 'isNumber',
    ours: (a: unknown) => (isNumber as (a: unknown) => unknown)(a),
    lodashFn: _.isNumber,
    cases: [
      { name: '숫자', args: [1] },
      { name: '문자열', args: ['1'] },
      { name: 'NaN', args: [NaN] },
    ],
  },
  {
    function: 'isEmpty',
    ours: (a: unknown) => (isEmpty as (a: unknown) => unknown)(a),
    lodashFn: _.isEmpty,
    cases: [
      { name: '빈 배열', args: [[]] },
      { name: '빈 객체', args: [{}] },
      { name: '요소 있음', args: [[1, 2]] },
    ],
  },
  {
    function: 'toArray',
    ours: (a: unknown) => (toArray as (a: unknown) => unknown)(a),
    lodashFn: _.toArray,
    cases: [
      { name: '객체', args: [{ a: 1, b: 2 }] },
      { name: '문자열', args: ['abc'] },
    ],
  },
  {
    function: 'cloneDeep',
    ours: (a: { a: number; b: { c: number } }) =>
      (cloneDeep as (a: { a: number; b: { c: number } }) => unknown)(a),
    lodashFn: _.cloneDeep,
    cases: [{ name: '중첩 객체', args: [{ a: 1, b: { c: 2 } }] }],
  },
  {
    function: 'sum',
    ours: (a: number[]) => (sum as (a: number[]) => unknown)(a),
    lodashFn: _.sum,
    cases: [
      { name: '기본', args: [[1, 2, 3, 4]] },
      { name: '빈 배열', args: [[]] },
    ],
  },
  {
    function: 'max',
    ours: (a: number[]) => (max as (a: number[]) => unknown)(a),
    lodashFn: _.max,
    cases: [
      { name: '기본', args: [[4, 2, 8, 6]] },
      { name: '빈 배열', args: [[]] },
    ],
  },
  {
    function: 'min',
    ours: (a: number[]) => (min as (a: number[]) => unknown)(a),
    lodashFn: _.min,
    cases: [
      { name: '기본', args: [[4, 2, 8, 6]] },
      { name: '빈 배열', args: [[]] },
    ],
  },
  {
    function: 'mean',
    ours: (a: number[]) => (mean as (a: number[]) => unknown)(a),
    lodashFn: _.mean,
    cases: [
      { name: '기본', args: [[4, 2, 8, 6]] },
      { name: '빈 배열', args: [[]] },
    ],
  },
  {
    function: 'clamp',
    ours: (n: number, lo: number, hi: number) =>
      (clamp as (n: number, lo: number, hi: number) => unknown)(n, lo, hi),
    lodashFn: _.clamp,
    cases: [
      { name: '범위 내', args: [2, 0, 5] },
      { name: '범위 밑', args: [-1, 0, 5] },
      { name: '범위 위', args: [10, 0, 5] },
    ],
  },
  {
    function: 'inRange',
    ours: (n: number, start: number, end?: number) =>
      (inRange as (n: number, start: number, end?: number) => unknown)(n, start, end),
    lodashFn: _.inRange,
    cases: [
      { name: '구간 내', args: [3, 0, 5] },
      { name: '구간 밖', args: [5, 0, 5] },
      { name: '2인자', args: [2, 5] },
    ],
  },
  {
    function: 'get',
    ours: (o: object, path: string, def?: unknown) =>
      (get as (o: object, path: string, def?: unknown) => unknown)(o, path, def),
    lodashFn: _.get,
    cases: [
      { name: '중첩', args: [{ a: { b: { c: 3 } } }, 'a.b.c'] },
      { name: '기본값', args: [{ a: { b: 2 } }, 'a.x', 'default'] },
    ],
  },
  {
    function: 'pick',
    ours: (o: { a: number; b: number; c: number }, keys: ('a' | 'b' | 'c')[]) =>
      (pick as (o: { a: number; b: number; c: number }, keys: string[]) => unknown)(o, keys),
    lodashFn: _.pick,
    cases: [{ name: 'a,c', args: [{ a: 1, b: 2, c: 3 }, ['a', 'c']] }],
  },
  {
    function: 'omit',
    ours: (o: { a: number; b: number; c: number }, keys: ('a' | 'b' | 'c')[]) =>
      (omit as (o: { a: number; b: number; c: number }, keys: string[]) => unknown)(o, keys),
    lodashFn: _.omit,
    cases: [{ name: 'b 제외', args: [{ a: 1, b: 2, c: 3 }, ['b']] }],
  },
  {
    function: 'keys',
    ours: (o: Record<string, number>) => (keys as (o: Record<string, number>) => unknown)(o),
    lodashFn: _.keys,
    cases: [{ name: '기본', args: [{ a: 1, b: 2 }] }],
  },
  {
    function: 'values',
    ours: (o: Record<string, number>) => (values as (o: Record<string, number>) => unknown)(o),
    lodashFn: _.values,
    cases: [{ name: '기본', args: [{ a: 1, b: 2 }] }],
  },
  {
    function: 'camelCase',
    ours: (s: string) => (camelCase as (s: string) => unknown)(s),
    lodashFn: _.camelCase,
    cases: [
      { name: '공백', args: ['foo bar'] },
      { name: '하이픈', args: ['foo-bar'] },
    ],
  },
  {
    function: 'trim',
    ours: (s: string, chars?: string) => (trim as (s: string, chars?: string) => unknown)(s, chars),
    lodashFn: _.trim,
    cases: [
      { name: '기본', args: ['  abc  '] },
      { name: 'chars', args: ['_-abc-_', '_-'] },
    ],
  },
  {
    function: 'identity',
    ours: (x: number) => (identity as (x: number) => unknown)(x),
    lodashFn: _.identity,
    cases: [
      { name: '숫자', args: [42] },
      { name: '0', args: [0] },
    ],
  },
  {
    function: 'range',
    ours: (start: number, end?: number, step?: number) =>
      (range as (start: number, end?: number, step?: number) => unknown)(start, end, step),
    lodashFn: _.range,
    cases: [
      { name: '0~3', args: [4] },
      { name: '1~4', args: [1, 5] },
      { name: 'step 2', args: [0, 6, 2] },
    ],
  },
];

const allResultCases = resultCases;

function stringify(v: unknown): string {
  if (v === undefined) return 'undefined';
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

export function collectFeedback(iterations: number = 50_000): FeedbackData {
  const resultFailures: ResultFailure[] = [];
  let resultTotal = 0;
  let resultPassed = 0;

  for (const { function: fnName, ours, lodashFn, cases } of allResultCases) {
    const result = runResultTest(
      ours as (...args: unknown[]) => unknown,
      lodashFn,
      cases as Array<{ name: string; args: unknown[] }>
    );
    resultTotal += result.total;
    resultPassed += result.passedCount;
    for (const d of result.details) {
      if (!d.passed) {
        resultFailures.push({
          function: fnName,
          caseName: d.name,
          args: stringify(d.args),
          expected: stringify(d.expected),
          actual: stringify(d.actual),
        });
      }
    }
  }

  return {
    timestamp: new Date().toISOString(),
    resultFailures,
    resultTotal,
    resultPassed,
  };
}
