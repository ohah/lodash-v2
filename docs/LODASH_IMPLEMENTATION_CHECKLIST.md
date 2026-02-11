# Lodash 구현 체크리스트

기준: lodash 4.17.23. `packages/core/src/*.ts`에서 동일 동작으로 구현.

- **[x]** = 구현 완료 (동등성 테스트 통과)
- **[ ]** = 미구현 (플레이스홀더). **위에서부터 순서대로** 하나씩 구현 → 테스트 통과 → `[ ]`를 `[x]`로 갱신.

검증: `bun run --filter=@lodash-v2/test test` 실행 후 해당 함수 테스트 통과 확인.

---

## Phase 1 — 결과 동등성 (우선 구현)

아래 표에서 **[ ]인 항목 맨 위부터** 한 함수씩 구현하면 됨. 구현 후 `bun run --filter=@lodash-v2/test test`로 통과 확인하고 이 파일에서 `[ ]` → `[x]`로 수정.

### Array (packages/core/src/array.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 1 | [x] | chunk |
| 2 | [x] | compact |
| 3 | [x] | concat |
| 4 | [x] | difference |
| 5 | [x] | differenceBy |
| 6 | [ ] | differenceWith |
| 7 | [x] | drop |
| 8 | [x] | dropRight |
| 9 | [ ] | dropRightWhile |
| 10 | [ ] | dropWhile |
| 11 | [ ] | fill |
| 12 | [ ] | findIndex |
| 13 | [ ] | findLastIndex |
| 14 | [x] | flatten |
| 15 | [ ] | flattenDeep |
| 16 | [ ] | flattenDepth |
| 17 | [x] | fromPairs |
| 18 | [x] | head |
| 19 | [ ] | indexOf |
| 20 | [x] | initial |
| 21 | [ ] | intersection |
| 22 | [ ] | intersectionBy |
| 23 | [ ] | intersectionWith |
| 24 | [ ] | join |
| 25 | [x] | last |
| 26 | [ ] | lastIndexOf |
| 27 | [ ] | nth |
| 28 | [ ] | pull |
| 29 | [ ] | pullAll |
| 30 | [ ] | pullAt |
| 31 | [ ] | remove |
| 32 | [ ] | reverse |
| 33 | [ ] | slice |
| 34 | [ ] | sortedIndex |
| 35 | [ ] | sortedIndexBy |
| 36 | [ ] | takeRight |
| 37 | [ ] | takeRightWhile |
| 38 | [ ] | takeWhile |
| 39 | [x] | take |
| 40 | [ ] | union |
| 41 | [ ] | unionBy |
| 42 | [x] | uniq |
| 43 | [ ] | uniqBy |
| 44 | [ ] | unzip |
| 45 | [ ] | xor |
| 46 | [ ] | zip |
| 47 | [ ] | zipObject |
| 48 | [ ] | zipWith |
| 49 | [x] | without |

### Collection (packages/core/src/collection.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 50 | [x] | map |
| 51 | [x] | filter |
| 52 | [x] | reduce |
| 53 | [x] | find |
| 54 | [ ] | findLast |
| 55 | [ ] | flatMap |
| 56 | [ ] | flatMapDeep |
| 57 | [ ] | flatMapDepth |
| 58 | [ ] | forEach |
| 59 | [x] | keyBy |
| 60 | [x] | groupBy |
| 61 | [x] | sortBy |
| 62 | [x] | countBy |
| 63 | [ ] | orderBy |
| 64 | [ ] | partition |
| 65 | [x] | every |
| 66 | [x] | some |
| 67 | [x] | includes |
| 68 | [ ] | reduceRight |
| 69 | [ ] | reject |
| 70 | [ ] | size |

### Lang (packages/core/src/lang.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 71 | [x] | isArray |
| 72 | [x] | isNumber |
| 73 | [x] | isEmpty |
| 74 | [x] | toArray |
| 75 | [x] | cloneDeep |
| 76 | [ ] | castArray |
| 77 | [ ] | clone |
| 78 | [ ] | eq |
| 79 | [ ] | isEqual |
| 80 | [ ] | isNil |
| 81 | [ ] | isString |
| 82 | [ ] | toNumber |
| 83 | [ ] | gt, gte, lt, lte |
| 84 | [ ] | isBoolean |
| 85 | [ ] | isDate |
| 86 | [ ] | toInteger |

### Math (packages/core/src/math.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 87 | [x] | sum |
| 88 | [x] | max |
| 89 | [x] | min |
| 90 | [x] | mean |
| 91 | [ ] | add |
| 92 | [ ] | ceil, floor, round |
| 93 | [ ] | divide, multiply, subtract |
| 94 | [ ] | maxBy, meanBy, minBy, sumBy |

### Number (packages/core/src/number.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 95 | [x] | clamp |
| 96 | [x] | inRange |
| 97 | [ ] | random |

### Object (packages/core/src/object.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 98 | [x] | get |
| 99 | [x] | pick |
| 100 | [x] | omit |
| 101 | [x] | keys |
| 102 | [x] | values |
| 103 | [ ] | assign |
| 104 | [ ] | defaults |
| 105 | [ ] | has |
| 106 | [ ] | invert |
| 107 | [ ] | merge |
| 108 | [ ] | set |
| 109 | [ ] | toPairs |

### String (packages/core/src/string.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 110 | [x] | camelCase |
| 111 | [x] | trim |
| 112 | [ ] | capitalize |
| 113 | [ ] | kebabCase, snakeCase |
| 114 | [ ] | pad, repeat |
| 115 | [ ] | toLower, toUpper |
| 116 | [ ] | trimEnd |
| 117 | [ ] | words |

### Function (packages/core/src/function.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 118 | [ ] | once |

### Date (packages/core/src/date.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 119 | [ ] | now |

### Seq (packages/core/src/seq.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 120 | [ ] | chain |

### Util (packages/core/src/util.ts)

| # | 구현 여부 | 함수명 |
|---|-----------|--------|
| 121 | [x] | identity |
| 122 | [x] | range |
| 123 | [ ] | defaultTo |
| 124 | [ ] | noop |
| 125 | [ ] | times |
| 126 | [ ] | uniqueId |

---

## 진행률

- **Phase 1 구현 완료**: 46개 ([x] 개수)
- **Phase 1 미구현**: 위 표에서 [ ]인 항목. 맨 위 [ ]부터 순서대로 구현.

---

## 참고

- 동등성 테스트: `test/src/__tests__/result-equivalence.test.ts`
- 실패 목록(피드백): `bun run generate-feedback` → `docs/feedback-report.md`
- 해석 가이드: `docs/RESULT_FEEDBACK.md`
