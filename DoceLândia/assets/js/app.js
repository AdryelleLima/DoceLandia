/**
 * app.js - Main Application Logic & Catalog Data for DoceLândia
 */

// Products Database: Exactly 8 Artisan Sweet Products
const PRODUCTS_DATABASE = [
  {
    id: 1,
    name: 'Macarons Pastel Especial',
    shortDesc: 'Caixa elegante com 6 macarons artesanais nos sabores baunilha, morango e menta.',
    fullDesc: 'Nossos macarons são produzidos com farinha de amêndoas selecionadas e recheios cremosos de ganache belga e geleia artesanal de frutas. Uma experiência crocante por fora e macia por dentro nas cores pastéis exclusivas da DoceLândia.',
    price: 34.90,
    img: 'assets/images/produtos/produto-1.svg',
    rating: 5,
    badge: 'Lançamento'
  },
  {
    id: 2,
    name: 'Cupcake Pastel de Morango',
    shortDesc: 'Massa fofinha de baunilha com cobertura de chantilly rosa e morango fresco.',
    fullDesc: 'Cupcake delicado preparado com fava de baunilha natural, recheado com creme patissière de morango e finalizado com uma nuvem cremoso em tom rosa pastel e confeitos de açúcar estrelados.',
    price: 14.50,
    img: 'assets/images/produtos/produto-2.svg',
    rating: 5,
    badge: 'Mais Vendido'
  },
  {
    id: 3,
    name: 'Trufas Gourmet de Chocolate Belga',
    shortDesc: 'Trio de trufas artesanais envolvidas em cacau puro e pó de ouro comestível.',
    fullDesc: 'Trufas de chocolate nobre belga 70% cacau infusionadas com toque sutil de baunilha de Madagascar. Textura veludosa que derrete na boca com finalização artesanal requintada.',
    price: 28.00,
    img: 'assets/images/produtos/produto-3.svg',
    rating: 4.9,
    badge: 'Gourmet'
  },
  {
    id: 4,
    name: 'Bolo Vulcão Ninho & Morango',
    shortDesc: 'Bolo macio com cascata generosa de creme de Leite Ninho e pedaços de morango.',
    fullDesc: 'Mini bolo vulcão com massa amanteigada leve, recheado até transbordar com o autêntico brigadeiro mole de Leite Ninho e coberto com morangos orgânicos selecionados.',
    price: 49.90,
    img: 'assets/images/produtos/produto-4.svg',
    rating: 5,
    badge: 'Destaque'
  },
  {
    id: 5,
    name: 'Donuts Glaciados Rosa Chiclete',
    shortDesc: 'Donuts americanos fofinhos com glacê de morango e granulados coloridos.',
    fullDesc: 'Massa de donut frita no ponto perfeito, extremamente leve e macia. Banhada em glacê artesanal de morango rosa pastel e salpicada com granulados coloridos e crocantes.',
    price: 12.90,
    img: 'assets/images/produtos/produto-5.svg',
    rating: 4.8,
    badge: 'Clássico'
  },
  {
    id: 6,
    name: 'Pote Marshmallow Twist Sortido',
    shortDesc: 'Pote de vidro artesanal com marshmallows coloridos e super macios.',
    fullDesc: 'Pote hermético decorado recheado com marshmallows torcidos em gradientes pastéis. Sabor suave de baunilha e frutas tropicais, perfeitos para presentear ou saborear a qualquer momento.',
    price: 22.90,
    img: 'assets/images/produtos/produto-6.svg',
    rating: 5,
    badge: 'Favorito'
  },
  {
    id: 7,
    name: 'Pipoca Gourmet Caramelo & Flor de Sal',
    shortDesc: 'Pipocas gigantes crocantes banhadas em caramelo artesanal e sal marinho.',
    fullDesc: 'Pipocas estouradas no ar quente (zero óleo em excesso), envoltas por uma camada uniforme e extremamente crocante de caramelo toffee artesanal com toque de flor de sal.',
    price: 18.50,
    img: 'assets/images/produtos/produto-7.svg',
    rating: 4.7,
    badge: 'Crocante'
  },
  {
    id: 8,
    name: 'Gelato Fofinho de Algodão Doce',
    shortDesc: 'Cone crocante de gelato artesanal sabor algodão doce com nuvem de marshmallow.',
    fullDesc: 'Gelato cremoso de baunilha azul pastel e morango rosa em casquinha artesanal crocante de waffle, coroado com uma nuvem de algodão doce e morango fresco.',
    price: 19.90,
    img: 'assets/images/produtos/produto-8.svg',
    rating: 4.9,
    badge: 'Novidade'
  }
];

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', function() {
  initMaterializeComponents();
  renderNavbarAuth();
  updateCartBadge();
  setupOfflineListener();
  setupSearchForm();

  // Page specific renders
  if (document.getElementById('productsGrid')) {
    renderIndexProducts(PRODUCTS_DATABASE);
  }

  if (document.getElementById('productDetailContainer')) {
    renderProductDetailPage();
  }

  if (document.getElementById('cartPageContainer')) {
    renderCartPage();
  }
});

