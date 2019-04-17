const express = require('express');
const router = express.Router();
const { launchProcess } = require('../lib/bpm');
const { BPM_ENGINE_URL, BPM_PROCESS_DEFINITION_KEY } = require('../config');

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

    console.log(`purchasing item ${name} with price ${price}`);

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
            console.error(`got error ${err} launching promise`);

            const messages = [
                `Got an error (${err}) attempting to launch the process`,
            ];

            res.json({ messages });
        });
});

module.exports = router;
