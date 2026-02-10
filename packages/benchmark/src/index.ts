/**
 * @lodash-v2/benchmark
 * - 속도 테스트: runSpeedTest, compareSpeed
 * - 결과 테스트: runResultTest (ours vs lodash 동일 결과 검증)
 * - 스위트: runBenchmarkSuite (결과 + 속도 한 번에)
 */

export { runSpeedTest, compareSpeed } from "./speed";
export type { SpeedResult } from "./speed";

export { runResultTest } from "./result";
export type { ResultCase, ResultTestResult } from "./result";

export { runBenchmarkSuite, runSpeedOnly } from "./suite";
export type { BenchmarkSuiteOptions, BenchmarkSuiteResult } from "./suite";
