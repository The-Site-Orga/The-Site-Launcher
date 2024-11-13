const API_URL = 'http://api.the-site.fr/' // API URL

/**
 * Get the distribution from the API and check if player is in whitelist.
 *
 * @param {string} uuid - The player
 * @returns {Boolean} - True if player is in whitelist, false otherwise
 */
async function isWhitelist(uuid) {
    try {
        uuid = uuid.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
        const response = await fetch(API_URL + 'whitelist/player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid: uuid })
        });

        const data = await response.json();
        const isWhitelisted = data.whitelist;

        return isWhitelisted;
    } catch (err) {
        console.error('Error:', err);
        return false;
    }
}

/**
 * Get the distribution from the API and check if player is a maintainer.
 * 
 * @param {string} uuid - The player
 * @returns {Boolean} - True if player is a maintainer, false otherwise
 */
async function isMaintainer(uuid) {
    try {
        uuid = uuid.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
        const response = await fetch(API_URL + 'maintainer/player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid: uuid })
        });

        const data = await response.json();
        const isMaintainer = data.maintainer;

        return isMaintainer;
    } catch (err) {
        console.error('Error:', err);
        return false;
    }
}

module.exports = { isWhitelist, isMaintainer }