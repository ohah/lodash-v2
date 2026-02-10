/**
 * 빌드 산출물(dist)이 Node에서 ESM/CJS 둘 다 로드·실행되는지 검증
 * - 수정 후 pretest → build → 이 테스트가 dist 기준으로 동작함
 */

import { describe, expect, test } from "bun:test";
import { join } from "path";

const distDir = join(import.meta.dir, "../../dist");

describe("빌드 산출물 Node 로드 (통합 빌드)", () => {
  test("ESM(dist/index.js) 로드 후 export 존재 및 함수 호출 가능", async () => {
    const mod = await import(join(distDir, "index.js"));
    expect(typeof mod.chunk).toBe("function");
    expect(typeof mod.identity).toBe("function");
    expect(typeof mod.compact).toBe("function");
    // 플레이스홀더여도 호출 시 에러 없이 동작
    expect(() => mod.chunk([1, 2, 3], 2)).not.toThrow();
    expect(mod.identity(42)).toBeUndefined(); // placeholder
  });

  test("CJS(dist/index.cjs) 로드 후 export 존재 및 함수 호출 가능", async () => {
    const mod = require(join(distDir, "index.cjs"));
    expect(typeof mod.chunk).toBe("function");
    expect(typeof mod.identity).toBe("function");
    expect(() => mod.chunk([1, 2, 3], 2)).not.toThrow();
    expect(mod.identity(42)).toBeUndefined();
  });
});
