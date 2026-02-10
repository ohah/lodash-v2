# 벤치마크 및 결과 실패 — AI 셀프 피드백 가이드

이 문서는 **AI가 벤치마크 결과와 결과 동등성 테스트 실패를 해석하고, 스스로 수정 방향을 잡을 수 있도록** 작성된 마크다운 가이드입니다.

---

## 1. 개요

- **벤치마크**: ours / lodash / es-toolkit 속도 비교. 목표는 **ours가 lodash·es-toolkit보다 빠르거나 최소한 비슷한 것**.
- **결과 동등성**: 같은 입력에 대해 **ours의 반환값이 lodash와 동일**해야 함. 실패 시 `expected`(lodash) vs `actual`(ours)를 비교해 수정.

---

## 2. 벤치마크 출력 형식

### 2.1 실행 방법

```bash
bun run benchmark
# 또는
bun run --filter=@lodash-v2/test run
```

### 2.2 콘솔 출력 예시

```
[chunk]
  ours:      1.71ms total, 29228382 ops/sec (1.00x)
  lodash:   36.57ms total, 1367327 ops/sec (21.38x)
  es-toolkit: 19.76ms total, 2529975 ops/sec (11.55x)
  fastest: ours
```

### 2.3 필드 의미

| 필드      | 의미                                                               |
| --------- | ------------------------------------------------------------------ |
| `total`   | N회 실행 총 소요 시간 (ms)                                         |
| `ops/sec` | 초당 연산 횟수. **높을수록 빠름**                                  |
| `(N.NNx)` | **가장 빠른 구현 대비 배율**. 1.00x = 가장 빠름, 2.00x = 절반 속도 |
| `fastest` | 이번 함수에서 가장 빠른 구현 (`ours` \| `lodash` \| `es-toolkit`)  |

### 2.4 셀프 피드백 시 체크

- `fastest`가 `ours`가 아니면: 우리 구현이 lodash/es-toolkit보다 느림 → 알고리즘·반복 횟수·불필요 연산 점검.
- `(N.NNx)`가 ours 쪽에서 1.00x가 아니면: 상대적으로 느린 편 → 병목 구간 확인.
- ours가 플레이스홀더(`() => {}`)일 때는 당연히 가장 빠르게 나옴. **실제 구현 후** 다시 벤치마크해 비교할 것.

---

## 3. 결과 동등성 테스트 실패 형식

### 3.1 실행 방법

```bash
bun run --filter=@lodash-v2/test test
```

실패 시 각 테스트별로 `expect(received).toBe(expected)` 형태로 나오며, `received === false`, `expected === true` 인 경우가 **결과가 lodash와 다르다**는 의미입니다.

### 3.2 구조화된 실패 정보 (runResultTest 반환값)

실패 시 다음 정보가 의미 있습니다.

- **함수명**: 어떤 core 함수가 실패했는지 (예: `chunk`, `compact`, `map`).
- **케이스명** (`name`): 테스트 케이스 식별자 (예: `"size 2"`, `"falsy 제거"`).
- **args**: 해당 케이스에서 함수에 넘긴 인자 배열.
- **expected**: lodash를 같은 `args`로 호출한 결과 (기준값).
- **actual**: ours를 같은 `args`로 호출한 결과. **lodash와 동일해야 함**.

### 3.3 마크다운 보고서 형식 (결과 실패)

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

### 3.4 셀프 피드백 시 체크

- **actual이 `undefined`**: 해당 함수가 아직 플레이스홀더이거나 예외가 났음 → 구현 또는 에러 처리 추가.
- **actual이 있지만 expected와 다름**: 반환값 로직이 lodash와 다름 → lodash 문서/동작에 맞게 수정.
- **args 확인**: 엣지 케이스(빈 배열, 0, null 등)에서만 실패하면 해당 경계 조건 처리 보강.

---

## 4. 벤치마크 보고서 형식 (속도)

생성 스크립트가 채우는 **속도 비교** 보고서 형식입니다.

```markdown
## 벤치마크 요약 (속도)

- **실행 시각**: {ISO timestamp}
- **반복 횟수**: {iterations} 회/함수

### 함수별 결과

| 함수  | fastest | ours (ops/sec) | lodash (ops/sec) | es-toolkit (ops/sec) | 비고       |
| ----- | ------- | -------------- | ---------------- | -------------------- | ---------- |
| chunk | ours    | 29228382       | 1367327          | 2529975              | ours 1.00x |
```

- **fastest**가 ours가 아니면 "비고"에 "목표: ours가 fastest가 되도록 최적화" 등으로 피드백 가능.

---

## 5. 보고서 생성 스크립트

다음 명령으로 **AI 셀프 피드백용 마크다운 보고서**를 생성합니다.

```bash
bun run generate-feedback
# 또는 (루트에서)
bun run --filter=@lodash-v2/test generate-feedback
```

- **스크립트**: `test/scripts/generate-feedback-report.ts`
- **출력 파일**: **`docs/feedback-report.md`**
- **내용**:
  1. 결과 동등성 실패 요약 (함수, 케이스, args, expected, actual)
  2. 벤치마크 요약 (함수별 ours / lodash / es-toolkit ops/sec, fastest)
  3. 셀프 피드백 체크리스트

**AI는 `docs/feedback-report.md`를 읽고**, 실패 목록의 `expected`와 `actual`을 비교해 `packages/core`를 수정한 뒤, 테스트·벤치마크·재생성으로 검증하면 됩니다.

---

## 6. AI 셀프 피드백 체크리스트

1. **`docs/feedback-report.md` (또는 동일 형식 문서) 존재 여부**
   - 있으면: "결과 동등성 실패 목록" 테이블에서 `expected` vs `actual` 비교 후 해당 `packages/core/src/*.ts` 함수 수정.
   - 없으면: `bun run --filter=@lodash-v2/test test` 실행 출력에서 실패한 테스트의 `expected`/`actual`을 위 표 형식으로 정리해 사용.

2. **벤치마크 목표**
   - `fastest`가 `ours`인지 확인.
   - 아니면 해당 함수의 구현(반복문, 할당 횟수, 불필요한 복사 등)을 점검하고 최적화.

3. **수정 후 재검증**
   - `bun run --filter=@lodash-v2/test test`
   - `bun run benchmark`
   - 필요 시 `docs/feedback-report.md` 재생성 후 다시 위 체크리스트 적용.
