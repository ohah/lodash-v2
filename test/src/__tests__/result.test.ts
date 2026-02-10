import { describe, expect, test } from 'bun:test';
import { runResultTest } from '../result';

describe('runResultTest', () => {
  test('동일 결과면 passed true', () => {
    const add = (a: number, b: number) => a + b;
    const result = runResultTest(add, add, [
      { name: '1+2', args: [1, 2] },
      { name: '0+0', args: [0, 0] },
    ]);
    expect(result.passed).toBe(true);
    expect(result.passedCount).toBe(2);
    expect(result.failedCount).toBe(0);
  });

  test('다른 결과면 passed false 및 details 기록', () => {
    const bad = (_a: number, b: number) => b;
    const good = (a: number, b: number) => a + b;
    const result = runResultTest(bad, good, [{ name: '1+2', args: [1, 2] }]);
    expect(result.passed).toBe(false);
    expect(result.failedCount).toBe(1);
    expect(result.details[0].expected).toBe(3);
    expect(result.details[0].actual).toBe(2);
  });
});
