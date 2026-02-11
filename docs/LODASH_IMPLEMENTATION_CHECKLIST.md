# 로대시 함수 구현 체크리스트

- **기준**: lodash 4.17.23
- **검증**: `bun run --filter=@lodash-v2/test test` (동등성 테스트) → 동등성 통과 후 Phase 2 진행

**진행 순서:**  
① **Phase 1** — 한 번에 한 함수씩 구현 → **함수 100% 구현**(동등성 테스트 전부 통과)까지 진행  
② **Phase 2** — 함수를 다 구현한 뒤, **한 함수씩** 벤치마크 테스트·점검

### 단계별 성공/실패 처리 규칙

아래 표는 **각 함수에 대해** 어떤 작업을 하고, 성공/실패 시 어떻게 이어서 진행할지 정리한 것입니다.

| 단계 | 작업 | 성공 시 | 실패 시 |
|------|------|---------|---------|
| 1 | 결과 동등성 테스트 (`bun run --filter=@lodash-v2/test test`) | 해당 함수가 모든 동등성 테스트를 통과하면, 표의 `구현 여부`를 `[ ]` → `[x]`로 바꾸고 **다음 함수**로 진행 | 테스트 실패 원인을 분석하고 `packages/core/src/*.ts` 구현 또는 테스트케이스를 수정한 뒤, **해결될 때까지 같은 테스트를 반복 실행**합니다. (3회 재시도 규칙 등은 `HEARTBEAT.md`를 따름) |
| 2 | 벤치마크 (`bun run benchmark`) 및 속도 점검 | `fastest`가 `ours`가 되면 Phase 2 체크리스트에서 해당 함수의 `fastest=ours`를 `[ ]` → `[x]`로 바꾸고 **다음 함수의 Phase 2**로 진행 | `fastest`가 `ours`가 아니면 구현(반복/할당/알고리즘) 또는 입력 데이터/케이스를 점검·수정한 뒤, **해결될 때까지 같은 벤치마크를 반복 실행**합니다. |

> 요약: **어떤 단계에서든 실패하면, 그 원인을 수정한 뒤 성공할 때까지 같은 단계를 반복 실행**하고, **성공한 뒤에만 다음 단계 또는 다음 함수로 이동**합니다.

---

## Phase 1: 함수 기능 그대로 구현하기

아래 순서대로 **lodash와 동일한 결과**가 나오도록 `packages/core/src/*.ts`에 **한 번에 한 함수씩** 구현합니다.  
한 함수 구현 후 해당 describe 블록만 통과하는지 확인하고, **전부 통과(100% 구현)**하면 Phase 2로 넘어갑니다.

**테스트코드:** 구현하는 도중 **필요한 테스트/케이스**가 보이면 (`result-equivalence.test.ts` 또는 `packages/core/src/__tests__/` 등) **계속 추가하면서 진행**하세요. 케이스 추가 후 해당 함수 동등성은 그대로 유지할 것.

