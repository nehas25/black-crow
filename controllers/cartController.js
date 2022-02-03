const express = require('express');
const router = express.Router();

router.get('/cart.ejs', (req, res) => {
  res.render('cart/cart.ejs');
});

module.exports = router;