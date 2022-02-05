const express = require('express');
const router = express.Router();
const db = require('../models/Crow');

router.get('/crows.ejs', (req, res) => {
  let allCrows = new db.Crow().getAllCrowsFromDb();

  allCrows.forEach((crow) => {
    crow.htmlId = crow.name.replace(/ /g, '-').toLowerCase().concat('-listing');
    crow.priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(crow.price);
  });

  res.render('crows/crows', {allCrows: allCrows});
});

module.exports = router;