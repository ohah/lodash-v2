/**
 * @lodash-v2/test
 * - 배포 환경과 동일하게 @lodash-v2/core를 의존성으로 사용하는 테스트·벤치마크 패키지
 * - 속도: runSpeedTest, compareSpeed, compareSpeedThree (ours / lodash / es-toolkit)
 * - 결과: runResultTest, runResultTestThree
 * - 스위트: runBenchmarkSuite (esToolkitFn 옵션으로 3-way 비교)
 */

export { runSpeedTest, compareSpeed, compareSpeedThree } from './speed';
export type { SpeedResult, CompareSpeedWinner } from './speed';

export { runResultTest, runResultTestThree } from './result';
export type { ResultCase, ResultTestResult, ResultTestThreeResult } from './result';

export { runBenchmarkSuite, runSpeedOnly } from './suite';
export type { BenchmarkSuiteOptions, BenchmarkSuiteResult } from './suite';
