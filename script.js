// ============================================================
// BLOOM & PLAN — Digital Products Shop
// ============================================================

// ────────────────────────────────────────────────────────────
// PRODUCT DATA
// ────────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "The Ultimate Wedding Planner",
    category: "wedding",
    catLabel: "Wedding",
    image: "images/wedding-planner.jpg",
    price: 29,
    oldPrice: 49,
    badge: "best",
    badgeLabel: "Best Seller",
    rating: 4.9,
    reviews: 312,
    shortDesc: "Plan your dream wedding with this 120-page comprehensive digital planner.",
    desc: "The most beautiful and thorough wedding planning system ever created. With 120 meticulously designed pages, you'll cover every detail from first engagement to the honeymoon — all in one breathtaking PDF.",
    includes: [
      "120-page PDF planner (A4 + US Letter)",
      "Vendor contact tracker & budget sheet",
      "Wedding day timeline template",
      "Guest list & seating chart manager",
      "Venue & vendor checklist (42 items)",
      "Ceremony & vows writing prompts",
      "Honeymoon planning section"
    ],
    formats: ["PDF", "Printable", "A4", "US Letter"]
  },
  {
    id: 2,
    name: "Aesthetic Daily Planner",
    category: "daily",
    catLabel: "Daily Life",
    image: "images/daily-planner.jpg",
    price: 12,
    oldPrice: null,
    badge: "new",
    badgeLabel: "New",
    rating: 4.8,
    reviews: 187,
    shortDesc: "Design your perfect day with morning rituals, priorities & gratitude.",
    desc: "A thoughtfully designed daily planner to help you create intentional days. Each page features a beautiful morning ritual section, hourly schedule, top priorities, gratitude prompts and an evening reflection.",
    includes: [
      "365 daily planner pages",
      "Morning routine & rituals section",
      "Hourly schedule (5am – 10pm)",
      "Top 3 priorities of the day",
      "Daily gratitude & affirmations",
      "Evening reflection & wind-down",
      "Weekly overview spreads"
    ],
    formats: ["PDF", "Printable", "A4", "US Letter", "A5"]
  },
  {
    id: 3,
    name: "Life OS Notion Dashboard",
    category: "notion",
    catLabel: "Notion Templates",
    image: "images/notion-template.jpg",
    price: 19,
    oldPrice: 32,
    badge: null,
    badgeLabel: null,
    rating: 4.9,
    reviews: 254,
    shortDesc: "Your entire life organised in one beautiful Notion workspace.",
    desc: "The most comprehensive Notion life management system with a breathtaking aesthetic. Manage your goals, habits, projects, finances, reading list, and wellness all in one interconnected dashboard.",
    includes: [
      "Full Life OS Dashboard",
      "Goal & project tracker",
      "Habit & wellness tracker",
      "Finance & budget manager",
      "Reading & media library",
      "Daily journal templates",
      "Video setup tutorial"
    ],
    formats: ["Notion Template", "Instant Access"]
  },
  {
    id: 4,
    name: "Vision Board Kit",
    category: "mindset",
    catLabel: "Mind & Goals",
    image: "images/vision-board.jpg",
    price: 15,
    oldPrice: null,
    badge: "new",
    badgeLabel: "New",
    rating: 4.7,
    reviews: 143,
    shortDesc: "Printable vision board elements, goal cards & manifestation worksheets.",
    desc: "Manifest your dream life with this gorgeous printable vision board kit. Includes 80+ unique aesthetic clipart elements, affirmation cards, goal-setting worksheets, and step-by-step creation guide.",
    includes: [
      "80+ botanical & lifestyle clip art",
      "48 affirmation & quote cards",
      "Goal setting worksheets (12 pages)",
      "Manifestation journal prompts",
      "Vision board layout templates (6 styles)",
      "Digital & printable versions"
    ],
    formats: ["PDF", "PNG", "Printable", "Digital"]
  },
  {
    id: 5,
    name: "Habit & Wellness Tracker",
    category: "daily",
    catLabel: "Daily Life",
    image: "images/habit-tracker.jpg",
    price: 10,
    oldPrice: null,
    badge: null,
    badgeLabel: null,
    rating: 4.8,
    reviews: 96,
    shortDesc: "Track habits, mood, water, sleep & self-care beautifully.",
    desc: "Build your healthiest, most balanced life with this all-in-one wellness tracker. Monthly habit grids, daily mood check-ins, water intake, sleep tracking, workout log — all in a stunning minimalist design.",
    includes: [
      "Monthly habit tracker (12 months)",
      "Daily mood & energy tracker",
      "Water intake tracker",
      "Sleep quality log",
      "Self-care checklist",
      "Monthly reflection & review pages",
      "Weekly planning spread"
    ],
    formats: ["PDF", "Printable", "A4", "A5", "US Letter"]
  },
  {
    id: 6,
    name: "Gratitude & Self-Care Journal",
    category: "mindset",
    catLabel: "Mind & Goals",
    image: "images/gratitude-journal.jpg",
    price: 14,
    oldPrice: 22,
    badge: "sale",
    badgeLabel: "Sale",
    rating: 5.0,
    reviews: 78,
    shortDesc: "Daily gratitude prompts, affirmations & evening wind-down rituals.",
    desc: "Cultivate deep gratitude and radical self-love with this beautifully crafted journal. With guided morning gratitude prompts, afternoon check-ins, and a soothing evening wind-down ritual, every day becomes intentional.",
    includes: [
      "180 daily journal spreads",
      "Morning gratitude prompts",
      "Afternoon energy check-in",
      "Evening wind-down ritual",
      "Monthly self-love challenges",
      "Affirmation card collection (30 cards)",
      "Self-care planning worksheets"
    ],
    formats: ["PDF", "Printable", "A4", "US Letter"]
  }
];

