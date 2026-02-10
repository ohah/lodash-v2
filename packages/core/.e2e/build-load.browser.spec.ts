/**
 * 빌드 산출물이 Web(브라우저)에서 로드·실행되는지 검증
 * test-browser.html이 dist/index.js(ESM)를 로드하고 결과를 window에 기록함.
 * webServer로 정적 서버 기동 후 http에서 로드 (file:// 은 ESM 불가).
 */

import { expect, test } from "@playwright/test";

test("Web(브라우저)에서 ESM 번들 로드 후 함수 호출 가능", async ({ page }) => {
  await page.goto("/test-browser.html");
  const result = await page.evaluate(() => {
    return new Promise<{ ok: boolean; message?: string }>((resolve) => {
      const check = () => {
        const r = (window as unknown as { __LODASH_V2_WEB_TEST__?: { ok: boolean; message?: string } })
          .__LODASH_V2_WEB_TEST__;
        if (r !== undefined) {
          resolve(r);
          return;
        }
        setTimeout(check, 50);
      };
      check();
    });
  });
  expect(result.ok, result.message || "브라우저에서 번들 로드/실행 실패").toBe(true);
});
