// js/products.js

document.addEventListener('DOMContentLoaded', () => {
    // --- MASTER PRODUCT DATA (Using your local images) ---
    const products = [
        {name: "Watches", price: 1499, image: "img/watch/watch7.png", rating: 5, category: 'Fashion' },
            id: 1,adphones", rating: 4, category: 'Electronics' },
            name: "Classic Chronograph Watch",Watch", rating: 5, category: 'Electronics' },
            price: 12500,, rating: 4, category: 'Fashion' },
            image: "img/watch/watch7.png",rating: 5, category: 'Home Goods' },
            category: "Watches"peaker", rating: 4, category: 'Electronics' },
        },
        {
            id: 2,-- DOM ELEMENTS ---
            name: "Leather Bracelet",d = document.getElementById('productGrid');
            price: 2500,
            image: "img/bracelet/bracelet1.png",
            category: "Bracelets"
        },
        {    const headerIcons = document.getElementById('headerIcons');
            id: 3,-drawer');
            name: "Premium Wallet",
            price: 3500,
            image: "img/wallet/wallet1.png",
            category: "Wallets"
        }
        // Add more products as needed    // --- CATEGORY FILTER LOGIC ---
    ];

    // --- (The rest of this script is the standard site-wide logic) ---
    const userIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;ive' : ''}" data-category="${cat}">${cat}</button>`
    const cartIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`;
    const productGrid = document.getElementById('productGrid');
    const categoryFilters = document.getElementById('category-filters');
    const searchInput = document.getElementById('searchInput');
    const headerIcons = document.getElementById('headerIcons');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const cartDrawerItemsContainer = document.getElementById('cart-drawer-items');ch(btn => btn.classList.remove('active'));
    const drawerSubtotalEl = document.getElementById('drawer-subtotal');
    const pageTitle = document.getElementById('page-title');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];y === 'All') {
    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));
    const setupHeader = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const profileImgSrc = currentUser.profileImg || `https://source.unsplash.com/50x50/?portrait,person&sig=${currentUser.email}`;
            headerIcons.innerHTML = `<a href="profile.html" class="profile-link"><img src="${profileImgSrc}" alt="Profile Picture" class="profile-pic"><span class="profile-name">${currentUser.name.split(' ')[0]}</span></a><a href="#" id="cart-link" class="icon-link" title="Shopping Cart">${cartIconSVG}</a><a href="#" id="logoutBtn" class="logout-link">Logout</a>`;
            document.getElementById('logoutBtn').addEventListener('click', (e) => { e.preventDefault(); localStorage.removeItem('currentUser'); window.location.reload(); });
        } else {
            headerIcons.innerHTML = `<a href="login.html" class="icon-link" title="Login / Sign Up">${userIconSVG}</a><a href="#" id="cart-link" class="icon-link" title="Shopping Cart">${cartIconSVG}</a>`;
        } Make sure your existing JS functions from the previous step are still here.
        document.getElementById('cart-link').addEventListener('click', (e) => { e.preventDefault(); openDrawer(); }); are required to be in this file.
    };
    const displayProducts = (productsToDisplay) => {Products, updateCartUI, addToCart, removeFromCart, openDrawer, closeDrawer, etc., functions go here) ...
        productGrid.innerHTML = '';nd to avoid confusion.
        productsToDisplay.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            let starsHTML = Array(5).fill(0).map((_, i) => i < product.rating ? '★' : '☆').join('');
            card.innerHTML = `<a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a><div class="product-info"><div><a href="product.html?id=${product.id}" style="text-decoration:none;color:inherit;"><h4>${product.name}</h4><div class="star-rating">${starsHTML}</div><p class="price">PKR ${product.price.toLocaleString()}</p></a></div><button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button></div>`;Categories(); // <-- Add this new function call
            productGrid.appendChild(card);dateCartUI();
        });
    };
    const updateCartUI = () => {ction for copy-pasting is at the end.
        cartDrawerItemsContainer.innerHTML = '';
        if (cart.length === 0) {tListener('DOMContentLoaded', () => {
            cartDrawerItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        } else {
            cart.forEach(item => { image: "https://via.placeholder.com/300x220/17A2B8/FFFFFF?text=T-Shirt", rating: 5 },
                const itemEl = document.createElement('div');
                itemEl.className = 'drawer-cart-item';ge: "https://via.placeholder.com/300x220/DC3545/FFFFFF?text=Watch", rating: 5 },
                itemEl.innerHTML = `<img src="${item.image}" alt="${item.name}"><div class="drawer-item-info"><h5>${item.name}</h5><p>${item.quantity} &times; PKR ${item.price.toLocaleString()}</p></div><button class="drawer-item-remove" data-id="${item.id}">&times;</button>`;, name: "Running Shoes", price: 4200, image: "https://via.placeholder.com/300x220/28A745/FFFFFF?text=Shoes", rating: 4 },
                cartDrawerItemsContainer.appendChild(itemEl);
            });
        }
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);iewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;
        drawerSubtotalEl.textContent = `PKR ${subtotal.toLocaleString()}`;g" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`;
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartLink = document.getElementById('cart-link');
        if (cartLink) {
            let badge = cartLink.querySelector('#cart-count-badge');ById('searchInput');
            if (!badge) { badge = document.createElement('span'); badge.id = 'cart-count-badge'; cartLink.appendChild(badge); }
            badge.textContent = totalItems; cartDrawer = document.getElementById('cart-drawer');
            badge.style.display = totalItems > 0 ? 'flex' : 'none';rOverlay = document.getElementById('cart-drawer-overlay');
        }nst closeDrawerBtn = document.getElementById('close-drawer-btn');
        saveCart();
    };
    const addToCart = (productId) => { const product = products.find(p => p.id === productId); if (!product) return; const existingItem = cart.find(item => item.id === productId); if (existingItem) { existingItem.quantity++; } else { cart.push({ ...product, quantity: 1 }); } updateCartUI(); openDrawer(); };
    const removeFromCart = (productId) => { cart = cart.filter(item => item.id !== productId); updateCartUI(); };
    const openDrawer = () => { cartDrawer.classList.add('active'); cartDrawerOverlay.classList.add('active'); };('cart')) || [];
    const closeDrawer = () => { cartDrawer.classList.remove('active'); cartDrawerOverlay.classList.remove('active'); };ge.setItem('cart', JSON.stringify(cart));
    const displayCategories = (activeCat) => {
        if (!categoryFilters) return;
        const categories = ['All', ...new Set(products.map(p => p.category))];nst setupHeader = () => {
        categoryFilters.innerHTML = categories.map(cat => `<button class="category-btn ${cat === activeCat ? 'active' : ''}" data-category="${cat}">${cat}</button>`).join('');    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    };
    ://via.placeholder.com/150/007bff/FFFFFF?text=${currentUser.name.charAt(0)}`;
    // --- Page Initialization Logic ---
    const urlParams = new URLSearchParams(window.location.search);ofile-link">
    const initialCategory = urlParams.get('category') || 'All';Profile Picture" class="profile-pic">
    if(pageTitle && initialCategory !== 'All') {               <span class="profile-name">${currentUser.name.split(' ')[0]}</span>
        pageTitle.textContent = `${initialCategory}`;                </a>
    } href="#" id="cart-link" class="icon-link" title="Shopping Cart">${cartIconSVG}</a>
tn" class="logout-link">Logout</a>
    setupHeader();
    displayCategories(initialCategory);logoutBtn').addEventListener('click', (e) => {
    const initialProducts = initialCategory === 'All' ? products : products.filter(p => p.category === initialCategory);reventDefault();
    displayProducts(initialProducts);                localStorage.removeItem('currentUser');
    updateCartUI();n.reload();

    // --- Event Listeners ---
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const selectedCategory = e.target.dataset.category;ass="icon-link" title="Shopping Cart">${cartIconSVG}</a>
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const productsToDisplay = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);
            displayProducts(productsToDisplay);   e.preventDefault(); 
            pageTitle.textContent = selectedCategory === 'All' ? 'All Products' : selectedCategory;     openDrawer();
        }
    });
    productGrid.addEventListener('click', (e) => { if (e.target.classList.contains('btn-add-to-cart')) { const productId = parseInt(e.target.dataset.id, 10); addToCart(productId); } });
    cartDrawerItemsContainer.addEventListener('click', e => { if (e.target.classList.contains('drawer-item-remove')) { const productId = parseInt(e.target.dataset.id, 10); removeFromCart(productId); } });
    closeDrawerBtn.addEventListener('click', closeDrawer);
    cartDrawerOverlay.addEventListener('click', closeDrawer);     productGrid.innerHTML = '';


});    searchInput.addEventListener('keyup', (e) => { const searchTerm = e.target.value.toLowerCase(); const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm)); displayProducts(filteredProducts); });        productsToDisplay.forEach(product => {
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

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setDarkMode(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
    }
    
    // Initialize dark mode from saved preference or system preference
    const savedTheme = localStorage.getItem('darkMode');
    setDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark.matches));
    
    darkModeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setDarkMode(!isDark);
    });
}

// Image Slider
function initSlider() {
    const slides = document.querySelectorAll('.fade-slider-container img');
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Show first slide
    showSlide(0);
    
    // Auto advance slides
    setInterval(nextSlide, 5000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSlider();
});

// Optimize images on load
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.onload = () => {
                img.style.opacity = '1';
            };
        }
    });
});