# 피드백 보고서 (AI 셀프 피드백용)

- **생성 시각**: 2026-02-11T04:13:48.917Z
- **기준**: lodash 4.17.23

---

## 1. 결과 동등성 실패 요약

- **통과**: 85 / 183 케이스
- **실패**: 98 케이스
- **의미**: `actual (ours)`가 `expected (lodash)`와 동일해야 합니다. 수정 시 `packages/core/src/*.ts` 해당 함수를 lodash 동작에 맞게 구현하세요.

### 실패 목록

| 함수 | 케이스 | args | expected (lodash) | actual (ours) |
|------|--------|------|-------------------|---------------|
| differenceBy | 기본 | `[[2.1,1.2],[2.3,3.4],null]` | `[1.2]` | `undefined` |
| differenceWith | 기본 | `[[1,2],[2,3],null]` | `[1]` | `undefined` |
| dropRightWhile | 기본 | `[[1,2,3,4],null]` | `[1,2]` | `undefined` |
| dropWhile | 기본 | `[[1,2,3,4],null]` | `[3,4]` | `undefined` |
| fill | 기본 | `[[1,2,3],"a"]` | `["a","a","a"]` | `undefined` |
| findIndex | 기본 | `[[1,2,3],null]` | `1` | `undefined` |
| findLastIndex | 기본 | `[[1,2,2,3],null]` | `2` | `undefined` |
| flattenDeep | 기본 | `[[[1,[2,[3,[4]]]]]]` | `[1,2,3,4]` | `undefined` |
| flattenDepth | depth 2 | `[[[1,[2,[3,[4]]]]],2]` | `[1,2,[3,[4]]]` | `undefined` |
| indexOf | 기본 | `[[1,2,1,2],2]` | `1` | `undefined` |
| intersection | 기본 | `[[2,1],[2,3]]` | `[2]` | `undefined` |
| intersectionBy | 기본 | `[[2.1,1.2],[2.3,3.4],null]` | `[2.1]` | `undefined` |
| intersectionWith | 기본 | `[[1,2],[2,3],null]` | `[2]` | `undefined` |
| join | 기본 | `[["a","b","c"],"~"]` | `"a~b~c"` | `undefined` |
| lastIndexOf | 기본 | `[[1,2,1,2],2]` | `3` | `undefined` |
| nth | 기본 | `[[1,2,3],1]` | `2` | `undefined` |
| pull | 기본 | `[[1,2,3,1,2],2,1]` | `[3]` | `undefined` |
| pullAll | 기본 | `[[1,2,3,1,2],[2,1]]` | `[3]` | `undefined` |
| pullAt | 기본 | `[[1,2,3,4],[1,3]]` | `[2,4]` | `undefined` |
| remove | 기본 | `[[1,2,3,4],null]` | `[2,4]` | `undefined` |
| reverse | 기본 | `[[1,2,3]]` | `[3,2,1]` | `undefined` |
| slice | 기본 | `[[1,2,3,4],1,3]` | `[2,3]` | `undefined` |
| sortedIndex | 기본 | `[[30,50],40]` | `1` | `undefined` |
| sortedIndexBy | 기본 | `[[{"age":30},{"age":50}],40,null]` | `2` | `undefined` |
| takeRight | 기본 | `[[1,2,3],2]` | `[2,3]` | `undefined` |
| takeRightWhile | 기본 | `[[1,2,3,4],null]` | `[3,4]` | `undefined` |
| takeWhile | 기본 | `[[1,2,3,4],null]` | `[1,2]` | `undefined` |
| union | 기본 | `[[2],[1,2]]` | `[2,1]` | `undefined` |
| unionBy | 기본 | `[[2.1],[1.2,2.3],null]` | `[2.1,1.2]` | `undefined` |
| uniqBy | 기본 | `[[2.1,1.2,2.3],null]` | `[2.1,1.2]` | `undefined` |
| unzip | 기본 | `[[[1,"a"],[2,"b"]]]` | `[[1,2],["a","b"]]` | `undefined` |
| xor | 기본 | `[[2,1],[2,3]]` | `[1,3]` | `undefined` |
| zip | 기본 | `[[1,2],[10,20],[100,200]]` | `[[1,10,100],[2,20,200]]` | `undefined` |
| zipObject | 기본 | `[["a","b"],[1,2]]` | `{"a":1,"b":2}` | `undefined` |
| zipWith | 기본 | `[[1,2],[10,20],null]` | `[11,22]` | `undefined` |
| findLast | 기본 | `[[1,2,3,4],null]` | `4` | `undefined` |
| flatMap | 기본 | `[[1,2],null]` | `[1,1,2,2]` | `undefined` |
| flatMapDeep | 기본 | `[[1,2],null]` | `[1,1,2,2]` | `undefined` |
| flatMapDepth | 기본 | `[[1,2],null,2]` | `[[1,1],[2,2]]` | `undefined` |
| forEach | 기본 | `[[1,2,3]]` | `[1,2,3]` | `undefined` |
| orderBy | 기본 | `[[{"a":"b","b":2},{"a":"a","b":1}],["a"],["asc"]]` | `[{"a":"a","b":1},{"a":"b","b":2}]` | `undefined` |
| partition | 기본 | `[[1,2,3,4],null]` | `[[2,4],[1,3]]` | `undefined` |
| reduceRight | 기본 | `[[1,2,3],null,0]` | `6` | `undefined` |
| reject | 기본 | `[[1,2,3,4],null]` | `[1,3]` | `undefined` |
| size | 배열 | `[[1,2,3]]` | `3` | `undefined` |
| size | 객체 | `[{"a":1,"b":2}]` | `2` | `undefined` |
| castArray | 숫자 | `[1]` | `[1]` | `undefined` |
| clone | 객체 | `[{"a":1}]` | `{"a":1}` | `undefined` |
| eq | 같음 | `[1,1]` | `true` | `undefined` |
| eq | 다름 | `[1,2]` | `false` | `undefined` |
| isEqual | 객체 | `[{"a":1},{"a":1}]` | `true` | `undefined` |
| isNil | null | `[null]` | `true` | `undefined` |
| isNil | undefined | `[null]` | `true` | `undefined` |
| isNil | 값 | `[1]` | `false` | `undefined` |
| isString | 문자열 | `["a"]` | `true` | `undefined` |
| isString | 숫자 | `[1]` | `false` | `undefined` |
| toNumber | 기본 | `["3.2"]` | `3.2` | `undefined` |
| gt | gt | `[3,1]` | `true` | `undefined` |
| gte | gte | `[1,1]` | `true` | `undefined` |
| lt | lt | `[1,3]` | `true` | `undefined` |
| lte | lte | `[1,1]` | `true` | `undefined` |
| isBoolean | true | `[true]` | `true` | `undefined` |
| isBoolean | 숫자 | `[1]` | `false` | `undefined` |
| isDate | Date | `["2026-02-11T04:13:48.912Z"]` | `true` | `undefined` |
| isDate | 숫자 | `[1]` | `false` | `undefined` |
| toInteger | 기본 | `["3.2"]` | `3` | `undefined` |
| add | 기본 | `[6,4]` | `10` | `undefined` |
| ceil | ceil | `[4.006,2]` | `4.01` | `undefined` |
| floor | floor | `[4.006,2]` | `4` | `undefined` |
| round | round | `[4.006,2]` | `4.01` | `undefined` |
| divide | divide | `[6,4]` | `1.5` | `undefined` |
| multiply | multiply | `[6,4]` | `24` | `undefined` |
| subtract | subtract | `[6,4]` | `2` | `undefined` |
| maxBy | maxBy | `[[{"n":1},{"n":2},{"n":3}],null]` | `{"n":3}` | `undefined` |
| meanBy | meanBy | `[[{"n":1},{"n":2},{"n":3}],null]` | `2` | `undefined` |
| minBy | minBy | `[[{"n":1},{"n":2},{"n":3}],null]` | `{"n":1}` | `undefined` |
| sumBy | sumBy | `[[{"n":1},{"n":2},{"n":3}],null]` | `6` | `undefined` |
| assign | 기본 | `[{"a":1},{"b":2}]` | `{"a":1,"b":2}` | `undefined` |
| defaults | 기본 | `[{"a":1},{"a":2,"b":2}]` | `{"a":1,"b":2}` | `undefined` |
| has | 기본 | `[{"a":1},"a"]` | `true` | `undefined` |
| invert | 기본 | `[{"a":"1","b":"2"}]` | `{"1":"a","2":"b"}` | `undefined` |
| merge | 기본 | `[{"a":1},{"b":2}]` | `{"a":1,"b":2}` | `undefined` |
| set | 기본 | `[{},"a.b",1]` | `{"a":{"b":1}}` | `undefined` |
| toPairs | 기본 | `[{"a":1,"b":2}]` | `[["a",1],["b",2]]` | `undefined` |
| capitalize | 기본 | `["FRED"]` | `"Fred"` | `undefined` |
| kebabCase | 기본 | `["Foo Bar"]` | `"foo-bar"` | `undefined` |
| pad | 기본 | `["abc",8]` | `"  abc   "` | `undefined` |
| repeat | 기본 | `["*",3]` | `"***"` | `undefined` |
| snakeCase | 기본 | `["Foo Bar"]` | `"foo_bar"` | `undefined` |
| toLower | toLower | `["--Foo-Bar--"]` | `"--foo-bar--"` | `undefined` |
| toUpper | toUpper | `["--foo-bar--"]` | `"--FOO-BAR--"` | `undefined` |
| trimEnd | 기본 | `["  abc  "]` | `"  abc"` | `undefined` |
| words | 기본 | `["fred, barney, & pebbles"]` | `["fred","barney","pebbles"]` | `undefined` |
| once | 기본 | `[null]` | `` | `undefined` |
| chain | 기본 | `[[1,2,3]]` | `[1,2,3]` | `undefined` |
| defaultTo | 값 있음 | `[1,10]` | `1` | `undefined` |
| defaultTo | null | `[null,10]` | `10` | `undefined` |
| times | 기본 | `[3,null]` | `[0,2,4]` | `undefined` |

