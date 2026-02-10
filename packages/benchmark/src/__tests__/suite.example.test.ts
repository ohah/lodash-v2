/**
 * 예시: chunk 함수에 대한 결과 + 속도 벤치마크
 * 우리 구현이 비어 있으므로 결과 테스트는 실패하고, 스위트 구조만 검증합니다.
 */
import * as _ from "lodash";
import { chunk } from "@lodash-v2/core";
import { runBenchmarkSuite } from "../suite";
import { describe, expect, test } from "bun:test";

describe("runBenchmarkSuite (chunk 예시)", () => {
  test("스위트 실행 시 resultTest, speedTest 반환", () => {
    const result = runBenchmarkSuite({
      name: "chunk",
      ours: (arr: unknown[], size?: number) => chunk(arr as never, size as never) as unknown[],
      lodashFn: _.chunk,
      resultCases: [
        { name: "size 2", args: [[1, 2, 3, 4], 2] },
        { name: "size 3", args: [[1, 2, 3, 4, 5], 3] },
      ],
      speedArgs: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2],
      speedIterations: 1000,
    });

    expect(result.name).toBe("chunk");
    expect(result.resultTest).toBeDefined();
    expect(result.resultTest.total).toBe(2);
    expect(result.speedTest).toBeDefined();
    expect(result.speedTest.ours).toBeDefined();
    expect(result.speedTest.lodash).toBeDefined();
    expect(["ours", "lodash"]).toContain(result.speedTest.faster);
    // 우리 구현이 빈 함수이므로 결과 테스트는 실패할 수 있음
    expect(typeof result.resultTest.passed).toBe("boolean");
  });
});
