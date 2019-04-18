const { Client, logger, Variables, File } = require("camunda-external-task-client-js");
const DB = require('./db');
const config = require('./config');
const debug = require('debug')('worker:main');

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const client = new Client({ baseUrl: config.BPM_ENGINE_URL, use: logger });

// susbscribe to the topic: 'antifraudActions'
client.subscribe("antifraudActions", async function ({ task, taskService }) {
    debug(task);

    const processId = task.variables.get('processId');

    debug(`running some antifraud actions for process ${processId}`);

    const client = new DB({
        host: config.MONGO_HOST,
        port: config.MONGO_PORT,
        username: config.MONGO_USERNAME,
        password: config.MONGO_PASSWORD
    });

    const db = await client.connect();

    const collection = db.collection(config.MONGO_COLLECTION);

    collection.insertOne({
        timestamp: new Date().toISOString(),
        event: 'RAN_AUTOMATIC_ANTIFRAUD_VALIDATION',
        message: 'Ran automatic antifraud validation inside antifraud-worker',
        notified: false,
        processId
    });

    client.close();

    const variables = new Variables().setAll({ fraudPass: true });

    await taskService.complete(task, variables);
});
