const addToCartBtns = document.getElementsByClassName('add-to-cart-btn');

class Cart {
  constructor(storage) {
    this.storage = storage;
  }

  static getInstance() {
    if (!Cart.instance) {
      Cart.instance = new Cart(window.localStorage);
    }
    return Cart.instance;
  }

  initialize() {
    for(let i=0; i<addToCartBtns.length; i++) {
      addToCartBtns[i].addEventListener('click', this.addItemToCart.bind(this, addToCartBtns[i]), false);
    }
  }

  addItemToCart(btn) {
    let count = this.storage.getItem(NUM_ITEMS);
    this.storage.setItem(NUM_ITEMS, ++count);

    const cartBadgeText = document.getElementById('cart-items-count-text');
    cartBadgeText.textContent = count;
    
    let price = this.storage.getItem(TOTAL_PRICE);
    if(!price) { 
      price = 0;
    }
    let total = parseFloat(price) + parseFloat(btn.dataset.price);
    this.storage.setItem(TOTAL_PRICE, total);
  }

  updateCartBadge() {
    const cartBadgeText = document.getElementById('cart-items-count-text');
    cartBadgeText.textContent = this.storage.getItem(NUM_ITEMS);
  }

  displayCartInfo() {
    let numCartItems = this.storage.getItem(NUM_ITEMS);
    if(!numCartItems) {
      numCartItems = 0;
    }
    document.getElementById('cart-items-count').textContent = numCartItems;
  
    let totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.storage.getItem(TOTAL_PRICE));
    if(!totalPrice) {
      totalPrice = "$0.00";
    }
    document.getElementById('cart-total-price').textContent = totalPrice;
  }

};

const cart = Cart.getInstance();
cart.initialize();