// ────────────────────────────────────────────────────────────
// STATE
// ────────────────────────────────────────────────────────────
let cart = [];
let wishlist = [];
let activeCategory = "all";
let currentProduct = null;

// ────────────────────────────────────────────────────────────
// DOM HELPERS
// ────────────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ────────────────────────────────────────────────────────────
// NAV SCROLL
// ────────────────────────────────────────────────────────────
function initNav() {
  const nav = $('#main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile hamburger (optional basic toggle)
  const hamburger = $('.hamburger');
  const navLinks = $('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
}

// ────────────────────────────────────────────────────────────
// HERO PARALLAX & LOAD
// ────────────────────────────────────────────────────────────
function initHero() {
  const bg = $('.hero-bg');
  if (bg) {
    setTimeout(() => bg.classList.add('loaded'), 100);
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      bg.style.transform = `scale(1) translateY(${y * 0.3}px)`;
    }, { passive: true });
  }
}

// ────────────────────────────────────────────────────────────
// SCROLL ANIMATIONS
// ────────────────────────────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.fade-up').forEach(el => observer.observe(el));
}

// ────────────────────────────────────────────────────────────
// RENDER PRODUCTS
// ────────────────────────────────────────────────────────────
function renderProducts(category = 'all') {
  const grid = $('#products-grid');
  if (!grid) return;

  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  grid.innerHTML = filtered.map(p => `
    <article class="product-card fade-up" id="product-${p.id}" data-product-id="${p.id}" onclick="openModal(${p.id})" role="button" tabindex="0" aria-label="View ${p.name}">
      <div class="product-card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge ${p.badge}">${p.badgeLabel}</span>` : ''}
        <div class="product-quick-add" onclick="event.stopPropagation(); addToCart(${p.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          Add to Cart
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-cat-label">${p.catLabel}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc-short">${p.shortDesc}</p>
        <div class="product-footer">
          <div class="product-price">
            ${p.oldPrice ? `<span class="old-price">$${p.oldPrice}</span>` : ''}
            $${p.price}
          </div>
          <button class="product-wishlist ${wishlist.includes(p.id) ? 'active' : ''}"
            id="wish-${p.id}"
            onclick="event.stopPropagation(); toggleWishlist(${p.id})"
            aria-label="Add to wishlist">
            ${wishlist.includes(p.id) ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Re-run scroll observer on new elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.fade-up').forEach(el => { if (!el.classList.contains('visible')) observer.observe(el); });
}

// ────────────────────────────────────────────────────────────
// CATEGORY TABS
// ────────────────────────────────────────────────────────────
function initCategoryTabs() {
  $$('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.cat;
      renderProducts(activeCategory);
    });
  });
}

