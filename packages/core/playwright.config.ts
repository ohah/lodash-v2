import { defineConfig, devices } from "@playwright/test";

const PORT = 3967;

export default defineConfig({
  testDir: ".e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    trace: "off",
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: {
    command: `bun run scripts/serve.ts`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
