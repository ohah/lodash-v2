# HEARTBEAT Handoff — 인수인계

## 현재 상태 요약

- **동등성 테스트**: 기존 체크리스트 46개 함수는 구현 완료·통과. 미구현 함수에 대한 동등성 테스트를 포함해 둔 상태(140 tests: 55 pass / 85 fail).
- **체크리스트**: `docs/LODASH_IMPLEMENTATION_CHECKLIST.md` — Phase 1 표에서 **[ ]인 함수**를 위에서부터 순서대로 구현하면 됨.
- **피드백**: `bun run generate-feedback` → `docs/feedback-report.md` 갱신.

---

## ⚠️ Phase 1 누락 작업 — 반드시 해야 할 일

**Phase 1에서 아직 구현되지 않은 함수들을 구현해야 합니다.**

- 체크리스트 상 **구현 여부가 [ ]로 남아 있는 함수들**을 `packages/core/src/*.ts`에 lodash 4.17.23과 동일하게 구현할 것.
- 순서: `docs/LODASH_IMPLEMENTATION_CHECKLIST.md` Phase 1 표에서 **[ ]인 항목 위에서부터** 한 함수씩 구현 → 해당 함수 동등성 테스트 통과 확인 → 표에서 `[ ]` → `[x]`로 갱신.
- 구현 후 검증: `bun run --filter=@lodash-v2/test test` 실행. 통과할 때까지 수정·재실행(HEARTBEAT.md의 3회 재시도 규칙 적용).
- Phase 1 “위 표의 구현 여부 전부 체크”가 끝나야 Phase 2(벤치마크·fastest=ours)로 진행.

요약: **Phase 1 누락된 함수 구현이 우선**이다. 하트비트/다음 턴에서 이걸 이어서 진행할 것.

---

## 다음 작업(우선순위)

1. **Phase 1 누락 구현**: 체크리스트에서 [ ]인 함수 하나씩 구현 → 동등성 테스트 통과 → [x] 갱신. (위 섹션 참고)
2. 동등성 전부 통과 후: `bun run benchmark`, `bun run generate-feedback`, 필요 시 커밋·푸시.
3. Phase 2: 함수별 벤치마크 점검(fastest=ours 여부).

---

## 참고 파일

- `docs/LODASH_IMPLEMENTATION_CHECKLIST.md` — Phase 1 체크리스트. [ ]인 항목 위에서부터 순서대로 구현.
- `docs/feedback-report.md` — 동등성·벤치마크 피드백
- `HEARTBEAT.md` — 매 턴 체크리스트, 재시도 규칙, 커밋 규칙
- `test/src/__tests__/result-equivalence.test.ts` — 동등성 테스트(미구현 함수 포함)
- `test/src/run.ts` — 벤치마크 실행(RUN_FN=이름으로 단일 실행 가능)

끝.