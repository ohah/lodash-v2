# lodash-v2

lodash 4.17.23과 **동일한 API**를 제공하면서 **더 빠른** 구현을 목표로 하는 라이브러리입니다.

- [chrome-remote-devtools](https://github.com/ohah/chrome-remote-devtools) 스타일의 **Bun 모노레포** 구조
- 모든 lodash 함수에 대한 **플레이스홀더** (`() => {}`) 구현
- **속도 벤치마크** 및 **결과 정확성 테스트** 유틸 제공

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
bun run benchmark
bun run benchmark:compare
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
  - `compareSpeed(ours, lodashFn, iterations)` : ours vs lodash 속도 비교, `faster`, `ratio` 반환
- **결과 테스트**
  - `runResultTest(ours, lodashFn, cases)` : 동일 입력에 대해 ours와 lodash 결과가 같은지 검증
- **스위트**
  - `runBenchmarkSuite({ name, ours, lodashFn, resultCases, speedArgs })` : 결과 테스트 + 속도 비교 한 번에 실행

#### 벤치마크 테스트 작성 예시

```ts
import _ from "lodash";
import { chunk } from "@lodash-v2/core";
import { runBenchmarkSuite } from "@lodash-v2/benchmark";

const result = runBenchmarkSuite({
  name: "chunk",
  ours: (arr, size) => chunk(arr, size),
  lodashFn: _.chunk,
  resultCases: [
    { name: "size 2", args: [[1, 2, 3, 4], 2] },
  ],
  speedArgs: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2],
  speedIterations: 10_000,
});
```

## Git 설정 (이 저장소)

- `user.name`: ohah
- `user.email`: bookyoon173@gmail.com
- `remote.origin`: git@github.com-private:ohah/lodash-v2.git

## 참고

- [Lodash 문서](https://lodash.com/docs/4.17.23)
- [chrome-remote-devtools](https://github.com/ohah/chrome-remote-devtools) (Bun 모노레포 참고)