---

## 2. 다음 직접 작업 (AI가 할 일)

**목표**: 위 실패 목록의 각 행을 하나씩 해소합니다. `actual`이 `expected`와 같아지도록 해당 함수를 구현·수정하세요.

| 단계 | 할 일 |
|------|--------|
| 1 | 실패 목록에서 **함수명** 확인 (예: `differenceBy`, `fill`) |
| 2 | `packages/core/src/` 아래 해당 파일 열기 (array → array.ts, Lang → lang.ts, Math → math.ts, Number → number.ts, Object → object.ts, String → string.ts, Collection → collection.ts, Function → function.ts, Util → util.ts, Seq → seq.ts, Date → date.ts) |
| 3 | 해당 함수가 플레이스홀더(`() => {}`)면 **lodash와 동일한 시그니처·반환값**으로 구현. 이미 구현돼 있으면 `expected`와 다르게 나온 **로직**만 수정 |
| 4 | 구현 시 **위 표의 `args`·`expected`**를 그대로 넣어 호출했을 때 같은 값이 나오는지 확인 |
| 5 | 저장 후 `bun run --filter=@lodash-v2/test test` 실행 → 해당 함수 테스트 통과 확인 |
| 6 | (선택) `bun run generate-feedback` 재실행 → 실패 개수 감소 확인. 0이 될 때까지 1~5 반복 |

**우선순위**: 실패 목록 **맨 위** 함수부터 순서대로 처리하면 됩니다. 한 번에 한 함수만 수정해도 됩니다.

---

## 3. 셀프 피드백 체크리스트

1. **결과 실패**: 위 표에서 `actual`을 `expected`와 같게 만드세요. (`packages/core` 수정)
2. **재검증**: 수정 후 `bun run --filter=@lodash-v2/test test`, `bun run generate-feedback` 로 다시 확인하세요.

자세한 해석 방법은 `docs/RESULT_FEEDBACK.md`를 참고하세요.
