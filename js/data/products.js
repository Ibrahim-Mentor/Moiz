/* Moiz_store_live/js/data/products.js */
/* This file should ONLY contain these variable definitions */

const products = {
  watches: [
    { id: 1, name: "Smart Tech Watch", price: 18500, image: "img/watch/watch1.png", rating: 5, description: "Modern smartwatch with a vibrant tech-inspired display." }, // Update name/desc/price
    { id: 2, name: "Classic Rose Gold Watch", price: 12000, image: "img/watch/watch2.png", rating: 5, description: "Elegant timepiece with a clean white dial and brown leather strap." }, // Update name/desc/price
    { id: 3, name: "Minimalist Gold Tone Watch", price: 15500, image: "img/watch/watch3.png", rating: 4, description: "A sophisticated gold-tone watch, perfect for formal occasions." }, // Update name/desc/price
    { id: 4, name: "Deep Blue Dial Watch", price: 16000, image: "img/watch/watch4.png", rating: 4, description: "Stylish watch featuring a striking deep blue dial and leather strap." }, // Update name/desc/price
    { id: 5, name: "Rose Gold Elegance Watch", price: 15800, image: "img/watch/watch5.png", rating: 5, description: "Elegant rose gold watch paired with stylish accessories." }, // Update name/desc/price
    { id: 6, name: "Steel Blue Chronograph", price: 17500, image: "img/watch/watch6.png", rating: 4, description: "A robust steel chronograph with a captivating blue sunray dial." }, // Update name/desc/price
    { id: 7, name: "Watch Collection Showcase", price: 22000, image: "img/watch/watch7.png", rating: 5, description: "A showcase of our diverse and stylish watch collection." }  // Update name/desc/price
    // Add watches 8, 9, 10 here if you have images watch8.png, watch9.png, watch10.png
  ],
  bracelets: [
    { id: 8, name: "Moonstone Bead Bracelet", price: 3500, image: "img/bracelet/bracelet1.jpg", rating: 4, description: "Luminous moonstone beads accented with colorful gemstones." }, // .jpg version - Update price/desc
    { id: 9, name: "Obsidian Snowflake Bracelet", price: 1800, image: "img/bracelet/bracelet2.jpg", rating: 5, description: "Striking obsidian snowflake bead bracelet with a decorative silver bead." }, // .jpg version - Update price/desc
    { id: 10, name: "Kids Charm Bracelet Set", price: 2100, image: "img/bracelet/bracelet3.jpg", rating: 4, description: "Fun and colorful beaded bracelets perfect for kids." }, // .jpg version - Update price/desc
    { id: 11, name: "Gemstone Moonstone Bracelet", price: 4200, image: "img/bracelet/bracelet4.jpg", rating: 5, description: "Beautiful moonstone bead bracelet featuring colorful gemstone accents." }, // .jpg version - Update price/desc
    { id: 12, name: "Woven Leather Bracelet", price: 3500, image: "img/bracelet/bracelet1.png", rating: 4, description: "Stylish brown woven leather bracelet with a steel clasp." }, // .png version - ASSIGNED NEW ID 12
    { id: 13, name: "Diamond Accent Bracelet", price: 1800, image: "img/bracelet/bracelet2.png", rating: 5, description: "Delicate gold-tone bracelet with a sparkling diamond accent centerpiece." }, // .png version - ASSIGNED NEW ID 13
    { id: 14, name: "Crystal Circle Bracelet", price: 2100, image: "img/bracelet/bracelet3.png", rating: 4, description: "Elegant gold-tone bangle featuring a crystal-studded circle." }, // .png version - ASSIGNED NEW ID 14
    { id: 15, name: "Solitaire Diamond Chain", price: 4200, image: "img/bracelet/bracelet4.png", rating: 5, description: "A simple yet stunning gold chain bracelet with a single solitaire diamond." }  // .png version - ASSIGNED NEW ID 15
  ],
  wallets: [
    { id: 16, name: "Classic Tan Bifold Wallet", price: 2200, image: "img/wallet/wallet1.png", rating: 5, description: "A timeless tan leather bifold wallet with contrast stitching." }, // ASSIGNED NEW ID 16 - Update price/desc
    { id: 17, name: "Carbon Fiber Cardholder", price: 2800, image: "img/wallet/wallet2.png", rating: 4, description: "Minimalist and sleek carbon fiber cardholder for your essential cards." }, // ASSIGNED NEW ID 17 - Update price/desc
    { id: 18, name: "Brown Leather Bifold", price: 2200, image: "img/wallet/wallet3.png", rating: 5, description: "Keep your cards and cash organized in this classic brown leather bifold." }, // ASSIGNED NEW ID 18 - Update price/desc
    { id: 19, name: "Canvas & Leather Travel Wallet", price: 2800, image: "img/wallet/wallet4.png", rating: 4, description: "A rugged canvas and leather wallet, perfect for travel documents and currency." }, // ASSIGNED NEW ID 19 - Update price/desc
    { id: 20, name: "Smart Bifold Wallet", price: 2200, image: "img/wallet/wallet5.png", rating: 5, description: "A modern smart wallet with indicator light, blending tech and style." }, // ASSIGNED NEW ID 20 - Update price/desc
    { id: 21, name: "Red Zipper Clutch Wallet", price: 2800, image: "img/wallet/wallet6.png", rating: 4, description: "Secure your essentials in style with this elegant red zipper clutch." }  // ASSIGNED NEW ID 21 - Update price/desc
  ],
  necklaces: [
    { id: 22, name: "Pearl Drop Pendant", price: 4500, image: "img/neckles/images.jpg", rating: 5, description: "An exquisite pearl drop pendant with crystal accents." }, // ASSIGNED NEW ID 22 - Update price/desc
    { id: 23, name: "Crystal Flower Pearl Necklace", price: 3200, image: "img/neckles/S8152a7bd6c824e0d986abf4212804e850.webp", rating: 4, description: "A classic gold chain featuring a crystal flower and pearl charm." } // ASSIGNED NEW ID 23 - Update price/desc
  ]
};

const masterProduct = {
  id: 6,
  name: "Steel Blue Chronograph", // Matches ID 6 name
  price: 17500,               // Matches ID 6 price
  image: "img/watch/watch6.png", // Matches ID 6 image
  description: "A robust steel chronograph with a captivating blue sunray dial." // Matches ID 6 description
};
