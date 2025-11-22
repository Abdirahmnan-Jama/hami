// product.js
// If later you want to render products from data, you can expand here.
// For now this file is a small facade so your main stays clean.

import { bindAddToCartButtons } from "./cart.js";
import products from "./json-storage.js";

function formatPrice(p) {
  return `$${p.toFixed(2)}`;
}

function createCardHTML(product) {
  return `
    <div class="product-card group bg-[#1e293b] rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-green-500/20" 
         data-category="${product.category}" data-aos="fade-up">
        <div class="relative overflow-hidden h-60">
            <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            ${product.organic ? '<span class="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">Organic</span>' : ''}
        </div>
        <div class="p-5">
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold text-white mb-1">${product.title}</h3>
                <span class="text-green-400 font-bold">${formatPrice(product.price)}${product.unit ? `/${product.unit}` : ''}</span>
            </div>
            <p class="text-gray-400 text-sm mb-4">${product.description}</p>
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <i data-feather="star" class="w-4 h-4 text-yellow-400 fill-current"></i>
                    <span class="text-sm ml-1">${product.rating} (${product.reviews ?? 0})</span>
                </div>
                <button class="add-to-cart bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
  `;
}

function renderProducts(list) {
  const container = document.getElementById("product-grid");
  if (!container) return;
  container.innerHTML = list.map(createCardHTML).join("");
  if (window.feather) window.feather.replace();
  bindAddToCartButtons(".add-to-cart");
}

function setupFilters(allProducts) {
  const searchInput = document.getElementById("search-input");
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");

  if (!searchInput || !priceRange || !priceValue) return;

  // Set slider max to a sensible value based on products
  const maxPrice = Math.ceil(Math.max(...allProducts.map(p => p.price)));
  priceRange.max = String(maxPrice);
  priceRange.value = String(maxPrice);
  priceValue.textContent = formatPrice(Number(priceRange.value));

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const max = Number(priceRange.value);
    const filtered = allProducts.filter(p => {
      const matchesQuery = q === "" || p.title.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)) || (p.category && p.category.toLowerCase().includes(q));
      const matchesPrice = p.price <= max;
      return matchesQuery && matchesPrice;
    });
    renderProducts(filtered);
    priceValue.textContent = formatPrice(Number(priceRange.value));
  }

  searchInput.addEventListener('input', applyFilters);
  priceRange.addEventListener('input', applyFilters);
}

export function initProducts() {
  renderProducts(products);
  setupFilters(products);
}
