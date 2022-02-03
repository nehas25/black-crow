const express = require('express');
const router = express.Router();
const db = require('../models/Accessory');

router.get('/accessories.ejs', (req, res) => {
  let allAccessories = new db.Accessory().getAllAccessoriesFromDb();

  allAccessories.forEach((accessory) => {
    accessory.htmlId = accessory.name.replace(/ /g, '-').toLowerCase().concat('-listing');
  });

  res.render('accessories/accessories', {allAccessories: allAccessories});
});

module.exports = router;