const express = require('express');
const router = express.Router();
const debug = require('debug')('storefront:api');
const DB = require('../lib/db');
const { launchProcess } = require('../lib/bpm');
const {
    BPM_ENGINE_URL,
    BPM_PROCESS_DEFINITION_KEY,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_DBNAME,
    MONGO_COLLECTION
} = require('../config');

// middleware that is specific to this router
router.use(function logRequest(req, res, next) {
    console.log(`${req.method} ${req.originalUrl} [${Date.now()}]`);
    next()
});

router.get('/ht', function (req, res) {
    res.send('ok');
});

router.post('/purchase', function (req, res) {
    const { price, name } = req.body;

    debug(`purchasing item ${name} with price ${price}`);

    const processPromise = launchProcess(BPM_ENGINE_URL, BPM_PROCESS_DEFINITION_KEY, {
        orderValue: { value: price },
        orderName: { value: name },
    });

    processPromise
        .then(function(resp) {
            const processInstance = `${BPM_ENGINE_URL}/app/cockpit/default/#/process-instance/${resp.id}/runtime`;
            const tasklist = `${BPM_ENGINE_URL}/app/tasklist/default/`;

            const messages = [
                `Process with ID ${resp.id} launched`,
                `Visit URL <a href="${processInstance}">${processInstance}</a> to explore the process`,
                `Visit URL <a href="${tasklist}">${tasklist}</a> to view, claim, and complete assigned user tasks`,
            ];

            res.json({ processId: resp.id, messages });
        })
        .catch(function(err) {
            debug(`got error ${err} launching promise`);

            const messages = [
                `Got an error (${err}) attempting to launch the process`,
            ];

            res.json({ messages });
        });
});

router.get('/logs', async function(req, res) {
    const processId = req.query.processId;

    const client = new DB({
        host: MONGO_HOST,
        port: MONGO_PORT,
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD
    });

    const db = await client.connect(MONGO_DBNAME);

    const collection = db.collection(MONGO_COLLECTION);

    debug(`looking for new messages for process ${processId}`);

    collection.find({ processId, notified: false }).toArray((err, docs) => {
        debug(`found ${docs.length} unnotified events for process ${processId}`);

        const messages = docs.map(d => `${d.event} - ${d.message}`);

        if (docs.length > 0) {
            collection.updateMany({ processId, notified: false }, { $set: { notified: true } }, function(err, updates) {
                if (err) {
                    res.json({ processId, messages: [`got error (${err}) updating notifications, try reloading`] });
                } else {
                    debug(`updated ${updates.modifiedCount} records to notified`);
                    res.json({ processId, messages });
                }

                client.close();
            });
        } else {
            res.json({ processId, messages });

            client.close()
        }
    });
});

module.exports = router;
