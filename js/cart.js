/* ================================================
   WOTAKU CART — localStorage Cart Utility
   Include BEFORE main.js / shop.js / product.js
   ================================================ */

var WotakuCart = (function () {
  var KEY = "wotakumart_cart";
  var WA_NUMBER = "6281385811993";

  function getCart() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(KEY, JSON.stringify(cart));
    _updateBadges();
  }

  function slugify(s) {
    return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function fmt(n) {
    return "Rp\u00a0" + Number(n).toLocaleString("id-ID");
  }

  function addItem(item) {
    var cart = getCart();
    var found = false;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        cart[i].quantity = (cart[i].quantity || 1) + 1;
        found = true;
        break;
      }
    }
    if (!found) {
      cart.push({ id: item.id, name: item.name, price: item.price || 0, image: item.image || "", brand: item.brand || "", quantity: 1 });
    }
    saveCart(cart);
    return getCount();
  }

  function removeItem(id) {
    saveCart(getCart().filter(function (c) { return c.id !== id; }));
  }

  function updateQty(id, qty) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) { cart[i].quantity = Math.max(1, parseInt(qty, 10) || 1); break; }
    }
    saveCart(cart);
  }

  function clearCart() { localStorage.removeItem(KEY); _updateBadges(); }

  function getCount() {
    return getCart().reduce(function (s, c) { return s + (c.quantity || 1); }, 0);
  }

  function getTotal() {
    return getCart().reduce(function (s, c) { return s + (c.price * (c.quantity || 1)); }, 0);
  }

  function itemFromCard(card) {
    var nameEl  = card.querySelector(".product-name");
    var brandEl = card.querySelector(".product-brand");
    var priceEl = card.querySelector(".price-sale") || card.querySelector(".product-price span");
    var imgEl   = card.querySelector(".product-image-wrap img") || card.querySelector("img");
    var name  = nameEl  ? nameEl.textContent.trim()  : "Produk";
    var brand = brandEl ? brandEl.textContent.trim() : "";
    var priceText = priceEl ? priceEl.textContent.trim() : "0";
    var price = parseInt(priceText.replace(/[^\d]/g, ""), 10) || 0;
    var img = imgEl ? imgEl.getAttribute("src") : "";
    if (img && img.indexOf("assets/") !== -1) { img = img.substring(img.indexOf("assets/")); }
    var id = slugify(name) || ("item-" + Date.now());
    return { id: id, name: name, price: price, image: img, brand: brand };
  }

  function _updateBadges() {
    var count = getCount();
    document.querySelectorAll(".cart-count").forEach(function (el) { el.textContent = count; });
  }

  function showToast(msg) {
    var old = document.querySelector(".wc-toast");
    if (old) old.remove();
    var t = document.createElement("div");
    t.className = "wc-toast";
    t.textContent = msg;
    Object.assign(t.style, { position:"fixed", bottom:"28px", left:"50%", transform:"translateX(-50%) translateY(20px)", background:"#111", color:"#fff", padding:"12px 24px", borderRadius:"4px", fontSize:"14px", fontWeight:"500", zIndex:"9999", opacity:"0", transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)", whiteSpace:"nowrap", boxShadow:"0 8px 32px rgba(0,0,0,0.2)", fontFamily:"Inter, sans-serif", pointerEvents:"none" });
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = "1"; t.style.transform = "translateX(-50%) translateY(0)"; });
    setTimeout(function () { t.style.opacity = "0"; t.style.transform = "translateX(-50%) translateY(10px)"; setTimeout(function () { t.remove(); }, 300); }, 2800);
  }

  function pulseBadge() {
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.style.transform = "scale(1.5)";
      setTimeout(function () { el.style.transform = ""; }, 300);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    _updateBadges();
    document.querySelectorAll("#cartBtn").forEach(function (btn) {
      btn.addEventListener("click", function (e) { e.preventDefault(); window.location.href = "cart.html"; });
    });
  });

  return { getCart:getCart, addItem:addItem, removeItem:removeItem, updateQty:updateQty, clearCart:clearCart, getCount:getCount, getTotal:getTotal, fmt:fmt, slugify:slugify, updateBadges:_updateBadges, itemFromCard:itemFromCard, showToast:showToast, pulseBadge:pulseBadge, WA_NUMBER:WA_NUMBER };
})();
