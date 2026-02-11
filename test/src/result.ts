/**
 * 결과(정확성) 테스트 유틸
 * - 우리 구현과 lodash 구현이 같은 입력에 대해 같은 결과를 내는지 검증합니다.
 */

export interface ResultCase<TArgs extends unknown[], TResult> {
  name: string;
  args: TArgs;
  /** 기대값 (lodash 결과). 생략 시 lodash 결과와 일치하는지만 검사 */
  expected?: TResult;
}

export interface ResultTestResult<TResult> {
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
}

/**
 * 단일 함수에 대해 우리 구현 vs lodash 결과가 같은지 테스트합니다.
 */
export function runResultTest<TArgs extends unknown[], TResult>(
  ours: (...args: TArgs) => TResult,
  lodashFn: (...args: TArgs) => TResult,
  cases: Array<ResultCase<TArgs, TResult>>
): ResultTestResult<TResult> {
  const details: ResultTestResult<TResult>['details'] = [];
  let passedCount = 0;

  for (const c of cases) {
    const expected = (c.expected ?? lodashFn(...c.args)) as TResult;
    let actual: TResult;
    try {
      actual = ours(...c.args);
    } catch {
      actual = undefined as TResult;
    }
    const passed = deepEqual(actual, expected);
    if (passed) passedCount++;
    details.push({
      name: c.name,
      passed,
      expected,
      actual,
      args: c.args,
    });
  }

  return {
    passed: passedCount === cases.length,
    total: cases.length,
    passedCount,
    failedCount: cases.length - passedCount,
    details,
  };
}

/** 실패한 케이스만 모아서 읽기 쉬운 문자열로 반환 (에러 메시지·로그용) */
export function formatFailureDetails(result: ResultTestResult<unknown>): string {
  if (result.passed) return '';
  const failed = result.details.filter((d) => !d.passed);
  return failed
    .map(
      (d) =>
        `  [${d.name}] args: ${JSON.stringify(d.args)}\n    expected: ${JSON.stringify(d.expected)}\n    actual:   ${JSON.stringify(d.actual)}`
    )
    .join('\n');
}

/** result.passed가 false면 실패 상세를 담은 Error를 던짐. 테스트에서 사용 시 실패 원인을 바로 확인 가능 */
export function assertResultPassed<T>(result: ResultTestResult<T>): asserts result is ResultTestResult<T> & { passed: true } {
  if (!result.passed) {
    const msg = `동등성 실패 (${result.failedCount}/${result.total}):\n${formatFailureDetails(result as ResultTestResult<unknown>)}`;
    throw new Error(msg);
  }
}

export interface ResultTestThreeResult<TResult> {
  passed: boolean;
  total: number;
  passedCount: number;
  failedCount: number;
  details: Array<{
    name: string;
    passed: boolean;
    expected: TResult;
    actual: TResult;
    esToolkitResult: TResult;
    oursMatchLodash: boolean;
    esToolkitMatchLodash: boolean;
    args: unknown[];
  }>;
}

/**
 * ours / lodash / es-toolkit 세 구현의 결과를 비교합니다.
 * 기준(expected)은 lodash 결과입니다.
 */
export function runResultTestThree<TArgs extends unknown[], TResult>(
  ours: (...args: TArgs) => TResult,
  lodashFn: (...args: TArgs) => TResult,
  esToolkitFn: (...args: TArgs) => TResult,
  cases: Array<ResultCase<TArgs, TResult>>
): ResultTestThreeResult<TResult> {
  const details: ResultTestThreeResult<TResult>['details'] = [];
  let passedCount = 0;

  for (const c of cases) {
    const expected = (c.expected ?? lodashFn(...c.args)) as TResult;
    let actual: TResult;
    let esToolkitResult: TResult;
    try {
      actual = ours(...c.args);
    } catch {
      actual = undefined as TResult;
    }
    try {
      esToolkitResult = esToolkitFn(...c.args);
    } catch {
      esToolkitResult = undefined as TResult;
    }
    const oursMatchLodash = deepEqual(actual, expected);
    const esToolkitMatchLodash = deepEqual(esToolkitResult, expected);
    const passed = oursMatchLodash;
    if (passed) passedCount++;
    details.push({
      name: c.name,
      passed: oursMatchLodash,
      expected,
      actual,
      esToolkitResult,
      oursMatchLodash,
      esToolkitMatchLodash,
      args: c.args,
    });
  }

  return {
    passed: passedCount === cases.length,
    total: cases.length,
    passedCount,
    failedCount: cases.length - passedCount,
    details,
  };
}

/** deep equal: NaN, ±0, Date, 객체 키 순서 무관 비교 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a === 'number' && typeof b === 'number' && Number.isNaN(a) && Number.isNaN(b)) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a as object).sort();
  const keysB = Object.keys(b as object).sort();
  if (keysA.length !== keysB.length || keysA.some((k, i) => k !== keysB[i])) return false;
  return keysA.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
}
