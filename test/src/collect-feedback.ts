/**
 * 벤치마크 및 결과 동등성 실패를 수집해 AI 셀프 피드백용 구조를 반환합니다.
 * generate-feedback-report.ts에서 사용합니다.
 */

import * as _ from 'lodash';
import { chunk, compact, map, filter, identity, sum, get, head, uniq } from '@lodash-v2/core';
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
    ],
  },
  {
    function: 'compact',
    ours: (a: unknown[]) => (compact as (a: unknown[]) => unknown)(a),
    lodashFn: _.compact,
    cases: [{ name: 'falsy 제거', args: [[0, 1, false, 2, '', 3, null, undefined, NaN]] }],
  },
  {
    function: 'map',
    ours: (a: number[], fn: (n: number) => number) =>
      (map as (a: number[], fn: (n: number) => number) => unknown)(a, fn),
    lodashFn: _.map,
    cases: [{ name: 'x2', args: [[1, 2, 3], (x: number) => x * 2] }],
  },
  {
    function: 'filter',
    ours: (a: number[], fn: (n: number) => boolean) =>
      (filter as (a: number[], fn: (n: number) => boolean) => unknown)(a, fn),
    lodashFn: _.filter,
    cases: [{ name: '짝수', args: [[1, 2, 3, 4], (x: number) => x % 2 === 0] }],
  },
  {
    function: 'identity',
    ours: (x: number) => (identity as (x: number) => unknown)(x),
    lodashFn: _.identity,
    cases: [{ name: '숫자', args: [42] }],
  },
  {
    function: 'sum',
    ours: (a: number[]) => (sum as (a: number[]) => unknown)(a),
    lodashFn: _.sum,
    cases: [{ name: '기본', args: [[1, 2, 3, 4]] }],
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
    function: 'head',
    ours: (a: number[]) => (head as (a: number[]) => unknown)(a),
    lodashFn: _.head,
    cases: [{ name: '일반', args: [[1, 2, 3]] }],
  },
  {
    function: 'uniq',
    ours: (a: number[]) => (uniq as (a: number[]) => unknown)(a),
    lodashFn: _.uniq,
    cases: [{ name: '중복 제거', args: [[2, 1, 2, 3, 1]] }],
  },
];

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

  for (const { function: fnName, ours, lodashFn, cases } of resultCases) {
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
