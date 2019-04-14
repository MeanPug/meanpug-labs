const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {
      title: 'Hey',
      header: 'Hello there!'
  })
});

module.exports = router;
