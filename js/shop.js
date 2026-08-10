/* ================================================
   SHOP PAGE JavaScript — Wotaku Mart
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── FADE-UP SCROLL ANIMATION ───
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    fadeEls.forEach(el => obs.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ─── REUSE: Navbar scroll + mobile menu (same as main.js) ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const menuOverlay  = document.getElementById('menuOverlay');
  const mobileMenu   = document.getElementById('mobileMenu');

  const openMenu  = () => { mobileMenu.classList.add('open'); menuOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { mobileMenu.classList.remove('open'); menuOverlay.classList.remove('open'); document.body.style.overflow = ''; };

  hamburgerBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ─── FILTER SIDEBAR (mobile toggle) ───
  const shopSidebar    = document.getElementById('shopSidebar');
  const filterToggleBtn = document.getElementById('filterToggleBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  const openSidebar = () => {
    shopSidebar.classList.add('open');
    sidebarBackdrop.classList.add('active');
    filterToggleBtn.classList.add('active');
    filterToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeSidebar = () => {
    shopSidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('active');
    filterToggleBtn.classList.remove('active');
    filterToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  filterToggleBtn.addEventListener('click', () => {
    shopSidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  sidebarCloseBtn.addEventListener('click', closeSidebar);
  sidebarBackdrop.addEventListener('click', closeSidebar);

  // ─── PRODUCT CARDS ───
  const allCards = document.querySelectorAll('.shop-card');
  const productCountNum = document.getElementById('productCountNum');
  const noResults = document.getElementById('noResults');
  const activeFiltersEl = document.getElementById('activeFilters');

  // ─── FILTER STATE ───
  let activeFilters = {
    store: 'all',
    categories: new Set(),
    status: new Set(),
    maxPrice: 1000000,
  };

  function updateProductCount() {
    const visible = document.querySelectorAll('.shop-card:not(.hidden)').length;
    productCountNum.textContent = visible;
    noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  function applyFilters() {
    allCards.forEach(card => {
      const store    = card.dataset.store;
      const cat      = card.dataset.cat;
      const price    = parseInt(card.dataset.price, 10);
      const badge    = card.dataset.badge;

      let show = true;

      // Store filter
      if (activeFilters.store !== 'all' && store !== activeFilters.store) show = false;

      // Category filter (AND: if any cats selected, card must match one)
      if (activeFilters.categories.size > 0 && !activeFilters.categories.has(cat)) show = false;

      // Price
      if (price > activeFilters.maxPrice) show = false;

      // Status
      if (activeFilters.status.size > 0) {
        const matches = [...activeFilters.status].some(s => badge === s);
        if (!matches) show = false;
      }

      card.classList.toggle('hidden', !show);
    });

    // Hide entire store sections if filtered out
    const wotakuSection = document.getElementById('wotaku-section');
    const mndSection = document.getElementById('mnd-section');
    const aikokuSection = document.getElementById('aikoku-section');
    
    if (wotakuSection && mndSection && aikokuSection) {
      if (activeFilters.store === 'all') {
        wotakuSection.style.display = 'block';
        mndSection.style.display = 'block';
        aikokuSection.style.display = 'block';
      } else if (activeFilters.store === 'wotaku') {
        wotakuSection.style.display = 'block';
        mndSection.style.display = 'none';
        aikokuSection.style.display = 'none';
      } else if (activeFilters.store === 'mnd') {
        wotakuSection.style.display = 'none';
        mndSection.style.display = 'block';
        aikokuSection.style.display = 'none';
      } else if (activeFilters.store === 'aikoku') {
        wotakuSection.style.display = 'none';
        mndSection.style.display = 'none';
        aikokuSection.style.display = 'block';
      }
    }

    updateProductCount();
    renderActiveFilterTags();
  }

  // ─── RENDER ACTIVE FILTER TAGS ───
  function renderActiveFilterTags() {
    activeFiltersEl.innerHTML = '';

    if (activeFilters.store !== 'all') {
      const storeName = activeFilters.store === 'wotaku' ? 'Wotaku Shop' : (activeFilters.store === 'mnd' ? 'mnd.id' : 'Aikoku');
      addTag(`Store: ${storeName}`, () => {
        activeFilters.store = 'all';
        document.getElementById('filterAll').checked = true;
        applyFilters();
      });
    }
    activeFilters.categories.forEach(cat => {
      addTag(`Cat: ${capitalize(cat)}`, () => {
        activeFilters.categories.delete(cat);
        document.querySelector(`input[value="${cat}"]`).checked = false;
        applyFilters();
      });
    });
    activeFilters.status.forEach(s => {
      addTag(`${capitalize(s)}`, () => {
        activeFilters.status.delete(s);
        document.querySelector(`input[name="status"][value="${s}"]`).checked = false;
        applyFilters();
      });
    });
    if (activeFilters.maxPrice < 1000000) {
      addTag(`Max: Rp ${activeFilters.maxPrice.toLocaleString('id-ID')}`, () => {
        activeFilters.maxPrice = 1000000;
        document.getElementById('priceRange').value = 1000000;
        updatePriceLabel(1000000);
        applyFilters();
      });
    }
  }

  function addTag(label, onRemove) {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `${label}<button aria-label="Remove filter ${label}">✕</button>`;
    tag.querySelector('button').addEventListener('click', onRemove);
    activeFiltersEl.appendChild(tag);
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // ─── STORE RADIO FILTERS ───
  document.querySelectorAll('input[name="store"]').forEach(radio => {
    radio.addEventListener('change', () => {
      activeFilters.store = radio.value;
      applyFilters();
    });
  });

  // ─── CATEGORY CHECKBOX FILTERS ───
  document.querySelectorAll('input[name="cat"]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) activeFilters.categories.add(cb.value);
      else activeFilters.categories.delete(cb.value);
      applyFilters();
    });
  });

  // ─── STATUS CHECKBOX FILTERS ───
  document.querySelectorAll('input[name="status"]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) activeFilters.status.add(cb.value);
      else activeFilters.status.delete(cb.value);
      applyFilters();
    });
  });

  // ─── PRICE RANGE ───
  const priceRange = document.getElementById('priceRange');
  const priceLabel = document.getElementById('priceLabel');

  function updatePriceLabel(val) {
    priceLabel.textContent = `Rp ${Number(val).toLocaleString('id-ID')}`;
    const pct = (val / 1000000) * 100;
    priceRange.style.background = `linear-gradient(to right, var(--accent-red) ${pct}%, var(--border) ${pct}%)`;
  }

  priceRange.addEventListener('input', () => {
    activeFilters.maxPrice = parseInt(priceRange.value, 10);
    updatePriceLabel(priceRange.value);
    applyFilters();
  });

  // ─── RESET FILTERS ───
  const resetBtn = document.getElementById('filterResetBtn');
  const noResultsReset = document.getElementById('noResultsReset');

  function resetAllFilters() {
    activeFilters = { store: 'all', categories: new Set(), status: new Set(), maxPrice: 1000000 };
    document.getElementById('filterAll').checked = true;
    document.querySelectorAll('input[name="cat"], input[name="status"]').forEach(cb => cb.checked = false);
    priceRange.value = 1000000;
    updatePriceLabel(1000000);
    applyFilters();
  }

  resetBtn.addEventListener('click', resetAllFilters);
  noResultsReset.addEventListener('click', resetAllFilters);

  // ─── SORT ───
  const sortSelect = document.getElementById('sortSelect');

  sortSelect.addEventListener('change', () => {
    const grids = [document.getElementById('wotakuGrid'), document.getElementById('mndGrid')];
    grids.forEach(grid => {
      const cards = [...grid.querySelectorAll('.shop-card')];
      cards.sort((a, b) => {
        const pa = parseInt(a.dataset.price, 10);
        const pb = parseInt(b.dataset.price, 10);
        switch (sortSelect.value) {
          case 'price-asc':  return pa - pb;
          case 'price-desc': return pb - pa;
          case 'newest':     return a.dataset.badge === 'new' ? -1 : 1;
          default:           return 0;
        }
      });
      cards.forEach(c => grid.appendChild(c));
    });
  });

  // ─── VIEW TOGGLE (Grid / List) ───
  const viewGridBtn = document.getElementById('viewGrid');
  const viewListBtn = document.getElementById('viewList');
  const grids = document.querySelectorAll('.product-grid');

  viewGridBtn.addEventListener('click', () => {
    grids.forEach(g => g.classList.remove('list-view'));
    viewGridBtn.classList.add('active');
    viewListBtn.classList.remove('active');
  });
  viewListBtn.addEventListener('click', () => {
    grids.forEach(g => g.classList.add('list-view'));
    viewListBtn.classList.add('active');
    viewGridBtn.classList.remove('active');
  });

  // ─── CATEGORY TABS ───
  document.querySelectorAll('.category-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.cat-tab');
    // Determine which grid this tab group controls
    const section = tabGroup.closest('.shop-brand-section');
    const grid = section.querySelector('.product-grid');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const cat = tab.dataset.cat;
        grid.querySelectorAll('.shop-card').forEach(card => {
          if (cat.startsWith('all-')) {
            card.classList.remove('hidden');
          } else {
            card.classList.toggle('hidden', card.dataset.cat !== cat);
          }
        });
        updateProductCount();
      });
    });
  });

  // ─── WISHLIST TOGGLE ───
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isWishlisted = btn.classList.toggle('wishlisted');
      const svg = btn.querySelector('svg');
      svg.style.fill   = isWishlisted ? '#C8102E' : 'none';
      svg.style.color  = isWishlisted ? '#C8102E' : '';
      btn.style.background = isWishlisted ? 'rgba(200,16,46,0.1)' : '';
      showToast(isWishlisted ? 'Added to wishlist ♡' : 'Removed from wishlist');
    });
  });

  // ─── QUICK ADD TO CART ───
  document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (!card) return;
      const item = WotakuCart.itemFromCard(card);
      WotakuCart.addItem(item);
      WotakuCart.pulseBadge();
      showToast(`🛒 "${item.name}" ditambahkan ke keranjang!`);
    });
  });

  // ─── NEWSLETTER FORM ───
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      if (email && email.includes('@')) {
        showToast('🌸 Thank you for subscribing!');
        newsletterForm.reset();
      }
    });
  }

  // ─── TOAST NOTIFICATION ───
  let toastTimeout;
  function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    clearTimeout(toastTimeout);
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '28px', left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: '#111', color: 'white', padding: '12px 24px',
      borderRadius: '4px', fontSize: '14px', fontWeight: '500',
      zIndex: '9999', opacity: '0', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
      whiteSpace: 'nowrap', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      fontFamily: 'Inter, sans-serif'
    });
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
  }

  // ─── INIT ───
  updateProductCount();
  updatePriceLabel(1000000);

  console.log('🛍️ Wotaku Mart Shop initialized');
});