### Array (`array.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 1 | `chunk` | size 2, size 3, size 1 | [x] |
| 2 | `compact` | falsy 제거, 빈 배열 | [x] |
| 3 | `concat` | 배열+값, 빈 배열 | [x] |
| 4 | `difference` | 기본, 중복 제외 | [x] |
| 5 | `drop` | n=1, n=2 | [x] |
| 6 | `dropRight` | n=1, n=2 | [x] |
| 7 | `take` | n=2, n=0 | [x] |
| 8 | `flatten` | 1단계 | [x] |
| 9 | `head` | 일반, 빈 배열 | [x] |
| 10 | `last` | 일반, 빈 배열 | [x] |
| 11 | `initial` | 일반 | [x] |
| 12 | `tail` | 일반 | [x] |
| 13 | `uniq` | 중복 제거, 빈 배열 | [x] |
| 14 | `without` | 기본 | [x] |
| 15 | `fromPairs` | 기본 | [x] |
| 16 | `differenceBy` | (추가 예정) | [ ] |
| 17 | `differenceWith` | (추가 예정) | [ ] |
| 18 | `dropRightWhile` | (추가 예정) | [ ] |
| 19 | `dropWhile` | (추가 예정) | [ ] |
| 20 | `fill` | (추가 예정) | [ ] |
| 21 | `findIndex` | (추가 예정) | [ ] |
| 22 | `findLastIndex` | (추가 예정) | [ ] |
| 23 | `flattenDeep` | (추가 예정) | [ ] |
| 24 | `flattenDepth` | (추가 예정) | [ ] |
| 25 | `indexOf` | (추가 예정) | [ ] |
| 26 | `intersection` | (추가 예정) | [ ] |
| 27 | `intersectionBy` | (추가 예정) | [ ] |
| 28 | `intersectionWith` | (추가 예정) | [ ] |
| 29 | `join` | (추가 예정) | [ ] |
| 30 | `lastIndexOf` | (추가 예정) | [ ] |
| 31 | `nth` | (추가 예정) | [ ] |
| 32 | `pull` | (추가 예정) | [ ] |
| 33 | `pullAll` | (추가 예정) | [ ] |
| 34 | `pullAllBy` | (추가 예정) | [ ] |
| 35 | `pullAllWith` | (추가 예정) | [ ] |
| 36 | `pullAt` | (추가 예정) | [ ] |
| 37 | `remove` | (추가 예정) | [ ] |
| 38 | `reverse` | (추가 예정) | [ ] |
| 39 | `slice` | (추가 예정) | [ ] |
| 40 | `sortedIndex` | (추가 예정) | [ ] |
| 41 | `sortedIndexBy` | (추가 예정) | [ ] |
| 42 | `sortedIndexOf` | (추가 예정) | [ ] |
| 43 | `sortedLastIndex` | (추가 예정) | [ ] |
| 44 | `sortedLastIndexBy` | (추가 예정) | [ ] |
| 45 | `sortedLastIndexOf` | (추가 예정) | [ ] |
| 46 | `sortedUniq` | (추가 예정) | [ ] |
| 47 | `sortedUniqBy` | (추가 예정) | [ ] |
| 48 | `takeRight` | (추가 예정) | [ ] |
| 49 | `takeRightWhile` | (추가 예정) | [ ] |
| 50 | `takeWhile` | (추가 예정) | [ ] |
| 51 | `union` | (추가 예정) | [ ] |
| 52 | `unionBy` | (추가 예정) | [ ] |
| 53 | `unionWith` | (추가 예정) | [ ] |
| 54 | `uniqBy` | (추가 예정) | [ ] |
| 55 | `uniqWith` | (추가 예정) | [ ] |
| 56 | `unzip` | (추가 예정) | [ ] |
| 57 | `unzipWith` | (추가 예정) | [ ] |
| 58 | `xor` | (추가 예정) | [ ] |
| 59 | `xorBy` | (추가 예정) | [ ] |
| 60 | `xorWith` | (추가 예정) | [ ] |
| 61 | `zip` | (추가 예정) | [ ] |
| 62 | `zipObject` | (추가 예정) | [ ] |
| 63 | `zipObjectDeep` | (추가 예정) | [ ] |
| 64 | `zipWith` | (추가 예정) | [ ] |

### Collection (`collection.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 65 | `map` | x2, 빈 배열 | [x] |
| 66 | `filter` | 짝수, 빈 배열 | [x] |
| 67 | `reduce` | 합, 빈 배열 | [x] |
| 68 | `find` | a===2 | [x] |
| 69 | `keyBy` | id 기준 | [x] |
| 70 | `groupBy` | 짝홀 | [x] |
| 71 | `sortBy` | 음수로 역순 | [x] |
| 72 | `countBy` | 길이 | [x] |
| 73 | `every` | 전부 참, 하나 거짓 | [x] |
| 74 | `some` | 하나 참, 전부 거짓 | [x] |
| 75 | `includes` | 있음, 없음 | [x] |
| 76 | `findLast` | (추가 예정) | [ ] |
| 77 | `flatMap` | (추가 예정) | [ ] |
| 78 | `flatMapDeep` | (추가 예정) | [ ] |
| 79 | `flatMapDepth` | (추가 예정) | [ ] |
| 80 | `forEach` | (추가 예정) | [ ] |
| 81 | `forEachRight` | (추가 예정) | [ ] |
| 82 | `invokeMap` | (추가 예정) | [ ] |
| 83 | `orderBy` | (추가 예정) | [ ] |
| 84 | `partition` | (추가 예정) | [ ] |
| 85 | `reduceRight` | (추가 예정) | [ ] |
| 86 | `reject` | (추가 예정) | [ ] |
| 87 | `sample` | (추가 예정) | [ ] |
| 88 | `sampleSize` | (추가 예정) | [ ] |
| 89 | `shuffle` | (추가 예정) | [ ] |
| 90 | `size` | (추가 예정) | [ ] |

