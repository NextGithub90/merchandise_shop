/* ================================================
   WOTAKU MART — Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL EFFECT ───
  const navbar = document.getElementById('navbar');
  const scrollHandler = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  // ─── MOBILE MENU ───
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const mobileMenu = document.getElementById('mobileMenu');

  const openMenu = () => {
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // Close menu on mobile link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ─── SAKURA PETALS ANIMATION ───
  const sakuraContainer = document.getElementById('sakuraContainer');
  if (sakuraContainer) {
    const PETAL_COUNT = 18;
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      const size = 8 + Math.random() * 10;
      const startX = Math.random() * 100;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 15;
      petal.style.cssText = `width:${size}px;height:${size}px;left:${startX}%;animation-duration:${duration}s;animation-delay:${delay}s;opacity:0;`;
      return petal;
    };
    for (let i = 0; i < PETAL_COUNT; i++) sakuraContainer.appendChild(createPetal());
    setInterval(() => {
      sakuraContainer.querySelectorAll('.sakura-petal').forEach(petal => {
        if (petal.getBoundingClientRect().top > window.innerHeight + 20) {
          petal.style.left = `${Math.random() * 100}%`;
          petal.style.animationDuration = `${8 + Math.random() * 12}s`;
          petal.style.animationDelay = '0s';
        }
      });
    }, 5000);
  }

  // ─── SCROLL ANIMATIONS (Intersection Observer) ───
  const fadeElements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after first animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  // ─── PRODUCT CAROUSEL SCROLL BUTTONS ───
  document.querySelectorAll('.scroll-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const container = document.getElementById(targetId);
      if (!container) return;

      const scrollAmount = container.clientWidth * 0.75;
      const direction = btn.classList.contains('scroll-btn-next') ? 1 : -1;

      container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    });
  });

  // ─── STORE PANEL KEYBOARD NAVIGATION ───
  document.querySelectorAll('.store-panel').forEach(panel => {
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        panel.querySelector('.panel-cta')?.click();
      }
    });
  });

  // ─── WISHLIST BUTTON TOGGLE ───
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const svg = btn.querySelector('svg');
      const isWishlisted = btn.classList.toggle('wishlisted');

      if (isWishlisted) {
        svg.style.fill = '#C8102E';
        svg.style.color = '#C8102E';
        btn.style.background = 'rgba(200, 16, 46, 0.1)';
        showToast('Added to wishlist ♡');
      } else {
        svg.style.fill = 'none';
        svg.style.color = '';
        btn.style.background = '';
        showToast('Removed from wishlist');
      }
    });
  });

  // ─── NEWSLETTER FORM ───
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      if (email && email.includes('@')) {
        showToast('🌸 Thank you for subscribing!');
        newsletterForm.reset();
      } else {
        showToast('Please enter a valid email address.');
      }
    });
  }

  // ─── QUICK ADD TO CART ───
  document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (!card) return;
      const item = WotakuCart.itemFromCard(card);
      WotakuCart.addItem(item);
      WotakuCart.pulseBadge();
      const productName = item.name;
      showToast(`🛒 "${productName}" ditambahkan ke keranjang!`);
    });
  });

  // ─── TOAST NOTIFICATION ───
  let toastTimeout;
  const showToast = (message) => {
    // Remove existing toast
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    clearTimeout(toastTimeout);

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #111111;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      white-space: nowrap;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      font-family: 'Inter', sans-serif;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    toastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // ─── PANEL HOVER CURSOR ANIMATION ───
  document.querySelectorAll('.store-panel').forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      panel.querySelector('.panel-bg').style.transform = `scale(1.04) translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    panel.addEventListener('mouseleave', () => {
      panel.querySelector('.panel-bg').style.transform = '';
    });
  });

  // ─── SEARCH OVERLAY ───
  const searchBtn     = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput   = document.getElementById('searchInputField');
  const searchResults = document.getElementById('searchResults');
  const searchClose   = document.getElementById('searchCloseBtn');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput && searchInput.focus(), 80);
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    renderDefaultResults();
  }

  if (searchBtn)   searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  function formatRp(n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID');
  }
  function renderResults(items, query) {
    if (!searchResults) return;
    if (!items.length) {
      searchResults.innerHTML = '<p class="search-no-result">Produk tidak ditemukan untuk <strong>"' + query + '"</strong></p>';
      return;
    }
    const hl = (text) => {
      if (!query) return text;
      return text.replace(new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')', 'gi'), '<span class="search-result-highlight">$1</span>');
    };
    searchResults.innerHTML = '<p class="search-hint">Hasil pencarian (' + items.length + ')</p>' +
      items.slice(0, 8).map(p => {
        const img = (p.images && p.images[0]) ? p.images[0] : 'assets/images/prod_figure.webp';
        const price = p.salePrice ? formatRp(p.salePrice) : (p.price ? formatRp(p.price) : '');
        return '<a class="search-result-item" href="product.html?id=' + p.id + '">' +
          '<img class="search-result-img" src="' + img + '" alt="' + p.name + '" onerror="this.src=\'assets/images/prod_figure.webp\'">' +
          '<div class="search-result-info">' +
            '<p class="search-result-name">' + hl(p.name) + '</p>' +
            '<p class="search-result-meta">' + (p.brand || '') + (p.category ? ' · ' + p.category : '') + '</p>' +
          '</div>' +
          '<span class="search-result-price">' + price + '</span>' +
        '</a>';
      }).join('');
  }
  function renderDefaultResults() {
    if (!searchResults) return;
    if (typeof PRODUCT_DB === 'undefined' || !PRODUCT_DB.length) {
      searchResults.innerHTML = '<p class="search-no-result">Data produk belum dimuat.</p>';
      return;
    }
    const popular = PRODUCT_DB.slice(0, 5);
    searchResults.innerHTML = '<p class="search-hint">Produk populer</p>' +
      popular.map(p => {
        const img = (p.images && p.images[0]) ? p.images[0] : 'assets/images/prod_figure.webp';
        const price = p.salePrice ? formatRp(p.salePrice) : (p.price ? formatRp(p.price) : '');
        return '<a class="search-result-item" href="product.html?id=' + p.id + '">' +
          '<img class="search-result-img" src="' + img + '" alt="' + p.name + '" onerror="this.src=\'assets/images/prod_figure.webp\'">' +
          '<div class="search-result-info">' +
            '<p class="search-result-name">' + p.name + '</p>' +
            '<p class="search-result-meta">' + (p.brand || '') + '</p>' +
          '</div>' +
          '<span class="search-result-price">' + price + '</span>' +
        '</a>';
      }).join('');
  }

  let searchDebounce;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      const q = searchInput.value.trim().toLowerCase();
      if (!q) { renderDefaultResults(); return; }
      searchDebounce = setTimeout(() => {
        if (typeof PRODUCT_DB === 'undefined') { searchResults.innerHTML = '<p class="search-no-result">Data produk belum dimuat.</p>'; return; }
        const filtered = PRODUCT_DB.filter(p =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
        );
        renderResults(filtered, q);
      }, 180);
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = searchResults && searchResults.querySelector('.search-result-item');
        if (first) { closeSearch(); window.location.href = first.href; }
      }
    });
  }

  renderDefaultResults();

  console.log('🌸 Wotaku Shop initialized — ウォタクショップへようこそ!');
});
