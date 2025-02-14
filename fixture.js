import {test as base} from 'playwright-bdd';

export const test = base.extend({
    page: async ({page, playwright}, use, testInfo) => {
        use(page);
    },

    beforeEach: [
        async ({page}, use) => {
            await use();
        },
        {auto: true},
    ],

    afterEach: [
        async ({page}, use, testInfo) => {
            await use();

            if (testInfo.status === "failed") {
                await page
                    .context()
                    .tracing.stop({path: `${testInfo.outputDir}/trace.zip`});
                await page.screenshot({path: `${testInfo.outputDir}/screenshot.png`});
                await testInfo.attach("screenshot", {
                    path: `${testInfo.outputDir}/screenshot.png`,
                    contentType: "image/png",
                });
                await testInfo.attach("trace", {
                    path: `${testInfo.outputDir}/trace.zip`,
                    contentType: "application/zip",
                });
            }
        },
        {auto: true},
    ],
});
