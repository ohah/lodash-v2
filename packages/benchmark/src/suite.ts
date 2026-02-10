/**
 * 벤치마크 스위트: 속도 + 결과 테스트를 한 번에 실행하는 헬퍼
 */

import type { ResultCase } from "./result";
import { runResultTest } from "./result";
import { compareSpeed, runSpeedTest } from "./speed";

export interface BenchmarkSuiteOptions<TArgs extends unknown[], TResult> {
  name: string;
  ours: (...args: TArgs) => TResult;
  lodashFn: (...args: TArgs) => TResult;
  resultCases: Array<ResultCase<TArgs, TResult>>;
  /** 속도 테스트 시 사용할 인자 (고정 1개). 반드시 동일 결과를 내는 호출이어야 함 */
  speedArgs: TArgs;
  speedIterations?: number;
}

export interface BenchmarkSuiteResult<TResult> {
  name: string;
  resultTest: {
    passed: boolean;
    total: number;
    passedCount: number;
    failedCount: number;
    details: Array<{
      name: string;
      passed: boolean;
      expected: TResult;
      actual: TResult;
      args: unknown[];
    }>;
  };
  speedTest: {
    ours: { totalMs: number; avgMs: number; iterations: number; opsPerSec: number };
    lodash: { totalMs: number; avgMs: number; iterations: number; opsPerSec: number };
    faster: "ours" | "lodash";
    ratio: number;
  };
}

/**
 * 한 함수에 대해 결과 테스트 + 속도 비교를 실행합니다.
 */
export function runBenchmarkSuite<TArgs extends unknown[], TResult>(
  options: BenchmarkSuiteOptions<TArgs, TResult>
): BenchmarkSuiteResult<TResult> {
  const {
    name,
    ours,
    lodashFn,
    resultCases,
    speedArgs,
    speedIterations = 10_000,
  } = options;

  const resultTest = runResultTest(ours, lodashFn, resultCases);

  const oursSpeed = () => ours(...speedArgs);
  const lodashSpeed = () => lodashFn(...speedArgs);
  const speedCompare = compareSpeed(oursSpeed, lodashSpeed, speedIterations);

  return {
    name,
    resultTest: {
      passed: resultTest.passed,
      total: resultTest.total,
      passedCount: resultTest.passedCount,
      failedCount: resultTest.failedCount,
      details: resultTest.details,
    },
    speedTest: {
      ours: speedCompare.ours,
      lodash: speedCompare.lodash,
      faster: speedCompare.faster,
      ratio: speedCompare.ratio,
    },
  };
}

/**
 * 속도만 측정 (우리 구현 단일)
 */
export function runSpeedOnly<TArgs extends unknown[]>(
  fn: (...args: TArgs) => unknown,
  args: TArgs,
  iterations: number = 10_000
) {
  return runSpeedTest(() => fn(...args), iterations);
}
