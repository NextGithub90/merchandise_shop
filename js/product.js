'use strict';
/* ─── product.js — Wotaku Mart Product Detail Page ─── */

(function () {
  /* ── Platform icons SVG inline ── */
  var PLAT_ICONS = {
    shopee: '<svg viewBox="0 0 40 40" class="plat-icon-svg" fill="white"><circle cx="20" cy="20" r="20" fill="none"/><text x="20" y="26" text-anchor="middle" font-size="20" font-weight="900" fill="white" font-family="Arial">S</text></svg>',
    tokopedia: '<svg viewBox="0 0 40 40" class="plat-icon-svg" fill="white"><path d="M20 4 C12 4 6 10 6 18 C6 28 14 36 20 36 C26 36 34 28 34 18 C34 10 28 4 20 4Z" fill="none" stroke="white" stroke-width="2.5"/><circle cx="20" cy="18" r="4" fill="white"/><path d="M14 26 L20 22 L26 26" stroke="white" stroke-width="2" fill="none"/></svg>',
    lazada: '<svg viewBox="0 0 40 40" class="plat-icon-svg" fill="white"><text x="20" y="26" text-anchor="middle" font-size="20" font-weight="900" fill="white" font-family="Arial">L</text></svg>',
    blibli: '<svg viewBox="0 0 40 40" class="plat-icon-svg"><path d="M10 8 L10 32 M10 20 Q24 12 24 20 Q24 28 10 22" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
    facebook: '<svg viewBox="0 0 40 40" class="plat-icon-svg" fill="white"><path d="M22 14 L22 11 Q22 8 25 8 L28 8 L28 4 L24 4 Q18 4 18 10 L18 14 L14 14 L14 18 L18 18 L18 36 L22 36 L22 18 L26 18 L27 14 Z"/></svg>',
    instagram: '<svg viewBox="0 0 40 40" class="plat-icon-svg" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="24" height="24" rx="6"/><circle cx="20" cy="20" r="6"/><circle cx="29" cy="11" r="1.5" fill="white" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 40 40" class="plat-icon-svg" fill="white"><path d="M28 6 C28 6 26 10 22 11 L22 25 A6 6 0 1 1 17 19 L17 15 A10 10 0 0 0 28 6Z"/></svg>',
    etsy: '<svg viewBox="0 0 40 40" class="plat-icon-svg"><text x="20" y="27" text-anchor="middle" font-size="22" font-weight="900" fill="white" font-family="Georgia,serif">E</text></svg>'
  };

  var PLAT_COLORS = {
    shopee: '#EE4D2D', tokopedia: '#42B549', lazada: '#0F146D',
    blibli: '#0081C8', facebook: '#1877F2', instagram: '#E1306C',
    tiktok: '#010101', etsy: '#F56400'
  };
  var PLAT_NAMES = {
    shopee: 'Shopee', tokopedia: 'Tokopedia', lazada: 'Lazada',
    blibli: 'Blibli', facebook: 'Facebook', instagram: 'Instagram',
    tiktok: 'TikTok Shop', etsy: 'Etsy'
  };

  /* ── Helpers ── */
  function fmt(n) {
    return 'Rp\u00a0' + n.toLocaleString('id-ID');
  }
  function starsHtml(r) {
    var full = Math.floor(r), out = '';
    for (var i = 0; i < 5; i++) {
      out += i < full ? '★' : (r - i >= 0.5 ? '½' : '☆');
    }
    return out;
  }
  function get(id) { return document.getElementById(id); }

  /* ── Read product ID from URL ── */
  var params = new URLSearchParams(window.location.search);
  var productId = params.get('id');
  var product = typeof getProduct === 'function' ? getProduct(productId) : null;

  if (!product) {
    // Show not found
    var main = document.getElementById('pdMain');
    if (main) {
      main.innerHTML =
        '<div class="pd-not-found">' +
          '<div class="icon">🔍</div>' +
          '<h2>Produk Tidak Ditemukan</h2>' +
          '<p>Maaf, produk yang kamu cari tidak tersedia atau sudah tidak ada.</p>' +
          '<a href="shop.html"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="19 12 5 12"/><polyline points="12 5 5 12 12 19"/></svg> Kembali ke Shop</a>' +
        '</div>';
    }
    return;
  }

  /* ── Set page title & meta ── */
  document.title = product.name + ' — WOTAKU MART';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', product.brand + ' · ' + product.cat + ' — ' + product.name + '. Beli di Wotaku Mart.');

  /* ── Breadcrumb ── */
  var storeNames = { wotaku: 'Wotaku Shop', mnd: 'mnd.id', aikoku: 'Aikoku' };
  var bcStore = get('bcStore');
  var bcProduct = get('bcProduct');
  if (bcStore) { bcStore.textContent = storeNames[product.store] || product.brand; bcStore.href = 'shop.html#' + product.store + '-section'; }
  if (bcProduct) bcProduct.textContent = product.name;

  /* ── Gallery ── */
  var mainImg = get('pdMainImg');
  var pdBadge = get('pdImgBadge');
  var thumbsContainer = get('pdThumbs');

  if (mainImg && product.images && product.images.length) {
    mainImg.src = product.images[0];
    mainImg.alt = product.name;
  }
  if (pdBadge && product.badge) {
    pdBadge.textContent = product.badge === 'limited' ? 'LIMITED' : product.badge === 'new' ? 'NEW' : product.badge === 'sale' ? 'SALE' : '';
    pdBadge.className = 'pd-img-badge badge-' + product.badge;
    if (!product.badge) pdBadge.style.display = 'none';
  } else if (pdBadge) { pdBadge.style.display = 'none'; }

  if (thumbsContainer && product.images) {
    thumbsContainer.innerHTML = '';
    product.images.forEach(function (src, idx) {
      var div = document.createElement('div');
      div.className = 'pd-thumb' + (idx === 0 ? ' active' : '');
      div.innerHTML = '<img src="' + src + '" alt="' + product.name + ' ' + (idx + 1) + '" loading="lazy">';
      div.addEventListener('click', function () {
        mainImg.src = src;
        thumbsContainer.querySelectorAll('.pd-thumb').forEach(function (t) { t.classList.remove('active'); });
        div.classList.add('active');
      });
      thumbsContainer.appendChild(div);
    });
  }

  /* ── Store / Brand tag ── */
  var brandLogo = get('pdBrandLogo');
  var brandText = get('pdBrand');
  var catText = get('pdCat');
  if (brandLogo) { brandLogo.src = product.brandLogo; brandLogo.alt = product.brand; }
  if (brandText) brandText.textContent = product.brand;
  if (catText) catText.textContent = product.cat;

  /* ── Name ── */
  var nameEl = get('pdName');
  if (nameEl) nameEl.textContent = product.name;

  /* ── Rating ── */
  var starsEl = get('pdStars');
  var ratingVal = get('pdRatingVal');
  var ratingCnt = get('pdRatingCount');
  if (starsEl) starsEl.innerHTML = starsHtml(product.rating);
  if (ratingVal) ratingVal.textContent = product.rating.toFixed(1);
  if (ratingCnt) ratingCnt.textContent = '(' + product.reviewCount + ' ulasan)';

  /* ── Price ── */
  var priceMain = get('pdPriceMain');
  var priceOrig = get('pdPriceOrig');
  var priceBadge = get('pdPriceBadge');
  if (priceMain) priceMain.textContent = fmt(product.price);
  if (priceOrig && product.originalPrice) {
    priceOrig.textContent = fmt(product.originalPrice);
    var disc = Math.round((1 - product.price / product.originalPrice) * 100);
    if (priceBadge) priceBadge.textContent = '-' + disc + '%';
  } else {
    if (priceOrig) priceOrig.style.display = 'none';
    if (priceBadge) priceBadge.style.display = 'none';
  }

  /* ── Platforms ── */
  var platGrid = get('pdPlatformGrid');
  if (platGrid && product.platforms) {
    platGrid.innerHTML = '';
    Object.keys(product.platforms).forEach(function (key) {
      var url = product.platforms[key];
      var avail = url && url !== '#';
      var color = PLAT_COLORS[key] || '#666';
      var name = PLAT_NAMES[key] || key;
      var icon = PLAT_ICONS[key] || '<span class="plat-icon">' + name[0] + '</span>';
      var a = document.createElement('a');
      a.className = 'plat-btn' + (avail ? '' : ' unavail');
      a.href = avail ? url : '#';
      if (avail) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      a.style.background = color;
      a.title = name;
      a.innerHTML = icon + '<span class="plat-name">' + name + '</span>';
      if (!avail) a.setAttribute('aria-disabled', 'true');
      platGrid.appendChild(a);
    });
  }

  /* ── WhatsApp Button ── */
  var waBtn = get('pdWaBtn');
  if (waBtn) {
    var waMsg = 'Halo Wotaku Mart! 👋\n\nSaya ingin memesan:\n\n🛍️ *' + product.name + '*\n💰 Harga: ' + fmt(product.price) + '\n📦 Brand: ' + product.brand + '\n\nApakah produk tersedia? Mohon info lebih lanjut ya, terima kasih! 🙏';
    waBtn.href = 'https://wa.me/' + product.waNumber + '?text=' + encodeURIComponent(waMsg);
  }

  /* ── Tabs ── */
  var tabBtns = document.querySelectorAll('.pd-tab-btn');
  var tabPanels = document.querySelectorAll('.pd-tab-panel');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = btn.dataset.tab;
      tabBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      var panel = document.getElementById('tab-' + tabId);
      if (panel) panel.classList.add('active');
    });
  });
  var tabCount = get('pdTabCount');
  if (tabCount) tabCount.textContent = '(' + (product.reviews ? product.reviews.length : 0) + ')';

  /* ── Description tab ── */
  var descEl = get('pdDescription');
  if (descEl && product.description) {
    var paras = product.description.split('\n\n');
    descEl.innerHTML = paras.map(function(p){ return '<p>' + p.replace(/\n/g,'<br>') + '</p>'; }).join('');
  }

  /* ── Specs tab ── */
  var specsTable = get('pdSpecsTable');
  if (specsTable && product.specs) {
    specsTable.innerHTML = product.specs.map(function (row) {
      return '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td></tr>';
    }).join('');
  }

  /* ── Reviews tab ── */
  var reviewsSummary = get('pdReviewsSummary');
  var reviewsList = get('pdReviewsList');

  if (reviewsSummary && product.reviews) {
    var avgRating = product.rating;
    // Generate bar data
    var bars = [5, 4, 3, 2, 1];
    var barData = { 5: 70, 4: 20, 3: 7, 2: 2, 1: 1 };
    reviewsSummary.innerHTML =
      '<div class="pd-reviews-big-rating">' +
        '<div class="pd-reviews-score">' + avgRating.toFixed(1) + '</div>' +
        '<div class="pd-reviews-stars-big">' + starsHtml(avgRating) + '</div>' +
        '<div class="pd-reviews-total">' + product.reviewCount + ' ulasan</div>' +
      '</div>' +
      '<div class="pd-reviews-bars">' +
        bars.map(function(star){
          return '<div class="pd-review-bar-row">' +
            '<span class="pd-bar-label">' + star + '★</span>' +
            '<div class="pd-bar-track"><div class="pd-bar-fill" style="width:' + (barData[star]||0) + '%"></div></div>' +
          '</div>';
        }).join('') +
      '</div>';
  }

  if (reviewsList && product.reviews) {
    reviewsList.innerHTML = product.reviews.map(function (rev) {
      var initial = rev.name ? rev.name[0].toUpperCase() : '?';
      var colors = ['#C8102E','#1877F2','#42B549','#E1306C','#F56400','#0081C8'];
      var colorIdx = rev.name.charCodeAt(0) % colors.length;
      var avatarColor = colors[colorIdx];
      return '<div class="pd-review-card">' +
        '<div class="pd-review-header">' +
          '<div class="pd-reviewer-info">' +
            '<div class="pd-reviewer-avatar" style="background:' + avatarColor + '">' + initial + '</div>' +
            '<div>' +
              '<div class="pd-reviewer-name">' + rev.name + '</div>' +
              '<div class="pd-reviewer-loc">📍 ' + (rev.loc||rev.location||'') + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pd-review-meta">' +
            '<div class="pd-review-stars">' + starsHtml(rev.r||rev.rating||5) + '</div>' +
            '<div class="pd-review-date">' + rev.date + '</div>' +
          '</div>' +
        '</div>' +
        '<p class="pd-review-text">' + rev.text + '</p>' +
        '<div class="pd-review-verified">✓ Pembelian Terverifikasi</div>' +
      '</div>';
    }).join('');
  }

  /* ── Related Products ── */
  var relatedGrid = get('pdRelatedGrid');
  if (relatedGrid && typeof getRelated === 'function') {
    var related = getRelated(product, 4);
    if (related.length) {
      relatedGrid.innerHTML = related.map(function (p) {
        var badgeHtml = p.badge ? '<span class="pd-related-badge badge-' + p.badge + '">' + (p.badge==='limited'?'LIMITED':p.badge==='new'?'NEW':'SALE') + '</span>' : '';
        var origHtml = p.originalPrice ? '<span class="orig">' + fmt(p.originalPrice) + '</span>' : '';
        return '<a class="pd-related-card" href="product.html?id=' + p.id + '">' +
          '<div class="pd-related-img">' +
            badgeHtml +
            '<img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy">' +
          '</div>' +
          '<div class="pd-related-info">' +
            '<div class="pd-related-brand">' + p.brand + '</div>' +
            '<div class="pd-related-name">' + p.name + '</div>' +
            '<div class="pd-related-price">' + fmt(p.price) + origHtml + '</div>' +
          '</div>' +
        '</a>';
      }).join('');
    } else {
      relatedGrid.parentElement.style.display = 'none';
    }
  }

})();
