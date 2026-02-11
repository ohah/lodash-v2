#!/usr/bin/env bun
/**
 * 벤치마크 실행 (ours vs lodash, 필요 시 es-toolkit 3-way)
 *
 * 사용법:
 *   bun run benchmark           # 전체 실행
 *   RUN_FN=chunk bun run benchmark
 *   BENCH_ITERATIONS=10000 bun run benchmark
 */

import * as _ from 'lodash';
import {
  chunk,
  differenceBy,
  indexOf,
  intersection,
  nth,
  union,
  uniqBy,
  zip,
  zipObject,
  findLast,
  flatMap,
  orderBy,
  partition,
  reduceRight,
  reject,
  size,
  castArray,
  clone,
  eq,
  isEqual,
  isNil,
  isString,
  toNumber,
  add,
  maxBy,
  sumBy,
  random,
  assign,
  defaults,
  has,
  invert,
  merge,
  set,
  toPairs,
  capitalize,
  kebabCase,
  pad,
  repeat,
  snakeCase,
  toLower,
  trimEnd,
  words,
  once,
  now,
  defaultTo,
  noop,
  times,
  uniqueId,
} from '@lodash-v2/core';
import {
  chunk as esChunk,
  differenceBy as esDifferenceBy,
  intersection as esIntersection,
  flatMap as esFlatMap,
  orderBy as esOrderBy,
  partition as esPartition,
  union as esUnion,
  uniqBy as esUniqBy,
  zip as esZip,
  zipObject as esZipObject,
  clone as esClone,
  invert as esInvert,
  merge as esMerge,
  maxBy as esMaxBy,
  sumBy as esSumBy,
  random as esRandom,
  noop as esNoop,
  once as esOnce,
  capitalize as esCapitalize,
  kebabCase as esKebabCase,
  pad as esPad,
  snakeCase as esSnakeCase,
  trimEnd as esTrimEnd,
  words as esWords,
  isEqual as esIsEqual,
} from 'es-toolkit';
import { compareSpeed, compareSpeedThree } from './speed';

// --- config ---
const RUN_FN = process.env.RUN_FN ?? '';
const ITERATIONS = Number(process.env.BENCH_ITERATIONS ?? 50_000);

// --- runner ---
function runOne(
  name: string,
  ours: () => unknown,
  lodash: () => unknown,
  es?: () => unknown
): void {
  if (es !== undefined) {
    const r = compareSpeedThree(ours, lodash, es, ITERATIONS);
    console.log(`[${name}] (3-way)`);
    console.log(`  ours:       ${r.ours.opsPerSec.toFixed(0)} ops/sec (${r.ratios.ours.toFixed(2)}x)`);
    console.log(`  lodash:     ${r.lodash.opsPerSec.toFixed(0)} ops/sec (${r.ratios.lodash.toFixed(2)}x)`);
    console.log(`  es-toolkit: ${r.esToolkit.opsPerSec.toFixed(0)} ops/sec (${r.ratios.esToolkit.toFixed(2)}x)`);
    console.log(`  fastest: ${r.fastest}\n`);
  } else {
    const r = compareSpeed(ours, lodash, ITERATIONS);
    console.log(`[${name}] (2-way)`);
    console.log(`  ours:   ${r.ours.opsPerSec.toFixed(0)} ops/sec (${r.ratio.toFixed(2)}x)`);
    console.log(`  lodash: ${r.lodash.opsPerSec.toFixed(0)} ops/sec`);
    console.log(`  faster: ${r.faster}\n`);
  }
}

type Bench = {
  name: string;
  setup: () => { ours: () => unknown; lodash: () => unknown; es?: () => unknown };
};

