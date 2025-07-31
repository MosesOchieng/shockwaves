// Shop JavaScript Functionality

// Cart functionality
let cart = [];
let cartTotal = 0;

// Product data
const products = {
    1: {
        id: 1,
        name: "Land Rover Discovery 5 HSE 2019",
        price: 85000,
        image: "AUTOMATIVE/Discovery 5 2019/2019 discovery 5 hse-1.jpg",
        description: "Luxury SUV with premium features and excellent performance. This vehicle comes with advanced technology, comfortable interior, and powerful engine."
    },
    2: {
        id: 2,
        name: "Jeep Grand Cherokee 2022",
        price: 75000,
        image: "AUTOMATIVE/Jeep Grand 2022/jeep-grand-1.jpg",
        description: "Powerful SUV with off-road capabilities. Features include advanced 4x4 system, premium interior, and cutting-edge safety features."
    },
    3: {
        id: 3,
        name: "Toyota Land Cruiser Prado 2020",
        price: 65000,
        image: "AUTOMATIVE/Prado 2020/prado-1.jpg",
        description: "Reliable and durable SUV for any terrain. Known for its exceptional reliability, spacious interior, and excellent resale value."
    },
    4: {
        id: 4,
        name: "Subaru Forester 2021",
        price: 45000,
        image: "AUTOMATIVE/Subaru Forester/forester-1.jpg",
        description: "Safe and efficient crossover with all-wheel drive. Features advanced safety systems, fuel efficiency, and versatile cargo space."
    },
    5: {
        id: 5,
        name: "Toyota Land Cruiser Prado 2019",
        price: 60000,
        image: "AUTOMATIVE/Toyota prado 2019/prado-2019-1.jpg",
        description: "Proven reliability with premium comfort features. Excellent for both city driving and off-road adventures."
    }
};

// Initialize cart from localStorage
function initCart() {
    const savedCart = localStorage.getItem('shockwaveCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

// Add to cart
function addToCart(productId) {
    const product = products[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.name} added to cart!`, 'success');
}

// Update cart
function updateCart() {
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    localStorage.setItem('shockwaveCart', JSON.stringify(cart));
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotalElement = document.getElementById('cartTotal');

    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60x60?text=Product'">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Update total
    cartTotalElement.textContent = `$${cartTotal.toLocaleString()}`;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Item removed from cart', 'info');
}

// Quick view functionality
function quickView(productId) {
    const product = products[productId];
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="quick-view-content">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300?text=Product'">
            </div>
            <div class="quick-view-details">
                <h2>${product.name}</h2>
                <p class="quick-view-description">${product.description}</p>
                <div class="quick-view-price">$${product.price.toLocaleString()}</div>
                <div class="quick-view-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); closeQuickView();">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Close quick view
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.style.display = 'none';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    // Create order summary
    let orderSummary = 'Order Summary:\n\n';
    cart.forEach(item => {
        orderSummary += `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}\n`;
    });
    orderSummary += `\nTotal: $${cartTotal.toLocaleString()}`;

    // Show order summary and contact info
    const message = `${orderSummary}\n\nPlease contact us to complete your order:\nPhone: +254 XXX XXX XXX\nEmail: shockwaveteknologies@gmail.com\nWhatsApp: +254 XXX XXX XXX`;
    
    alert(message);
    
    // Clear cart after checkout
    cart = [];
    updateCart();
    toggleCart();
    showNotification('Order submitted! We will contact you soon.', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .quick-view-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    
    .quick-view-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 8px;
    }
    
    .quick-view-details h2 {
        margin-bottom: 1rem;
        color: #1f2937;
    }
    
    .quick-view-description {
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .quick-view-price {
        font-size: 1.5rem;
        font-weight: 800;
        color: #22c55e;
        margin-bottom: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .quick-view-content {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('quickViewModal');
    if (event.target === modal) {
        closeQuickView();
    }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    
    // Add mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}); 