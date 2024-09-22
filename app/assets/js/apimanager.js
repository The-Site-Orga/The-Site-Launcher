// insert the site, website api with api url is https://api.the-site.fr/
const API_URL = 'http://localhost:3000/'

/**
 * Get the distribution from the API and check if player is in whitelist.
 *
 * @param {string} uuid
 * @returns {Promise} 
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

module.exports = { isWhitelist }