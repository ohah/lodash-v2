#!/usr/bin/env bun
/**
 * 결과 비교 스크립트 (ours / lodash / es-toolkit 동일 입력에 대한 결과)
 * 사용법: bun run compare (test 패키지에서) 또는 루트에서 bun run benchmark:compare
 */

import * as _ from 'lodash';
import { chunk as esChunk } from 'es-toolkit';
import { chunk } from '@lodash-v2/core';
import { runResultTestThree } from './result';

const chunkCases = [
  { name: 'chunk([1,2,3,4], 2)', args: [[1, 2, 3, 4], 2] as const },
  { name: 'chunk([1,2,3,4,5], 3)', args: [[1, 2, 3, 4, 5], 3] as const },
];

const result = runResultTestThree(
  (arr: number[], size: number) => (chunk as (...args: unknown[]) => unknown)(arr, size),
  _.chunk,
  (arr: number[], size: number) => esChunk(arr, size),
  chunkCases
);

console.log('Result comparison (ours / lodash / es-toolkit), baseline: lodash');
console.log(`  Ours vs lodash: ${result.passedCount}/${result.total} passed`);
result.details.forEach((d) => {
  const oursOk = d.oursMatchLodash ? 'OK' : 'FAIL';
  const esOk = d.esToolkitMatchLodash ? 'OK' : 'FAIL';
  console.log(`  [ours ${oursOk}] [es-toolkit ${esOk}] ${d.name}`);
  if (!d.oursMatchLodash || !d.esToolkitMatchLodash) {
    console.log(`    expected (lodash): ${JSON.stringify(d.expected)}`);
    if (!d.oursMatchLodash) console.log(`    ours:       ${JSON.stringify(d.actual)}`);
    if (!d.esToolkitMatchLodash)
      console.log(`    es-toolkit: ${JSON.stringify(d.esToolkitResult)}`);
  }
});
