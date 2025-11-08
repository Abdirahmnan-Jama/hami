// cart.js
import { loadCart, saveCart } from "./storage.js";

const TAX_RATE = 0.05; // 5%

// Internal state
let items = loadCart(); // [{id, name, price, qty}]
let ui = {};            // cache of DOM nodes

// ---------- helpers ----------
const money = n => `$${(Math.round(n * 100) / 100).toFixed(2)}`;
const toNumber = txt => {
  // Extracts first number like 3.49 from "$3.49/kg"
  const m = String(txt).match(/[\d,.]+/);
  return m ? parseFloat(m[0].replace(/,/g, "")) : 0;
};

// ---------- state ops ----------
export function addItem({ id, name, price }, qty = 1) {
  const existing = items.find(i => i.id === id);
  if (existing) existing.qty += qty;
  else items.push({ id, name, price, qty });
  persistAndRender();
}

export function removeItem(id) {
  items = items.filter(i => i.id !== id);
  persistAndRender();
}

export function updateQty(id, qty) {
  const q = Math.max(1, Number(qty) || 1);
  const it = items.find(i => i.id === id);
  if (it) it.qty = q;
  persistAndRender();
}

export function clearItems() {
  items = [];
  persistAndRender();
}

export function getItems() {
  return [...items];
}

export function getTotals() {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { subtotal, tax, total, count };
}

// ---------- UI binding ----------
export function initCartUI(options = {}) {
  // map existing IDs from your HTML
  ui = {
    openBtn: document.getElementById(options.openBtnId || "cart-btn"),
    sidebar: document.getElementById(options.sidebarId || "cart-sidebar"),
    closeBtn: document.getElementById(options.closeBtnId || "close-cart"),
    overlay: document.getElementById(options.overlayId || "cart-overlay"),
    list: document.getElementById(options.listId || "cart-items"),
    count: document.getElementById(options.countId || "cart-count"),
    subtotalEl: document.getElementById(options.subtotalId || "cart-subtotal"),
    totalEl: document.getElementById(options.totalId || "cart-total"),
    checkoutBtn: document.getElementById(options.checkoutId || "checkout-btn"),
  };

  // open/close sidebar
  ui.openBtn?.addEventListener("click", () => {
    ui.sidebar?.classList.remove("translate-x-full");
    ui.overlay?.classList.add("opacity-100");
    ui.overlay?.classList.remove("pointer-events-none");
    document.body.style.overflow = "hidden";
  });

  const close = () => {
    ui.sidebar?.classList.add("translate-x-full");
    ui.overlay?.classList.remove("opacity-100");
    ui.overlay?.classList.add("pointer-events-none");
    document.body.style.overflow = "auto";
  };
  ui.closeBtn?.addEventListener("click", close);
  ui.overlay?.addEventListener("click", close);

  // Go to order summary
  ui.checkoutBtn?.addEventListener("click", () => {
    window.location.href = "order.html";
  });

  render();
}

function persistAndRender() {
  saveCart(items);
  render();
}

function render() {
  // count + totals
  const { subtotal, total, count } = getTotals();
  if (ui.count) ui.count.textContent = String(count);
  if (ui.subtotalEl) ui.subtotalEl.textContent = money(subtotal);
  if (ui.totalEl) ui.totalEl.textContent = money(total);

  if (!ui.list) return;

  ui.list.innerHTML = "";
  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "text-center py-12 text-gray-400";
    empty.innerHTML = `
      <i data-feather="shopping-cart" class="w-12 h-12 mx-auto mb-4"></i>
      <p>Your cart is empty</p>`;
    ui.list.appendChild(empty);
    if (window.feather) window.feather.replace();
    return;
  }

  items.forEach(i => {
    const row = document.createElement("div");
    row.className = "cart-item flex items-center justify-between bg-[#1e293b] p-4 rounded-lg";
    row.innerHTML = `
      <div>
        <h4 class="font-medium text-white">${i.name}</h4>
        <p class="text-gray-400 text-sm">${money(i.price)} x ${i.qty}</p>
      </div>
      <div class="flex items-center space-x-3">
        <input type="number" min="1" value="${i.qty}" data-id="${i.id}" class="qty-input w-16 bg-[#0a1922] border border-green-900/30 rounded px-2 py-1 text-sm text-white" aria-label="Quantity for ${i.name}" />
        <span class="font-medium text-green-400">${money(i.price * i.qty)}</span>
        <button class="remove-item text-gray-400 hover:text-red-500" data-id="${i.id}" title="Remove">
          <i data-feather="x" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    ui.list.appendChild(row);
  });

  // events
  ui.list.querySelectorAll(".qty-input").forEach(inp => {
    inp.addEventListener("change", e => {
      updateQty(e.currentTarget.dataset.id, e.currentTarget.value);
    });
  });
  ui.list.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", e => removeItem(e.currentTarget.dataset.id));
  });

  if (window.feather) window.feather.replace();
}

// ---------- convenience: scan any product card ----------
export function bindAddToCartButtons(selector = ".add-to-cart") {
  document.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener("click", e => {
      // A product card can be `.product-card` or `.group`
      const card = e.currentTarget.closest(".product-card, .group");
      if (!card) return;

      const name = card.querySelector("h3")?.textContent?.trim() || "Product";
      // Try to find a price element with green + bold classes; fallback any price-looking text
      const priceNode =
        card.querySelector(".text-emerald-400.font-bold, .text-green-400.font-bold, .text-emerald-300.font-bold, .text-emerald-400, .text-green-400") ||
        card.querySelector("span, p");
      const price = toNumber(priceNode?.textContent || "0");

      // Stable id from name + first price number
      const id = (card.dataset.id || `${name}-${price}`).toLowerCase().replace(/\s+/g, "-");

      addItem({ id, name, price }, 1);

      // quick feedback
      const original = btn.innerHTML;
      btn.innerHTML = '<i data-feather="check" class="w-4 h-4 mr-1"></i> Added';
      if (window.feather) window.feather.replace();
      setTimeout(() => {
        btn.innerHTML = original;
        if (window.feather) window.feather.replace();
      }, 1200);
    });
  });
}
