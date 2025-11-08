// storage.js
const STORAGE_KEY = "hami_cart_v1";

export function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
}
