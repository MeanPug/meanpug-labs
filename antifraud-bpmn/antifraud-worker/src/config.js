module.exports = {
    BPM_ENGINE_URL: process.env.BPM_ENGINE_URL,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DBNAME: process.env.MONGO_DBNAME,
    MONGO_COLLECTION: process.env.MONGO_COLLECTION || 'Events'
};
