/**
 * 예시: chunk 함수에 대한 결과 + 속도 벤치마크 (ours / lodash / es-toolkit)
 */
import * as _ from 'lodash';
import { chunk as esChunk } from 'es-toolkit';
import { chunk } from '@lodash-v2/core';
import { runBenchmarkSuite } from '../suite';
import { describe, expect, test } from 'bun:test';

describe('runBenchmarkSuite (chunk 예시)', () => {
  test('스위트 실행 시 resultTest, speedTest 반환 (2-way)', () => {
    const result = runBenchmarkSuite({
      name: 'chunk',
      ours: (arr: unknown[], size?: number) => chunk(arr as never, size as never) as unknown[],
      lodashFn: _.chunk,
      resultCases: [
        { name: 'size 2', args: [[1, 2, 3, 4], 2] },
        { name: 'size 3', args: [[1, 2, 3, 4, 5], 3] },
      ],
      speedArgs: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2],
      speedIterations: 1000,
    });

    expect(result.name).toBe('chunk');
    expect(result.resultTest.total).toBe(2);
    expect(result.speedTest.ours).toBeDefined();
    expect(result.speedTest.lodash).toBeDefined();
    expect(['ours', 'lodash']).toContain(result.speedTest.faster);
    expect(typeof result.resultTest.passed).toBe('boolean');
  });

  test('esToolkitFn 있으면 3-way 비교 (ours / lodash / es-toolkit)', () => {
    const result = runBenchmarkSuite({
      name: 'chunk',
      ours: (arr: unknown[], size?: number) => chunk(arr as never, size as never) as unknown[],
      lodashFn: _.chunk,
      esToolkitFn: (arr: number[], size: number) => esChunk(arr, size),
      resultCases: [
        { name: 'size 2', args: [[1, 2, 3, 4], 2] as const },
        { name: 'size 3', args: [[1, 2, 3, 4, 5], 3] as const },
      ],
      speedArgs: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2] as const,
      speedIterations: 1000,
    });

    expect(result.speedTest.esToolkit).toBeDefined();
    expect(result.speedTest.ratios).toBeDefined();
    expect(['ours', 'lodash', 'es-toolkit']).toContain(result.speedTest.faster);
    const d0 = result.resultTest.details[0] as (typeof result.resultTest.details)[0] & {
      esToolkitMatchLodash?: boolean;
    };
    expect(typeof d0?.esToolkitMatchLodash).toBe('boolean');
  });
});
