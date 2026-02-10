#!/usr/bin/env bun
/**
 * 결과 비교 스크립트 (ours vs lodash 동일 입력에 대한 결과)
 * 사용법: bun run packages/benchmark/compare.ts
 */

import * as _ from "lodash";
import { chunk } from "@lodash-v2/core";
import { runResultTest } from "./result";

// 예시: chunk
const chunkCases = [
  { name: "chunk([1,2,3,4], 2)", args: [[1, 2, 3, 4], 2] as const },
  { name: "chunk([1,2,3,4,5], 3)", args: [[1, 2, 3, 4, 5], 3] as const },
];

// 우리 구현이 플레이스홀더이므로 lodash와 다른 결과가 나옴 → 실패 예상
const result = runResultTest(
  (arr: number[], size: number) => (chunk as (...args: unknown[]) => unknown)(arr, size),
  _.chunk,
  chunkCases
);

console.log("Result comparison (ours vs lodash):");
console.log(`  Passed: ${result.passedCount}/${result.total}`);
result.details.forEach((d) => {
  console.log(`  [${d.passed ? "OK" : "FAIL"}] ${d.name}`);
  if (!d.passed) {
    console.log(`    expected: ${JSON.stringify(d.expected)}`);
    console.log(`    actual:   ${JSON.stringify(d.actual)}`);
  }
});
