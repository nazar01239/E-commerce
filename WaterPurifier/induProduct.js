document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});

function loadProducts() {
    fetch('http://127.0.0.1:5500/productsdata/RO-products.json')
        .then(response => response.json())
        .then(data => renderProducts(data, "RO"))
        .catch(error => console.error("Error loading RO products:", error));

    fetch('http://127.0.0.1:5500/productsdata/UV-products.json')
        .then(response => response.json())
        .then(data => renderProducts(data, "UV"))
        .catch(error => console.error("Error loading UV products:", error));

    fetch('http://127.0.0.1:5500/productsdata/ROUV-products.json')
        .then(response => response.json())
        .then(data => renderProducts(data, "ROUV"))
        .catch(error => console.error("Error loading RO and UV products:", error));

    fetch('http://127.0.0.1:5500/productsdata/Parts-products.json')
        .then(response => response.json())
        .then(data => renderProducts(data, "Parts"))
        .catch(error => console.error("Error loading parts products:", error));
}

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = products.map(product => `
        <div class="items" data-id="${product.id}" data-name="${product.name}" data-image="${product.image}" data-cost="${product.cost}" data-description="${product.description}">
            <img src="${product.image}" class="img" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
                <i class="fa fa-star-o"></i>
            </div>
            <p>₹${product.cost}</p>
            <button class="add-to-cart"> <img src="/images/shopping-cart-02-stroke-rounded.svg" alt="add to cart"></button>
        </div>
    `).join('');
}