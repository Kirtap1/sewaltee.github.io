// product.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // Get product data from lamps.js
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = '/404.html';
        return;
    }

    // Build product page
    const container = document.getElementById('product-container');
    container.innerHTML = `
        <div class="product-gallery">
            <img src="${product.image}" alt="${product.name2}" class="main-image">
        </div>
        <div class="product-info">
            <h1 class="product-title">
                <span class="name1">${product.name1}</span>
                <span class="name2">${product.name2}</span>
            </h1>
            <p class="price">${product.price}</p>
            <p class="description">${product.description}</p>
            <div class="specs">
                ${product.specs.map(spec => `<div class="spec-item">${spec}</div>`).join('')}
            </div>
            <button class="add-to-cart buy-now" data-product='${JSON.stringify(product)}'>
                Buy Now
            </button>
        </div>
    `;
});