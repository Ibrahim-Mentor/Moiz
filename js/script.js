/* --- NEW: Consolidated DOMContentLoaded Listener --- */
document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Loader Logic ---
    const loaderWrapper = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        if (loaderWrapper) {
            loaderWrapper.classList.add('hidden');
        }
    });

    // --- NEW: Custom Cursor Logic ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, input[type="submit"], .category-btn, .close-drawer-btn, .drawer-item-remove, .change-pic-label, label[for]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '30px';
                cursor.style.height = '30px';
                cursor.style.backgroundColor = 'var(--accent-color)';
                cursor.style.opacity = '0.5';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.opacity = '1';
            });
        });
    }

    // --- SVG Icons ---
    const userIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 24px; height: 24px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>`;
    const cartIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 24px; height: 24px;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>`;


    // --- DOM ELEMENTS ---
    const productGrid = document.getElementById('productGrid');
    const categoryFilters = document.getElementById('category-filters');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const cartDrawerItemsContainer = document.getElementById('cart-drawer-items');
    const drawerSubtotalEl = document.getElementById('drawer-subtotal');
    const pageTitle = document.querySelector('.section-title'); // Use querySelector for flexibility
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
                // Style badge directly or via CSS
                cartLink.style.position = 'relative'; // Ensure parent is relative for absolute positioning
                cartLink.appendChild(badge);
            }
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        saveCart();
    };

    window.addToCart = (productId) => {
        if (typeof products === 'undefined' || typeof masterProduct === 'undefined') {
            console.error('Products data is not loaded.');
            return;
        }
        // Combine all product sources
        const allProductSources = [masterProduct];
        for (const category in products) {
            if (Array.isArray(products[category])) {
                allProductSources.push(...products[category]);
            }
        }

        const product = allProductSources.find(p => p && p.id === productId); // Added check for p
        if (!product) {
            console.error(`Product with ID ${productId} not found.`);
            return;
        }
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
            const profileImgSrc = currentUser.profileImg || `https://via.placeholder.com/150/d4af37/1a1a1a?text=${currentUser.name.charAt(0)}`;
            headerIcons.innerHTML = `
                <a href="profile.html" class="profile-link" title="My Account">
                    <img src="${profileImgSrc}" alt="Profile">
                    <span>${currentUser.name.split(' ')[0]}</span>
                </a>
                <a href="#" id="cart-link" title="Shopping Cart">${cartIconSVG}</a>`; // Use SVG
        } else {
            headerIcons.innerHTML = `
                <a href="login.html" title="My Account">${userIconSVG}</a> <a href="#" id="cart-link" title="Shopping Cart">${cartIconSVG}</a>`; // Use SVG
        }
        const cartLink = document.getElementById('cart-link');
        if (cartLink) {
            cartLink.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
        }
        updateCartUI(); // Update cart count badge immediately
    };


    // --- PRODUCT DISPLAY LOGIC ---
    const displayMasterProduct = () => {
        // This function seems specific to index.html, might not be needed globally
        // Check if the container exists before proceeding
        if (!masterProductContainer || typeof masterProduct === 'undefined') return;
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
        // Specific to index.html
        if (!collectionProductContainer || typeof products === 'undefined') return;
        collectionProductContainer.innerHTML = '';
        const collectionProducts = [
            products.watches?.[0], // Use optional chaining
            products.bracelets?.[0],
            products.necklaces?.[0],
            products.wallets?.[0]
        ].filter(p => p); // Filter out undefined

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
        // Specific to products.html and index.html (collection)
        if (!productGrid && !collectionProductContainer) return; // Check both possible grids

        const grid = productGrid || collectionProductContainer; // Use the one that exists
         if (!grid) return; // Exit if neither grid is found on the current page

        grid.innerHTML = '';
        productsToDisplay.forEach(product => {
             if (!product) return; // Skip if product is undefined
            const card = document.createElement('div');
            card.className = 'product-card';
            let starsHTML = Array(5).fill(0).map((_, i) => i < (product.rating || 4) ? '★' : '☆').join('');
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
            grid.appendChild(card);
        });
    };


    const displayCategories = (activeCat) => {
        // Specific to products.html
        if (!categoryFilters || typeof products === 'undefined') return;
        const categories = ['All', ...Object.keys(products)];
        const categoryMap = {
            'watches': 'Watches',
            'bracelets': 'Bracelets',
            'necklaces': 'Necklaces',
            'wallets': 'Wallets'
        };
        categoryFilters.innerHTML = categories.map(cat => `<button class="category-btn ${cat === activeCat ? 'active' : ''}" data-category="${cat}">${categoryMap[cat] || cat}</button>`).join('');
    };

    // --- SEARCH LOGIC ---
    window.setupSearch = () => {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // This search logic might need adjustment if it should only run on products.html
            if (productGrid && typeof products !== 'undefined') { // Check if on a page with productGrid
                 const allProductSources = [];
                 for (const category in products) {
                     if (Array.isArray(products[category])) {
                         allProductSources.push(...products[category]);
                     }
                 }
                const filteredProducts = allProductSources.filter(p => p && p.name.toLowerCase().includes(searchTerm)); // Added check for p
                displayProducts(filteredProducts); // Display results in the main grid
                if (categoryFilters) categoryFilters.style.display = searchTerm ? 'none' : 'flex';
                if (pageTitle && window.location.pathname.includes('products.html')) { // Only update title on products page
                     pageTitle.textContent = searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'; // Changed default
                }
            } else if (e.key === 'Enter' && searchTerm.trim() !== '') { // Redirect from other pages on Enter
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    };


    // --- PAGE INITIALIZATION ---
    function initPageSpecificContent() {
         // Check if product data is loaded before proceeding
        if (typeof products === 'undefined' || typeof masterProduct === 'undefined') {
            console.log('Product data not ready for page init, retrying...');
            setTimeout(initPageSpecificContent, 100);
            return;
        }

        const pathname = window.location.pathname;
        const urlParams = new URLSearchParams(window.location.search);

        // --- Index Page Specific ---
        if (pathname.endsWith('/') || pathname.endsWith('index.html')) {
            // displayMasterProduct(); // If you have a master product section
            displayCollectionProducts(); // Display featured products
            initSlider(); // Initialize slider only on index page
        }

        // --- Products Page Specific ---
        else if (pathname.endsWith('products.html')) {
            const initialCategory = urlParams.get('category') || 'All';
            const searchTerm = urlParams.get('search');
            const allProductSources = [];
             for (const category in products) {
                 if (Array.isArray(products[category])) {
                     allProductSources.push(...products[category]);
                 }
             }

            let productsToDisplay = allProductSources.filter(p => p); // Filter out potential undefined entries

            if (searchTerm) {
                productsToDisplay = productsToDisplay.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
                if (pageTitle) pageTitle.textContent = `Search Results for "${searchTerm}"`;
                if (categoryFilters) categoryFilters.style.display = 'none'; // Hide filters during search
            } else if (initialCategory !== 'All' && products[initialCategory.toLowerCase()]) {
                productsToDisplay = products[initialCategory.toLowerCase()].filter(p => p); // Filter specific category
                if (pageTitle) pageTitle.textContent = initialCategory;
            } else {
                 if (pageTitle) pageTitle.textContent = 'All Products'; // Default title
            }


            if (productGrid) {
                displayProducts(productsToDisplay);
            }
            if (categoryFilters && !searchTerm) { // Only display if not searching
                displayCategories(initialCategory);
            }
        }
        // Add other page-specific initializations here if needed (e.g., cart.html, product.html)
    }

    // --- GLOBAL EVENT LISTENERS ---
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const productId = parseInt(e.target.dataset.id, 10);
            addToCart(productId);
        }
    });

    if (categoryFilters) { // Event listener only needed on pages with filters
        categoryFilters.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const selectedCategory = e.target.dataset.category;
                const url = new URL(window.location);
                url.searchParams.set('category', selectedCategory);
                url.searchParams.delete('search'); // Remove search term when clicking category
                window.history.pushState({}, '', url);

                // Re-initialize product display for the new category
                initPageSpecificContent(); // Re-run the logic to display products
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

    // --- INITIALIZE COMMON ELEMENTS ---
    window.setupHeader();
    window.setupSearch();
    initPageSpecificContent(); // Run page-specific logic

});

/* --- Image Slider Function (Keep outside DOMContentLoaded if called early) --- */
function initSlider() {
    const slides = document.querySelectorAll('.fade-slider-container img');
    if (!slides || slides.length === 0) return; // Added null check

    let currentSlide = 0;

    function showSlide(index) {
         if (index < 0 || index >= slides.length) return; // Boundary check
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Show first slide only if slides exist
    if (slides.length > 0) {
       showSlide(0);
       // Auto advance slides
       setInterval(nextSlide, 5000); // 5 seconds
    }
}