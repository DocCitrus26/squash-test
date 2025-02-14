import * as fs from 'fs';
import * as path from 'path';

export let currentClient;

/**
 * Loads the configuration file for a specified client and stores it in `currentClient`.
 *
 * @param {string} client - The name of the client whose configuration file will be loaded.
 * @example
 * // Load the configuration for "ClientA"
 * loadConfigClient("m6");
 */
export function loadConfigClient(client) {
    // Read and parse the JSON configuration file for the specified client
    const configPath = path.resolve(import.meta.dirname, './configClient/' + client + '.json')
    currentClient = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

/**
 * Retrieves the configuration of the currently loaded client.
 *
 * @returns {Object} The configuration object for the current client.
 * @example
 * // Get the current client configuration
 * const config = getConfigClient();
 */
export function getConfigClient() {
    // Return the configuration object currently stored in `currentClient`
    return currentClient;
}