### Lang (`lang.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 91 | `isArray` | 배열, 객체, null | [x] |
| 92 | `isNumber` | 숫자, 문자열, NaN | [x] |
| 93 | `isEmpty` | 빈 배열, 빈 객체, 요소 있음 | [x] |
| 94 | `toArray` | 객체, 문자열 | [x] |
| 95 | `cloneDeep` | 중첩 객체 | [x] |
| 96 | `castArray` | (추가 예정) | [ ] |
| 97 | `clone` | (추가 예정) | [ ] |
| 98 | `cloneDeepWith` | (추가 예정) | [ ] |
| 99 | `cloneWith` | (추가 예정) | [ ] |
| 100 | `conformsTo` | (추가 예정) | [ ] |
| 101 | `eq`, `gt`, `gte`, `lt`, `lte` | (추가 예정) | [ ] |
| 102 | `isArguments`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject` | (추가 예정) | [ ] |
| 103 | `isBoolean`, `isBuffer`, `isDate`, `isElement` | (추가 예정) | [ ] |
| 104 | `isEqual`, `isEqualWith`, `isError`, `isFinite`, `isFunction` | (추가 예정) | [ ] |
| 105 | `isInteger`, `isLength`, `isMap`, `isMatch`, `isMatchWith` | (추가 예정) | [ ] |
| 106 | `isNaN`, `isNative`, `isNil`, `isNull`, `isObject`, `isObjectLike`, `isPlainObject` | (추가 예정) | [ ] |
| 107 | `isRegExp`, `isSafeInteger`, `isSet`, `isString`, `isSymbol`, `isTypedArray`, `isUndefined` | (추가 예정) | [ ] |
| 108 | `isWeakMap`, `isWeakSet` | (추가 예정) | [ ] |
| 109 | `toFinite`, `toInteger`, `toLength`, `toNumber` | (추가 예정) | [ ] |
| 110 | `toPlainObject`, `toSafeInteger`, `toString` | (추가 예정) | [ ] |

### Math (`math.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 111 | `sum` | 기본, 빈 배열 | [x] |
| 112 | `max` | 기본, 빈 배열 | [x] |
| 113 | `min` | 기본, 빈 배열 | [x] |
| 114 | `mean` | 기본, 빈 배열 | [x] |
| 115 | `add`, `ceil`, `divide`, `floor` | (추가 예정) | [ ] |
| 116 | `maxBy`, `meanBy`, `minBy` | (추가 예정) | [ ] |
| 117 | `multiply`, `round`, `subtract` | (추가 예정) | [ ] |
| 118 | `sumBy` | (추가 예정) | [ ] |

### Number (`number.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 119 | `clamp` | 범위 내/밑/위 | [x] |
| 120 | `inRange` | 구간 내/밖, 2인자 | [x] |
| 121 | `random` | (추가 예정) | [ ] |

