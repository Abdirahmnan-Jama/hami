// main.js
import { initCartUI } from "./cart.js";
import { initProducts } from "./products.js";

window.addEventListener("DOMContentLoaded", () => {
  // AOS, Vanta, Feather are already loaded via <script> tags in your HTML.
  if (window.AOS) window.AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  if (window.VANTA && document.getElementById("vanta-bg")) {
    window.VANTA.GLOBE({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x10b981,
      backgroundColor: 0x0,
      size: 0.8,
    });
  }
  if (window.feather) window.feather.replace();

  // Mobile menu toggle (kept from your previous script)
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  mobileMenuButton?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("open");
    if (mobileMenu?.classList.contains("open")) {
      menuIcon?.setAttribute("data-feather", "x");
    } else {
      menuIcon?.setAttribute("data-feather", "menu");
    }
    if (window.feather) window.feather.replace();
  });

  // Init cart + products
  initCartUI();
  initProducts();

  // Optional: simple filters/search already in your page can remain as-is
});
