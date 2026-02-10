# lodash-v2

lodash 4.17.23과 **동일한 API**를 제공하면서 **더 빠른** 구현을 목표로 하는 라이브러리입니다.

- [chrome-remote-devtools](https://github.com/ohah/chrome-remote-devtools) 스타일의 **Bun 모노레포** 구조
- 모든 lodash 함수에 대한 **플레이스홀더** (`() => {}`) 구현
- **속도 벤치마크** 및 **결과 정확성 테스트** 유틸 제공
- **es-toolkit 1.44**와 3-way 비교 (ours / lodash / es-toolkit) 지원
- **린트/포맷**: chrome-remote-devtools와 동일하게 oxlint, oxfmt, .editorconfig, .vscode 설정

## 구조

```
lodash-v2/
├── packages/
│   ├── core/          # lodash 동일 함수들 (플레이스홀더 → 구현 예정)
│   └── benchmark/     # 속도/결과 테스트 유틸 및 스크립트
├── package.json       # workspaces: ["packages/*"]
├── bunfig.toml
└── tsconfig.json
```

## 설치 및 실행

```bash
bun install
bun test
bun run lint                # oxlint
bun run format              # oxfmt (저장 시 포맷은 .vscode/settings.json 참고)
bun run format:check         # 포맷 검사만 (CI용)
bun run benchmark
bun run benchmark:compare
bun run generate-feedback    # AI 셀프 피드백용 보고서 생성 → docs/feedback-report.md
```

## 패키지

### @lodash-v2/core

- **Array**: chunk, compact, concat, difference, drop, flatten, uniq, zip, ...
- **Collection**: countBy, every, filter, find, map, reduce, sortBy, ...
- **Date**: now
- **Function**: debounce, throttle, curry, memoize, ...
- **Lang**: cloneDeep, isArray, isEqual, toArray, ...
- **Math**: add, max, min, sum, mean, ...
- **Number**: clamp, inRange, random
- **Object**: assign, get, set, merge, pick, omit, ...
- **Seq**: chain, tap, thru
- **String**: camelCase, trim, escape, ...
- **Util**: identity, range, times, ...

현재는 모두 `() => {}` 플레이스홀더입니다. 위 목록과 동일한 시그니처로 구현하면 됩니다.

### @lodash-v2/benchmark

- **속도 테스트**
  - `runSpeedTest(fn, iterations)` : 단일 함수 N회 실행 후 `totalMs`, `avgMs`, `opsPerSec` 반환
  - `compareSpeed(ours, lodashFn, iterations)` : ours vs lodash 속도 비교
  - `compareSpeedThree(ours, lodashFn, esToolkitFn, iterations)` : **ours / lodash / es-toolkit** 3-way 비교, `fastest`, `ratios` 반환
- **결과 테스트**
  - `runResultTest(ours, lodashFn, cases)` : ours vs lodash 결과 검증
  - `runResultTestThree(ours, lodashFn, esToolkitFn, cases)` : **3-way** 결과 검증 (기준: lodash)
- **스위트**
  - `runBenchmarkSuite({ name, ours, lodashFn, esToolkitFn?, resultCases, speedArgs })` : `esToolkitFn` 있으면 3-way 비교

#### 벤치마크 테스트 작성 예시

```ts
import _ from 'lodash';
import { chunk } from '@lodash-v2/core';
import { runBenchmarkSuite } from '@lodash-v2/benchmark';

const result = runBenchmarkSuite({
  name: 'chunk',
  ours: (arr, size) => chunk(arr, size),
  lodashFn: _.chunk,
  resultCases: [{ name: 'size 2', args: [[1, 2, 3, 4], 2] }],
  speedArgs: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2],
  speedIterations: 10_000,
});
```

## 문서 (AI 셀프 피드백)

- **[docs/BENCHMARK_AND_RESULT_FEEDBACK.md](docs/BENCHMARK_AND_RESULT_FEEDBACK.md)** — 벤치마크·결과 실패 출력 형식 해석 가이드. AI가 보고서를 읽고 수정 방향을 잡을 수 있도록 작성됨.
- **docs/feedback-report.md** — `bun run generate-feedback` 실행 시 생성되는 마크다운. 결과 동등성 실패 목록(함수, 케이스, expected vs actual)과 벤치마크 요약이 포함됨.

## 참고

- [Lodash 문서](https://lodash.com/docs/4.17.23)
- [es-toolkit](https://es-toolkit.dev) 1.44 (비교 대상)