### Object (`object.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 122 | `get` | 중첩, 기본값 | [x] |
| 123 | `pick` | a,c | [x] |
| 124 | `omit` | b 제외 | [x] |
| 125 | `keys` | 기본 | [x] |
| 126 | `values` | 기본 | [x] |
| 127 | `assign`, `assignIn`, `assignInWith`, `assignWith` | (추가 예정) | [ ] |
| 128 | `at`, `create` | (추가 예정) | [ ] |
| 129 | `defaults`, `defaultsDeep` | (추가 예정) | [ ] |
| 130 | `findKey`, `findLastKey` | (추가 예정) | [ ] |
| 131 | `forIn`, `forInRight`, `forOwn`, `forOwnRight` | (추가 예정) | [ ] |
| 132 | `functions`, `functionsIn` | (추가 예정) | [ ] |
| 133 | `has`, `hasIn` | (추가 예정) | [ ] |
| 134 | `invert`, `invertBy` | (추가 예정) | [ ] |
| 135 | `invoke` | (추가 예정) | [ ] |
| 136 | `keysIn` | (추가 예정) | [ ] |
| 137 | `mapKeys`, `mapValues` | (추가 예정) | [ ] |
| 138 | `merge`, `mergeWith` | (추가 예정) | [ ] |
| 139 | `omitBy`, `pickBy` | (추가 예정) | [ ] |
| 140 | `result` | (추가 예정) | [ ] |
| 141 | `set`, `setWith` | (추가 예정) | [ ] |
| 142 | `toPairs`, `toPairsIn` | (추가 예정) | [ ] |
| 143 | `transform` | (추가 예정) | [ ] |
| 144 | `unset`, `update`, `updateWith` | (추가 예정) | [ ] |
| 145 | `valuesIn` | (추가 예정) | [ ] |

### String (`string.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 146 | `camelCase` | 공백, 하이픈 | [x] |
| 147 | `trim` | 기본, chars | [x] |
| 148 | `capitalize`, `deburr`, `endsWith`, `escape`, `escapeRegExp` | (추가 예정) | [ ] |
| 149 | `kebabCase`, `lowerCase`, `lowerFirst` | (추가 예정) | [ ] |
| 150 | `pad`, `padEnd`, `padStart` | (추가 예정) | [ ] |
| 151 | `parseInt`, `repeat`, `replace` | (추가 예정) | [ ] |
| 152 | `snakeCase`, `split`, `startCase`, `startsWith` | (추가 예정) | [ ] |
| 153 | `template`, `toLower`, `toUpper` | (추가 예정) | [ ] |
| 154 | `trimEnd`, `trimStart`, `truncate`, `unescape` | (추가 예정) | [ ] |
| 155 | `upperCase`, `upperFirst`, `words` | (추가 예정) | [ ] |

### Function (`function.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 156 | `after`, `ary`, `before`, `bind`, `bindKey` | (추가 예정) | [ ] |
| 157 | `curry`, `curryRight`, `debounce`, `defer`, `delay` | (추가 예정) | [ ] |
| 158 | `flip`, `memoize`, `negate`, `once` | (추가 예정) | [ ] |
| 159 | `overArgs`, `partial`, `partialRight`, `rearg`, `rest`, `spread` | (추가 예정) | [ ] |
| 160 | `throttle`, `unary`, `wrap` | (추가 예정) | [ ] |

### Date (`date.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 161 | `now` | (추가 예정) | [ ] |

### Seq (`seq.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 162 | `chain`, `tap`, `thru` | (추가 예정) | [ ] |

### Util (`util.ts`)

| # | 함수 | 결과 동등성 테스트 케이스 | 구현 여부 |
|---|------|---------------------------|-----------|
| 163 | `identity` | 숫자, 0 | [x] |
| 164 | `range` | 0~3, 1~4, step 2 | [x] |
| 165 | `attempt`, `bindAll`, `cond`, `conforms`, `constant`, `defaultTo` | (추가 예정) | [ ] |
| 166 | `flow`, `flowRight` | (추가 예정) | [ ] |
| 167 | `iteratee`, `matches`, `matchesProperty`, `method`, `methodOf` | (추가 예정) | [ ] |
| 168 | `mixin`, `noConflict`, `noop`, `nthArg` | (추가 예정) | [ ] |
| 169 | `over`, `overEvery`, `overSome` | (추가 예정) | [ ] |
| 170 | `property`, `propertyOf`, `rangeRight` | (추가 예정) | [ ] |
| 171 | `runInContext` | (추가 예정) | [ ] |
| 172 | `stubArray`, `stubFalse`, `stubObject`, `stubString`, `stubTrue` | (추가 예정) | [ ] |
| 173 | `times`, `toPath`, `uniqueId` | (추가 예정) | [ ] |

