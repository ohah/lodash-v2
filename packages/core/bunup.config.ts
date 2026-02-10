/**
 * Bunup 빌드 설정 — Node + Web 통합 (한 번 빌드로 둘 다 사용)
 * target: browser → Node 전용 API 미사용, 동일 파일로 Node/브라우저 모두 실행
 * @see https://bunup.dev/docs/scaffold-with-bunup.html
 */

import { defineConfig } from "bunup";

export default defineConfig({
  entry: "src/index.ts",
  outDir: "dist",
  format: ["esm", "cjs"],
  target: "browser",
  dts: { inferTypes: true },
  preferredTsconfig: "./tsconfig.json",
  exports: false,
});
