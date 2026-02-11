# 결과 동등성 체크 — AI 셀프 피드백 가이드

이 문서는 **AI가 결과 동등성 테스트 실패를 해석하고, 스스로 수정 방향을 잡을 수 있도록** 작성된 마크다운 가이드입니다.

---

## 1. 개요

- **결과 동등성**: 같은 입력에 대해 **ours의 반환값이 lodash와 동일**해야 함. 실패 시 `expected`(lodash) vs `actual`(ours)를 비교해 수정.

---

## 2. 결과 동등성 테스트 실패 형식

### 2.1 실행 방법

```bash
bun run --filter=@lodash-v2/test test
```

실패 시 각 테스트별로 `expect(received).toBe(expected)` 형태로 나오며, `received === false`, `expected === true` 인 경우가 **결과가 lodash와 다르다**는 의미입니다.

### 2.2 구조화된 실패 정보 (runResultTest 반환값)

실패 시 다음 정보가 의미 있습니다.

- **함수명**: 어떤 core 함수가 실패했는지 (예: `chunk`, `compact`, `map`).
- **케이스명** (`name`): 테스트 케이스 식별자 (예: `"size 2"`, `"falsy 제거"`).
- **args**: 해당 케이스에서 함수에 넘긴 인자 배열.
- **expected**: lodash를 같은 `args`로 호출한 결과 (기준값).
- **actual**: ours를 같은 `args`로 호출한 결과. **lodash와 동일해야 함**.

### 2.3 마크다운 보고서 형식 (결과 실패)

아래는 **생성 스크립트가 채우는** 결과 실패 보고서의 형식입니다. AI는 이 블록을 읽고 수정 대상과 기대값을 파악하면 됩니다.

```markdown
## 결과 동등성 실패 요약

- **총 실패**: {failedCount} / {total} 케이스
- **기준**: lodash 4.17.23

### 실패 목록

| 함수    | 케이스     | args                                      | expected (lodash) | actual (ours) |
| ------- | ---------- | ----------------------------------------- | ----------------- | ------------- |
| chunk   | size 2     | `[[1,2,3,4], 2]`                          | `[[1,2],[3,4]]`   | `undefined`   |
| compact | falsy 제거 | `[[0,1,false,2,"",3,null,undefined,NaN]]` | `[1,2,3]`         | `undefined`   |

...
```

### 2.4 셀프 피드백 시 체크

- **actual이 `undefined`**: 해당 함수가 아직 플레이스홀더이거나 예외가 났음 → 구현 또는 에러 처리 추가.
- **actual이 있지만 expected와 다름**: 반환값 로직이 lodash와 다름 → lodash 문서/동작에 맞게 수정.
- **args 확인**: 엣지 케이스(빈 배열, 0, null 등)에서만 실패하면 해당 경계 조건 처리 보강.

---

## 3. 보고서 생성 스크립트

다음 명령으로 **AI 셀프 피드백용 마크다운 보고서**를 생성합니다.

```bash
bun run generate-feedback
# 또는 (루트에서)
bun run --filter=@lodash-v2/test generate-feedback
```

- **스크립트**: `test/scripts/generate-feedback-report.ts`
- **출력 파일**: **`docs/feedback-report.md`**
- **내용**: 결과 동등성 실패 요약 (함수, 케이스, args, expected, actual) 및 셀프 피드백 체크리스트.

**AI는 `docs/feedback-report.md`를 읽고**, 실패 목록의 `expected`와 `actual`을 비교해 `packages/core`를 수정한 뒤, 테스트 실행·재생성으로 검증하면 됩니다.

---

## 4. AI 셀프 피드백 체크리스트

1. **`docs/feedback-report.md` (또는 동일 형식 문서) 존재 여부**
   - 있으면: "결과 동등성 실패 목록" 테이블에서 `expected` vs `actual` 비교 후 해당 `packages/core/src/*.ts` 함수 수정.
   - 없으면: `bun run --filter=@lodash-v2/test test` 실행 출력에서 실패한 테스트의 `expected`/`actual`을 위 표 형식으로 정리해 사용.

2. **수정 후 재검증**
   - `bun run --filter=@lodash-v2/test test`
   - 필요 시 `docs/feedback-report.md` 재생성 후 다시 위 체크리스트 적용.
