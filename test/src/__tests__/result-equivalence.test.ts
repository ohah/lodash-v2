/**
 * 함수 실행 결과 동등성 테스트
 *
 * 우리 구현(@lodash-v2/core)이 lodash와 **동일한 입력에 대해 동일한 결과**를 내는지 검증합니다.
 * - 각 테스트: runResultTest(ours, lodashFn, cases) 후 expect(result.passed).toBe(true)
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
import * as core from '@lodash-v2/core';
import { runResultTest } from '../result';
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
      expect(result.passed).toBe(true);
    });
  });

  describe('Array: compact', () => {
    test('lodash와 동일한 결과', () => {
      const result = runResultTest((a: unknown[]) => compact(a) as unknown[], _.compact, [
        { name: 'falsy 제거', args: [[0, 1, false, 2, '', 3, null, undefined, NaN]] },
        { name: '빈 배열', args: [[]] },
      ]);
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
    });
  });

  describe('Array: flatten / head / last / initial / tail', () => {
    test('flatten: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: unknown[]) => (flatten as unknown as (a: unknown[]) => unknown[])(a),
        _.flatten,
        [{ name: '1단계', args: [[1, [2, [3, [4]], 5]]] }]
      );
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
    });
    test('initial: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[]) => (initial as unknown as (a: number[]) => number[])(a),
        _.initial,
        [{ name: '일반', args: [[1, 2, 3]] }]
      );
      expect(result.passed).toBe(true);
    });
    test('tail: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[]) => (tail as unknown as (a: number[]) => number[])(a),
        _.tail,
        [{ name: '일반', args: [[1, 2, 3]] }]
      );
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
    });
    test('without: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], ...b: number[]) =>
          (without as unknown as (a: number[], ...b: number[]) => number[])(a, ...b),
        _.without,
        [{ name: '기본', args: [[2, 1, 2, 3], 1, 2] }]
      );
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
    });
    test('groupBy: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], fn: (n: number) => string) =>
          (groupBy as unknown as (a: number[], fn: (n: number) => string) => Record<string, number[]>)(a, fn),
        _.groupBy,
        [{ name: '짝홀', args: [[1, 2, 3, 4], (n: number) => (n % 2 === 0 ? 'even' : 'odd')] }]
      );
      expect(result.passed).toBe(true);
    });
    test('sortBy: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: number[], fn: (n: number) => number) =>
          (sortBy as unknown as (a: number[], fn: (n: number) => number) => number[])(a, fn),
        _.sortBy,
        [{ name: '음수로 역순', args: [[1, 2, 3], (n: number) => -n] }]
      );
      expect(result.passed).toBe(true);
    });
    test('countBy: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (a: string[], fn: (s: string) => string) =>
          (countBy as unknown as (a: string[], fn: (s: string) => string) => Record<string, number>)(a, fn),
        _.countBy,
        [{ name: '길이', args: [['a', 'bb', 'c'], (s: string) => s.length.toString()] }]
      );
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
    });
  });

  describe('Math: sum / max / min / mean', () => {
    test('sum: lodash와 동일한 결과', () => {
      const result = runResultTest((a: number[]) => (sum as unknown as (a: number[]) => number)(a), _.sum, [
        { name: '기본', args: [[1, 2, 3, 4]] },
        { name: '빈 배열', args: [[]] },
      ]);
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
    });
    test('mean: lodash와 동일한 결과', () => {
      const result = runResultTest((a: number[]) => (mean as unknown as (a: number[]) => number)(a), _.mean, [
        { name: '기본', args: [[4, 2, 8, 6]] },
        { name: '빈 배열', args: [[]] },
      ]);
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
    });
    test('pick: lodash와 동일한 결과', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = runResultTest(
        (o: typeof obj, keys: (keyof typeof obj)[]) =>
          (pick as unknown as (o: typeof obj, keys: (keyof typeof obj)[]) => Partial<typeof obj>)(o, keys),
        _.pick,
        [{ name: 'a,c', args: [obj, ['a', 'c']] }]
      );
      expect(result.passed).toBe(true);
    });
    test('omit: lodash와 동일한 결과', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = runResultTest(
        (o: typeof obj, keys: (keyof typeof obj)[]) =>
          (omit as unknown as (o: typeof obj, keys: (keyof typeof obj)[]) => Partial<typeof obj>)(o, keys),
        _.omit,
        [{ name: 'b 제외', args: [obj, ['b']] }]
      );
      expect(result.passed).toBe(true);
    });
    test('keys: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (o: Record<string, number>) => (keys as unknown as (o: Record<string, number>) => string[])(o),
        _.keys,
        [{ name: '기본', args: [{ a: 1, b: 2 }] }]
      );
      expect(result.passed).toBe(true);
    });
    test('values: lodash와 동일한 결과', () => {
      const result = runResultTest(
        (o: Record<string, number>) => (values as unknown as (o: Record<string, number>) => number[])(o),
        _.values,
        [{ name: '기본', args: [{ a: 1, b: 2 }] }]
      );
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
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
      expect(result.passed).toBe(true);
    });
  });

  describe('Phase 1 미구현 함수 (동등성 — 구현 시 통과 예상)', () => {
    describe('Array', () => {
      test('differenceBy', () => {
        const result = runResultTest(
          (a: number[], b: number[], fn?: (x: number) => number) =>
            (core.differenceBy as unknown as (a: number[], b: number[], fn?: (x: number) => number) => number[])(a, b, fn),
          _.differenceBy,
          [{ name: '기본', args: [[2.1, 1.2], [2.3, 3.4], Math.floor] }]
        );
        expect(result.passed).toBe(true);
      });
      test('differenceWith', () => {
        const result = runResultTest(
          (a: number[], b: number[], fn: (x: number, y: number) => boolean) =>
            (core.differenceWith as unknown as (a: number[], b: number[], fn: (x: number, y: number) => boolean) => number[])(a, b, fn),
          _.differenceWith,
          [{ name: '기본', args: [[1, 2], [2, 3], (a, b) => a === b] }]
        );
        expect(result.passed).toBe(true);
      });
      test('dropRightWhile', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) =>
            (core.dropRightWhile as unknown as (a: number[], fn: (x: number) => boolean) => number[])(a, fn),
          _.dropRightWhile,
          [{ name: '기본', args: [[1, 2, 3, 4], (n: number) => n > 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('dropWhile', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) =>
            (core.dropWhile as unknown as (a: number[], fn: (x: number) => boolean) => number[])(a, fn),
          _.dropWhile,
          [{ name: '기본', args: [[1, 2, 3, 4], (n: number) => n < 3] }]
        );
        expect(result.passed).toBe(true);
      });
      test('fill', () => {
        const result = runResultTest(
          (a: unknown[], v: unknown, s?: number, e?: number) =>
            (core.fill as unknown as (a: unknown[], v: unknown, s?: number, e?: number) => unknown[])([...a], v, s, e),
          (arr: unknown[], v: unknown, s?: number, e?: number) => _.fill([...arr], v, s, e),
          [{ name: '기본', args: [[1, 2, 3], 'a'] }]
        );
        expect(result.passed).toBe(true);
      });
      test('findIndex', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) =>
            (core.findIndex as unknown as (a: number[], fn: (x: number) => boolean) => number)(a, fn),
          _.findIndex,
          [{ name: '기본', args: [[1, 2, 3], (x: number) => x === 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('findLastIndex', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) =>
            (core.findLastIndex as unknown as (a: number[], fn: (x: number) => boolean) => number)(a, fn),
          _.findLastIndex,
          [{ name: '기본', args: [[1, 2, 2, 3], (x: number) => x === 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('flattenDeep', () => {
        const result = runResultTest(
          (a: unknown[]) => (core.flattenDeep as unknown as (a: unknown[]) => unknown[])(a),
          _.flattenDeep,
          [{ name: '기본', args: [[[1, [2, [3, [4]]]]]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('flattenDepth', () => {
        const result = runResultTest(
          (a: unknown[], d: number) => (core.flattenDepth as unknown as (a: unknown[], d: number) => unknown[])(a, d),
          _.flattenDepth,
          [{ name: 'depth 2', args: [[[1, [2, [3, [4]]]]], 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('indexOf', () => {
        const result = runResultTest(
          (a: number[], v: number, from?: number) => (core.indexOf as unknown as (a: number[], v: number, from?: number) => number)(a, v, from),
          _.indexOf,
          [{ name: '기본', args: [[1, 2, 1, 2], 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('intersection', () => {
        const result = runResultTest(
          (a: number[], b: number[]) => (core.intersection as unknown as (a: number[], b: number[]) => number[])(a, b),
          _.intersection,
          [{ name: '기본', args: [[2, 1], [2, 3]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('intersectionBy', () => {
        const result = runResultTest(
          (a: number[], b: number[], fn?: (x: number) => number) =>
            (core.intersectionBy as unknown as (a: number[], b: number[], fn?: (x: number) => number) => number[])(a, b, fn),
          _.intersectionBy,
          [{ name: '기본', args: [[2.1, 1.2], [2.3, 3.4], Math.floor] }]
        );
        expect(result.passed).toBe(true);
      });
      test('intersectionWith', () => {
        const result = runResultTest(
          (a: number[], b: number[], fn: (x: number, y: number) => boolean) =>
            (core.intersectionWith as unknown as (a: number[], b: number[], fn: (x: number, y: number) => boolean) => number[])(a, b, fn),
          _.intersectionWith,
          [{ name: '기본', args: [[1, 2], [2, 3], (a, b) => a === b] }]
        );
        expect(result.passed).toBe(true);
      });
      test('join', () => {
        const result = runResultTest(
          (a: string[], sep?: string) => (core.join as unknown as (a: string[], sep?: string) => string)(a, sep),
          _.join,
          [{ name: '기본', args: [['a', 'b', 'c'], '~'] }]
        );
        expect(result.passed).toBe(true);
      });
      test('lastIndexOf', () => {
        const result = runResultTest(
          (a: number[], v: number, from?: number) => (core.lastIndexOf as unknown as (a: number[], v: number, from?: number) => number)(a, v, from),
          _.lastIndexOf,
          [{ name: '기본', args: [[1, 2, 1, 2], 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('nth', () => {
        const result = runResultTest(
          (a: number[], n: number) => (core.nth as unknown as (a: number[], n: number) => number | undefined)(a, n),
          _.nth,
          [{ name: '기본', args: [[1, 2, 3], 1] }]
        );
        expect(result.passed).toBe(true);
      });
      test('pull', () => {
        const result = runResultTest(
          (a: number[], ...v: number[]) => (core.pull as unknown as (a: number[], ...v: number[]) => number[])([...a], ...v),
          (arr: number[], ...v: number[]) => _.pull([...arr], ...v),
          [{ name: '기본', args: [[1, 2, 3, 1, 2], 2, 1] }]
        );
        expect(result.passed).toBe(true);
      });
      test('pullAll', () => {
        const result = runResultTest(
          (a: number[], v: number[]) => (core.pullAll as unknown as (a: number[], v: number[]) => number[])([...a], v),
          (arr: number[], v: number[]) => _.pullAll([...arr], v),
          [{ name: '기본', args: [[1, 2, 3, 1, 2], [2, 1]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('pullAt', () => {
        const result = runResultTest(
          (a: number[], i: number[]) => (core.pullAt as unknown as (a: number[], i: number[]) => number[])([...a], i),
          (arr: number[], i: number[]) => _.pullAt([...arr], i),
          [{ name: '기본', args: [[1, 2, 3, 4], [1, 3]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('remove', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) => (core.remove as unknown as (a: number[], fn: (x: number) => boolean) => number[])([...a], fn),
          (arr: number[], fn: (x: number) => boolean) => _.remove([...arr], fn),
          [{ name: '기본', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] }]
        );
        expect(result.passed).toBe(true);
      });
      test('reverse', () => {
        const result = runResultTest(
          (a: number[]) => (core.reverse as unknown as (a: number[]) => number[])([...a]),
          (arr: number[]) => _.reverse([...arr]),
          [{ name: '기본', args: [[1, 2, 3]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('slice', () => {
        const result = runResultTest(
          (a: number[], s?: number, e?: number) => (core.slice as unknown as (a: number[], s?: number, e?: number) => number[])(a, s, e),
          _.slice,
          [{ name: '기본', args: [[1, 2, 3, 4], 1, 3] }]
        );
        expect(result.passed).toBe(true);
      });
      test('sortedIndex', () => {
        const result = runResultTest(
          (a: number[], v: number) => (core.sortedIndex as unknown as (a: number[], v: number) => number)(a, v),
          _.sortedIndex,
          [{ name: '기본', args: [[30, 50], 40] }]
        );
        expect(result.passed).toBe(true);
      });
      test('sortedIndexBy', () => {
        const result = runResultTest(
          (a: { age: number }[], v: number, fn: (x: { age: number }) => number) =>
            (core.sortedIndexBy as unknown as (a: { age: number }[], v: number, fn: (x: { age: number }) => number) => number)(a, v, fn),
          _.sortedIndexBy,
          [{ name: '기본', args: [[{ age: 30 }, { age: 50 }], 40, (o) => o.age] }]
        );
        expect(result.passed).toBe(true);
      });
      test('takeRight', () => {
        const result = runResultTest(
          (a: number[], n?: number) => (core.takeRight as unknown as (a: number[], n?: number) => number[])(a, n),
          _.takeRight,
          [{ name: '기본', args: [[1, 2, 3], 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('takeRightWhile', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) =>
            (core.takeRightWhile as unknown as (a: number[], fn: (x: number) => boolean) => number[])(a, fn),
          _.takeRightWhile,
          [{ name: '기본', args: [[1, 2, 3, 4], (n: number) => n > 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('takeWhile', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) =>
            (core.takeWhile as unknown as (a: number[], fn: (x: number) => boolean) => number[])(a, fn),
          _.takeWhile,
          [{ name: '기본', args: [[1, 2, 3, 4], (n: number) => n < 3] }]
        );
        expect(result.passed).toBe(true);
      });
      test('union', () => {
        const result = runResultTest(
          (a: number[], b: number[]) => (core.union as unknown as (a: number[], b: number[]) => number[])(a, b),
          _.union,
          [{ name: '기본', args: [[2], [1, 2]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('unionBy', () => {
        const result = runResultTest(
          (a: number[], b: number[], fn?: (x: number) => number) =>
            (core.unionBy as unknown as (a: number[], b: number[], fn?: (x: number) => number) => number[])(a, b, fn),
          _.unionBy,
          [{ name: '기본', args: [[2.1], [1.2, 2.3], Math.floor] }]
        );
        expect(result.passed).toBe(true);
      });
      test('uniqBy', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => number) => (core.uniqBy as unknown as (a: number[], fn: (x: number) => number) => number[])(a, fn),
          _.uniqBy,
          [{ name: '기본', args: [[2.1, 1.2, 2.3], Math.floor] }]
        );
        expect(result.passed).toBe(true);
      });
      test('unzip', () => {
        const result = runResultTest(
          (a: (number | string)[][]) => (core.unzip as unknown as (a: (number | string)[][]) => (number | string)[][])(a),
          _.unzip,
          [{ name: '기본', args: [[[1, 'a'], [2, 'b']]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('xor', () => {
        const result = runResultTest(
          (a: number[], b: number[]) => (core.xor as unknown as (a: number[], b: number[]) => number[])(a, b),
          _.xor,
          [{ name: '기본', args: [[2, 1], [2, 3]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('zip', () => {
        const result = runResultTest(
          (...a: number[][]) => (core.zip as unknown as (...a: number[][]) => (number | undefined)[][])(...a),
          _.zip,
          [{ name: '기본', args: [[1, 2], [10, 20], [100, 200]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('zipObject', () => {
        const result = runResultTest(
          (a: string[], b: number[]) => (core.zipObject as unknown as (a: string[], b: number[]) => Record<string, number>)(a, b),
          _.zipObject,
          [{ name: '기본', args: [['a', 'b'], [1, 2]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('zipWith', () => {
        const result = runResultTest(
          (a: number[], b: number[], fn: (a: number, b: number) => number) =>
            (core.zipWith as unknown as (a: number[], b: number[], fn: (a: number, b: number) => number) => number[])(a, b, fn),
          _.zipWith,
          [{ name: '기본', args: [[1, 2], [10, 20], (a, b) => a + b] }]
        );
        expect(result.passed).toBe(true);
      });
    });

    describe('Collection', () => {
      test('findLast', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) =>
            (core.findLast as unknown as (a: number[], fn: (x: number) => boolean) => number | undefined)(a, fn),
          _.findLast,
          [{ name: '기본', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] }]
        );
        expect(result.passed).toBe(true);
      });
      test('flatMap', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => number[]) =>
            (core.flatMap as unknown as (a: number[], fn: (x: number) => number[]) => number[])(a, fn),
          _.flatMap,
          [{ name: '기본', args: [[1, 2], (n: number) => [n, n]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('flatMapDeep', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => unknown) =>
            (core.flatMapDeep as unknown as (a: number[], fn: (x: number) => unknown) => unknown[])(a, fn),
          _.flatMapDeep,
          [{ name: '기본', args: [[1, 2], (n: number) => [[[n, n]]]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('flatMapDepth', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => unknown, d: number) =>
            (core.flatMapDepth as unknown as (a: number[], fn: (x: number) => unknown, d: number) => unknown[])(a, fn, d),
          _.flatMapDepth,
          [{ name: '기본', args: [[1, 2], (n: number) => [[[n, n]]], 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('forEach', () => {
        const result = runResultTest(
          (a: number[]) => (core.forEach as unknown as (a: number[], fn: (x: number) => void) => number[])(a, () => {}),
          (a: number[]) => _.forEach(a, () => {}),
          [{ name: '기본', args: [[1, 2, 3]] }]
        );
        expect(result.passed).toBe(true);
      });
      test('orderBy', () => {
        const result = runResultTest(
          (a: { a: string; b: number }[], keys: (string | ((x: { a: string; b: number }) => number))[], orders?: ('asc' | 'desc')[]) =>
            (core.orderBy as unknown as (a: { a: string; b: number }[], keys: (string | ((x: { a: string; b: number }) => number))[], orders?: ('asc' | 'desc')[]) => { a: string; b: number }[])(a, keys, orders),
          _.orderBy,
          [{ name: '기본', args: [[{ a: 'b', b: 2 }, { a: 'a', b: 1 }], ['a'], ['asc']] }]
        );
        expect(result.passed).toBe(true);
      });
      test('partition', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) =>
            (core.partition as unknown as (a: number[], fn: (x: number) => boolean) => [number[], number[]])(a, fn),
          _.partition,
          [{ name: '기본', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] }]
        );
        expect(result.passed).toBe(true);
      });
      test('reduceRight', () => {
        const result = runResultTest(
          (a: number[], fn: (acc: number, x: number) => number, init: number) =>
            (core.reduceRight as unknown as (a: number[], fn: (acc: number, x: number) => number, init: number) => number)(a, fn, init),
          _.reduceRight,
          [{ name: '기본', args: [[1, 2, 3], (acc: number, x: number) => acc + x, 0] }]
        );
        expect(result.passed).toBe(true);
      });
      test('reject', () => {
        const result = runResultTest(
          (a: number[], fn: (x: number) => boolean) =>
            (core.reject as unknown as (a: number[], fn: (x: number) => boolean) => number[])(a, fn),
          _.reject,
          [{ name: '기본', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] }]
        );
        expect(result.passed).toBe(true);
      });
      test('size', () => {
        const result = runResultTest(
          (c: number[] | Record<string, number>) => (core.size as unknown as (c: number[] | Record<string, number>) => number)(c),
          _.size,
          [
            { name: '배열', args: [[1, 2, 3]] },
            { name: '객체', args: [{ a: 1, b: 2 }] },
          ]
        );
        expect(result.passed).toBe(true);
      });
      test('sample', () => {
        const arr = [1, 2, 3];
        const o = (core.sample as unknown as (a: number[]) => number)(arr);
        expect(arr).toContain(o);
      });
      test('sampleSize', () => {
        const arr = [1, 2, 3];
        const o = (core.sampleSize as unknown as (a: number[], n: number) => number[])(arr, 2);
        expect(o.length).toBe(2);
        o.forEach((x) => expect(arr).toContain(x));
      });
      test('shuffle', () => {
        const arr = [1, 2, 3];
        const o = (core.shuffle as unknown as (a: number[]) => number[])([...arr]);
        expect(o.sort()).toEqual(arr.sort());
      });
    });

    describe('Lang', () => {
      test('castArray', () => {
        const result = runResultTest(
          (v: number) => (core.castArray as unknown as (v: number) => number[])(v),
          _.castArray,
          [{ name: '숫자', args: [1] }]
        );
        expect(result.passed).toBe(true);
      });
      test('clone', () => {
        const result = runResultTest(
          (v: { a: number }) => (core.clone as unknown as (v: { a: number }) => { a: number })(v),
          _.clone,
          [{ name: '객체', args: [{ a: 1 }] }]
        );
        expect(result.passed).toBe(true);
      });
      test('eq', () => {
        const result = runResultTest(
          (a: number, b: number) => (core.eq as unknown as (a: number, b: number) => boolean)(a, b),
          _.eq,
          [
            { name: '같음', args: [1, 1] },
            { name: '다름', args: [1, 2] },
          ]
        );
        expect(result.passed).toBe(true);
      });
      test('isEqual', () => {
        const result = runResultTest(
          (a: unknown, b: unknown) => (core.isEqual as unknown as (a: unknown, b: unknown) => boolean)(a, b),
          _.isEqual,
          [{ name: '객체', args: [{ a: 1 }, { a: 1 }] }]
        );
        expect(result.passed).toBe(true);
      });
      test('isNil', () => {
        const result = runResultTest(
          (v: unknown) => (core.isNil as unknown as (v: unknown) => boolean)(v),
          _.isNil,
          [
            { name: 'null', args: [null] },
            { name: 'undefined', args: [undefined] },
            { name: '값', args: [1] },
          ]
        );
        expect(result.passed).toBe(true);
      });
      test('isString', () => {
        const result = runResultTest(
          (v: unknown) => (core.isString as unknown as (v: unknown) => boolean)(v),
          _.isString,
          [
            { name: '문자열', args: ['a'] },
            { name: '숫자', args: [1] },
          ]
        );
        expect(result.passed).toBe(true);
      });
      test('toNumber', () => {
        const result = runResultTest(
          (v: string) => (core.toNumber as unknown as (v: string) => number)(v),
          _.toNumber,
          [{ name: '기본', args: ['3.2'] }]
        );
        expect(result.passed).toBe(true);
      });
      test('gt, gte, lt, lte', () => {
        expect(runResultTest((a: number, b: number) => (core.gt as unknown as (a: number, b: number) => boolean)(a, b), _.gt, [{ name: 'gt', args: [3, 1] }]).passed).toBe(true);
        expect(runResultTest((a: number, b: number) => (core.gte as unknown as (a: number, b: number) => boolean)(a, b), _.gte, [{ name: 'gte', args: [1, 1] }]).passed).toBe(true);
        expect(runResultTest((a: number, b: number) => (core.lt as unknown as (a: number, b: number) => boolean)(a, b), _.lt, [{ name: 'lt', args: [1, 3] }]).passed).toBe(true);
        expect(runResultTest((a: number, b: number) => (core.lte as unknown as (a: number, b: number) => boolean)(a, b), _.lte, [{ name: 'lte', args: [1, 1] }]).passed).toBe(true);
      });
      test('isBoolean', () => {
        const result = runResultTest(
          (v: unknown) => (core.isBoolean as unknown as (v: unknown) => boolean)(v),
          _.isBoolean,
          [{ name: 'true', args: [true] }, { name: '숫자', args: [1] }]
        );
        expect(result.passed).toBe(true);
      });
      test('isDate', () => {
        const result = runResultTest(
          (v: unknown) => (core.isDate as unknown as (v: unknown) => boolean)(v),
          _.isDate,
          [{ name: 'Date', args: [new Date()] }, { name: '숫자', args: [1] }]
        );
        expect(result.passed).toBe(true);
      });
      test('toInteger', () => {
        const result = runResultTest(
          (v: string) => (core.toInteger as unknown as (v: string) => number)(v),
          _.toInteger,
          [{ name: '기본', args: ['3.2'] }]
        );
        expect(result.passed).toBe(true);
      });
    });

    describe('Math', () => {
      test('add', () => {
        const result = runResultTest(
          (a: number, b: number) => (core.add as unknown as (a: number, b: number) => number)(a, b),
          _.add,
          [{ name: '기본', args: [6, 4] }]
        );
        expect(result.passed).toBe(true);
      });
      test('ceil, floor, round', () => {
        expect(runResultTest((n: number, p?: number) => (core.ceil as unknown as (n: number, p?: number) => number)(n, p), _.ceil, [{ name: 'ceil', args: [4.006, 2] }]).passed).toBe(true);
        expect(runResultTest((n: number, p?: number) => (core.floor as unknown as (n: number, p?: number) => number)(n, p), _.floor, [{ name: 'floor', args: [4.006, 2] }]).passed).toBe(true);
        expect(runResultTest((n: number, p?: number) => (core.round as unknown as (n: number, p?: number) => number)(n, p), _.round, [{ name: 'round', args: [4.006, 2] }]).passed).toBe(true);
      });
      test('divide, multiply, subtract', () => {
        expect(runResultTest((a: number, b: number) => (core.divide as unknown as (a: number, b: number) => number)(a, b), _.divide, [{ name: 'divide', args: [6, 4] }]).passed).toBe(true);
        expect(runResultTest((a: number, b: number) => (core.multiply as unknown as (a: number, b: number) => number)(a, b), _.multiply, [{ name: 'multiply', args: [6, 4] }]).passed).toBe(true);
        expect(runResultTest((a: number, b: number) => (core.subtract as unknown as (a: number, b: number) => number)(a, b), _.subtract, [{ name: 'subtract', args: [6, 4] }]).passed).toBe(true);
      });
      test('maxBy, meanBy, minBy, sumBy', () => {
        const arr = [{ n: 1 }, { n: 2 }, { n: 3 }];
        expect(runResultTest((a: { n: number }[], fn: (x: { n: number }) => number) => (core.maxBy as unknown as (a: { n: number }[], fn: (x: { n: number }) => number) => { n: number })(a, fn), _.maxBy, [{ name: 'maxBy', args: [arr, (x) => x.n] }]).passed).toBe(true);
        expect(runResultTest((a: { n: number }[], fn: (x: { n: number }) => number) => (core.meanBy as unknown as (a: { n: number }[], fn: (x: { n: number }) => number) => number)(a, fn), _.meanBy, [{ name: 'meanBy', args: [arr, (x) => x.n] }]).passed).toBe(true);
        expect(runResultTest((a: { n: number }[], fn: (x: { n: number }) => number) => (core.minBy as unknown as (a: { n: number }[], fn: (x: { n: number }) => number) => { n: number })(a, fn), _.minBy, [{ name: 'minBy', args: [arr, (x) => x.n] }]).passed).toBe(true);
        expect(runResultTest((a: { n: number }[], fn: (x: { n: number }) => number) => (core.sumBy as unknown as (a: { n: number }[], fn: (x: { n: number }) => number) => number)(a, fn), _.sumBy, [{ name: 'sumBy', args: [arr, (x) => x.n] }]).passed).toBe(true);
      });
    });

    describe('Number', () => {
      test('random', () => {
        const o = (core.random as unknown as (a?: number, b?: number) => number)(0, 5);
        expect(typeof o).toBe('number');
        expect(o >= 0 && o <= 5).toBe(true);
      });
    });

    describe('Object', () => {
      test('assign', () => {
        const result = runResultTest(
          (a: Record<string, number>, b: Record<string, number>) => (core.assign as any)({}, a, b),
          (a: Record<string, number>, b: Record<string, number>) => (_.assign as any)({}, a, b),
          [{ name: '기본', args: [{ a: 1 }, { b: 2 }] }]
        );
        expect(result.passed).toBe(true);
      });
      test('defaults', () => {
        const result = runResultTest(
          (a: Record<string, number>, b: Record<string, number>) => (core.defaults as any)({}, a, b),
          (a: Record<string, number>, b: Record<string, number>) => (_.defaults as any)({}, a, b),
          [{ name: '기본', args: [{ a: 1 }, { a: 2, b: 2 }] }]
        );
        expect(result.passed).toBe(true);
      });
      test('has', () => {
        const result = runResultTest(
          (o: Record<string, number>, path: string) => (core.has as unknown as (o: Record<string, number>, path: string) => boolean)(o, path),
          _.has,
          [{ name: '기본', args: [{ a: 1 }, 'a'] }]
        );
        expect(result.passed).toBe(true);
      });
      test('invert', () => {
        const result = runResultTest(
          (o: Record<string, string>) => (core.invert as unknown as (o: Record<string, string>) => Record<string, string>)(o),
          _.invert,
          [{ name: '기본', args: [{ a: '1', b: '2' }] }]
        );
        expect(result.passed).toBe(true);
      });
      test('merge', () => {
        const result = runResultTest(
          (a: Record<string, unknown>, b: Record<string, unknown>) => (core.merge as any)({}, a, b),
          (a: Record<string, unknown>, b: Record<string, unknown>) => (_.merge as any)({}, a, b),
          [{ name: '기본', args: [{ a: 1 }, { b: 2 }] }]
        );
        expect(result.passed).toBe(true);
      });
      test('set', () => {
        const result = runResultTest(
          (o: Record<string, unknown>, path: string, v: unknown) => (core.set as unknown as (o: Record<string, unknown>, path: string, v: unknown) => Record<string, unknown>)({ ...o }, path, v),
          (o: Record<string, unknown>, path: string, v: unknown) => _.set({ ...o }, path, v) as Record<string, unknown>,
          [{ name: '기본', args: [{}, 'a.b', 1] }]
        );
        expect(result.passed).toBe(true);
      });
      test('toPairs', () => {
        const result = runResultTest(
          (o: Record<string, number>) => (core.toPairs as unknown as (o: Record<string, number>) => [string, number][])(o),
          _.toPairs,
          [{ name: '기본', args: [{ a: 1, b: 2 }] }]
        );
        expect(result.passed).toBe(true);
      });
    });

    describe('String', () => {
      test('capitalize', () => {
        const result = runResultTest(
          (s: string) => (core.capitalize as unknown as (s: string) => string)(s),
          _.capitalize,
          [{ name: '기본', args: ['FRED'] }]
        );
        expect(result.passed).toBe(true);
      });
      test('kebabCase', () => {
        const result = runResultTest(
          (s: string) => (core.kebabCase as unknown as (s: string) => string)(s),
          _.kebabCase,
          [{ name: '기본', args: ['Foo Bar'] }]
        );
        expect(result.passed).toBe(true);
      });
      test('pad', () => {
        const result = runResultTest(
          (s: string, n: number, chars?: string) => (core.pad as unknown as (s: string, n: number, chars?: string) => string)(s, n, chars),
          _.pad,
          [{ name: '기본', args: ['abc', 8] }]
        );
        expect(result.passed).toBe(true);
      });
      test('repeat', () => {
        const result = runResultTest(
          (s: string, n: number) => (core.repeat as unknown as (s: string, n: number) => string)(s, n),
          _.repeat,
          [{ name: '기본', args: ['*', 3] }]
        );
        expect(result.passed).toBe(true);
      });
      test('snakeCase', () => {
        const result = runResultTest(
          (s: string) => (core.snakeCase as unknown as (s: string) => string)(s),
          _.snakeCase,
          [{ name: '기본', args: ['Foo Bar'] }]
        );
        expect(result.passed).toBe(true);
      });
      test('toLower, toUpper', () => {
        expect(runResultTest((s: string) => (core.toLower as unknown as (s: string) => string)(s), _.toLower, [{ name: 'toLower', args: ['--Foo-Bar--'] }]).passed).toBe(true);
        expect(runResultTest((s: string) => (core.toUpper as unknown as (s: string) => string)(s), _.toUpper, [{ name: 'toUpper', args: ['--foo-bar--'] }]).passed).toBe(true);
      });
      test('trimEnd', () => {
        const result = runResultTest(
          (s: string, chars?: string) => (core.trimEnd as unknown as (s: string, chars?: string) => string)(s, chars),
          _.trimEnd,
          [{ name: '기본', args: ['  abc  '] }]
        );
        expect(result.passed).toBe(true);
      });
      test('words', () => {
        const result = runResultTest(
          (s: string) => (core.words as unknown as (s: string) => string[])(s),
          _.words,
          [{ name: '기본', args: ['fred, barney, & pebbles'] }]
        );
        expect(result.passed).toBe(true);
      });
    });

    describe('Function', () => {
      test('once', () => {
        const result = runResultTest(
          (fn: () => number) => (core.once as unknown as (fn: () => number) => () => number)(fn),
          _.once,
          [{ name: '기본', args: [() => 1] }]
        );
        expect(result.passed).toBe(true);
      });
    });

    describe('Date', () => {
      test('now', () => {
        const o = (core.now as unknown as () => number)();
        expect(typeof o).toBe('number');
        expect(o).toBeGreaterThanOrEqual(0);
      });
    });

    describe('Seq', () => {
      test('chain', () => {
        const result = runResultTest(
          (a: number[]) => (core.chain as unknown as (a: number[]) => unknown)(a),
          _.chain,
          [{ name: '기본', args: [[1, 2, 3]] }]
        );
        expect(result.passed).toBe(true);
      });
    });

    describe('Util', () => {
      test('defaultTo', () => {
        const result = runResultTest(
          (v: unknown, d: number) => (core.defaultTo as unknown as (v: unknown, d: number) => unknown)(v, d),
          _.defaultTo,
          [
            { name: '값 있음', args: [1, 10] },
            { name: 'null', args: [null, 10] },
          ]
        );
        expect(result.passed).toBe(true);
      });
      test('noop', () => {
        expect((core.noop as unknown as () => undefined)()).toBe(undefined);
      });
      test('times', () => {
        const result = runResultTest(
          (n: number, fn: (i: number) => number) => (core.times as unknown as (n: number, fn: (i: number) => number) => number[])(n, fn),
          _.times,
          [{ name: '기본', args: [3, (i: number) => i * 2] }]
        );
        expect(result.passed).toBe(true);
      });
      test('uniqueId', () => {
        const a = (core.uniqueId as unknown as (prefix?: string) => string)();
        const b = (core.uniqueId as unknown as (prefix?: string) => string)('id-');
        expect(typeof a).toBe('string');
        expect(b.startsWith('id-')).toBe(true);
      });
    });
  });
});
