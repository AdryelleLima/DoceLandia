/**
 * cart.js - Shopping Cart logic for DoceLândia
 * Stores cart state in localStorage and enforces login requirements
 */

const CART_KEY = 'docelandia_cart';

/**
 * Gets array of cart items: [{ id, name, price, img, quantity }]
 */
function getCart() {
  const cartJson = localStorage.getItem(CART_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
}

/**
 * Saves cart array to localStorage
 */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

/**
 * Updates navbar cart counter badge across all pages
 */
function updateCartBadge() {
  const badgeEl = document.getElementById('cartBadge');
  if (!badgeEl) return;

  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalCount > 0) {
    badgeEl.textContent = totalCount;
    badgeEl.style.display = 'inline-block';
  } else {
    badgeEl.textContent = '0';
    badgeEl.style.display = 'none';
  }
}

/**
 * Enforces Login check before adding to cart or opening cart
 */
function checkAuthForCart(actionToastMessage, redirectTarget = 'carrinho.html') {
  const currentUser = getLoggedInUser();
  if (!currentUser) {
    M.toast({ html: actionToastMessage || 'Faça login para adicionar produtos ao carrinho', classes: 'c-toast-pastel-red' });
    sessionStorage.setItem('redirect_after_login', redirectTarget);
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
    return false;
  }
  return true;
}

/**
 * Adds product to cart (requires login)
 */
function addToCart(productId, quantity = 1) {
  // Spec rule: Must be logged in to add product to cart
  if (!checkAuthForCart('Faça login para adicionar produtos ao carrinho', window.location.pathname.includes('produto.html') ? window.location.href : 'index.html')) {
    return false;
  }

  const product = PRODUCTS_DATABASE.find(p => p.id === parseInt(productId));
  if (!product) {
    M.toast({ html: 'Produto não encontrado!', classes: 'c-toast-pastel-red' });
    return false;
  }

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: quantity
    });
  }

  saveCart(cart);
  M.toast({ html: `"${product.name}" adicionado ao carrinho! 🛒`, classes: 'c-toast-success' });
  return true;
}

/**
 * Removes an item from cart
 */
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== parseInt(productId));
  saveCart(cart);
  M.toast({ html: 'Item removido do carrinho.', classes: 'c-toast-success' });
  renderCartPage();
}

/**
 * Updates item quantity in cart
 */
function updateCartQuantity(productId, newQty) {
  const qty = parseInt(newQty);
  if (isNaN(qty) || qty <= 0) {
    removeFromCart(productId);
    return;
  }

  let cart = getCart();
  const item = cart.find(i => i.id === parseInt(productId));
  if (item) {
    item.quantity = qty;
    saveCart(cart);
    renderCartPage();
  }
}

/**
 * Clears the entire cart
 */
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

/**
 * Simulates shipping cost calculation (format validation: 8 numeric digits)
 */
function calculateShipping(cepValue) {
  const cleanCep = cepValue.replace(/\D/g, '');

  if (cleanCep.length !== 8) {
    M.toast({ html: 'Formato de CEP inválido! Digite 8 números (ex: 88000-000).', classes: 'c-toast-pastel-red' });
    return null;
  }

  // Simulated fixed freight fee R$ 15,00
  M.toast({ html: 'Frete calculado com sucesso! R$ 15,00', classes: 'c-toast-success' });
  return 15.00;
}
