// JavaScript Document
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("errorMessage");

    // For demo purposes, we'll just use these as valid credentials
    const validUsername = "aurauser";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
        window.location.href = "welcome.html"; // Redirect to a welcome page or dashboard
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
});


// welcome page

function scrollToShop() {
    const shopSection = document.getElementById("shop");
    window.scrollTo({
        top: shopSection.offsetTop - 60, // Adjust for header
        behavior: 'smooth'
        
    });
}

// home page

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

// Function to automatically cycle through slides every 5 seconds
function autoSlideShow() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 60,
        behavior: 'smooth'
    });
}

// Show the first slide initially
showSlide(currentSlide);

// Start the slideshow loop
setInterval(autoSlideShow, 5000);

// // shop page

// // Function to simulate adding items to a shopping cart
// function addToCart(productName, price) {
//     alert(`${productName} has been added to your cart for $${price}.`);
// }


// catergori trouser

// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart icon with item count
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.innerText = cart.length;
}

// Function to add item to cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart)); // Save to local storage
    updateCartCount();
    alert("Item added to cart!");
}

// Example of product data (you would replace this with actual product info)
const products = [
    { id: 1, name: "Men's Slim Fit Trousers", price: 40, image: "images/trouser1.jpg" },
    { id: 2, name: "Classic Cotton Trousers", price: 50, image: "images/trouser2.jpg" },
    { id: 3, name: "Stylish Chino Trousers", price: 55, image: "images/trouser3.jpg" },
    // More products here
];

// Add event listeners to all "Add to Cart" buttons
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.dataset.productId;
            const product = products.find(p => p.id == productId);
            if (product) {
                addToCart(product);
            }
        });
    });

    updateCartCount(); // Update cart count on page load
});


// cart page

// Example products for demonstration
const products = [
    { id: 1, name: 'Product 1', price: 29.99, img: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 49.99, img: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Product 3', price: 15.99, img: 'https://via.placeholder.com/100' }
];

// Cart data (this could be dynamically managed in a real app)
let cart = [];

// Update cart in localStorage (for persistence)
function updateCartInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    renderCartItems();
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartCount.textContent = '0 Items';
    } else {
        cartEmptyMessage.style.display = 'none';
        cartCount.textContent = `${cart.length} Item${cart.length > 1 ? 's' : ''}`;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item-btn" onclick="removeItem(${item.id})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });
    }

    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

// Add item to cart
function addItemToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartInLocalStorage();
    renderCartItems();
}

// Remove item from cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartInLocalStorage();
    renderCartItems();
}

// Initialize cart
loadCart();

// For demonstration, add products to the cart using addItemToCart function
addItemToCart(1); // Adds product 1 to cart
addItemToCart(2); // Adds product 2 to cart
addItemToCart(1); // Adds another product 1 to cart (increases quantity)

// wishlist page

// Example products for demonstration
const products = [
    { id: 1, name: 'Product 1', price: 29.99, img: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 49.99, img: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Product 3', price: 15.99, img: 'https://via.placeholder.com/100' }
];

// Wishlist data (this could be dynamically managed in a real app)
let wishlist = [];

// Update wishlist in localStorage (for persistence)
function updateWishlistInLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Load wishlist from localStorage
function loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
    renderWishlistItems();
}

// Render wishlist items
function renderWishlistItems() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const wishlistCount = document.getElementById('wishlist-count');
    const wishlistEmptyMessage = document.getElementById('wishlist-empty-message');

    wishlistItemsContainer.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistEmptyMessage.style.display = 'block';
        wishlistCount.textContent = '0 Items';
    } else {
        wishlistEmptyMessage.style.display = 'none';
        wishlistCount.textContent = `${wishlist.length} Item${wishlist.length > 1 ? 's' : ''}`;
        wishlist.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('wishlist-item');
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="wishlist-item-details">
                    <div class="wishlist-item-name">${item.name}</div>
                    <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="wishlist-item-actions">
                    <button class="remove-item-btn" onclick="removeItem(${item.id})">Remove</button>
                </div>
            `;
            wishlistItemsContainer.appendChild(itemElement);
        });
    }
}

// Add item to wishlist
function addItemToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (!wishlist.some(item => item.id === productId)) {
        wishlist.push(product);
    }

    updateWishlistInLocalStorage();
    renderWishlistItems();
}

// Remove item from wishlist
function removeItem(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    updateWishlistInLocalStorage();
    renderWishlistItems();
}

// Initialize wishlist
loadWishlist();

// For demonstration, add products to the wishlist
addItemToWishlist(1); // Adds product 1 to wishlist
addItemToWishlist(2); // Adds product 2 to wishlist
addItemToWishlist(1); // Adding again to show duplicate prevention

