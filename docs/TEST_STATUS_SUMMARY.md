# 로컬 테스트 진행 상황 요약

**실행 일시:** 2026-02-11  
**명령어:** `bun run --filter=@lodash-v2/test test` · `bun run --filter=@lodash-v2/core test`

---

## 최근 실행 결과 (실제 실행 기준)

| 패키지 | 통과 | 실패/에러 | 비고 |
|--------|------|-----------|------|
| **@lodash-v2/test** | 4 | 2 (모듈 없음) | speed.test.ts 4 pass. result.test.ts·suite — `result` 모듈 없어 미실행 |
| **@lodash-v2/core** | 3 | 3 | exports 3 pass. build-load·placeholder 기대값 불일치 3 fail |
| **합계** | **7** | **5** | |

- **동등성 테스트(함수별 lodash 대비)** 는 `test/src/result.ts` 및 `test/src/__tests__/result-equivalence.test.ts` 가 있을 때만 실행됨.  
  현재 해당 스위트가 없어 **함수별 통과/실패 목록은 아래 이전 요약을 유지**합니다.  
  스위트 복구 후 `bun run --filter=@lodash-v2/test test` 로 동등성 테스트를 돌린 뒤, 이 문서를 다시 생성·갱신하면 됩니다.

---

## 결과 요약 (마지막 동등성 스위트 실행 기준)

| 구분 | 수 |
|------|-----|
| **통과** | 35 |
| **실패** | 19 |
| **총 테스트** | 54 (4개 파일) |

---

## ✅ 통과한 함수 (27개 — lodash와 동등)

### Array (15개)
chunk, compact, concat, difference, drop, dropRight, take, flatten, head, last, initial, tail, uniq, without, fromPairs

### Collection (11개)
map, filter, reduce, find, keyBy, groupBy, sortBy, countBy, every, some, includes

### Lang (1개)
isArray

---

## ❌ 실패한 함수 (19개 — 미구현 또는 동등성 불일치)

### Lang (4개)
- **isNumber** — 숫자/문자열/NaN 케이스
- **isEmpty** — 빈 배열/객체/요소 있음
- **toArray** — 객체/문자열 (체크리스트에는 [x]지만 실제 테스트 실패)
- **cloneDeep** — 중첩 객체

### Math (4개)
- **sum**, **max**, **min**, **mean** — 기본·빈 배열 케이스

### Number (2개)
- **clamp** — 범위 내/밑/위
- **inRange** — 구간 내/밖, 2인자

### Object (5개)
- **get** — 중첩, 기본값
- **pick** — a,c
- **omit** — b 제외
- **keys** — 기본
- **values** — 기본

### String (2개)
- **camelCase** — 공백, 하이픈
- **trim** — 기본, chars

### Util (2개)
- **identity** — 숫자, 0
- **range** — 0~3, 1~4, step 2

---

## Phase 1 진행률

- **구현 완료(테스트 통과):** 27 / 46 함수 ≈ **59%**
- **미완료:** 19개 함수 → 위 목록 순서대로 구현·수정 후 동등성 테스트 반복

---

## 다음 작업 제안

1. **동등성 스위트 복구:** `test/src/result.ts`, `test/src/__tests__/result-equivalence.test.ts` 추가 후 `bun run --filter=@lodash-v2/test test` 실행하여 **본 문서 상단·함수별 목록 재갱신**.
2. **Lang:** `isNumber`, `isEmpty`, `toArray`, `cloneDeep` 구현/수정 후 해당 describe만 실행해 검증
3. **Math:** `sum`, `max`, `min`, `mean` 구현
4. **Number:** `clamp`, `inRange` 구현
5. **Object:** `get`, `pick`, `omit`, `keys`, `values` 구현
6. **String:** `camelCase`, `trim` 구현
7. **Util:** `identity`, `range` 구현

체크리스트(`LODASH_IMPLEMENTATION_CHECKLIST.md`)의 구현 여부는 실제 테스트 결과와 일부 다름(예: toArray [x]인데 실패). 테스트 통과 기준으로 체크리스트를 맞춰 두는 것을 권장합니다.
