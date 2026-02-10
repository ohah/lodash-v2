#!/usr/bin/env bun
/**
 * 벤치마크 실행 스크립트 (ours / lodash / es-toolkit 3-way)
 * 사용법: bun run packages/benchmark/run.ts
 * 또는: bun run benchmark (루트에서)
 * RUN_FN=chunk bun run benchmark
 */

import * as _ from 'lodash';
import { chunk as esChunk } from 'es-toolkit';
import { chunk } from '@lodash-v2/core';
import { compareSpeedThree } from './speed';

const RUN_FN = process.env.RUN_FN ?? '';

function runOne(
  name: string,
  ours: () => unknown,
  lodashFn: () => unknown,
  esToolkitFn: () => unknown,
  iterations: number
) {
  const r = compareSpeedThree(ours, lodashFn, esToolkitFn, iterations);
  console.log(`[${name}]`);
  console.log(
    `  ours:      ${r.ours.totalMs.toFixed(2)}ms total, ${r.ours.opsPerSec.toFixed(0)} ops/sec (${r.ratios.ours.toFixed(2)}x)`
  );
  console.log(
    `  lodash:   ${r.lodash.totalMs.toFixed(2)}ms total, ${r.lodash.opsPerSec.toFixed(0)} ops/sec (${r.ratios.lodash.toFixed(2)}x)`
  );
  console.log(
    `  es-toolkit: ${r.esToolkit.totalMs.toFixed(2)}ms total, ${r.esToolkit.opsPerSec.toFixed(0)} ops/sec (${r.ratios.esToolkit.toFixed(2)}x)`
  );
  console.log(`  fastest: ${r.fastest}\n`);
}

const iterations = 50_000;

if (!RUN_FN || RUN_FN === 'chunk') {
  const arr = Array.from({ length: 100 }, (_, i) => i);
  runOne(
    'chunk',
    () => (chunk as (a: number[], n: number) => unknown)(arr, 5),
    () => _.chunk(arr, 5),
    () => esChunk(arr, 5),
    iterations
  );
}

console.log('Run with RUN_FN=<name> to run a single function.');
