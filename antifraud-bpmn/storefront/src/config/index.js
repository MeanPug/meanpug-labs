try {
	require('dotenv').config();
} catch {
	console.info('dotenv lib not available');
}

const helpers = require('../lib/helpers');

module.exports = {
	BPM_ENGINE_URL: helpers.getEnv('BPM_ENGINE_URL'),
	BPM_PROCESS_DEFINITION_ID: helpers.getEnv('BPM_PROCESS_DEFINITION_ID'),
};
