const request = require('request-promise');
const express = require('express');
const router = express.Router();

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

    res.json({ processId: 'asldfkkdsfjalskfj123', processUrl: 'https://www.foobar.com' });
});

module.exports = router;
