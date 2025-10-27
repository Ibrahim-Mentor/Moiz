

// --- Product Data ---
const products = {
  watches: [
    { id: 1, name: "Classic Chronograph", price: 12500, image: "img/watch/watch1.png", rating: 5, description: "Modern smartwatch with a vibrant tech-inspired display." },
    { id: 2, name: "Steel Dive Watch", price: 15999, image: "img/watch/watch2.png", rating: 5, description: "Elegant timepiece with a clean white dial and brown leather strap." }, 
    { id: 3, name: "Minimalist Leather", price: 8999, image: "img/watch/watch3.png", rating: 4, description: "A sophisticated gold-tone watch, perfect for formal occasions." }, 
    { id: 4, name: "Digital Sport Watch", price: 7500, image: "img/watch/watch4.png", rating: 4, description: "Stylish watch featuring a striking deep blue dial and leather strap." }, 
    { id: 5, name: "Gold Dress Watch", price: 18500, image: "img/watch/watch5.png", rating: 5, description: "Elegant rose gold watch paired with stylish accessories." }, 
    { id: 6, name: "Vintage Field Watch", price: 9200, image: "img/watch/watch6.png", rating: 4, description: "A robust steel chronograph with a captivating blue sunray dial." }, 
    { id: 7, name: "Modern Smartwatch", price: 22000, image: "img/watch/watch7.png", rating: 5, description: "A showcase of our diverse and stylish watch collection." }  

  ],
  bracelets: [
    { id: 8, name: "Moonstone Bead Bracelet", price: 3500, image: "img/bracelet/bracelet1.jpg", rating: 4, description: "Luminous moonstone beads accented with colorful gemstones." }, 
    { id: 9, name: "Obsidian Snowflake Bracelet", price: 1800, image: "img/bracelet/bracelet2.jpg", rating: 5, description: "Striking obsidian snowflake bead bracelet with a decorative silver bead." }, 
    { id: 10, name: "Kids Charm Bracelet Set", price: 2100, image: "img/bracelet/bracelet3.jpg", rating: 4, description: "Fun and colorful beaded bracelets perfect for kids." }, 
    { id: 11, name: "Gemstone Moonstone Bracelet", price: 4200, image: "img/bracelet/bracelet4.jpg", rating: 5, description: "Beautiful moonstone bead bracelet featuring colorful gemstone accents." },
    { id: 17, name: "Woven Leather Bracelet", price: 3500, image: "img/bracelet/bracelet1.png", rating: 4, description: "Stylish brown woven leather bracelet with a steel clasp." }, 
    { id: 18, name: "Diamond Accent Bracelet", price: 1800, image: "img/bracelet/bracelet2.png", rating: 5, description: "Delicate gold-tone bracelet with a sparkling diamond accent centerpiece." }, 
    { id: 19, name: "Crystal Circle Bracelet", price: 2100, image: "img/bracelet/bracelet3.png", rating: 4, description: "Elegant gold-tone bangle featuring a crystal-studded circle." }, 
    { id: 20, name: "Solitaire Diamond Chain", price: 4200, image: "img/bracelet/bracelet4.png", rating: 5, description: "A simple yet stunning gold chain bracelet with a single solitaire diamond." }  
  ],
  wallets: [
    { id: 21, name: "Classic Tan Bifold Wallet", price: 2200, image: "img/wallet/wallet1.png", rating: 5, description: "A timeless tan leather bifold wallet with contrast stitching." }, 
    { id: 22, name: "Carbon Fiber Cardholder", price: 2800, image: "img/wallet/wallet2.png", rating: 4, description: "Minimalist and sleek carbon fiber cardholder for your essential cards." }, 
    { id: 23, name: "Brown Leather Bifold", price: 2200, image: "img/wallet/wallet3.png", rating: 5, description: "Keep your cards and cash organized in this classic brown leather bifold." }, 
    { id: 24, name: "Canvas & Leather Travel Wallet", price: 2800, image: "img/wallet/wallet4.png", rating: 4, description: "A rugged canvas and leather wallet, perfect for travel documents and currency." }, 
    { id: 25, name: "Smart Bifold Wallet", price: 2200, image: "img/wallet/wallet5.png", rating: 5, description: "A modern smart wallet with indicator light, blending tech and style." }, 
    { id: 26, name: "Red Zipper Clutch Wallet", price: 2800, image: "img/wallet/wallet6.png", rating: 4, description: "Secure your essentials in style with this elegant red zipper clutch." }  
  ],
  necklaces: [
    { id: 27, name: "Pearl Drop Pendant", price: 4500, image: "img/neckles/images.jpg", rating: 5, description: "An exquisite pearl drop pendant with crystal accents." }, 
    { id: 28, name: "Crystal Flower Pearl Necklace", price: 3200, image: "img/neckles/S8152a7bd6c824e0d986abf4212804e850.webp", rating: 4, description: "A classic gold chain featuring a crystal flower and pearl charm." } 
  ]
};

