// js/script.js

// Replace everything in js/script.js with this

document.addEventListener('DOMContentLoaded', () => {
    // --- MASTER PRODUCT DATA (NOW WITH CATEGORIES) ---
    const products = [
        { id: 1, name: "Stylish T-Shirt", price: 1499, image: "https://via.placeholder.com/300x220/17A2B8/FFFFFF?text=T-Shirt", rating: 5, category: 'Fashion' },
        { id: 2, name: "Wireless Headphones", price: 5999, image: "https://via.placeholder.com/300x220/FFC107/000000?text=Headphones", rating: 4, category: 'Electronics' },
        { id: 3, name: "Modern Smart Watch", price: 9500, image: "https://via.placeholder.com/300x220/DC3545/FFFFFF?text=Watch", rating: 5, category: 'Electronics' },
        { id: 4, name: "Running Shoes", price: 4200, image: "https://via.placeholder.com/300x220/28A745/FFFFFF?text=Shoes", rating: 4, category: 'Fashion' },
        { id: 5, name: "Leather Sofa", price: 45000, image: "https://via.placeholder.com/300x220/6F4E37/FFFFFF?text=Sofa", rating: 5, category: 'Home Goods' },
        { id: 6, name: "Bluetooth Speaker", price: 3500, image: "https://via.placeholder.com/300x220/6C757D/FFFFFF?text=Speaker", rating: 4, category: 'Electronics' },
    ];

    // --- DOM ELEMENTS ---
    const productGrid = document.getElementById('productGrid');
    const categoryFilters = document.getElementById('category-filters');
    
    // (Keep all other element variables like headerIcons, cartDrawer, etc.)
    const searchInput = document.getElementById('searchInput');
    const headerIcons = document.getElementById('headerIcons');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const cartDrawerItemsContainer = document.getElementById('cart-drawer-items');
    const drawerSubtotalEl = document.getElementById('drawer-subtotal');
    
    // --- CATEGORY FILTER LOGIC ---
    const displayCategories = () => {
        const categories = ['All', ...new Set(products.map(p => p.category))];
        categoryFilters.innerHTML = categories.map(cat => 
            `<button class="category-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
        ).join('');
    };

    categoryFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const selectedCategory = e.target.dataset.category;
            
            // Update active button style
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            if (selectedCategory === 'All') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(p => p.category === selectedCategory);
                displayProducts(filteredProducts);
            }
        }
    });

    // --- (Keep all other functions: setupHeader, displayProducts, updateCartUI, etc.) ---
    // Make sure your existing JS functions from the previous step are still here.
    // I am omitting them here for brevity, but they are required to be in this file.
    
    // ... (Your existing setupHeader, displayProducts, updateCartUI, addToCart, removeFromCart, openDrawer, closeDrawer, etc., functions go here) ...
    // Note: I will paste the full script at the very end to avoid confusion.

    // --- INITIALIZATION ---
    setupHeader();
    displayProducts(products);
    displayCategories(); // <-- Add this new function call
    updateCartUI();
});

// For clarity, the entire JS section for copy-pasting is at the end.

document.addEventListener('DOMContentLoaded', () => {
    // --- MASTER PRODUCT DATA ---
    const products = [
        { id: 1, name: "Stylish T-Shirt", price: 1499, image: "https://via.placeholder.com/300x220/17A2B8/FFFFFF?text=T-Shirt", rating: 5 },
        { id: 2, name: "Wireless Headphones", price: 5999, image: "https://via.placeholder.com/300x220/FFC107/000000?text=Headphones", rating: 4 },
        { id: 3, name: "Modern Smart Watch", price: 9500, image: "https://via.placeholder.com/300x220/DC3545/FFFFFF?text=Watch", rating: 5 },
        { id: 4, name: "Running Shoes", price: 4200, image: "https://via.placeholder.com/300x220/28A745/FFFFFF?text=Shoes", rating: 4 },
    ];

    // --- SVG ICONS ---
    const userIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;
    const cartIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`;
    
    // --- DOM ELEMENTS ---
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const headerIcons = document.getElementById('headerIcons');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const cartDrawerItemsContainer = document.getElementById('cart-drawer-items');
    const drawerSubtotalEl = document.getElementById('drawer-subtotal');
    
    // --- CART STATE ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

    // --- HEADER & AUTHENTICATION ---
    const setupHeader = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const profileImgSrc = currentUser.profileImg || `https://via.placeholder.com/150/007bff/FFFFFF?text=${currentUser.name.charAt(0)}`;
            headerIcons.innerHTML = `
                <a href="profile.html" class="profile-link">
                    <img src="${profileImgSrc}" alt="Profile Picture" class="profile-pic">
                    <span class="profile-name">${currentUser.name.split(' ')[0]}</span>
                </a>
                <a href="#" id="cart-link" class="icon-link" title="Shopping Cart">${cartIconSVG}</a>
                <a href="#" id="logoutBtn" class="logout-link">Logout</a>
            `;
            document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.reload();
            });
        } else {
            headerIcons.innerHTML = `
                <a href="login.html" class="icon-link" title="Login / Sign Up">${userIconSVG}</a>
                <a href="#" id="cart-link" class="icon-link" title="Shopping Cart">${cartIconSVG}</a>
            `;
        }
        document.getElementById('cart-link').addEventListener('click', (e) => {
            e.preventDefault(); 
            openDrawer();
        });
    };

    // --- CART & UI FUNCTIONS ---
    const displayProducts = (productsToDisplay) => {
        productGrid.innerHTML = '';
        productsToDisplay.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            let starsHTML = Array(5).fill(0).map((_, i) => i < product.rating ? '★' : '☆').join('');
            card.innerHTML = `
                <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;"><img src="${product.image}" alt="${product.name}"></a>
                <div class="product-info">
                    <div>
                        <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                            <h4>${product.name}</h4>
                            <div class="star-rating">${starsHTML}</div>
                            <p class="price">PKR ${product.price.toLocaleString()}</p>
                        </a>
                    </div>
                    <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>`;
            productGrid.appendChild(card);
        });
    };

    const updateCartUI = () => {
        // Update Drawer
        cartDrawerItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartDrawerItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'drawer-cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="drawer-item-info">
                        <h5>${item.name}</h5>
                        <p>${item.quantity} &times; PKR ${item.price.toLocaleString()}</p>
                    </div>
                    <button class="drawer-item-remove" data-id="${item.id}">&times;</button>
                `;
                cartDrawerItemsContainer.appendChild(itemEl);
            });
        }
        
        // Update Subtotal
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        drawerSubtotalEl.textContent = `PKR ${subtotal.toLocaleString()}`;

        // Update Header Icon Badge
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartLink = document.getElementById('cart-link');
        if (cartLink) {
            let badge = cartLink.querySelector('#cart-count-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.id = 'cart-count-badge';
                cartLink.appendChild(badge);
            }
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        saveCart();
    };

    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
        openDrawer();
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    };

    const openDrawer = () => {
        cartDrawer.classList.add('active');
        cartDrawerOverlay.classList.add('active');
    };

    const closeDrawer = () => {
        cartDrawer.classList.remove('active');
        cartDrawerOverlay.classList.remove('active');
    };

    // --- EVENT LISTENERS ---
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const productId = parseInt(e.target.dataset.id, 10);
            addToCart(productId);
        }
    });

    cartDrawerItemsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('drawer-item-remove')) {
            const productId = parseInt(e.target.dataset.id, 10);
            removeFromCart(productId);
        }
    });

    closeDrawerBtn.addEventListener('click', closeDrawer);
    cartDrawerOverlay.addEventListener('click', closeDrawer);

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm));
        displayProducts(filteredProducts);
    });

    // --- INITIALIZATION ---
    setupHeader();
    displayProducts(products);
    updateCartUI();
});