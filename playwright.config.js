// @ts-check
import {defineConfig, devices} from '@playwright/test';
import {defineBddConfig} from "playwright-bdd";
import path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

const testDir = defineBddConfig({
    outputDir: path.resolve(import.meta.dirname, './test'),
    features: [path.resolve(import.meta.dirname, './features/')],
    steps: [path.resolve(import.meta.dirname, './fixture.js'), path.resolve(import.meta.dirname, './steps/*.steps.js')],
});

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
export default defineConfig({
    testDir,

    /* Maximum time one test can run for. */
    timeout: 30 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000,
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: true,
    /* Retry on CI only */
    retries: 2,
    /* Opt out of parallel tests on CI. */
    workers: 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    //reporter: "html",
    //reporter: [['junit', { outputFile: 'pw_junit_report.xml' }]],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: {...devices['Desktop Chrome']},
        }/*,
        {
            name: "chrome@latest:Windows 10",
            use: { ...devices['Desktop Chrome'] },
        }*/
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/',

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
});
