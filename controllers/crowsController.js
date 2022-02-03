const express = require('express');
const router = express.Router();
const db = require('../models/Crow');

router.get('/crows.ejs', (req, res) => {
  let allCrows = new db.Crow().getAllCrowsFromDb();

  allCrows.forEach((crow) => {
    crow.htmlId = crow.name.replace(/ /g, '-').toLowerCase().concat('-listing');
  });

  res.render('crows/crows', {allCrows: allCrows});
});

module.exports = router;