const express = require('express');
const products = require('../data/products');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {
      title: 'MeanPug Labs - Camunda BPM Storefront',
      header: 'Shades of Pug - Fashion Boutique and Influencer',
      formatPrice: function(p) {
          return '$' + (p / 100).toFixed(2);
      },
      products
  })
});

module.exports = router;
