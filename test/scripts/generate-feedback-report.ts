#!/usr/bin/env bun
/**
 * AI 셀프 피드백용 마크다운 보고서 생성
 * - 결과 동등성 실패 목록 (함수, 케이스, args, expected, actual)
 * 출력: ../../docs/feedback-report.md (워크스페이스 루트 docs)
 */

import { collectFeedback } from '../src/collect-feedback';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const iterations = 50_000;
const data = collectFeedback(iterations);

const outDir = join(import.meta.dir, '../../docs');
const outPath = join(outDir, 'feedback-report.md');

function escapeTableCell(s: string | undefined): string {
  if (s == null) return '';
  return String(s).replace(/\n/g, ' ').replace(/\|/g, '\\|');
}

const resultTableRows = data.resultFailures
  .map(
    (f) =>
      `| ${escapeTableCell(f.function)} | ${escapeTableCell(f.caseName)} | \`${escapeTableCell(f.args)}\` | \`${escapeTableCell(f.expected)}\` | \`${escapeTableCell(f.actual)}\` |`
  )
  .join('\n');

const md = `# 피드백 보고서 (AI 셀프 피드백용)

- **생성 시각**: ${data.timestamp}
- **기준**: lodash 4.17.23

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

## 2. 셀프 피드백 체크리스트

1. **결과 실패**: 위 표에서 \`actual\`을 \`expected\`와 같게 만드세요. (\`packages/core\` 수정)
2. **재검증**: 수정 후 \`bun run --filter=@lodash-v2/test test\`, \`bun run generate-feedback\` 로 다시 확인하세요.

자세한 해석 방법은 \`docs/BENCHMARK_AND_RESULT_FEEDBACK.md\`를 참고하세요.
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, md, 'utf-8');
console.log(`Wrote ${outPath}`);
console.log(`  Result failures: ${data.resultFailures.length}`);
console.log("Run 'bun run generate-feedback' from repo root to regenerate.");
