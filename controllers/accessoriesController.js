const express = require('express');
const router = express.Router();
const db = require('../models/Accessory');

router.get('/accessories.ejs', (req, res) => {
  let allAccessories = new db.Accessory().getAllAccessoriesFromDb();

  allAccessories.forEach((accessory) => {
    accessory.htmlId = accessory.name.replace(/ /g, '-').toLowerCase().concat('-listing');
    accessory.priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(accessory.price);
  });

  res.render('accessories/accessories', {allAccessories: allAccessories});
});

module.exports = router;