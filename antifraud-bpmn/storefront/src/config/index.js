try {
	require('dotenv').config();
} catch {
	console.info('dotenv lib not available');
}

const helpers = require('../lib/helpers');

module.exports = {
	ENGINE_URL: helpers.getEnv('ENGINE_URL'),
};