const masterProduct = {
  id: 6,
  name: "Vintage Field Watch", 
  price: 9200,
  image: "img/watch/watch6.png",
  description: "A robust steel chronograph with a captivating blue sunray dial."
};



    // --- (The rest of this script is the standard site-wide logic) ---
    const userIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;
    const cartIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`;
    const productGrid = document.getElementById('productGrid');
    const categoryFilters = document.getElementById('category-filters');
    const searchInput = document.getElementById('searchInput');
    const headerIcons = document.getElementById('headerIcons');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const cartDrawerItemsContainer = document.getElementById('cart-drawer-items');
    const drawerSubtotalEl = document.getElementById('drawer-subtotal');
    const pageTitle = document.getElementById('page-title');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));
    const setupHeader = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const profileImgSrc = currentUser.profileImg || `https://source.unsplash.com/50x50/?portrait,person&sig=${currentUser.email}`;
            headerIcons.innerHTML = `<a href="profile.html" class="profile-link"><img src="${profileImgSrc}" alt="Profile Picture" class="profile-pic"><span class="profile-name">${currentUser.name.split(' ')[0]}</span></a><a href="#" id="cart-link" class="icon-link" title="Shopping Cart">${cartIconSVG}</a><a href="#" id="logoutBtn" class="logout-link">Logout</a>`;
            document.getElementById('logoutBtn').addEventListener('click', (e) => { e.preventDefault(); localStorage.removeItem('currentUser'); window.location.reload(); });
        } else {
            headerIcons.innerHTML = `<a href="login.html" class="icon-link" title="Login / Sign Up">${userIconSVG}</a><a href="#" id="cart-link" class="icon-link" title="Shopping Cart">${cartIconSVG}</a>`;
        }
        document.getElementById('cart-link').addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
    };
    const displayProducts = (productsToDisplay) => {
        productGrid.innerHTML = '';
        productsToDisplay.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            let starsHTML = Array(5).fill(0).map((_, i) => i < product.rating ? '★' : '☆').join('');
            card.innerHTML = `<a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a><div class="product-info"><div><a href="product.html?id=${product.id}" style="text-decoration:none;color:inherit;"><h4>${product.name}</h4><div class="star-rating">${starsHTML}</div><p class="price">PKR ${product.price.toLocaleString()}</p></a></div><button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button></div>`;
            productGrid.appendChild(card);
        });
    };
    const updateCartUI = () => {
        cartDrawerItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartDrawerItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'drawer-cart-item';
                itemEl.innerHTML = `<img src="${item.image}" alt="${item.name}"><div class="drawer-item-info"><h5>${item.name}</h5><p>${item.quantity} &times; PKR ${item.price.toLocaleString()}</p></div><button class="drawer-item-remove" data-id="${item.id}">&times;</button>`;
                cartDrawerItemsContainer.appendChild(itemEl);
            });
        }
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        drawerSubtotalEl.textContent = `PKR ${subtotal.toLocaleString()}`;
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartLink = document.getElementById('cart-link');
        if (cartLink) {
            let badge = cartLink.querySelector('#cart-count-badge');
            if (!badge) { badge = document.createElement('span'); badge.id = 'cart-count-badge'; cartLink.appendChild(badge); }
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        saveCart();
    };
    const addToCart = (productId) => { const product = products.find(p => p.id === productId); if (!product) return; const existingItem = cart.find(item => item.id === productId); if (existingItem) { existingItem.quantity++; } else { cart.push({ ...product, quantity: 1 }); } updateCartUI(); openDrawer(); };
    const removeFromCart = (productId) => { cart = cart.filter(item => item.id !== productId); updateCartUI(); };
    const openDrawer = () => { cartDrawer.classList.add('active'); cartDrawerOverlay.classList.add('active'); };
    const closeDrawer = () => { cartDrawer.classList.remove('active'); cartDrawerOverlay.classList.remove('active'); };
    const displayCategories = (activeCat) => {
        if (!categoryFilters) return;
        const categories = ['All', ...new Set(products.map(p => p.category))];
        categoryFilters.innerHTML = categories.map(cat => `<button class="category-btn ${cat === activeCat ? 'active' : ''}" data-category="${cat}">${cat}</button>`).join('');
    };
    
    // --- Page Initialization Logic ---
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category') || 'All';
    if(pageTitle && initialCategory !== 'All') {
        pageTitle.textContent = `${initialCategory}`;
    }

    setupHeader();
    displayCategories(initialCategory);
    const initialProducts = initialCategory === 'All' ? products : products.filter(p => p.category === initialCategory);
    displayProducts(initialProducts);
    updateCartUI();

    // --- Event Listeners ---
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const selectedCategory = e.target.dataset.category;
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const productsToDisplay = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);
            displayProducts(productsToDisplay);
            pageTitle.textContent = selectedCategory === 'All' ? 'All Products' : selectedCategory;
        }
    });
    productGrid.addEventListener('click', (e) => { if (e.target.classList.contains('btn-add-to-cart')) { const productId = parseInt(e.target.dataset.id, 10); addToCart(productId); } });
    cartDrawerItemsContainer.addEventListener('click', e => { if (e.target.classList.contains('drawer-item-remove')) { const productId = parseInt(e.target.dataset.id, 10); removeFromCart(productId); } });
    closeDrawerBtn.addEventListener('click', closeDrawer);
    cartDrawerOverlay.addEventListener('click', closeDrawer);
    searchInput.addEventListener('keyup', (e) => { const searchTerm = e.target.value.toLowerCase(); const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm)); displayProducts(filteredProducts); });
});