#!/usr/bin/env bun
/**
 * 벤치마크 실행 스크립트
 * 사용법: bun run packages/benchmark/run.ts
 * 또는: bun run benchmark (루트에서)
 *
 * 특정 함수만 측정하려면 RUN_FN 환경변수 사용 예: RUN_FN=chunk bun run benchmark
 */

import * as _ from "lodash";
import { chunk } from "@lodash-v2/core";
import { runSpeedTest } from "./speed";

const RUN_FN = process.env.RUN_FN ?? "";

function runOne(name: string, ours: () => unknown, lodashFn: () => unknown, iterations: number) {
  const o = runSpeedTest(ours, iterations);
  const l = runSpeedTest(lodashFn, iterations);
  const faster = o.avgMs <= l.avgMs ? "ours" : "lodash";
  const ratio = faster === "ours" ? l.avgMs / o.avgMs : o.avgMs / l.avgMs;
  console.log(`[${name}]`);
  console.log(`  ours:  ${o.totalMs.toFixed(2)}ms total, ${o.opsPerSec.toFixed(0)} ops/sec`);
  console.log(`  lodash: ${l.totalMs.toFixed(2)}ms total, ${l.opsPerSec.toFixed(0)} ops/sec`);
  console.log(`  faster: ${faster} (${ratio.toFixed(2)}x)\n`);
}

const iterations = 50_000;

// 예시: chunk
if (!RUN_FN || RUN_FN === "chunk") {
  const arr = Array.from({ length: 100 }, (_, i) => i);
  runOne(
    "chunk",
    () => (chunk as (a: number[], n: number) => unknown)(arr, 5),
    () => _.chunk(arr, 5),
    iterations
  );
}

console.log("Run with RUN_FN=<name> to run a single function.");
