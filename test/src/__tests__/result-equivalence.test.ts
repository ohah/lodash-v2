/**
 * 함수 실행 결과 동등성 테스트
 *
 * 우리 구현(@lodash-v2/core)이 lodash와 **동일한 입력에 대해 동일한 결과**를 내는지 검증합니다.
 * - 각 테스트: runResultTest(ours, lodashFn, cases) 후 assertResultPassed(result) — 실패 시 케이스별 expected/actual 출력
 * - 현재는 core가 플레이스홀더(() => {})이므로 **전부 실패**합니다.
 * - 구현을 채우면 lodash와 결과가 일치할 때 테스트가 통과합니다.
 */

import * as _ from 'lodash';
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
import { assertResultPassed, runResultTest } from '../result';
import { describe, expect, test } from 'bun:test';

describe('결과 동등성 (ours === lodash) — 구현 전까지 실패 예상', () => {
  describe('Array: chunk', () => {
    test('lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], b: number) => (chunk as unknown as (a: number[], b: number) => number[][])(a, b),
        _.chunk,
        [
          { name: 'size 2', args: [[1, 2, 3, 4], 2] },
          { name: 'size 3', args: [[1, 2, 3, 4, 5], 3] },
          { name: 'size 1', args: [[1, 2, 3], 1] },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Array: compact', () => {
    test('lodash와 동일한 결과', () => {
      const result = runResultTest((a: unknown[]) => compact(a) as unknown[], _.compact, [
        { name: 'falsy 제거', args: [[0, 1, false, 2, '', 3, null, undefined, NaN]] },
        { name: '빈 배열', args: [[]] },
      ]);
      assertResultPassed(result);
    });
  });

  describe('Array: concat', () => {
    test('lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: unknown[], ...b: unknown[]) => (concat as (...args: unknown[]) => unknown[])(a, ...b),
        _.concat,
        [
          { name: '배열 + 값', args: [[1], 2, [3], [[4]]] },
          { name: '빈 배열', args: [[], 1, 2] },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Array: difference', () => {
    test('lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], b: number[]) => (difference as unknown as (a: number[], b: number[]) => number[])(a, b),
        _.difference,
        [
          {
            name: '기본',
            args: [
              [2, 1],
              [2, 3],
            ],
          },
          { name: '중복 제외', args: [[1, 2, 2, 3], [2]] },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Array: drop / dropRight / take', () => {
    test('drop: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], n?: number) => (drop as unknown as (a: number[], n?: number) => number[])(a, n),
        _.drop,
        [
          { name: 'n=1', args: [[1, 2, 3]] },
          { name: 'n=2', args: [[1, 2, 3], 2] },
        ]
      );
      assertResultPassed(result);
    });
    test('dropRight: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], n?: number) => (dropRight as unknown as (a: number[], n?: number) => number[])(a, n),
        _.dropRight,
        [
          { name: 'n=1', args: [[1, 2, 3]] },
          { name: 'n=2', args: [[1, 2, 3], 2] },
        ]
      );
      assertResultPassed(result);
    });
    test('take: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], n?: number) => (take as unknown as (a: number[], n?: number) => number[])(a, n),
        _.take,
        [
          { name: 'n=2', args: [[1, 2, 3], 2] },
          { name: 'n=0', args: [[1, 2, 3], 0] },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Array: flatten / head / last / initial / tail', () => {
    test('flatten: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: unknown[]) => (flatten as unknown as (a: unknown[]) => unknown[])(a),
        _.flatten,
        [{ name: '1단계', args: [[1, [2, [3, [4]], 5]]] }]
      );
      assertResultPassed(result);
    });
    test('head: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[]) => (head as unknown as (a: number[]) => number | undefined)(a),
        _.head,
        [
          { name: '일반', args: [[1, 2, 3]] },
          { name: '빈 배열', args: [[]] },
        ]
      );
      assertResultPassed(result);
    });
    test('last: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[]) => (last as unknown as (a: number[]) => number | undefined)(a),
        _.last,
        [
          { name: '일반', args: [[1, 2, 3]] },
          { name: '빈 배열', args: [[]] },
        ]
      );
      assertResultPassed(result);
    });
    test('initial: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[]) => (initial as unknown as (a: number[]) => number[])(a),
        _.initial,
        [{ name: '일반', args: [[1, 2, 3]] }]
      );
      assertResultPassed(result);
    });
    test('tail: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[]) => (tail as unknown as (a: number[]) => number[])(a),
        _.tail,
        [{ name: '일반', args: [[1, 2, 3]] }]
      );
      assertResultPassed(result);
    });
  });

  describe('Array: uniq / without / fromPairs', () => {
    test('uniq: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[]) => (uniq as unknown as (a: number[]) => number[])(a),
        _.uniq,
        [
          { name: '중복 제거', args: [[2, 1, 2, 3, 1]] },
          { name: '빈 배열', args: [[]] },
        ]
      );
      assertResultPassed(result);
    });
    test('without: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], ...b: number[]) =>
          (without as unknown as (a: number[], ...b: number[]) => number[])(a, ...b),
        _.without,
        [{ name: '기본', args: [[2, 1, 2, 3], 1, 2] }]
      );
      assertResultPassed(result);
    });
    test('fromPairs: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: [string, number][]) =>
          (fromPairs as unknown as (a: [string, number][]) => Record<string, number>)(a),
        _.fromPairs,
        [
          {
            name: '기본',
            args: [
              [
                ['a', 1],
                ['b', 2],
              ],
            ],
          },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Collection: map / filter / reduce', () => {
    test('map: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], fn: (n: number) => number) =>
          (map as unknown as (a: number[], fn: (n: number) => number) => number[])(a, fn),
        _.map,
        [
          { name: 'x2', args: [[1, 2, 3], (x: number) => x * 2] },
          { name: '빈 배열', args: [[], (x: number) => x] },
        ]
      );
      assertResultPassed(result);
    });
    test('filter: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], fn: (n: number) => boolean) =>
          (filter as unknown as (a: number[], fn: (n: number) => boolean) => number[])(a, fn),
        _.filter,
        [
          { name: '짝수', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] },
          { name: '빈 배열', args: [[], (x: number) => x > 0] },
        ]
      );
      assertResultPassed(result);
    });
    test('reduce: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], fn: (acc: number, n: number) => number, init: number) =>
          (reduce as unknown as (a: number[], fn: (acc: number, n: number) => number, init: number) => number)(
            a,
            fn,
            init
          ),
        _.reduce,
        [
          { name: '합', args: [[1, 2, 3], (acc: number, n: number) => acc + n, 0] },
          { name: '빈 배열', args: [[], (acc: number, n: number) => acc + n, 10] },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Collection: find / keyBy / groupBy / sortBy / countBy', () => {
    test('find: lodash와 동일한 결과', () => {
      const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
      const result = runResultTest(
        (a: typeof arr, fn: (o: { a: number }) => boolean) =>
          (find as unknown as (a: typeof arr, fn: (o: { a: number }) => boolean) => { a: number } | undefined)(
            a,
            fn
          ),
        _.find,
        [{ name: 'a===2', args: [arr, (o: { a: number }) => o.a === 2] }]
      );
      assertResultPassed(result);
    });
    test('keyBy: lodash와 동일한 결과', () => {
      const arr = [
        { id: 'a', v: 1 },
        { id: 'b', v: 2 },
      ];
      const result = runResultTest(
        (a: typeof arr, key: string) =>
          (keyBy as unknown as (a: typeof arr, key: string) => Record<string, (typeof arr)[0]>)(a, key),
        _.keyBy,
        [{ name: 'id 기준', args: [arr, 'id'] }]
      );
      assertResultPassed(result);
    });
    test('groupBy: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], fn: (n: number) => string) =>
          (groupBy as unknown as (a: number[], fn: (n: number) => string) => Record<string, number[]>)(a, fn),
        _.groupBy,
        [{ name: '짝홀', args: [[1, 2, 3, 4], (n: number) => (n % 2 === 0 ? 'even' : 'odd')] }]
      );
      assertResultPassed(result);
    });
    test('sortBy: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], fn: (n: number) => number) =>
          (sortBy as unknown as (a: number[], fn: (n: number) => number) => number[])(a, fn),
        _.sortBy,
        [{ name: '음수로 역순', args: [[1, 2, 3], (n: number) => -n] }]
      );
      assertResultPassed(result);
    });
    test('countBy: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: string[], fn: (s: string) => string) =>
          (countBy as unknown as (a: string[], fn: (s: string) => string) => Record<string, number>)(a, fn),
        _.countBy,
        [{ name: '길이', args: [['a', 'bb', 'c'], (s: string) => s.length.toString()] }]
      );
      assertResultPassed(result);
    });
  });

  describe('Collection: every / some / includes', () => {
    test('every: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], fn: (n: number) => boolean) =>
          (every as unknown as (a: number[], fn: (n: number) => boolean) => boolean)(a, fn),
        _.every,
        [
          { name: '전부 참', args: [[2, 4, 6], (n: number) => n % 2 === 0] },
          { name: '하나 거짓', args: [[2, 3, 6], (n: number) => n % 2 === 0] },
        ]
      );
      assertResultPassed(result);
    });
    test('some: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], fn: (n: number) => boolean) =>
          (some as unknown as (a: number[], fn: (n: number) => boolean) => boolean)(a, fn),
        _.some,
        [
          { name: '하나 참', args: [[1, 3, 5], (n: number) => n % 2 === 0] },
          { name: '전부 거짓', args: [[1, 3, 5], (n: number) => n % 2 === 0] },
        ]
      );
      assertResultPassed(result);
    });
    test('includes: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], v: number) => (includes as unknown as (a: number[], v: number) => boolean)(a, v),
        _.includes,
        [
          { name: '있음', args: [[1, 2, 3], 2] },
          { name: '없음', args: [[1, 2, 3], 4] },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Lang: isArray / isNumber / isEmpty / toArray', () => {
    test('isArray: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: unknown) => (isArray as unknown as (a: unknown) => boolean)(a),
        _.isArray,
        [
          { name: '배열', args: [[]] },
          { name: '객체', args: [{}] },
          { name: 'null', args: [null] },
        ]
      );
      assertResultPassed(result);
    });
    test('isNumber: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: unknown) => (isNumber as unknown as (a: unknown) => boolean)(a),
        _.isNumber,
        [
          { name: '숫자', args: [1] },
          { name: '문자열', args: ['1'] },
          { name: 'NaN', args: [NaN] },
        ]
      );
      assertResultPassed(result);
    });
    test('isEmpty: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: unknown) => (isEmpty as unknown as (a: unknown) => boolean)(a),
        _.isEmpty,
        [
          { name: '빈 배열', args: [[]] },
          { name: '빈 객체', args: [{}] },
          { name: '요소 있음', args: [[1, 2]] },
        ]
      );
      assertResultPassed(result);
    });
    test('toArray: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: unknown) => (toArray as unknown as (a: unknown) => unknown[])(a),
        _.toArray,
        [
          { name: '객체', args: [{ a: 1, b: 2 }] },
          { name: '문자열', args: ['abc'] },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Lang: cloneDeep', () => {
    test('lodash와 동일한 결과', () => {
      const obj = { a: 1, b: { c: 2 } };
      const result = runResultTest(
        (a: typeof obj) => (cloneDeep as unknown as (a: typeof obj) => typeof obj)(a),
        _.cloneDeep,
        [{ name: '중첩 객체', args: [obj] }]
      );
      assertResultPassed(result);
    });
  });

  describe('Math: sum / max / min / mean', () => {
    test('sum: lodash와 동일한 결과', () => {
      const result = runResultTest((a: number[]) => (sum as unknown as (a: number[]) => number)(a), _.sum, [
        { name: '기본', args: [[1, 2, 3, 4]] },
        { name: '빈 배열', args: [[]] },
      ]);
      assertResultPassed(result);
    });
    test('max: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[]) => (max as unknown as (a: number[]) => number | undefined)(a),
        _.max,
        [
          { name: '기본', args: [[4, 2, 8, 6]] },
          { name: '빈 배열', args: [[]] },
        ]
      );
      assertResultPassed(result);
    });
    test('min: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[]) => (min as unknown as (a: number[]) => number | undefined)(a),
        _.min,
        [
          { name: '기본', args: [[4, 2, 8, 6]] },
          { name: '빈 배열', args: [[]] },
        ]
      );
      assertResultPassed(result);
    });
    test('mean: lodash와 동일한 결과', () => {
      const result = runResultTest((a: number[]) => (mean as unknown as (a: number[]) => number)(a), _.mean, [
        { name: '기본', args: [[4, 2, 8, 6]] },
        { name: '빈 배열', args: [[]] },
      ]);
      assertResultPassed(result);
    });
  });

  describe('Number: clamp / inRange', () => {
    test('clamp: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (n: number, lo: number, hi: number) =>
          (clamp as unknown as (n: number, lo: number, hi: number) => number)(n, lo, hi),
        _.clamp,
        [
          { name: '범위 내', args: [2, 0, 5] },
          { name: '범위 밑', args: [-1, 0, 5] },
          { name: '범위 위', args: [10, 0, 5] },
        ]
      );
      assertResultPassed(result);
    });
    test('inRange: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (n: number, start: number, end?: number) =>
          (inRange as unknown as (n: number, start: number, end?: number) => boolean)(n, start, end),
        _.inRange,
        [
          { name: '구간 내', args: [3, 0, 5] },
          { name: '구간 밖', args: [5, 0, 5] },
          { name: '2인자', args: [2, 5] },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Object: get / pick / omit / keys / values', () => {
    test('get: lodash와 동일한 결과', () => {
      const obj = { a: { b: { c: 3 } } };
      const result = runResultTest(
        (o: typeof obj, path: string, def?: unknown) =>
          (get as unknown as (o: typeof obj, path: string, def?: unknown) => unknown)(o, path, def),
        _.get,
        [
          { name: '중첩', args: [obj, 'a.b.c'] },
          { name: '기본값', args: [obj, 'a.x', 'default'] },
        ]
      );
      assertResultPassed(result);
    });
    test('pick: lodash와 동일한 결과', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = runResultTest(
        (o: typeof obj, keys: (keyof typeof obj)[]) =>
          (pick as unknown as (o: typeof obj, keys: (keyof typeof obj)[]) => Partial<typeof obj>)(o, keys),
        _.pick,
        [{ name: 'a,c', args: [obj, ['a', 'c']] }]
      );
      assertResultPassed(result);
    });
    test('omit: lodash와 동일한 결과', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = runResultTest(
        (o: typeof obj, keys: (keyof typeof obj)[]) =>
          (omit as unknown as (o: typeof obj, keys: (keyof typeof obj)[]) => Partial<typeof obj>)(o, keys),
        _.omit,
        [{ name: 'b 제외', args: [obj, ['b']] }]
      );
      assertResultPassed(result);
    });
    test('keys: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (o: Record<string, number>) => (keys as unknown as (o: Record<string, number>) => string[])(o),
        _.keys,
        [{ name: '기본', args: [{ a: 1, b: 2 }] }]
      );
      assertResultPassed(result);
    });
    test('values: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (o: Record<string, number>) => (values as unknown as (o: Record<string, number>) => number[])(o),
        _.values,
        [{ name: '기본', args: [{ a: 1, b: 2 }] }]
      );
      assertResultPassed(result);
    });
  });

  describe('String: camelCase / trim', () => {
    test('camelCase: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (s: string) => (camelCase as unknown as (s: string) => string)(s),
        _.camelCase,
        [
          { name: '공백', args: ['foo bar'] },
          { name: '하이픈', args: ['foo-bar'] },
        ]
      );
      assertResultPassed(result);
    });
    test('trim: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (s: string, chars?: string) => (trim as unknown as (s: string, chars?: string) => string)(s, chars),
        _.trim,
        [
          { name: '기본', args: ['  abc  '] },
          { name: 'chars', args: ['_-abc-_', '_-'] },
        ]
      );
      assertResultPassed(result);
    });
  });

  describe('Util: identity / range', () => {
    test('identity: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (x: number) => (identity as unknown as (x: number) => number)(x),
        _.identity,
        [
          { name: '숫자', args: [42] },
          { name: '0', args: [0] },
        ]
      );
      assertResultPassed(result);
    });
    test('range: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (start: number, end?: number, step?: number) =>
          (range as (start: number, end?: number, step?: number) => number[])(start, end, step),
        _.range,
        [
          { name: '0~3', args: [4] },
          { name: '1~4', args: [1, 5] },
          { name: 'step 2', args: [0, 6, 2] },
        ]
      );
      assertResultPassed(result);
    });
  });
});
