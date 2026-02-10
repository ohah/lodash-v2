#!/usr/bin/env bun
/**
 * AI 셀프 피드백용 마크다운 보고서 생성
 * - 결과 동등성 실패 목록 (함수, 케이스, args, expected, actual)
 * - 벤치마크 요약 (함수별 ours / lodash / es-toolkit)
 * 출력: ../../docs/feedback-report.md (워크스페이스 루트 docs)
 */

import { collectFeedback } from '../src/collect-feedback';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const iterations = 50_000;
const data = collectFeedback(iterations);

const outDir = join(import.meta.dir, '../../docs');
const outPath = join(outDir, 'feedback-report.md');

function escapeTableCell(s: string): string {
  return s.replace(/\n/g, ' ').replace(/\|/g, '\\|');
}

const resultTableRows = data.resultFailures
  .map(
    (f) =>
      `| ${escapeTableCell(f.function)} | ${escapeTableCell(f.caseName)} | \`${escapeTableCell(f.args)}\` | \`${escapeTableCell(f.expected)}\` | \`${escapeTableCell(f.actual)}\` |`
  )
  .join('\n');

const benchmarkRows = data.benchmark
  .map(
    (b) =>
      `| ${b.function} | ${b.fastest} | ${Math.round(b.oursOpsPerSec).toLocaleString()} | ${Math.round(b.lodashOpsPerSec).toLocaleString()} | ${Math.round(b.esToolkitOpsPerSec).toLocaleString()} | ours ${b.oursRatio.toFixed(2)}x |`
  )
  .join('\n');

const md = `# 피드백 보고서 (AI 셀프 피드백용)

- **생성 시각**: ${data.timestamp}
- **기준**: lodash 4.17.23, es-toolkit 1.44

---

## 1. 결과 동등성 실패 요약

- **통과**: ${data.resultPassed} / ${data.resultTotal} 케이스
- **실패**: ${data.resultFailures.length} 케이스
- **의미**: \`actual (ours)\`가 \`expected (lodash)\`와 동일해야 합니다. 수정 시 \`packages/core/src/*.ts\` 해당 함수를 lodash 동작에 맞게 구현하세요.

### 실패 목록

| 함수 | 케이스 | args | expected (lodash) | actual (ours) |
|------|--------|------|-------------------|---------------|
${resultTableRows || '| (없음) | - | - | - | - |'}

---

## 2. 벤치마크 요약 (속도)

- **반복 횟수**: ${iterations} 회/함수
- **목표**: \`fastest\`가 \`ours\`가 되도록 구현을 최적화하세요. (현재 ours가 플레이스홀더면 당연히 빠르게 나옴)

### 함수별 결과

| 함수 | fastest | ours (ops/sec) | lodash (ops/sec) | es-toolkit (ops/sec) | 비고 |
|------|---------|----------------|------------------|----------------------|------|
${benchmarkRows}

---

## 3. 셀프 피드백 체크리스트

1. **결과 실패**: 위 표에서 \`actual\`을 \`expected\`와 같게 만드세요. (\`packages/core\` 수정)
2. **벤치마크**: \`fastest\`가 ours가 아니면 해당 함수의 반복/할당/알고리즘을 점검하세요.
3. **재검증**: 수정 후 \`bun test test/src/__tests__/result-equivalence.test.ts\`(또는 \`bun run --filter=@lodash-v2/test test\`), \`bun run benchmark\`, \`bun run generate-feedback\` 로 다시 확인하세요.

자세한 해석 방법은 \`docs/BENCHMARK_AND_RESULT_FEEDBACK.md\`를 참고하세요.
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, md, 'utf-8');
console.log(`Wrote ${outPath}`);
console.log(`  Result failures: ${data.resultFailures.length}`);
console.log(`  Benchmark rows: ${data.benchmark.length}`);
console.log("Run 'bun run generate-feedback' from repo root to regenerate.");
