import { describe, expect, test } from "bun:test";
import { compareSpeed, runSpeedTest } from "../speed";

describe("runSpeedTest", () => {
  test("반환값에 totalMs, avgMs, iterations, opsPerSec 포함", () => {
    const result = runSpeedTest(() => 1 + 1, 100);
    expect(result).toHaveProperty("totalMs");
    expect(result).toHaveProperty("avgMs");
    expect(result).toHaveProperty("iterations", 100);
    expect(result).toHaveProperty("opsPerSec");
    expect(result.iterations).toBe(100);
    expect(result.avgMs).toBe(result.totalMs / 100);
  });

  test("기본 iterations 10_000", () => {
    const result = runSpeedTest(() => {});
    expect(result.iterations).toBe(10_000);
  });
});

describe("compareSpeed", () => {
  test("ours vs lodash 결과와 faster, ratio 반환", () => {
    const fast = () => 1;
    const slow = () => {
      let x = 0;
      for (let i = 0; i < 100; i++) x += i;
      return x;
    };
    const out = compareSpeed(fast, slow, 1000);
    expect(out).toHaveProperty("ours");
    expect(out).toHaveProperty("lodash");
    expect(out.faster).toBe("ours");
    expect(out.ratio).toBeGreaterThan(1);
  });
});
