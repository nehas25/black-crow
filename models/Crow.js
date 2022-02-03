const crowsData = require('../data/crowsData');

class Crow {
  id;
  name;
  price;
  imgName;

  constructor(id, name, price, imgName) {
    this.id = id;
    this.name = name;
    this.price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    this.imgName = imgName;
  }

  getAllCrowsFromDb() {
    return crowsData.crows.map((crow) => new Crow(crow.id, crow.name, crow.price, crow.imgName));
  }

}

module.exports = {
  Crow: Crow,
};