const express = require('express');
const router = express.Router();
const { launchProcess } = require('../lib/bpm');
const { BPM_ENGINE_URL, BPM_PROCESS_DEFINITION_ID } = require('../config');

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

    const processPromise = launchProcess(BPM_ENGINE_URL, BPM_PROCESS_DEFINITION_ID, {
        orderValue: { value: price },
        orderName: { value: name },
    });

    processPromise
        .then(function(resp) {
            res.json({ processId: resp.id, processUrl: `${BPM_ENGINE_URL}/app/cockpit/default/#/process-instance/${resp.id}/runtime` });
        })
        .catch(function(err) {
            console.error(`got error ${err} launching promise`);
            res.json({ processId: `error launching process: ${err}`, processUrl: '' });
        });
});

module.exports = router;