---

## Phase 1 완료 조건

- [ ] `bun run --filter=@lodash-v2/test test` (동등성 테스트) **전부 통과**
- [ ] 위 표의 구현 여부 전부 체크

---

## Phase 2: 함수별 점검 및 속도 비교

Phase 1이 모두 통과한 뒤, **함수 하나씩** 아래 순서로 점검합니다.

1. 해당 함수 **동등성** 유지 확인 (테스트 통과)
2. `bun run benchmark` 로 **속도 측정**
3. `fastest`가 `ours`인지 확인; 아니면 구현(반복/할당/알고리즘) 점검 후 재측정
4. `bun run generate-feedback` 로 피드백 보고서 갱신

### 함수별 Phase 2 체크리스트 (동일 순서)

| # | 함수 | 동등성 통과 | fastest=ours | 비고 |
|---|------|-------------|--------------|------|
| 1 | chunk | [x] | [ ] | fastest=es-toolkit |
| 2 | compact | [x] | [ ] | fastest=es-toolkit |
| 3 | concat | [ ] | [ ] | |
| 4 | difference | [x] | [ ] | fastest=es-toolkit |
| 5 | drop | [x] | [ ] | fastest=es-toolkit |
| 6 | dropRight | [x] | [ ] | fastest=es-toolkit |
| 7 | take | [ ] | [ ] | |
| 8 | flatten | [x] | [ ] | fastest=es-toolkit |
| 9 | head | [x] | [ ] | fastest=es-toolkit |
| 10 | last | [x] | [ ] | fastest=es-toolkit |
| 11 | initial | [x] | [ ] | fastest=es-toolkit |
| 12 | tail | [x] | [ ] | fastest=es-toolkit |
| 13 | uniq | [ ] | [ ] | |
| 14 | without | [x] | [ ] | fastest=es-toolkit |
| 15 | fromPairs | [ ] | [ ] | |
| 16 | differenceBy | [ ] | [ ] | |
| 17 | differenceWith | [ ] | [ ] | |
| 18 | dropRightWhile | [ ] | [ ] | |
| 19 | dropWhile | [ ] | [ ] | |
| 20 | fill | [ ] | [ ] | |
| 21 | findIndex | [ ] | [ ] | |
| 22 | findLastIndex | [ ] | [ ] | |
| 23 | flattenDeep | [ ] | [ ] | |
| 24 | flattenDepth | [ ] | [ ] | |
| 25 | indexOf | [ ] | [ ] | |
| 26 | intersection | [ ] | [ ] | |
| 27 | intersectionBy | [ ] | [ ] | |
| 28 | intersectionWith | [ ] | [ ] | |
| 29 | join | [ ] | [ ] | |
| 30 | lastIndexOf | [ ] | [ ] | |
| 31 | nth | [ ] | [ ] | |
| 32 | pull | [ ] | [ ] | |
| 33 | pullAll | [ ] | [ ] | |
| 34 | pullAllBy | [ ] | [ ] | |
| 35 | pullAllWith | [ ] | [ ] | |
| 36 | pullAt | [ ] | [ ] | |
| 37 | remove | [ ] | [ ] | |
| 38 | reverse | [ ] | [ ] | |
| 39 | slice | [ ] | [ ] | |
| 40 | sortedIndex | [ ] | [ ] | |
| 41 | sortedIndexBy | [ ] | [ ] | |
| 42 | sortedIndexOf | [ ] | [ ] | |
| 43 | sortedLastIndex | [ ] | [ ] | |
| 44 | sortedLastIndexBy | [ ] | [ ] | |
| 45 | sortedLastIndexOf | [ ] | [ ] | |
| 46 | sortedUniq | [ ] | [ ] | |
| 47 | sortedUniqBy | [ ] | [ ] | |
| 48 | takeRight | [ ] | [ ] | |
| 49 | takeRightWhile | [ ] | [ ] | |
| 50 | takeWhile | [ ] | [ ] | |
| 51 | union | [ ] | [ ] | |
| 52 | unionBy | [ ] | [ ] | |
| 53 | unionWith | [ ] | [ ] | |
| 54 | uniqBy | [ ] | [ ] | |
| 55 | uniqWith | [ ] | [ ] | |
| 56 | unzip | [ ] | [ ] | |
| 57 | unzipWith | [ ] | [ ] | |
| 58 | xor | [ ] | [ ] | |
| 59 | xorBy | [ ] | [ ] | |
| 60 | xorWith | [ ] | [ ] | |
| 61 | zip | [ ] | [ ] | |
| 62 | zipObject | [ ] | [ ] | |
| 63 | zipObjectDeep | [ ] | [ ] | |
| 64 | zipWith | [ ] | [ ] | |
| 65 | map | [ ] | [ ] | |
| 66 | filter | [ ] | [ ] | |
| 67 | reduce | [ ] | [ ] | |
| 68 | find | [ ] | [ ] | |
| 69 | keyBy | [ ] | [ ] | |
| 70 | groupBy | [ ] | [ ] | |
| 71 | sortBy | [ ] | [ ] | |
| 72 | countBy | [ ] | [ ] | |
| 73 | every | [ ] | [ ] | |
| 74 | some | [ ] | [ ] | |
| 75 | includes | [ ] | [ ] | |
| 76 | findLast | [ ] | [ ] | |
| 77 | flatMap | [ ] | [ ] | |
| 78 | flatMapDeep | [ ] | [ ] | |
| 79 | flatMapDepth | [ ] | [ ] | |
| 80 | forEach | [ ] | [ ] | |
| 81 | forEachRight | [ ] | [ ] | |
| 82 | invokeMap | [ ] | [ ] | |
| 83 | orderBy | [ ] | [ ] | |
| 84 | partition | [ ] | [ ] | |
| 85 | reduceRight | [ ] | [ ] | |
| 86 | reject | [ ] | [ ] | |
| 87 | sample | [ ] | [ ] | |
| 88 | sampleSize | [ ] | [ ] | |
| 89 | shuffle | [ ] | [ ] | |
| 90 | size | [ ] | [ ] | |
| 91 | isArray | [ ] | [ ] | |
| 92 | isNumber | [ ] | [ ] | |
| 93 | isEmpty | [ ] | [ ] | |
| 94 | toArray | [ ] | [ ] | |
| 95 | cloneDeep | [ ] | [ ] | |
| 96 | castArray | [ ] | [ ] | |
| 97 | clone | [ ] | [ ] | |
| 98 | cloneDeepWith | [ ] | [ ] | |
| 99 | cloneWith | [ ] | [ ] | |
| 100 | conformsTo | [ ] | [ ] | |
| 101 | eq, gt, gte, lt, lte | [ ] | [ ] | |
| 102 | isArguments, isArrayBuffer, isArrayLike, isArrayLikeObject | [ ] | [ ] | |
| 103 | isBoolean, isBuffer, isDate, isElement | [ ] | [ ] | |
| 104 | isEqual, isEqualWith, isError, isFinite, isFunction | [ ] | [ ] | |
| 105 | isInteger, isLength, isMap, isMatch, isMatchWith | [ ] | [ ] | |
| 106 | isNaN, isNative, isNil, isNull, isObject, isObjectLike, isPlainObject | [ ] | [ ] | |
| 107 | isRegExp, isSafeInteger, isSet, isString, isSymbol, isTypedArray, isUndefined | [ ] | [ ] | |
| 108 | isWeakMap, isWeakSet | [ ] | [ ] | |
| 109 | toFinite, toInteger, toLength, toNumber | [ ] | [ ] | |
| 110 | toPlainObject, toSafeInteger, toString | [ ] | [ ] | |
| 111 | sum | [ ] | [ ] | |
| 112 | max | [ ] | [ ] | |
| 113 | min | [ ] | [ ] | |
| 114 | mean | [ ] | [ ] | |
| 115 | add, ceil, divide, floor | [ ] | [ ] | |
| 116 | maxBy, meanBy, minBy | [ ] | [ ] | |
| 117 | multiply, round, subtract | [ ] | [ ] | |
| 118 | sumBy | [ ] | [ ] | |
| 119 | clamp | [ ] | [ ] | |
| 120 | inRange | [ ] | [ ] | |
| 121 | random | [ ] | [ ] | |
| 122 | get | [ ] | [ ] | |
| 123 | pick | [ ] | [ ] | |
| 124 | omit | [ ] | [ ] | |
| 125 | keys | [ ] | [ ] | |
| 126 | values | [ ] | [ ] | |
| 127 | assign, assignIn, assignInWith, assignWith | [ ] | [ ] | |
| 128 | at, create | [ ] | [ ] | |
| 129 | defaults, defaultsDeep | [ ] | [ ] | |
| 130 | findKey, findLastKey | [ ] | [ ] | |
| 131 | forIn, forInRight, forOwn, forOwnRight | [ ] | [ ] | |
| 132 | functions, functionsIn | [ ] | [ ] | |
| 133 | has, hasIn | [ ] | [ ] | |
| 134 | invert, invertBy | [ ] | [ ] | |
| 135 | invoke | [ ] | [ ] | |
| 136 | keysIn | [ ] | [ ] | |
| 137 | mapKeys, mapValues | [ ] | [ ] | |
| 138 | merge, mergeWith | [ ] | [ ] | |
| 139 | omitBy, pickBy | [ ] | [ ] | |
| 140 | result | [ ] | [ ] | |
| 141 | set, setWith | [ ] | [ ] | |
| 142 | toPairs, toPairsIn | [ ] | [ ] | |
| 143 | transform | [ ] | [ ] | |
| 144 | unset, update, updateWith | [ ] | [ ] | |
| 145 | valuesIn | [ ] | [ ] | |
| 146 | camelCase | [ ] | [ ] | |
| 147 | trim | [ ] | [ ] | |
| 148 | capitalize, deburr, endsWith, escape, escapeRegExp | [ ] | [ ] | |
| 149 | kebabCase, lowerCase, lowerFirst | [ ] | [ ] | |
| 150 | pad, padEnd, padStart | [ ] | [ ] | |
| 151 | parseInt, repeat, replace | [ ] | [ ] | |
| 152 | snakeCase, split, startCase, startsWith | [ ] | [ ] | |
| 153 | template, toLower, toUpper | [ ] | [ ] | |
| 154 | trimEnd, trimStart, truncate, unescape | [ ] | [ ] | |
| 155 | upperCase, upperFirst, words | [ ] | [ ] | |
| 156 | after, ary, before, bind, bindKey | [ ] | [ ] | |
| 157 | curry, curryRight, debounce, defer, delay | [ ] | [ ] | |
| 158 | flip, memoize, negate, once | [ ] | [ ] | |
| 159 | overArgs, partial, partialRight, rearg, rest, spread | [ ] | [ ] | |
| 160 | throttle, unary, wrap | [ ] | [ ] | |
| 161 | now | [ ] | [ ] | |
| 162 | chain, tap, thru | [ ] | [ ] | |
| 163 | identity | [ ] | [ ] | |
| 164 | range | [ ] | [ ] | |
| 165 | attempt, bindAll, cond, conforms, constant, defaultTo | [ ] | [ ] | |
| 166 | flow, flowRight | [ ] | [ ] | |
| 167 | iteratee, matches, matchesProperty, method, methodOf | [ ] | [ ] | |
| 168 | mixin, noConflict, noop, nthArg | [ ] | [ ] | |
| 169 | over, overEvery, overSome | [ ] | [ ] | |
| 170 | property, propertyOf, rangeRight | [ ] | [ ] | |
| 171 | runInContext | [ ] | [ ] | |
| 172 | stubArray, stubFalse, stubObject, stubString, stubTrue | [ ] | [ ] | |
| 173 | times, toPath, uniqueId | [ ] | [ ] | |

---

## 참고 명령어

```bash
# 결과 동등성만
bun run --filter=@lodash-v2/test test

# 벤치마크만
bun run benchmark

# 피드백 보고서 생성
bun run generate-feedback
```

해석 방법: `docs/BENCHMARK_AND_RESULT_FEEDBACK.md`
