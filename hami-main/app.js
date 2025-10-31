 // Initialize AOS animations
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Vanta.js background for hero section
        VANTA.GLOBE({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x10b981,
            backgroundColor: 0x0,
            size: 0.8
        });

        // Initialize Feather Icons
        feather.replace();

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            if (mobileMenu.classList.contains('open')) {
                menuIcon.setAttribute('data-feather', 'x');
            } else {
                menuIcon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });

        // Cart functionality
        let cart = [];
        const cartBtn = document.getElementById('cart-btn');
        const cartSidebar = document.getElementById('cart-sidebar');
        const closeCart = document.getElementById('close-cart');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        
        // Open cart
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('translate-x-full');
            cartOverlay.classList.add('opacity-100');
            cartOverlay.classList.remove('pointer-events-none');
            document.body.style.overflow = 'hidden';
        });
        
        // Close cart
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.remove('opacity-100');
            cartOverlay.classList.add('pointer-events-none');
            document.body.style.overflow = 'auto';
        });
        
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.remove('opacity-100');
            cartOverlay.classList.add('pointer-events-none');
            document.body.style.overflow = 'auto';
        });
        
        // Add to cart function
        function addToCart(productName, price) {
            // Check if product already exists in cart
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: parseFloat(price.replace('$', '')),
                    quantity: 1
                });
            }
            
            updateCart();
        }
        
        // Update cart display
        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Clear cart items
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                emptyCartMessage.style.display = 'block';
                cartSubtotal.textContent = '$0.00';
                cartTotal.textContent = '$0.00';
                return;
            }
            
            emptyCartMessage.style.display = 'none';
            
            // Add items to cart
            let subtotal = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'flex items-center justify-between bg-[#1e293b] p-4 rounded-lg';
                cartItem.innerHTML = `
                    <div>
                        <h4 class="font-medium text-white">${item.name}</h4>
                        <p class="text-gray-400 text-sm">$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="font-medium text-green-400">$${itemTotal.toFixed(2)}</span>
                        <button class="remove-item text-gray-400 hover:text-red-500" data-name="${item.name}">
                            <i data-feather="x" class="w-4 h-4"></i>
                        </button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Update totals
            cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
            cartTotal.textContent = `$${subtotal.toFixed(2)}`;
            
            // Reinitialize feather icons
            feather.replace();
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemName = e.currentTarget.getAttribute('data-name');
                    removeFromCart(itemName);
                });
            });
        }
        
        // Remove from cart
        function removeFromCart(itemName) {
            cart = cart.filter(item => item.name !== itemName);
            updateCart();
        }
        
        // Add event listeners to all "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                // Find the product card
                const productCard = e.target.closest('.product-card') || e.target.closest('.group');
                if (!productCard) return;
                
                // Get product details
                const nameElement = productCard.querySelector('h3');
                const priceElement = productCard.querySelector('.text-emerald-400.font-bold, .text-green-400.font-bold');
                
                if (nameElement && priceElement) {
                    const name = nameElement.textContent;
                    const price = priceElement.textContent;
                    addToCart(name, price);
                    
                    // Show visual feedback
                    const originalText = button.innerHTML;
                    button.innerHTML = '<i data-feather="check" class="w-4 h-4 mr-1"></i> Added';
                    feather.replace();
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        feather.replace();
                    }, 1500);
                }
            });
        });
        
        // Filter buttons functionality
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active', 'bg-green-500');
                    btn.classList.add('bg-[#1e293b]');
                });
                
                // Add active class to clicked button
                button.classList.add('active', 'bg-green-500');
                button.classList.remove('bg-[#1e293b]');
            });
        });

        // === Search + Price Filter for "Our Fresh Produce" section ===
const searchInput = document.getElementById('search-input');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const productCards = document.querySelectorAll('#products .product-card');

let activeCategory = 'all';

// Update price label as user slides
if (priceRange && priceValue) {
  priceRange.addEventListener('input', () => {
    priceValue.textContent = `$${priceRange.value}`;
    applyFilters();
  });
}

// Capture filter button category (already styled)
document.querySelectorAll('#products .filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('#products .filter-btn').forEach(btn => {
      btn.classList.remove('active', 'bg-green-500', 'text-white');
      btn.classList.add('bg-[#1e293b]', 'text-gray-300');
    });
    button.classList.add('active', 'bg-green-500', 'text-white');
    activeCategory = button.textContent.toLowerCase();
    applyFilters();
  });
});

// Search as user types
if (searchInput) {
  searchInput.addEventListener('input', applyFilters);
}

// Apply all filters
function applyFilters() {
  const searchText = searchInput?.value.toLowerCase() || '';
  const maxPrice = parseFloat(priceRange?.value || 5);

  productCards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const category = card.dataset.category?.toLowerCase() || '';
    const priceText = card.querySelector('.text-green-400.font-bold')?.textContent || '$0';
    const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;

    const matchesSearch = name.includes(searchText);
    const matchesCategory =
      activeCategory === 'all' ||
      category.includes(activeCategory);
    const matchesPrice = price <= maxPrice;

    if (matchesSearch && matchesCategory && matchesPrice) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
