import { createBdd } from 'playwright-bdd';
import { loadConfigClient, getConfigClient } from '../clients/clientStore.js';

const { Given } = createBdd();

/**
 * Given step to load a specific client configuration based on the client's name.
 *
 * @step "I use the client {string}"
 * @param {Object} page - The Playwright page object used for browser interactions.
 * @param {string} client - The name of the client whose configuration should be loaded.
 * @example
 * // Usage in a .feature file
 * Given I use the client "ClientA"
 */
Given('I use the client {string}', async ({ page }, client) => {
    // Load configuration for the specified client
    loadConfigClient(client);
});

/**
 * Given step to visit a specific path on the client's website.
 *
 * @step "I visit path {string}"
 * @param {Object} page - The Playwright page object used for navigation.
 * @param {string} linkTitle - The name of the path to visit, corresponding to a key in the client’s configuration.
 * @example
 * // Usage in a .feature file
 * Given I visit path "home"
 */
Given('I visit path {string}', async ({ page }, linkTitle) => {
    // Retrieve the client configuration that was previously loaded
    let clientConfig = getConfigClient();

    // Navigate to the URL associated with the specified path in the client configuration
    await page.goto(clientConfig.url[linkTitle]);
});
