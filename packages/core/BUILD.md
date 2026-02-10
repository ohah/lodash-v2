# @lodash-v2/core 빌드

- **빌드 툴**: [Bunup](https://bunup.dev/docs/scaffold-with-bunup.html)
- **타깃**: Node + Web 통합 (`target: "browser"` → 한 번 빌드로 둘 다 사용)
- **포맷**: ESM + CJS

## 개발 (지금)

- 테스트는 **빌드된 결과(`dist`)** 기준으로 실행됩니다.
- `bun test` 시 **pretest** 로 `bun run build`가 먼저 실행됩니다.

```bash
bun test              # Node: ESM/CJS 로드 + exports 검증
bun run test:browser  # Web: Chromium에서 ESM 번들 로드 검증
bun run test:all      # 위 둘 다 실행
```

## 빌드

```bash
bun run build
```

- `dist/` 에 ESM(`.js`) + CJS(`.cjs`) + 타입 선언(`.d.ts`, `.d.cts`) 생성.

## 배포 시 (npm publish)

1. `bun run build` 실행.
2. `package.json` 의 `exports` / `main` / `types` 를 `dist` 기준으로 바꾸거나,  
   `exports` 만 아래처럼 두고 배포:

```json
"main": "./dist/index.cjs",
"module": "./dist/index.js",
"types": "./dist/index.d.ts",
"exports": {
  ".": {
    "import": "./dist/index.js",
    "require": "./dist/index.cjs",
    "types": "./dist/index.d.ts"
  }
}
```

3. `files` 에 `"dist"` 포함되어 있으면 dist만 퍼블리시됨.
