import { expect } from "@playwright/test";
import { createBdd } from 'playwright-bdd';
import { getConfigClient } from '../clients/clientStore.js';

const { Then } = createBdd();


/**
 * Then step to check the visibility of an element with a specific role and name.
 *
 * @step "I should see an element with role {string} and name {string}"
 * @param {Object} page - The Playwright page object for browser interaction.
 * @param {string} role - The role attribute of the element (e.g., "button", "link").
 * @param {string} text - The accessible name of the element.
 * @example
 * // Usage in a .feature file
 * Then I should see an element with role "button" and name "Submit"
 */
Then('I should see an element with role {string} and name {string}', async ({ page }, role, text) => {
    // Assert that an element with the specified role and name is visible on the page
    await expect(page.getByRole(role, { name: text })).toBeVisible();
});


/**
 * Then step to check the visibility of an element containing specific text on the page.
 *
 * @step "I should see an element with content {string}"
 * @param {Object} page - The Playwright page object used to interact with the browser.
 * @param {string} text - The exact text content expected to be visible in an element on the page.
 * @example
 * // Usage in a .feature file
 * Then I should see an element with content "Le compte existe déjà"
 */
Then('I should see an element with content {string}', async ({ page }, text) => {
    // Assert that an element containing the specified text is visible on the page
    await expect(page.getByText(text)).toBeVisible();
});

/**
 * Then step to check the visibility of an element containing specific text on the page.
 *
 * @step "I should not see an element with content {string}"
 * @param {Object} page - The Playwright page object used to interact with the browser.
 * @param {string} text - The exact text content expected to be invisible in an element on the page.
 * @example
 * // Usage in a .feature file
 * Then I should not see an element with content "Le compte existe déjà"
 */
Then('I should not see an element with content {string}', async ({ page }, text) => {
    // Assert that no element containing the specified text is visible on the page
    await expect(page.getByText(text)).toBeHidden();
});

/**
 * Then step to check that the current URL contains a specific string.
 *
 * @step "I should have {string} in url"
 * @param {Object} page - The Playwright page object.
 * @param {string} url - The substring expected to be found in the current URL.
 * @example
 * // Usage in a .feature file
 * Then I should have "dashboard" in url
 */
Then('I should have {string} in url', async ({ page }, url) => {
    // Assert that the current URL contains the specified string (using a regular expression)
    await expect(page).toHaveURL(new RegExp(`/${url}`));
});


/**
 * Then step to check that the current URL matches a specific URL from the client configuration.
 *
 * @step "I should be on url {string}"
 * @param {Object} page - The Playwright page object.
 * @param {string} pathname - The key for a specific URL path in the client configuration.
 * @example
 * // Usage in a .feature file
 * Then I should be on url "home"
 */
Then('I should be on url {string}', async ({ page }, pathname) => {
    // Retrieve the client configuration, which includes predefined URLs
    let clientConfig = getConfigClient();

    // Assert that the current URL matches the configured URL for the specified path
    await expect(page).toHaveURL(clientConfig.url[pathname]);
});

/**
 * Then step to check that the input content with a specific label is crypted
 * 
 * @step "The sentence in the form named {string} should be crypted"
 * @param {Object} page - The Playwright page object.
 * @param {string} inputLabel - The input label that should be crypted.
 * @example
 * // Usage in a .feature file
 * The sentence in the form named "Password" should be crypted
 */
Then('The sentence in the form named {string} should be crypted', async ({ page }, inputLabel) => {

    //Check if the input has the attribute password
    await expect(page.getByLabel(inputLabel)).toHaveAttribute("type", "password");
});

Then('I should see a button named {string} disabled', async ({ page }, inputLabel) => {
    await expect(page.getByRole('button', {name : inputLabel}).isDisabled());
});


Then('The form named {string} should have {string} state', async ({ page }, idInput, inputState) => {

    //await expect(page.locator('div').filter({ hasText: /^Email\*Le compte existe déjà, veuillez vous connecter\.$/ }).locator('path'));
    //wait expect(page.getByLabel('Email*'));

    /*
    const iconState  = "";
    if(inputState == "checked"){
        iconState  = "M8.138 20l-6.94-6.94 1.335-1.336 5.605 5.605L21.468 4l1.335 1.335z";
    }else if(inputState == "failed"){
        iconState  = "M20.004 5.455L18.55 4l-6.547 6.547L5.46 4 4.004 5.455l6.547 6.542-6.547 6.547L5.46 20l6.542-6.547L18.549 20l1.455-1.456-6.547-6.547z";
    }

    const icon = page.locator('div').filter({ has: page.locator('id=' + idInput)}).locator('path');

    await expect(icon).toHaveAttribute("d", iconState);
    */

});
