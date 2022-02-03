const accessoriesData = require('../data/accessoriesData');

class Accessory {
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

  getAllAccessoriesFromDb() {
    return accessoriesData.accessories.map((acc) => new Accessory(acc.id, acc.name, acc.price, acc.imgName));
  }

}

module.exports = {
  Accessory: Accessory,
};