// ────────────────────────────────────────────────────────────
// MODAL
// ────────────────────────────────────────────────────────────
function openModal(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  currentProduct = p;

  const overlay = $('#modal-overlay');
  const img = $('#modal-img');
  const cat = $('#modal-cat');
  const title = $('#modal-title');
  const ratingEl = $('#modal-rating');
  const priceEl = $('#modal-price');
  const descEl = $('#modal-desc');
  const includesEl = $('#modal-includes-list');
  const formatsEl = $('#modal-formats');

  img.src = p.image;
  img.alt = p.name;
  cat.textContent = p.catLabel;
  title.textContent = p.name;
  ratingEl.innerHTML = `<span class="modal-stars">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '½' : ''}</span> ${p.rating} · ${p.reviews} reviews`;
  priceEl.innerHTML = `${p.oldPrice ? `<span class="orig">$${p.oldPrice}</span>` : ''}$${p.price}`;
  descEl.textContent = p.desc;
  includesEl.innerHTML = p.includes.map(i => `<li>${i}</li>`).join('');
  formatsEl.innerHTML = p.formats.map(f => `<span class="format-tag">${f}</span>`).join('');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  currentProduct = null;
}

function initModal() {
  const overlay = $('#modal-overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  $('#modal-close-btn').addEventListener('click', closeModal);
  $('#modal-add-to-cart').addEventListener('click', () => {
    if (currentProduct) {
      addToCart(currentProduct.id);
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ────────────────────────────────────────────────────────────
// CART
// ────────────────────────────────────────────────────────────
function addToCart(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    showToast(`"${p.name}" is already in your cart ✓`);
  } else {
    cart.push({ ...p });
    updateCartUI();
    showToast(`✓ Added to cart: ${p.name}`);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.length;
  const countEl = $('#cart-count');

  // Badge
  countEl.textContent = count;
  countEl.classList.toggle('visible', count > 0);

  // Items list
  const itemsEl = $('#cart-items');
  const emptyEl = $('#cart-empty');
  const footerEl = $('#cart-footer');

  if (count === 0) {
    itemsEl.innerHTML = '';
    emptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
  } else {
    emptyEl.style.display = 'none';
    footerEl.style.display = 'flex';
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item" id="cart-item-${item.id}">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `).join('');

    // Total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    $('#cart-total-amount').textContent = `$${total}`;
  }
}

function openCart() {
  $('#cart-overlay').classList.add('open');
  $('#cart-sidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  $('#cart-overlay').classList.remove('open');
  $('#cart-sidebar').classList.remove('open');
  document.body.style.overflow = '';
}

function initCart() {
  $('#cart-btn').addEventListener('click', openCart);
  $('#cart-close').addEventListener('click', closeCart);
  $('#cart-overlay').addEventListener('click', (e) => {
    if (e.target === $('#cart-overlay')) closeCart();
  });
  $('#cart-continue').addEventListener('click', closeCart);

  // Checkout — save cart to localStorage and navigate
  $('#cart-checkout').addEventListener('click', () => {
    if (cart.length === 0) return;
    localStorage.setItem('bloom_cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
  });
}

// ────────────────────────────────────────────────────────────
// WISHLIST
// ────────────────────────────────────────────────────────────
function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  const btn = $(`#wish-${productId}`);
  if (idx === -1) {
    wishlist.push(productId);
    if (btn) { btn.textContent = '♥'; btn.classList.add('active'); }
    showToast('♥ Added to wishlist');
  } else {
    wishlist.splice(idx, 1);
    if (btn) { btn.textContent = '♡'; btn.classList.remove('active'); }
  }
}

// ────────────────────────────────────────────────────────────
// TOAST
// ────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ────────────────────────────────────────────────────────────
// NEWSLETTER FORM
// ────────────────────────────────────────────────────────────
function initNewsletter() {
  const form = $('#newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (!input.value.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    showToast('🌸 You\'re on the list! Check your inbox for a gift.');
    input.value = '';
  });
}

// ────────────────────────────────────────────────────────────
// FEATURED BUNDLE ADD TO CART
// ────────────────────────────────────────────────────────────
function initFeatured() {
  const btn = $('#bundle-add-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    // Add all wedding + daily products
    const bundleIds = [1, 2];
    bundleIds.forEach(id => {
      if (!cart.find(item => item.id === id)) {
        const p = products.find(x => x.id === id);
        if (p) cart.push({ ...p });
      }
    });
    updateCartUI();
    showToast('✓ Bundle added to cart!');
  });
}

// ────────────────────────────────────────────────────────────
// SMOOTH SCROLL FOR NAV LINKS
// ────────────────────────────────────────────────────────────
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ────────────────────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHero();
  renderProducts();
  initCategoryTabs();
  initScrollAnimations();
  initModal();
  initCart();
  initNewsletter();
  initFeatured();
  initSmoothScroll();
  updateCartUI();
});