// --- benchmarks ---
const BENCHMARKS: Bench[] = [
  {
    name: 'chunk',
    setup: () => {
      const arr = Array.from({ length: 100 }, (_, i) => i);
      return {
        ours: () => (chunk as (a: number[], n: number) => unknown)(arr, 5),
        lodash: () => _.chunk(arr, 5),
        es: () => esChunk(arr, 5),
      };
    },
  },
  {
    name: 'differenceBy',
    setup: () => {
      const a = [2.1, 1.2];
      const b = [2.3, 3.4];
      return {
        ours: () => (differenceBy as (a: number[], b: number[], fn: (n: number) => number) => unknown)(a, b, Math.floor),
        lodash: () => _.differenceBy(a, b, Math.floor),
        es: () => esDifferenceBy(a, b, Math.floor),
      };
    },
  },
  {
    name: 'indexOf',
    setup: () => {
      const arr = Array.from({ length: 50 }, (_, i) => i);
      return {
        ours: () => (indexOf as (a: number[], v: number) => unknown)(arr, 25),
        lodash: () => _.indexOf(arr, 25),
      };
    },
  },
  {
    name: 'intersection',
    setup: () => {
      const a = [2, 1, 3];
      const b = [2, 3, 4];
      return {
        ours: () => (intersection as (a: number[], b: number[]) => unknown)(a, b),
        lodash: () => _.intersection(a, b),
        es: () => esIntersection(a, b),
      };
    },
  },
  {
    name: 'nth',
    setup: () => {
      const arr = [1, 2, 3, 4, 5];
      return {
        ours: () => (nth as (a: number[], n: number) => unknown)(arr, 2),
        lodash: () => _.nth(arr, 2),
      };
    },
  },
  {
    name: 'union',
    setup: () => {
      const a = [2, 1];
      const b = [2, 3];
      return {
        ours: () => (union as (a: number[], b: number[]) => unknown)(a, b),
        lodash: () => _.union(a, b),
        es: () => esUnion(a, b),
      };
    },
  },
  {
    name: 'uniqBy',
    setup: () => {
      const arr = [2.1, 1.2, 2.3, 1.4];
      return {
        ours: () => (uniqBy as (a: number[], fn: (n: number) => number) => unknown)(arr, Math.floor),
        lodash: () => _.uniqBy(arr, Math.floor),
        es: () => esUniqBy(arr, Math.floor),
      };
    },
  },
  {
    name: 'zip',
    setup: () => {
      const a = [1, 2, 3];
      const b = [10, 20, 30];
      return {
        ours: () => (zip as (a: number[], b: number[]) => unknown)(a, b),
        lodash: () => _.zip(a, b),
        es: () => esZip(a, b),
      };
    },
  },
  {
    name: 'zipObject',
    setup: () => {
      const keys = ['a', 'b', 'c'];
      const vals = [1, 2, 3];
      return {
        ours: () => (zipObject as (k: string[], v: number[]) => unknown)(keys, vals),
        lodash: () => _.zipObject(keys, vals),
        es: () => esZipObject(keys, vals),
      };
    },
  },
  {
    name: 'findLast',
    setup: () => {
      const arr = [{ n: 1 }, { n: 2 }, { n: 2 }];
      return {
        ours: () => (findLast as (a: typeof arr, fn: (o: { n: number }) => boolean) => unknown)(arr, (o) => o.n === 2),
        lodash: () => _.findLast(arr, (o) => o.n === 2),
      };
    },
  },
  {
    name: 'flatMap',
    setup: () => {
      const arr = [1, 2, 3];
      return {
        ours: () => (flatMap as (a: number[], fn: (n: number) => number[]) => unknown)(arr, (n) => [n, n]),
        lodash: () => _.flatMap(arr, (n) => [n, n]),
        es: () => esFlatMap(arr, (n) => [n, n]),
      };
    },
  },
  {
    name: 'orderBy',
    setup: () => {
      const arr = [{ a: 1, b: 'x' }, { a: 2, b: 'y' }, { a: 0, b: 'z' }];
      return {
        ours: () => (orderBy as (a: typeof arr, keys: string[], orders: string[]) => unknown)(arr, ['a'], ['asc']),
        lodash: () => _.orderBy(arr, ['a'], ['asc']),
        es: () => esOrderBy(arr, ['a'], ['asc']),
      };
    },
  },
  {
    name: 'partition',
    setup: () => {
      const arr = [1, 2, 3, 4];
      return {
        ours: () => (partition as (a: number[], fn: (n: number) => boolean) => unknown)(arr, (n) => n % 2 === 0),
        lodash: () => _.partition(arr, (n) => n % 2 === 0),
        es: () => esPartition(arr, (n) => n % 2 === 0),
      };
    },
  },
  {
    name: 'reduceRight',
    setup: () => {
      const arr = ['a', 'b', 'c'];
      return {
        ours: () => (reduceRight as (a: string[], fn: (acc: string, s: string) => string, init: string) => unknown)(arr, (acc, s) => acc + s, ''),
        lodash: () => _.reduceRight(arr, (acc, s) => acc + s, ''),
      };
    },
  },
  {
    name: 'reject',
    setup: () => {
      const arr = [1, 2, 3, 4];
      return {
        ours: () => (reject as (a: number[], fn: (n: number) => boolean) => unknown)(arr, (n) => n % 2 === 0),
        lodash: () => _.reject(arr, (n) => n % 2 === 0),
      };
    },
  },
  {
    name: 'size',
    setup: () => {
      const arr = [1, 2, 3];
      return {
        ours: () => (size as (c: number[]) => unknown)(arr),
        lodash: () => _.size(arr),
      };
    },
  },
  {
    name: 'castArray',
    setup: () => ({
      ours: () => (castArray as (v: number) => unknown)(1),
      lodash: () => _.castArray(1),
    }),
  },
  {
    name: 'clone',
    setup: () => {
      const o = { a: 1, b: 2 };
      return {
        ours: () => (clone as (x: typeof o) => unknown)(o),
        lodash: () => _.clone(o),
        es: () => esClone(o),
      };
    },
  },
  {
    name: 'eq',
    setup: () => ({
      ours: () => (eq as (a: unknown, b: unknown) => unknown)(1, 1),
      lodash: () => _.eq(1, 1),
    }),
  },
  {
    name: 'isEqual',
    setup: () => ({
      ours: () => (isEqual as (a: unknown, b: unknown) => unknown)({ a: 1 }, { a: 1 }),
      lodash: () => _.isEqual({ a: 1 }, { a: 1 }),
      es: () => esIsEqual({ a: 1 }, { a: 1 }),
    }),
  },
  {
    name: 'isNil',
    setup: () => ({
      ours: () => (isNil as (v: unknown) => unknown)(null),
      lodash: () => _.isNil(null),
    }),
  },
  {
    name: 'isString',
    setup: () => ({
      ours: () => (isString as (v: unknown) => unknown)('x'),
      lodash: () => _.isString('x'),
    }),
  },
  {
    name: 'toNumber',
    setup: () => ({
      ours: () => (toNumber as (v: unknown) => unknown)('3.2'),
      lodash: () => _.toNumber('3.2'),
    }),
  },
  {
    name: 'add',
    setup: () => ({
      ours: () => (add as (a: number, b: number) => unknown)(6, 4),
      lodash: () => _.add(6, 4),
    }),
  },
  {
    name: 'maxBy',
    setup: () => {
      const arr = [{ n: 1 }, { n: 2 }, { n: 0 }];
      return {
        ours: () => (maxBy as (a: typeof arr, fn: (o: { n: number }) => number) => unknown)(arr, (o) => o.n),
        lodash: () => _.maxBy(arr, (o) => o.n),
        es: () => esMaxBy(arr, (o) => o.n),
      };
    },
  },
  {
    name: 'sumBy',
    setup: () => {
      const arr = [{ n: 1 }, { n: 2 }, { n: 3 }];
      return {
        ours: () => (sumBy as (a: typeof arr, fn: (o: { n: number }) => number) => unknown)(arr, (o) => o.n),
        lodash: () => _.sumBy(arr, (o) => o.n),
        es: () => esSumBy(arr, (o) => o.n),
      };
    },
  },
  {
    name: 'random',
    setup: () => ({
      ours: () => (random as (lo: number, hi: number) => unknown)(0, 5),
      lodash: () => _.random(0, 5),
      es: () => esRandom(0, 5),
    }),
  },
  {
    name: 'assign',
    setup: () => ({
      ours: () => (assign as (t: object, ...s: object[]) => unknown)({}, { a: 1 }, { b: 2 }),
      lodash: () => _.assign({}, { a: 1 }, { b: 2 }),
    }),
  },
  {
    name: 'defaults',
    setup: () => ({
      ours: () => (defaults as (o: object, ...s: object[]) => unknown)({}, { a: 1 }, { a: 2, b: 2 }),
      lodash: () => _.defaults({}, { a: 1 }, { a: 2, b: 2 }),
    }),
  },
  {
    name: 'has',
    setup: () => ({
      ours: () => (has as (o: object, path: string) => unknown)({ a: 1 }, 'a'),
      lodash: () => _.has({ a: 1 }, 'a'),
    }),
  },
  {
    name: 'invert',
    setup: () => ({
      ours: () => (invert as (o: Record<string, string>) => unknown)({ a: '1', b: '2' }),
      lodash: () => _.invert({ a: '1', b: '2' }),
      es: () => esInvert({ a: '1', b: '2' }),
    }),
  },
  {
    name: 'merge',
    setup: () => ({
      ours: () => (merge as (a: object, b: object) => unknown)({}, { a: 1 }, { b: 2 }),
      lodash: () => _.merge({}, { a: 1 }, { b: 2 }),
      es: () => esMerge({}, { a: 1 }, { b: 2 }),
    }),
  },
  {
    name: 'set',
    setup: () => ({
      ours: () => (set as (o: object, path: string, v: unknown) => unknown)({}, 'a.b.c', 3),
      lodash: () => _.set({}, 'a.b.c', 3),
    }),
  },
  {
    name: 'toPairs',
    setup: () => ({
      ours: () => (toPairs as (o: Record<string, number>) => unknown)({ a: 1, b: 2 }),
      lodash: () => _.toPairs({ a: 1, b: 2 }),
    }),
  },
  {
    name: 'capitalize',
    setup: () => ({
      ours: () => (capitalize as (s: string) => unknown)('FRED'),
      lodash: () => _.capitalize('FRED'),
      es: () => esCapitalize('FRED'),
    }),
  },
  {
    name: 'kebabCase',
    setup: () => ({
      ours: () => (kebabCase as (s: string) => unknown)('Foo Bar'),
      lodash: () => _.kebabCase('Foo Bar'),
      es: () => esKebabCase('Foo Bar'),
    }),
  },
  {
    name: 'pad',
    setup: () => ({
      ours: () => (pad as (s: string, len: number) => unknown)('abc', 8),
      lodash: () => _.pad('abc', 8),
      es: () => esPad('abc', 8),
    }),
  },
  {
    name: 'repeat',
    setup: () => ({
      ours: () => (repeat as (s: string, n: number) => unknown)('*', 3),
      lodash: () => _.repeat('*', 3),
    }),
  },
  {
    name: 'snakeCase',
    setup: () => ({
      ours: () => (snakeCase as (s: string) => unknown)('Foo Bar'),
      lodash: () => _.snakeCase('Foo Bar'),
      es: () => esSnakeCase('Foo Bar'),
    }),
  },
  {
    name: 'toLower',
    setup: () => ({
      ours: () => (toLower as (s: string) => unknown)('--Foo-Bar--'),
      lodash: () => _.toLower('--Foo-Bar--'),
    }),
  },
  {
    name: 'trimEnd',
    setup: () => ({
      ours: () => (trimEnd as (s: string) => unknown)('  abc  '),
      lodash: () => _.trimEnd('  abc  '),
      es: () => esTrimEnd('  abc  '),
    }),
  },
  {
    name: 'words',
    setup: () => ({
      ours: () => (words as (s: string) => unknown)('fred, barney, & pebbles'),
      lodash: () => _.words('fred, barney, & pebbles'),
      es: () => esWords('fred, barney, & pebbles'),
    }),
  },
  {
    name: 'once',
    setup: () => {
      const oursWrapped = (once as (fn: () => number) => (() => number) | undefined)(() => 1);
      let d = 0;
      const lodashOnce = _.once(() => ++d);
      const esOnceFn = esOnce(() => 1);
      return {
        ours: () => (typeof oursWrapped === 'function' ? oursWrapped() : undefined),
        lodash: () => lodashOnce(),
        es: () => esOnceFn(),
      };
    },
  },
  {
    name: 'now',
    setup: () => ({
      ours: () => (now as () => unknown)(),
      lodash: () => _.now(),
    }),
  },
  {
    name: 'defaultTo',
    setup: () => ({
      ours: () => (defaultTo as (v: unknown, d: number) => unknown)(null, 10),
      lodash: () => _.defaultTo(null, 10),
    }),
  },
  {
    name: 'noop',
    setup: () => ({
      ours: () => (noop as () => unknown)(),
      lodash: () => _.noop(),
      es: () => esNoop(),
    }),
  },
  {
    name: 'times',
    setup: () => ({
      ours: () => (times as (n: number, fn: (i: number) => number) => unknown)(3, (i) => i * 2),
      lodash: () => _.times(3, (i) => i * 2),
    }),
  },
  {
    name: 'uniqueId',
    setup: () => ({
      ours: () => (uniqueId as (prefix?: string) => unknown)('contact_'),
      lodash: () => _.uniqueId('contact_'),
    }),
  },
];

// --- main ---
const toRun = RUN_FN ? BENCHMARKS.filter((b) => b.name === RUN_FN) : BENCHMARKS;

if (toRun.length === 0) {
  console.error(`No benchmark for RUN_FN=${RUN_FN}. Available: ${BENCHMARKS.map((b) => b.name).join(', ')}`);
  process.exit(1);
}

console.log(`Iterations: ${ITERATIONS}\n`);
for (const bench of toRun) {
  const { ours, lodash, es } = bench.setup();
  runOne(bench.name, ours, lodash, es);
}
if (!RUN_FN) {
  console.log('Run with RUN_FN=<name> to run a single function.');
}
