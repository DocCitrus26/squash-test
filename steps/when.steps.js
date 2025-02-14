import { expect } from "@playwright/test";
import { createBdd } from 'playwright-bdd';
import { getConfigClient } from '../clients/clientStore.js';

const { When } = createBdd();

/**
 * When step to accept the cookies popup on the client’s website.
 *
 * @step "I accept cookies's site"
 * @param {Object} page - The Playwright page object for interacting with the browser.
 * @example
 * // Usage in a .feature file
 * When I accept cookies's site
 */
When('I accept coockies\'s site', async ({page}) => {
    // Retrieve the client configuration, which includes the cookies popup details
    let clientConfig = getConfigClient();

    // Assert that the cookies popup title is visible on the page
    await expect(page.getByText(clientConfig.cookiesPopup.title).first()).toBeVisible();

    // Click the "Accept All" button in the cookies popup
    await page.getByRole('button', { name: clientConfig.cookiesPopup.labelBtnAcceptAll }).click();

    // Wait for 1 second after clicking to allow any animations or transitions to complete
    await page.waitForTimeout(1000);
});

/**
 * When step to click on the Profile settings button.
 *
 * @step "I click on Profil settings"
 * @param {Object} page - The Playwright page object.
 * @example
 * // Usage in a .feature file
 * When I click on Profil settings
 */
When('I click on Profil settings', async ({ page }) => {
    // Locate the profile settings button by its ID
    const profilButton = page.locator('#account');

    // Click the profile settings button with a timeout of 1 second
    await profilButton.click({ timeout: 1000 });
});

/**
 * When step to type a specific sentence into an input field with a given label.
 *
 * @step "I type the sentence {string} in the form named {string}"
 * @param {Object} page - The Playwright page object.
 * @param {string} value - The sentence to type in the form.
 * @param {string} idInput - The label of the input field where the sentence will be typed.
 * @example
 * // Usage in a .feature file
 * When I type the sentence "Hello, World!" in the form named "searchInput"
 */
When('I type the sentence {string} in the form named {string}', async ({ page }, value, labelInput) => {

    const inputValue = value === 'EMPTY' ? '' : value;

    // Locate the input field by its label
    const input = page.getByLabel(labelInput+'*');

    // Fill the input field with the specified sentence
    await input.fill(inputValue);
});

/**
 * When step to click on a button or link with a specified label.
 *
 * @step "I click on button named {string}"
 * @param {Object} page - The Playwright page object.
 * @param {string} labelBtn - The label of the button or link to click.
 * @example
 * // Usage in a .feature file
 * When I click on button named "Submit"
 */
When('I click on button named {string}', async ({ page }, labelBtn) => {
    try {
        // Attempt to click a button with the specified label
        await page.getByRole('button', { name: labelBtn }).click({ timeout: 1000 });
    } catch (error) {
        try {
            // If the button is not found, try to click a link styled as a button with the specified text
            await page.locator('a:has-text("' + labelBtn + '")').click({ timeout: 1000 });
        } catch (error) {
            // If still not found, attempt to click a link with the specified label as a fallback
            await page.getByRole('link', { name: labelBtn }).click({ timeout: 1000 });
        }
    }
});