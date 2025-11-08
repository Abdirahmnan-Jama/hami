// product.js
// If later you want to render products from data, you can expand here.
// For now this file is a small facade so your main stays clean.

import { bindAddToCartButtons } from "./cart.js";

export function initProducts() {
  bindAddToCartButtons(".add-to-cart");
}
