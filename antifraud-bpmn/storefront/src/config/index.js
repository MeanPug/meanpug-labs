try {
	require('dotenv').config();
} catch {
	console.info('dotenv lib not available');
}

const helpers = require('../lib/helpers');

module.exports = {
	BPM_ENGINE_URL: helpers.getEnv('BPM_ENGINE_URL'),
	BPM_PROCESS_DEFINITION_KEY: helpers.getEnv('BPM_PROCESS_DEFINITION_KEY'),
	MONGO_HOST: helpers.getEnv('MONGO_HOST'),
    MONGO_PORT: helpers.getEnv('MONGO_PORT'),
    MONGO_USERNAME: helpers.getEnv('MONGO_USERNAME'),
    MONGO_PASSWORD: helpers.getEnv('MONGO_PASSWORD'),
    MONGO_DBNAME: helpers.getEnv('MONGO_DBNAME'),
    MONGO_COLLECTION: helpers.getEnv('MONGO_COLLECTION', true, 'Events')
};
