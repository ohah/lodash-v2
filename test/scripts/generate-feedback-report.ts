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

## 2. 다음 직접 작업 (AI가 할 일)

**목표**: 위 실패 목록의 각 행을 하나씩 해소합니다. \`actual\`이 \`expected\`와 같아지도록 해당 함수를 구현·수정하세요.

| 단계 | 할 일 |
|------|--------|
| 1 | 실패 목록에서 **함수명** 확인 (예: \`differenceBy\`, \`fill\`) |
| 2 | \`packages/core/src/\` 아래 해당 파일 열기 (array → array.ts, Lang → lang.ts, Math → math.ts, Number → number.ts, Object → object.ts, String → string.ts, Collection → collection.ts, Function → function.ts, Util → util.ts, Seq → seq.ts, Date → date.ts) |
| 3 | 해당 함수가 플레이스홀더(\`() => {}\`)면 **lodash와 동일한 시그니처·반환값**으로 구현. 이미 구현돼 있으면 \`expected\`와 다르게 나온 **로직**만 수정 |
| 4 | 구현 시 **위 표의 \`args\`·\`expected\`**를 그대로 넣어 호출했을 때 같은 값이 나오는지 확인 |
| 5 | 저장 후 \`bun run --filter=@lodash-v2/test test\` 실행 → 해당 함수 테스트 통과 확인 |
| 6 | (선택) \`bun run generate-feedback\` 재실행 → 실패 개수 감소 확인. 0이 될 때까지 1~5 반복 |

**우선순위**: 실패 목록 **맨 위** 함수부터 순서대로 처리하면 됩니다. 한 번에 한 함수만 수정해도 됩니다.

---

## 3. 셀프 피드백 체크리스트

1. **결과 실패**: 위 표에서 \`actual\`을 \`expected\`와 같게 만드세요. (\`packages/core\` 수정)
2. **재검증**: 수정 후 \`bun run --filter=@lodash-v2/test test\`, \`bun run generate-feedback\` 로 다시 확인하세요.

자세한 해석 방법은 \`docs/RESULT_FEEDBACK.md\`를 참고하세요.
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, md, 'utf-8');
console.log(`Wrote ${outPath}`);
console.log(`  Result failures: ${data.resultFailures.length}`);
console.log("Run 'bun run generate-feedback' from repo root to regenerate.");
