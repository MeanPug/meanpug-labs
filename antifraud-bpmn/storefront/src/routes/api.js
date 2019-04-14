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

module.exports = router;