/**
 * Initializes Materialize JS Components (Carousel, Dropdown, Sidenav, Modals)
 */
function initMaterializeComponents() {
  // Sidenav Mobile
  const elemsSidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elemsSidenav);

  // User Dropdown
  const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elemsDropdown, {
    coverTrigger: false,
    constrainWidth: false
  });

  // Carousel
  const elemsCarousel = document.querySelectorAll('.carousel');
  M.Carousel.init(elemsCarousel, {
    fullWidth: false,
    indicators: true,
    duration: 200,
    dist: -50
  });

  // Auto scroll carousel every 4 seconds
  const carouselEl = document.querySelector('.carousel');
  if (carouselEl) {
    const instance = M.Carousel.getInstance(carouselEl);
    setInterval(() => {
      if (instance) instance.next();
    }, 4000);
  }
}

/**
 * Renders Navbar Profile/Auth State
 */
function renderNavbarAuth() {
  const user = getLoggedInUser();
  const authContainer = document.getElementById('navbarAuthContainer');
  if (!authContainer) return;

  if (user) {
    authContainer.innerHTML = `
      <li>
        <a class="dropdown-trigger c-navbar__link" href="#!" data-target="userDropdown">
          <i class="material-icons">account_circle</i>
          <span>${user.name.split(' ')[0]}</span>
          <i class="material-icons">arrow_drop_down</i>
        </a>
      </li>
    `;
    // Re-init dropdown
    const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elemsDropdown, { coverTrigger: false, constrainWidth: false });
  } else {
    authContainer.innerHTML = `
      <li>
        <a href="login.html" class="c-navbar__link">
          <i class="material-icons">account_circle</i>
          <span>Entrar</span>
        </a>
      </li>
    `;
  }
}

/**
 * Listener for Offline status (Spec requirement)
 */
function setupOfflineListener() {
  window.addEventListener('offline', function() {
    M.toast({
      html: '⚠️ Você está offline. Verifique sua conexão.',
      classes: 'c-toast-pastel-red',
      displayLength: 5000
    });
  });

  window.addEventListener('online', function() {
    M.toast({
      html: '📶 Conexão reestabelecida!',
      classes: 'c-toast-success',
      displayLength: 3000
    });
  });
}

/**
 * Setup search form filter
 */
function setupSearchForm() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    if (document.getElementById('productsGrid')) {
      const filtered = PRODUCTS_DATABASE.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.shortDesc.toLowerCase().includes(query)
      );
      renderIndexProducts(filtered);
    }
  });
}

/**
 * Renders exactly 8 Product Cards on index.html
 */
function renderIndexProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="col s12 center-align" style="padding: 40px 0;">
        <h5>Nenhum produto encontrado 🍬</h5>
        <p class="grey-text">Tente pesquisar por outro nome de doce.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(product => `
    <div class="col s12 m6 l3" style="margin-bottom: 24px;">
      <div class="c-card-product">
        <span class="c-card-product__badge">${product.badge}</span>
        <div class="c-card-product__img-wrapper">
          <img src="${product.img}" alt="${product.name}" class="c-card-product__img" />
        </div>
        <div class="c-card-product__content">
          <h3 class="c-card-product__title">${product.name}</h3>
          <p class="c-card-product__desc">${product.shortDesc}</p>
          <div class="c-card-product__footer">
            <span class="c-card-product__price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
            <a href="produto.html?id=${product.id}" class="btn c-btn c-btn--secondary">
              Ver detalhes
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Renders Product Details Page (produto.html)
 */
function renderProductDetailPage() {
  const container = document.getElementById('productDetailContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')) || 1;

  const product = PRODUCTS_DATABASE.find(p => p.id === productId) || PRODUCTS_DATABASE[0];

  const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 !== 0 ? '½' : '');

  container.innerHTML = `
    <div class="c-product-detail">
      <div class="row" style="margin-bottom: 0;">
        <div class="col s12 m6 center-align">
          <img src="${product.img}" alt="${product.name}" class="c-product-detail__img" />
        </div>
        <div class="col s12 m6">
          <span class="c-card-product__badge" style="position: static; display: inline-block; margin-bottom: 10px;">${product.badge}</span>
          <h1 class="c-product-detail__title">${product.name}</h1>
          
          <div class="c-product-detail__rating">
            <span style="font-size: 1.2rem;">${stars}</span>
            <span style="color: var(--color-text-muted); font-size: 0.9rem; margin-left: 6px;">(${product.rating} de 5 avaliações)</span>
          </div>

          <div class="c-product-detail__price">
            R$ ${product.price.toFixed(2).replace('.', ',')}
          </div>

          <p class="c-product-detail__desc">
            ${product.fullDesc}
          </p>

          <div class="c-product-detail__qty-selector">
            <label style="font-weight: 700; color: var(--color-text-main); font-size: 1rem;">Quantidade:</label>
            <button class="c-product-detail__qty-btn" onclick="adjustProductQty(-1)">-</button>
            <input type="number" id="detailQtyInput" value="1" min="1" max="99" class="c-product-detail__qty-input" readonly />
            <button class="c-product-detail__qty-btn" onclick="adjustProductQty(1)">+</button>
          </div>

          <button onclick="handleDetailAddToCart(${product.id})" class="btn c-btn c-btn--full" style="height: 50px !important; font-size: 1.1rem;">
            <i class="material-icons">shopping_cart</i>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Adjust quantity on product detail page
 */
function adjustProductQty(delta) {
  const input = document.getElementById('detailQtyInput');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  input.value = val;
}

/**
 * Adds product from detail page to cart
 */
function handleDetailAddToCart(productId) {
  const input = document.getElementById('detailQtyInput');
  const qty = input ? parseInt(input.value) : 1;
  addToCart(productId, qty);
}

/**
 * Renders Cart Page (carrinho.html)
 */
function renderCartPage() {
  const container = document.getElementById('cartPageContainer');
  if (!container) return;

  // Spec rule: If accessing carrinho.html while not logged in, redirect to login.html
  const currentUser = getLoggedInUser();
  if (!currentUser) {
    M.toast({ html: 'Faça login para acessar o carrinho', classes: 'c-toast-pastel-red' });
    sessionStorage.setItem('redirect_after_login', 'carrinho.html');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
    return;
  }

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="c-cart">
        <div class="c-cart__empty">
          <div class="c-cart__empty-icon">🍬</div>
          <h2 class="c-cart__empty-text">Seu carrinho está vazio 🍬</h2>
          <p class="grey-text" style="margin-bottom: 25px;">Que tal adicionar algumas gostosuras artesanais ao seu dia?</p>
          <a href="index.html" class="btn c-btn">
            <i class="material-icons">store</i>
            Voltar para a Loja
          </a>
        </div>
      </div>
    `;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const currentShipping = window.calculatedShippingFee || 0;
  const grandTotal = subtotal + currentShipping;

  container.innerHTML = `
    <div class="c-cart">
      <h3 style="font-weight: 800; color: var(--color-text-main); margin-top: 0; margin-bottom: 25px;">Seu Carrinho de Doces</h3>
      
      <div class="row">
        <!-- Cart Table List -->
        <div class="col s12 l8">
          <div class="responsive-table">
            <table class="c-cart__table highlight">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th class="center-align">Qtd</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${cart.map(item => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${item.img}" alt="${item.name}" class="c-cart__item-img" />
                        <span style="font-weight: 700; color: var(--color-text-main);">${item.name}</span>
                      </div>
                    </td>
                    <td style="font-weight: 700;">R$ ${item.price.toFixed(2).replace('.', ',')}</td>
                    <td class="center-align">
                      <div style="display: inline-flex; align-items: center; gap: 6px;">
                        <button class="c-product-detail__qty-btn" style="width:28px; height:28px;" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span style="font-weight: 800; min-width: 24px; text-align: center;">${item.quantity}</span>
                        <button class="c-product-detail__qty-btn" style="width:28px; height:28px;" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                      </div>
                    </td>
                    <td style="font-weight: 800; color: var(--color-pink-dark);">
                      R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </td>
                    <td>
                      <button onclick="removeFromCart(${item.id})" class="btn-floating btn-small waves-effect waves-light red lighten-2" title="Remover item">
                        <i class="material-icons">delete</i>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Summary & CEP Calculation -->
        <div class="col s12 l4">
          <div class="c-cart__summary">
            <h5 style="font-weight: 800; margin-top: 0; margin-bottom: 20px;">Resumo do Pedido</h5>

            <!-- CEP Calculation Input (8 digits rule) -->
            <div style="margin-bottom: 20px;">
              <label style="font-weight: 700; color: var(--color-text-main);">Calcular Frete por CEP:</label>
              <div style="display: flex; gap: 8px; margin-top: 6px;">
                <input type="text" id="cepInput" placeholder="00000-000" maxlength="9" style="background:#fff; padding:0 12px; height:40px; border-radius:8px; border:1px solid var(--color-primary-pink); margin:0;" />
                <button onclick="handleShippingCalc()" class="btn c-btn c-btn--secondary" style="height:40px !important;">
                  Calcular
                </button>
              </div>
            </div>

            <div class="c-cart__summary-row">
              <span>Subtotal:</span>
              <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <div class="c-cart__summary-row">
              <span>Frete:</span>
              <span style="color: ${currentShipping > 0 ? 'var(--color-pink-dark)' : 'var(--color-text-muted)'};">
                ${currentShipping > 0 ? `R$ ${currentShipping.toFixed(2).replace('.', ',')}` : 'Informe o CEP'}
              </span>
            </div>

            <div class="c-cart__summary-row c-cart__summary-row--total">
              <span>Total:</span>
              <span>R$ ${grandTotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <button onclick="handleCheckout()" class="btn c-btn c-btn--full" style="height: 48px !important; margin-top: 20px; font-size: 1.1rem;">
              <i class="material-icons">check_circle</i>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Shipping calculation handler
 */
function handleShippingCalc() {
  const input = document.getElementById('cepInput');
  if (!input) return;

  const fee = calculateShipping(input.value);
  if (fee !== null) {
    window.calculatedShippingFee = fee;
    renderCartPage();
  }
}

/**
 * Simulated checkout
 */
function handleCheckout() {
  const cart = getCart();
  if (cart.length === 0) return;

  M.toast({ html: 'Pedido realizado com sucesso! Obrigado pela compra! 🍬', classes: 'c-toast-success', displayLength: 4000 });
  clearCart();
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}
