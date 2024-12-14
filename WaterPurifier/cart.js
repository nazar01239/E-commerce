document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    updateCartCount();
    if (document.querySelector('.cart-items')) {
        loadCartItems();
    }
    loadRecommendations();
});

function loadProducts() {
    fetch('http://127.0.0.1:5500/productsdata/RO-products.json')
        .then(response => response.json())
        .then(roProducts => renderProducts(roProducts, 'ro-products'))
        .catch(error => console.error('Error loading RO products:', error));

    fetch('http://127.0.0.1:5500/productsdata/UV-product.json')
        .then(response => response.json())
        .then(uvProducts => renderProducts(uvProducts, 'uv-products'))
        .catch(error => console.error('Error loading UV products:', error));

    fetch('http://127.0.0.1:5500/productsdata/ROUV-products.json')
        .then(response => response.json())
        .then(rouvProducts => renderProducts(rouvProducts, 'rouv-products'))
        .catch(error => console.error('Error loading RO and UV products:', error));
}

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = products.map(product => `
        <div class="items" data-id="${product.id}" data-name="${product.name}" data-image="${product.image}" data-cost="${product.cost}" data-description="${product.description}">
            <img src="${product.image}" class="img" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
                <i class="fa fa-star-o"></i>
            </div>
            <p>₹${product.cost}</p>
            <button class="add-to-cart"> <img src="/images/shopping-cart-02-stroke-rounded.svg" alt="Add to cart"></button>
        </div>
    `).join('');

    container.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.items');
            const product = {
                id: parseInt(productElement.dataset.id),
                name: productElement.dataset.name,
                image: productElement.dataset.image,
                cost: parseFloat(productElement.dataset.cost),
                description: productElement.dataset.description
            };
            alert("This item added to cart");
            addToCart(product);
        });
    });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('.btn-cart span').textContent = cart.length;
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items tbody');
    cartItemsContainer.innerHTML = '';

    let subtotal = 0;
    cart.forEach(product => {
        const totalPrice = product.cost * product.quantity;
        subtotal += totalPrice;
        cartItemsContainer.innerHTML += `
            <tr>
                <td><img src="${product.image}" alt="${product.name}"></td>
                <td>${product.name}</td>
                <td><button class="decrease" data-id="${product.id}">-</button> <span>${product.quantity}</span> <button class="increase" data-id="${product.id}">+</button></td>
                <td>₹${product.cost}</td>
                <td>₹${totalPrice.toFixed(2)}</td>
                <td><button class="remove" data-id="${product.id}">X</button></td>
            </tr>
        `;
    });

    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    const tax = subtotal * 0.1;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    const total = subtotal + 100 + tax;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;

    attachCartEventListeners();
}

function attachCartEventListeners() {
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            modifyProductQuantity(button.dataset.id, 1);
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
            modifyProductQuantity(button.dataset.id, -1);
        });
    });

    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', () => {
            removeProductFromCart(button.dataset.id);
        });
    });
}

function modifyProductQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === parseInt(productId));

    if (productIndex > -1) {
        cart[productIndex].quantity += change;

        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

function removeProductFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== parseInt(productId));
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}


    container.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const items = document.querySelectorAll(".items")
            const productElement = event.target.closest(items);
            const product = {
                id: parseInt(productElement.dataset.id),
                name: productElement.dataset.name,
                image: productElement.dataset.image,
                cost: parseFloat(productElement.dataset.cost),
                description: productElement.dataset.description
            };
            alert("This item added to cart");
            addToCart(product);
        });
    });
