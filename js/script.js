document.addEventListener('DOMContentLoaded', () => {
    // --- MASTER PRODUCT DATA ---
    window.products = [
        // Watches
        { id: 1, name: "Classic Chronograph Watch", price: 12500, image: "img/watch/watch1.png", rating: 5, category: "Watches", description: "A sophisticated timepiece with a timeless design, featuring a stainless steel case and a genuine leather strap. Perfect for both formal and casual occasions." },
        { id: 2, name: "Minimalist Black Watch", price: 8999, image: "img/watch/watch2.png", rating: 4, category: "Watches", description: "Sleek and modern, this watch features a clean black dial and a comfortable mesh strap. Its minimalist design makes a subtle yet strong statement." },
        { id: 3, name: "Digital Sports Watch", price: 7500, image: "img/watch/watch3.png", rating: 5, category: "Watches", description: "Built for the active individual, this durable sports watch includes a stopwatch, alarm, and is water-resistant up to 50 meters." },
        // Bracelets
        { id: 4, name: "Braided Leather Bracelet", price: 2500, image: "img/bracelet/bracelet1.JPG", rating: 4.5, category: "Bracelets", description: "Handcrafted from genuine leather with a secure stainless steel clasp. This braided bracelet adds a touch of rugged elegance to any outfit." },
        { id: 5, name: "Beaded Stone Bracelet", price: 2200, image: "img/bracelet/bracelet2.JPG", rating: 4, category: "Bracelets", description: "Featuring natural stone beads, this bracelet is known for its calming properties. An elastic band ensures a comfortable fit for any wrist size." },
        { id: 6, name: "Silver Chain Bracelet", price: 3200, image: "img/bracelet/bracelet3.JPG", rating: 5, category: "Bracelets", description: "A classic silver chain bracelet that offers a sleek and polished look. Made from high-quality stainless steel, it's perfect for everyday wear." },
        // Wallets
        { id: 7, name: "Slim Bifold Wallet", price: 1800, image: "img/wallet/wallet1.png", rating: 5, category: "Wallets", description: "Crafted from premium leather, this slim bifold wallet is designed to hold your essentials without the bulk. Features multiple card slots and a cash compartment." },
        { id: 8, name: "Leather Card Holder", price: 1500, image: "img/wallet/wallet2.png", rating: 4, category: "Wallets", description: "For the ultimate minimalist, this sleek card holder provides quick access to your most-used cards. Made from soft, durable leather." }
    ];

    // --- DOM ELEMENTS ---
    const productGrid = document.getElementById('productGrid');
    const categoryFilters = document.getElementById('category-filters');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const cartDrawerItemsContainer = document.getElementById('cart-drawer-items');
    const drawerSubtotalEl = document.getElementById('drawer-subtotal');
    const pageTitle = document.querySelector('.section-title');

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
        const product = window.products.find(p => p.id === productId); 
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
        const categories = ['All', ...new Set(window.products.map(p => p.category))];
        categoryFilters.innerHTML = categories.map(cat => `<button class="category-btn ${cat === activeCat ? 'active' : ''}" data-category="${cat}">${cat}</button>`).join('');
    };

    // --- SEARCH LOGIC ---
    window.setupSearch = () => {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (productGrid) {
                const filteredProducts = window.products.filter(p => p.name.toLowerCase().includes(searchTerm));
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
        
        let productsToDisplay = window.products;
        if (searchTerm) {
            productsToDisplay = window.products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (pageTitle) pageTitle.textContent = `Search Results for "${searchTerm}"`;
        } else if (initialCategory !== 'All') {
            productsToDisplay = window.products.filter(p => p.category === initialCategory);
        }

        if (productGrid) {
            displayProducts(productsToDisplay);
        }
        if (categoryFilters) {
            displayCategories(initialCategory);
        }
        
        // --- GLOBAL EVENT LISTENERS ---
        if (productGrid) {
            productGrid.addEventListener('click', (e) => { 
                if (e.target.classList.contains('btn-add-to-cart')) { 
                    const productId = parseInt(e.target.dataset.id, 10); 
                    addToCart(productId); 
                } 
            });
        }
        if (categoryFilters) {
            categoryFilters.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    const selectedCategory = e.target.dataset.category;
                    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    const productsToDisplay = selectedCategory === 'All' ? window.products : window.products.filter(p => p.category === selectedCategory);
                    displayProducts(productsToDisplay);
                    if (pageTitle) pageTitle.textContent = selectedCategory === 'All' ? 'Explore Our Products' : selectedCategory;
                }
            });
        }
        if (cartDrawerItemsContainer) {
            cartDrawerItemsContainer.addEventListener('click', e => { 
                if (e.target.classList.contains('drawer-item-remove')) { 
                    const productId = parseInt(e.target.dataset.id, 10); 
                    removeFromCart(productId); 
                } 
            });
        }
        if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
        if(cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeDrawer);
    }

    // --- SLIDER LOGIC ---
    function initSlider() {
        const slider = document.querySelector('.fade-slider-container');
        if (!slider) return;
        const slides = slider.querySelectorAll('img');
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        slides[currentSlide].classList.add('active');
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // --- RUN INITIALIZATION ---
    document.addEventListener('headerLoaded', () => {
        setupHeader();
        setupSearch();
    });

    initPage();
    initSlider();
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