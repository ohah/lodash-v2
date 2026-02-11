/**
 * 벤치마크 및 결과 동등성 실패를 수집해 AI 셀프 피드백용 구조를 반환합니다.
 * generate-feedback-report.ts에서 사용합니다.
 * - 구현된 46개 + Phase 1 미구현 함수 케이스를 모두 포함해, 미구현도 실패 목록으로 피드백합니다.
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
import { chunk as esChunk } from 'es-toolkit';
import { runResultTest } from './result';
import { compareSpeedThree } from './speed';

export interface ResultFailure {
  function: string;
  caseName: string;
  args: string;
  expected: string;
  actual: string;
}

export interface BenchmarkRow {
  function: string;
  fastest: 'ours' | 'lodash' | 'es-toolkit';
  oursOpsPerSec: number;
  lodashOpsPerSec: number;
  esToolkitOpsPerSec: number;
  oursRatio: number;
  iterations: number;
}

export interface FeedbackData {
  timestamp: string;
  resultFailures: ResultFailure[];
  resultTotal: number;
  resultPassed: number;
  benchmark: BenchmarkRow[];
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

/** Phase 1 미구현 함수 — 실패 시 피드백으로 "구현 필요" 목록에 포함됨 */
const unimplementedCases: Array<{
  function: string;
  ours: (...args: unknown[]) => unknown;
  lodashFn: (...args: unknown[]) => unknown;
  cases: Array<{ name: string; args: unknown[] }>;
}> = [
  { function: 'differenceBy', ours: (a: number[], b: number[], fn?: (x: number) => number) => (core.differenceBy as any)(a, b, fn), lodashFn: _.differenceBy, cases: [{ name: '기본', args: [[2.1, 1.2], [2.3, 3.4], Math.floor] }] },
  { function: 'differenceWith', ours: (a: number[], b: number[], fn: (x: number, y: number) => boolean) => (core.differenceWith as any)(a, b, fn), lodashFn: _.differenceWith, cases: [{ name: '기본', args: [[1, 2], [2, 3], (a: number, b: number) => a === b] }] },
  { function: 'dropRightWhile', ours: (a: number[], fn: (x: number) => boolean) => (core.dropRightWhile as any)(a, fn), lodashFn: _.dropRightWhile, cases: [{ name: '기본', args: [[1, 2, 3, 4], (n: number) => n > 2] }] },
  { function: 'dropWhile', ours: (a: number[], fn: (x: number) => boolean) => (core.dropWhile as any)(a, fn), lodashFn: _.dropWhile, cases: [{ name: '기본', args: [[1, 2, 3, 4], (n: number) => n < 3] }] },
  { function: 'fill', ours: (a: unknown[], v: unknown, s?: number, e?: number) => (core.fill as any)([...a], v, s, e), lodashFn: (arr: unknown[], v: unknown, s?: number, e?: number) => _.fill([...arr], v, s, e), cases: [{ name: '기본', args: [[1, 2, 3], 'a'] }] },
  { function: 'findIndex', ours: (a: number[], fn: (x: number) => boolean) => (core.findIndex as any)(a, fn), lodashFn: _.findIndex, cases: [{ name: '기본', args: [[1, 2, 3], (x: number) => x === 2] }] },
  { function: 'findLastIndex', ours: (a: number[], fn: (x: number) => boolean) => (core.findLastIndex as any)(a, fn), lodashFn: _.findLastIndex, cases: [{ name: '기본', args: [[1, 2, 2, 3], (x: number) => x === 2] }] },
  { function: 'flattenDeep', ours: (a: unknown[]) => (core.flattenDeep as any)(a), lodashFn: _.flattenDeep, cases: [{ name: '기본', args: [[[1, [2, [3, [4]]]]]] }] },
  { function: 'flattenDepth', ours: (a: unknown[], d: number) => (core.flattenDepth as any)(a, d), lodashFn: _.flattenDepth, cases: [{ name: 'depth 2', args: [[[1, [2, [3, [4]]]]], 2] }] },
  { function: 'indexOf', ours: (a: number[], v: number, from?: number) => (core.indexOf as any)(a, v, from), lodashFn: _.indexOf, cases: [{ name: '기본', args: [[1, 2, 1, 2], 2] }] },
  { function: 'intersection', ours: (a: number[], b: number[]) => (core.intersection as any)(a, b), lodashFn: _.intersection, cases: [{ name: '기본', args: [[2, 1], [2, 3]] }] },
  { function: 'intersectionBy', ours: (a: number[], b: number[], fn?: (x: number) => number) => (core.intersectionBy as any)(a, b, fn), lodashFn: _.intersectionBy, cases: [{ name: '기본', args: [[2.1, 1.2], [2.3, 3.4], Math.floor] }] },
  { function: 'intersectionWith', ours: (a: number[], b: number[], fn: (x: number, y: number) => boolean) => (core.intersectionWith as any)(a, b, fn), lodashFn: _.intersectionWith, cases: [{ name: '기본', args: [[1, 2], [2, 3], (a: number, b: number) => a === b] }] },
  { function: 'join', ours: (a: string[], sep?: string) => (core.join as any)(a, sep), lodashFn: _.join, cases: [{ name: '기본', args: [['a', 'b', 'c'], '~'] }] },
  { function: 'lastIndexOf', ours: (a: number[], v: number, from?: number) => (core.lastIndexOf as any)(a, v, from), lodashFn: _.lastIndexOf, cases: [{ name: '기본', args: [[1, 2, 1, 2], 2] }] },
  { function: 'nth', ours: (a: number[], n: number) => (core.nth as any)(a, n), lodashFn: _.nth, cases: [{ name: '기본', args: [[1, 2, 3], 1] }] },
  { function: 'pull', ours: (a: number[], ...v: number[]) => (core.pull as any)([...a], ...v), lodashFn: (arr: number[], ...v: number[]) => _.pull([...arr], ...v), cases: [{ name: '기본', args: [[1, 2, 3, 1, 2], 2, 1] }] },
  { function: 'pullAll', ours: (a: number[], v: number[]) => (core.pullAll as any)([...a], v), lodashFn: (arr: number[], v: number[]) => _.pullAll([...arr], v), cases: [{ name: '기본', args: [[1, 2, 3, 1, 2], [2, 1]] }] },
  { function: 'pullAt', ours: (a: number[], i: number[]) => (core.pullAt as any)([...a], i), lodashFn: (arr: number[], i: number[]) => _.pullAt([...arr], i), cases: [{ name: '기본', args: [[1, 2, 3, 4], [1, 3]] }] },
  { function: 'remove', ours: (a: number[], fn: (x: number) => boolean) => (core.remove as any)([...a], fn), lodashFn: (arr: number[], fn: (x: number) => boolean) => _.remove([...arr], fn), cases: [{ name: '기본', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] }] },
  { function: 'reverse', ours: (a: number[]) => (core.reverse as any)([...a]), lodashFn: (arr: number[]) => _.reverse([...arr]), cases: [{ name: '기본', args: [[1, 2, 3]] }] },
  { function: 'slice', ours: (a: number[], s?: number, e?: number) => (core.slice as any)(a, s, e), lodashFn: _.slice, cases: [{ name: '기본', args: [[1, 2, 3, 4], 1, 3] }] },
  { function: 'sortedIndex', ours: (a: number[], v: number) => (core.sortedIndex as any)(a, v), lodashFn: _.sortedIndex, cases: [{ name: '기본', args: [[30, 50], 40] }] },
  { function: 'sortedIndexBy', ours: (a: { age: number }[], v: number, fn: (x: { age: number }) => number) => (core.sortedIndexBy as any)(a, v, fn), lodashFn: _.sortedIndexBy, cases: [{ name: '기본', args: [[{ age: 30 }, { age: 50 }], 40, (o: { age: number }) => o.age] }] },
  { function: 'takeRight', ours: (a: number[], n?: number) => (core.takeRight as any)(a, n), lodashFn: _.takeRight, cases: [{ name: '기본', args: [[1, 2, 3], 2] }] },
  { function: 'takeRightWhile', ours: (a: number[], fn: (x: number) => boolean) => (core.takeRightWhile as any)(a, fn), lodashFn: _.takeRightWhile, cases: [{ name: '기본', args: [[1, 2, 3, 4], (n: number) => n > 2] }] },
  { function: 'takeWhile', ours: (a: number[], fn: (x: number) => boolean) => (core.takeWhile as any)(a, fn), lodashFn: _.takeWhile, cases: [{ name: '기본', args: [[1, 2, 3, 4], (n: number) => n < 3] }] },
  { function: 'union', ours: (a: number[], b: number[]) => (core.union as any)(a, b), lodashFn: _.union, cases: [{ name: '기본', args: [[2], [1, 2]] }] },
  { function: 'unionBy', ours: (a: number[], b: number[], fn?: (x: number) => number) => (core.unionBy as any)(a, b, fn), lodashFn: _.unionBy, cases: [{ name: '기본', args: [[2.1], [1.2, 2.3], Math.floor] }] },
  { function: 'uniqBy', ours: (a: number[], fn: (x: number) => number) => (core.uniqBy as any)(a, fn), lodashFn: _.uniqBy, cases: [{ name: '기본', args: [[2.1, 1.2, 2.3], Math.floor] }] },
  { function: 'unzip', ours: (a: (number | string)[][]) => (core.unzip as any)(a), lodashFn: _.unzip, cases: [{ name: '기본', args: [[[1, 'a'], [2, 'b']]] }] },
  { function: 'xor', ours: (a: number[], b: number[]) => (core.xor as any)(a, b), lodashFn: _.xor, cases: [{ name: '기본', args: [[2, 1], [2, 3]] }] },
  { function: 'zip', ours: (...a: number[][]) => (core.zip as any)(...a), lodashFn: _.zip, cases: [{ name: '기본', args: [[1, 2], [10, 20], [100, 200]] }] },
  { function: 'zipObject', ours: (a: string[], b: number[]) => (core.zipObject as any)(a, b), lodashFn: _.zipObject, cases: [{ name: '기본', args: [['a', 'b'], [1, 2]] }] },
  { function: 'zipWith', ours: (a: number[], b: number[], fn: (a: number, b: number) => number) => (core.zipWith as any)(a, b, fn), lodashFn: _.zipWith, cases: [{ name: '기본', args: [[1, 2], [10, 20], (a: number, b: number) => a + b] }] },
  { function: 'findLast', ours: (a: number[], fn: (x: number) => boolean) => (core.findLast as any)(a, fn), lodashFn: _.findLast, cases: [{ name: '기본', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] }] },
  { function: 'flatMap', ours: (a: number[], fn: (x: number) => number[]) => (core.flatMap as any)(a, fn), lodashFn: _.flatMap, cases: [{ name: '기본', args: [[1, 2], (n: number) => [n, n]] }] },
  { function: 'flatMapDeep', ours: (a: number[], fn: (x: number) => unknown) => (core.flatMapDeep as any)(a, fn), lodashFn: _.flatMapDeep, cases: [{ name: '기본', args: [[1, 2], (n: number) => [[[n, n]]]] }] },
  { function: 'flatMapDepth', ours: (a: number[], fn: (x: number) => unknown, d: number) => (core.flatMapDepth as any)(a, fn, d), lodashFn: _.flatMapDepth, cases: [{ name: '기본', args: [[1, 2], (n: number) => [[[n, n]]], 2] }] },
  { function: 'forEach', ours: (a: number[]) => (core.forEach as any)(a, () => {}), lodashFn: (a: number[]) => _.forEach(a, () => {}), cases: [{ name: '기본', args: [[1, 2, 3]] }] },
  { function: 'orderBy', ours: (a: { a: string; b: number }[], keys: (string | ((x: { a: string; b: number }) => number))[], orders?: ('asc' | 'desc')[]) => (core.orderBy as any)(a, keys, orders), lodashFn: _.orderBy, cases: [{ name: '기본', args: [[{ a: 'b', b: 2 }, { a: 'a', b: 1 }], ['a'], ['asc']] }] },
  { function: 'partition', ours: (a: number[], fn: (x: number) => boolean) => (core.partition as any)(a, fn), lodashFn: _.partition, cases: [{ name: '기본', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] }] },
  { function: 'reduceRight', ours: (a: number[], fn: (acc: number, x: number) => number, init: number) => (core.reduceRight as any)(a, fn, init), lodashFn: _.reduceRight, cases: [{ name: '기본', args: [[1, 2, 3], (acc: number, x: number) => acc + x, 0] }] },
  { function: 'reject', ours: (a: number[], fn: (x: number) => boolean) => (core.reject as any)(a, fn), lodashFn: _.reject, cases: [{ name: '기본', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] }] },
  { function: 'size', ours: (c: number[] | Record<string, number>) => (core.size as any)(c), lodashFn: _.size, cases: [{ name: '배열', args: [[1, 2, 3]] }, { name: '객체', args: [{ a: 1, b: 2 }] }] },
  { function: 'castArray', ours: (v: number) => (core.castArray as any)(v), lodashFn: _.castArray, cases: [{ name: '숫자', args: [1] }] },
  { function: 'clone', ours: (v: { a: number }) => (core.clone as any)(v), lodashFn: _.clone, cases: [{ name: '객체', args: [{ a: 1 }] }] },
  { function: 'eq', ours: (a: number, b: number) => (core.eq as any)(a, b), lodashFn: _.eq, cases: [{ name: '같음', args: [1, 1] }, { name: '다름', args: [1, 2] }] },
  { function: 'isEqual', ours: (a: unknown, b: unknown) => (core.isEqual as any)(a, b), lodashFn: _.isEqual, cases: [{ name: '객체', args: [{ a: 1 }, { a: 1 }] }] },
  { function: 'isNil', ours: (v: unknown) => (core.isNil as any)(v), lodashFn: _.isNil, cases: [{ name: 'null', args: [null] }, { name: 'undefined', args: [undefined] }, { name: '값', args: [1] }] },
  { function: 'isString', ours: (v: unknown) => (core.isString as any)(v), lodashFn: _.isString, cases: [{ name: '문자열', args: ['a'] }, { name: '숫자', args: [1] }] },
  { function: 'toNumber', ours: (v: string) => (core.toNumber as any)(v), lodashFn: _.toNumber, cases: [{ name: '기본', args: ['3.2'] }] },
  { function: 'gt', ours: (a: number, b: number) => (core.gt as any)(a, b), lodashFn: _.gt, cases: [{ name: 'gt', args: [3, 1] }] },
  { function: 'gte', ours: (a: number, b: number) => (core.gte as any)(a, b), lodashFn: _.gte, cases: [{ name: 'gte', args: [1, 1] }] },
  { function: 'lt', ours: (a: number, b: number) => (core.lt as any)(a, b), lodashFn: _.lt, cases: [{ name: 'lt', args: [1, 3] }] },
  { function: 'lte', ours: (a: number, b: number) => (core.lte as any)(a, b), lodashFn: _.lte, cases: [{ name: 'lte', args: [1, 1] }] },
  { function: 'isBoolean', ours: (v: unknown) => (core.isBoolean as any)(v), lodashFn: _.isBoolean, cases: [{ name: 'true', args: [true] }, { name: '숫자', args: [1] }] },
  { function: 'isDate', ours: (v: unknown) => (core.isDate as any)(v), lodashFn: _.isDate, cases: [{ name: 'Date', args: [new Date()] }, { name: '숫자', args: [1] }] },
  { function: 'toInteger', ours: (v: string) => (core.toInteger as any)(v), lodashFn: _.toInteger, cases: [{ name: '기본', args: ['3.2'] }] },
  { function: 'add', ours: (a: number, b: number) => (core.add as any)(a, b), lodashFn: _.add, cases: [{ name: '기본', args: [6, 4] }] },
  { function: 'ceil', ours: (n: number, p?: number) => (core.ceil as any)(n, p), lodashFn: _.ceil, cases: [{ name: 'ceil', args: [4.006, 2] }] },
  { function: 'floor', ours: (n: number, p?: number) => (core.floor as any)(n, p), lodashFn: _.floor, cases: [{ name: 'floor', args: [4.006, 2] }] },
  { function: 'round', ours: (n: number, p?: number) => (core.round as any)(n, p), lodashFn: _.round, cases: [{ name: 'round', args: [4.006, 2] }] },
  { function: 'divide', ours: (a: number, b: number) => (core.divide as any)(a, b), lodashFn: _.divide, cases: [{ name: 'divide', args: [6, 4] }] },
  { function: 'multiply', ours: (a: number, b: number) => (core.multiply as any)(a, b), lodashFn: _.multiply, cases: [{ name: 'multiply', args: [6, 4] }] },
  { function: 'subtract', ours: (a: number, b: number) => (core.subtract as any)(a, b), lodashFn: _.subtract, cases: [{ name: 'subtract', args: [6, 4] }] },
  { function: 'maxBy', ours: (a: { n: number }[], fn: (x: { n: number }) => number) => (core.maxBy as any)(a, fn), lodashFn: _.maxBy, cases: [{ name: 'maxBy', args: [[{ n: 1 }, { n: 2 }, { n: 3 }], (x: { n: number }) => x.n] }] },
  { function: 'meanBy', ours: (a: { n: number }[], fn: (x: { n: number }) => number) => (core.meanBy as any)(a, fn), lodashFn: _.meanBy, cases: [{ name: 'meanBy', args: [[{ n: 1 }, { n: 2 }, { n: 3 }], (x: { n: number }) => x.n] }] },
  { function: 'minBy', ours: (a: { n: number }[], fn: (x: { n: number }) => number) => (core.minBy as any)(a, fn), lodashFn: _.minBy, cases: [{ name: 'minBy', args: [[{ n: 1 }, { n: 2 }, { n: 3 }], (x: { n: number }) => x.n] }] },
  { function: 'sumBy', ours: (a: { n: number }[], fn: (x: { n: number }) => number) => (core.sumBy as any)(a, fn), lodashFn: _.sumBy, cases: [{ name: 'sumBy', args: [[{ n: 1 }, { n: 2 }, { n: 3 }], (x: { n: number }) => x.n] }] },
  { function: 'assign', ours: (a: Record<string, number>, b: Record<string, number>) => (core.assign as any)({}, a, b), lodashFn: (a: Record<string, number>, b: Record<string, number>) => (_.assign as any)({}, a, b), cases: [{ name: '기본', args: [{ a: 1 }, { b: 2 }] }] },
  { function: 'defaults', ours: (a: Record<string, number>, b: Record<string, number>) => (core.defaults as any)({}, a, b), lodashFn: (a: Record<string, number>, b: Record<string, number>) => (_.defaults as any)({}, a, b), cases: [{ name: '기본', args: [{ a: 1 }, { a: 2, b: 2 }] }] },
  { function: 'has', ours: (o: Record<string, number>, path: string) => (core.has as any)(o, path), lodashFn: _.has, cases: [{ name: '기본', args: [{ a: 1 }, 'a'] }] },
  { function: 'invert', ours: (o: Record<string, string>) => (core.invert as any)(o), lodashFn: _.invert, cases: [{ name: '기본', args: [{ a: '1', b: '2' }] }] },
  { function: 'merge', ours: (a: Record<string, unknown>, b: Record<string, unknown>) => (core.merge as any)({}, a, b), lodashFn: (a: Record<string, unknown>, b: Record<string, unknown>) => (_.merge as any)({}, a, b), cases: [{ name: '기본', args: [{ a: 1 }, { b: 2 }] }] },
  { function: 'set', ours: (o: Record<string, unknown>, path: string, v: unknown) => (core.set as any)({ ...o }, path, v), lodashFn: (o: Record<string, unknown>, path: string, v: unknown) => (_.set as any)({ ...o }, path, v), cases: [{ name: '기본', args: [{}, 'a.b', 1] }] },
  { function: 'toPairs', ours: (o: Record<string, number>) => (core.toPairs as any)(o), lodashFn: _.toPairs, cases: [{ name: '기본', args: [{ a: 1, b: 2 }] }] },
  { function: 'capitalize', ours: (s: string) => (core.capitalize as any)(s), lodashFn: _.capitalize, cases: [{ name: '기본', args: ['FRED'] }] },
  { function: 'kebabCase', ours: (s: string) => (core.kebabCase as any)(s), lodashFn: _.kebabCase, cases: [{ name: '기본', args: ['Foo Bar'] }] },
  { function: 'pad', ours: (s: string, n: number, chars?: string) => (core.pad as any)(s, n, chars), lodashFn: _.pad, cases: [{ name: '기본', args: ['abc', 8] }] },
  { function: 'repeat', ours: (s: string, n: number) => (core.repeat as any)(s, n), lodashFn: _.repeat, cases: [{ name: '기본', args: ['*', 3] }] },
  { function: 'snakeCase', ours: (s: string) => (core.snakeCase as any)(s), lodashFn: _.snakeCase, cases: [{ name: '기본', args: ['Foo Bar'] }] },
  { function: 'toLower', ours: (s: string) => (core.toLower as any)(s), lodashFn: _.toLower, cases: [{ name: 'toLower', args: ['--Foo-Bar--'] }] },
  { function: 'toUpper', ours: (s: string) => (core.toUpper as any)(s), lodashFn: _.toUpper, cases: [{ name: 'toUpper', args: ['--foo-bar--'] }] },
  { function: 'trimEnd', ours: (s: string, chars?: string) => (core.trimEnd as any)(s, chars), lodashFn: _.trimEnd, cases: [{ name: '기본', args: ['  abc  '] }] },
  { function: 'words', ours: (s: string) => (core.words as any)(s), lodashFn: _.words, cases: [{ name: '기본', args: ['fred, barney, & pebbles'] }] },
  { function: 'once', ours: (fn: () => number) => (core.once as any)(fn), lodashFn: _.once, cases: [{ name: '기본', args: [() => 1] }] },
  { function: 'chain', ours: (a: number[]) => (core.chain as any)(a), lodashFn: _.chain, cases: [{ name: '기본', args: [[1, 2, 3]] }] },
  { function: 'defaultTo', ours: (v: unknown, d: number) => (core.defaultTo as any)(v, d), lodashFn: _.defaultTo, cases: [{ name: '값 있음', args: [1, 10] }, { name: 'null', args: [null, 10] }] },
  { function: 'noop', ours: () => (core.noop as any)(), lodashFn: () => _.noop(), cases: [{ name: '기본', args: [] }] },
  { function: 'times', ours: (n: number, fn: (i: number) => number) => (core.times as any)(n, fn), lodashFn: _.times, cases: [{ name: '기본', args: [3, (i: number) => i * 2] }] },
];

const allResultCases = [...resultCases, ...unimplementedCases];

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

  const benchmark: BenchmarkRow[] = [];
  const arr = Array.from({ length: 100 }, (_, i) => i);
  const speedResult = compareSpeedThree(
    () => (chunk as (a: number[], n: number) => unknown)(arr, 5),
    () => _.chunk(arr, 5),
    () => esChunk(arr, 5),
    iterations
  );
  benchmark.push({
    function: 'chunk',
    fastest: speedResult.fastest,
    oursOpsPerSec: speedResult.ours.opsPerSec,
    lodashOpsPerSec: speedResult.lodash.opsPerSec,
    esToolkitOpsPerSec: speedResult.esToolkit.opsPerSec,
    oursRatio: speedResult.ratios.ours,
    iterations,
  });

  return {
    timestamp: new Date().toISOString(),
    resultFailures,
    resultTotal,
    resultPassed,
    benchmark,
  };
}
