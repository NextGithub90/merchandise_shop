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
  const PETAL_COUNT = 18;

  const createPetal = () => {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';

    const size = 8 + Math.random() * 10;
    const startX = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 15;

    petal.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${startX}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: 0;
    `;

    return petal;
  };

  for (let i = 0; i < PETAL_COUNT; i++) {
    sakuraContainer.appendChild(createPetal());
  }

  // Recycle petals
  setInterval(() => {
    const petals = sakuraContainer.querySelectorAll('.sakura-petal');
    petals.forEach(petal => {
      const rect = petal.getBoundingClientRect();
      if (rect.top > window.innerHeight + 20) {
        petal.style.left = `${Math.random() * 100}%`;
        const dur = 8 + Math.random() * 12;
        petal.style.animationDuration = `${dur}s`;
        petal.style.animationDelay = '0s';
      }
    });
  }, 5000);

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

  // ─── CART INTERACTION ───
  const cartBtn = document.getElementById('cartBtn');
  let cartCount = 0;
  const cartCountEl = cartBtn?.querySelector('.cart-count');

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger on wishlist button clicks
      if (e.target.closest('.product-wishlist')) return;

      cartCount++;
      if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        cartCountEl.style.transform = 'scale(1.4)';
        setTimeout(() => { cartCountEl.style.transform = ''; }, 300);
      }

      const productName = card.querySelector('.product-name')?.textContent || 'Item';
      showToast(`🛒 "${productName}" added to cart!`);
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

  // ─── SEARCH BUTTON FUNCTIONALITY ───
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      showToast('🔍 Search coming soon...');
    });
  }

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

  console.log('🌸 Wotaku Mart initialized — ウォタクマートへようこそ!');
});
