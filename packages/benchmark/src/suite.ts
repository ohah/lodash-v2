/**
 * 벤치마크 스위트: 속도 + 결과 테스트를 한 번에 실행하는 헬퍼
 */

import type { ResultCase } from './result';
import { runResultTest, runResultTestThree } from './result';
import { compareSpeed, compareSpeedThree, runSpeedTest } from './speed';
import type { CompareSpeedWinner } from './speed';

export interface BenchmarkSuiteOptions<TArgs extends unknown[], TResult> {
  name: string;
  ours: (...args: TArgs) => TResult;
  lodashFn: (...args: TArgs) => TResult;
  /** 있으면 3-way(ours / lodash / es-toolkit) 비교 */
  esToolkitFn?: (...args: TArgs) => TResult;
  resultCases: Array<ResultCase<TArgs, TResult>>;
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
      esToolkitResult?: TResult;
      oursMatchLodash?: boolean;
      esToolkitMatchLodash?: boolean;
    }>;
  };
  speedTest: {
    ours: { totalMs: number; avgMs: number; iterations: number; opsPerSec: number };
    lodash: { totalMs: number; avgMs: number; iterations: number; opsPerSec: number };
    esToolkit?: { totalMs: number; avgMs: number; iterations: number; opsPerSec: number };
    faster: CompareSpeedWinner;
    ratio: number;
    ratios?: { ours: number; lodash: number; esToolkit: number };
  };
}

/**
 * 한 함수에 대해 결과 테스트 + 속도 비교를 실행합니다.
 * esToolkitFn이 있으면 ours / lodash / es-toolkit 3-way 비교.
 */
export function runBenchmarkSuite<TArgs extends unknown[], TResult>(
  options: BenchmarkSuiteOptions<TArgs, TResult>
): BenchmarkSuiteResult<TResult> {
  const {
    name,
    ours,
    lodashFn,
    esToolkitFn,
    resultCases,
    speedArgs,
    speedIterations = 10_000,
  } = options;

  const hasEsToolkit = typeof esToolkitFn === 'function';
  const resultTest = hasEsToolkit
    ? runResultTestThree(ours, lodashFn, esToolkitFn, resultCases)
    : runResultTest(ours, lodashFn, resultCases);

  const oursSpeed = () => ours(...speedArgs);
  const lodashSpeed = () => lodashFn(...speedArgs);
  const speedCompare = hasEsToolkit
    ? compareSpeedThree(oursSpeed, lodashSpeed, () => esToolkitFn!(...speedArgs), speedIterations)
    : compareSpeed(oursSpeed, lodashSpeed, speedIterations);

  return {
    name,
    resultTest: {
      passed: resultTest.passed,
      total: resultTest.total,
      passedCount: resultTest.passedCount,
      failedCount: resultTest.failedCount,
      details: resultTest.details.map((d) => ({
        ...d,
        ...(hasEsToolkit && 'esToolkitResult' in d
          ? {
              esToolkitResult: (d as { esToolkitResult: TResult }).esToolkitResult,
              oursMatchLodash: (d as { oursMatchLodash: boolean }).oursMatchLodash,
              esToolkitMatchLodash: (d as { esToolkitMatchLodash: boolean }).esToolkitMatchLodash,
            }
          : {}),
      })),
    },
    speedTest: {
      ours: speedCompare.ours,
      lodash: speedCompare.lodash,
      ...(hasEsToolkit && 'esToolkit' in speedCompare
        ? { esToolkit: speedCompare.esToolkit, ratios: speedCompare.ratios }
        : {}),
      faster: (hasEsToolkit && 'fastest' in speedCompare
        ? speedCompare.fastest
        : speedCompare.faster) as CompareSpeedWinner,
      ratio: (() => {
        const minAvg =
          hasEsToolkit && 'esToolkit' in speedCompare
            ? Math.min(
                speedCompare.ours.avgMs,
                speedCompare.lodash.avgMs,
                speedCompare.esToolkit!.avgMs
              )
            : Math.min(speedCompare.ours.avgMs, speedCompare.lodash.avgMs);
        return speedCompare.ours.avgMs / minAvg;
      })(),
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
