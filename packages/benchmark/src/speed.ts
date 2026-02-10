/**
 * 속도(성능) 벤치마크 유틸
 * - 주어진 함수를 N회 실행하고 소요 시간을 측정합니다.
 */

export interface SpeedResult {
  /** 총 소요 시간 (ms) */
  totalMs: number;
  /** 1회당 평균 시간 (ms) */
  avgMs: number;
  /** 실행 횟수 */
  iterations: number;
  /** 초당 연산 수 (ops/sec) */
  opsPerSec: number;
}

/**
 * 단일 함수의 실행 속도를 측정합니다.
 * @param fn 측정할 함수 (인자 없이 호출되므로 클로저로 인자 바인딩)
 * @param iterations 실행 횟수 (기본 10_000)
 * @returns 속도 결과
 */
export function runSpeedTest(fn: () => unknown, iterations: number = 10_000): SpeedResult {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const totalMs = performance.now() - start;
  return {
    totalMs,
    avgMs: totalMs / iterations,
    iterations,
    opsPerSec: (iterations / totalMs) * 1000,
  };
}

export type CompareSpeedWinner = 'ours' | 'lodash' | 'es-toolkit';

/**
 * 두 함수(ours vs lodash)의 속도를 비교합니다.
 */
export function compareSpeed(
  ours: () => unknown,
  lodashFn: () => unknown,
  iterations: number = 10_000
): { ours: SpeedResult; lodash: SpeedResult; faster: CompareSpeedWinner; ratio: number } {
  const oursResult = runSpeedTest(ours, iterations);
  const lodashResult = runSpeedTest(lodashFn, iterations);
  const faster = oursResult.avgMs <= lodashResult.avgMs ? 'ours' : 'lodash';
  const ratio =
    faster === 'ours'
      ? lodashResult.avgMs / oursResult.avgMs
      : oursResult.avgMs / lodashResult.avgMs;
  return {
    ours: oursResult,
    lodash: lodashResult,
    faster,
    ratio,
  };
}

/**
 * 세 함수(ours vs lodash vs es-toolkit)의 속도를 비교합니다.
 */
export function compareSpeedThree(
  ours: () => unknown,
  lodashFn: () => unknown,
  esToolkitFn: () => unknown,
  iterations: number = 10_000
): {
  ours: SpeedResult;
  lodash: SpeedResult;
  esToolkit: SpeedResult;
  fastest: CompareSpeedWinner;
  /** fastest 대비 나머지 비율 (1이면 동일, >1이면 fastest가 그만큼 빠름) */
  ratios: { ours: number; lodash: number; esToolkit: number };
} {
  const o = runSpeedTest(ours, iterations);
  const l = runSpeedTest(lodashFn, iterations);
  const e = runSpeedTest(esToolkitFn, iterations);
  const minAvg = Math.min(o.avgMs, l.avgMs, e.avgMs);
  const fastest: CompareSpeedWinner =
    minAvg === o.avgMs ? 'ours' : minAvg === l.avgMs ? 'lodash' : 'es-toolkit';
  return {
    ours: o,
    lodash: l,
    esToolkit: e,
    fastest,
    ratios: {
      ours: o.avgMs / minAvg,
      lodash: l.avgMs / minAvg,
      esToolkit: e.avgMs / minAvg,
    },
  };
}
