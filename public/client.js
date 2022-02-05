
window.addEventListener("load", async function(){
  cart.updateCartBadge();

  if (document.body.dataset.page == 'cart') {
    cart.displayCartInfo();
  }

  const bc = new BlackCrow();
  await bc.callPOSTEvents();
});