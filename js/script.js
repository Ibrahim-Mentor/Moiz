document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const productGrid = document.getElementById('productGrid');
    const categoryFilters = document.getElementById('category-filters');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const cartDrawerItemsContainer = document.getElementById('cart-drawer-items');
    const drawerSubtotalEl = document.getElementById('drawer-subtotal');
    const pageTitle = document.querySelector('.section-title');
    const masterProductContainer = document.getElementById('master-product-container');
    const collectionProductContainer = document.getElementById('collection-product-container');

    // --- CART LOGIC ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

    window.updateCartUI = () => {
        if (!cartDrawerItemsContainer || !drawerSubtotalEl) return;
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

    window.addToCart = (productId) => { 
        const allProducts = [masterProduct, ...products.watches, ...products.bracelets, ...products.necklaces];
        const product = allProducts.find(p => p.id === productId); 
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
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
        }
        updateCartUI(); 
    };
    
    const openDrawer = () => { 
        if(cartDrawer) cartDrawer.classList.add('active'); 
        if(cartDrawerOverlay) cartDrawerOverlay.classList.add('active'); 
    };
    const closeDrawer = () => { 
        if(cartDrawer) cartDrawer.classList.remove('active'); 
        if(cartDrawerOverlay) cartDrawerOverlay.classList.remove('active'); 
    };

    // --- HEADER & AUTH LOGIC ---
    window.setupHeader = () => {
        const headerIcons = document.getElementById('headerIcons');
        if (!headerIcons) return;

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const profileImgSrc = currentUser.profileImg || `https://via.placeholder.com/150/007bff/FFFFFF?text=${currentUser.name.charAt(0)}`;
            headerIcons.innerHTML = `
                <a href="profile.html" class="profile-link" title="My Account">
                    <img src="${profileImgSrc}" alt="Profile">
                    <span>${currentUser.name.split(' ')[0]}</span>
                </a>
                <a href="#" id="cart-link" title="Shopping Cart">&#128722;</a>`;
        } else {
            headerIcons.innerHTML = `
                <a href="login.html" title="My Account">&#128100;</a>
                <a href="#" id="cart-link" title="Shopping Cart">&#128722;</a>`;
        }
        const cartLink = document.getElementById('cart-link');
        if (cartLink) {
            cartLink.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
        }
        updateCartUI();
    };

    // --- PRODUCT DISPLAY LOGIC ---
    const displayMasterProduct = () => {
        if (!masterProductContainer) return;
        const product = masterProduct;
        masterProductContainer.innerHTML = `
            <div class="master-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="master-product-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">PKR ${product.price.toLocaleString()}</p>
                <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
    };

    const displayCollectionProducts = () => {
        if (!collectionProductContainer) return;
        collectionProductContainer.innerHTML = '';
        const collectionProducts = [
            products.watches[0],
            products.bracelets[0],
            products.necklaces[0]
        ];
        collectionProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
                <div class="product-info">
                    <div>
                        <a href="product.html?id=${product.id}" style="text-decoration:none;color:inherit;">
                            <h4>${product.name}</h4>
                            <p class="price">PKR ${product.price.toLocaleString()}</p>
                        </a>
                    </div>
                    <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>`;
            collectionProductContainer.appendChild(card);
        });
    };

    const displayProducts = (productsToDisplay) => {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        productsToDisplay.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            let starsHTML = Array(5).fill(0).map((_, i) => i < product.rating ? '★' : '☆').join('');
            card.innerHTML = `
                <a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
                <div class="product-info">
                    <div>
                        <a href="product.html?id=${product.id}" style="text-decoration:none;color:inherit;">
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

    const displayCategories = (activeCat) => {
        if (!categoryFilters) return;
        const categories = ['All', ...Object.keys(products)];
        const categoryMap = {
            'watches': 'Watches',
            'bracelets': 'Bracelets',
            'necklaces': 'Necklaces'
        };
        categoryFilters.innerHTML = categories.map(cat => `<button class="category-btn ${cat === activeCat ? 'active' : ''}" data-category="${cat}">${categoryMap[cat] || cat}</button>`).join('');
    };

    // --- SEARCH LOGIC ---
    window.setupSearch = () => {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (productGrid) {
                const allProducts = [...products.watches, ...products.bracelets, ...products.necklaces];
                const filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(searchTerm));
                displayProducts(filteredProducts);
                if (categoryFilters) categoryFilters.style.display = searchTerm ? 'none' : 'flex';
                if (pageTitle) pageTitle.textContent = searchTerm ? `Search Results for "${searchTerm}"` : 'Explore Our Products';
            }
            if (e.key === 'Enter' && !window.location.pathname.includes('products.html')) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    };

    // --- PAGE INITIALIZATION ---
    function initPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category') || 'All';
        const searchTerm = urlParams.get('search');

        if (pageTitle && initialCategory !== 'All') {
            pageTitle.textContent = `${initialCategory}`;
        }
        
        const allProducts = (typeof products !== 'undefined') ? [...(products.watches || []), ...(products.bracelets || []), ...(products.necklaces || [])] : [];

        let productsToDisplay = allProducts;
        if (searchTerm) {
            productsToDisplay = allProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (pageTitle) pageTitle.textContent = `Search Results for "${searchTerm}"`;
        } else if (initialCategory !== 'All') {
            productsToDisplay = products[initialCategory.toLowerCase()] || [];
        }

        if (productGrid) {
            displayProducts(productsToDisplay);
        }
        if (categoryFilters) {
            displayCategories(initialCategory);
        }
        
        if (masterProductContainer) {
            displayMasterProduct();
        }
        if (collectionProductContainer) {
            displayCollectionProducts();
        }
        
        // --- GLOBAL EVENT LISTENERS ---
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-to-cart')) {
                const productId = parseInt(e.target.dataset.id, 10);
                addToCart(productId);
            }
        });

        if (categoryFilters) {
            categoryFilters.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    const selectedCategory = e.target.dataset.category;
                    window.location.href = `products.html?category=${selectedCategory}`;
                }
            });
        }

        if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
        if(cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeDrawer);

        if (cartDrawerItemsContainer) {
            cartDrawerItemsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('drawer-item-remove')) {
                    const productId = parseInt(e.target.dataset.id, 10);
                    removeFromCart(productId);
                }
            });
        }
    }

    // --- HEADER INITIALIZATION ---
    if (document.getElementById('site-header-placeholder')) {
        document.addEventListener('headerLoaded', () => {
            window.setupHeader();
            window.setupSearch();
            initPage();
        });
    } else {
        window.setupHeader();
        window.setupSearch();
        initPage();
    }
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