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

let all = document.getElementById("btn-all");
let RO = document.getElementById("btn-RO");
let UV = document.getElementById("btn-UV");
let ROUV = document.getElementById("btn-ROUV");
let Parts = document.getElementById("btn-Parts");

let textAll = document.getElementById("all-TXT");
let textRO = document.getElementById("RO-TXT");
let textUV = document.getElementById("UV-TXT");
let textROUV = document.getElementById("ROUV-TXT");
let textParts = document.getElementById("Parts-TXT");

let ProdALL = document.getElementById("all");
let ProdRO = document.getElementById("RO");
let ProdUV = document.getElementById("UV");
let ProdROUV = document.getElementById("ROUV");
let services = document.getElementById("services");
let ProdParts = document.getElementById("Parts");

document.addEventListener("DOMContentLoaded", function () {
    all.click();
});

all.addEventListener("click", function () {
    textAll.style.display = "flex";
    textRO.style.display = "none";
    textUV.style.display = "none";
    textROUV.style.display = "none";
    textParts.style.display = "none";
    ProdRO.style.display = "flex";
    ProdUV.style.display = "flex";
    ProdROUV.style.display = "flex";
    ProdParts.style.display = "none";
    services.style.display = "none";
});

RO.addEventListener("click", function () {
    textAll.style.display = "none";
    textRO.style.display = "flex";
    textUV.style.display = "none";
    textROUV.style.display = "none";
    textParts.style.display = "none";
    ProdRO.style.display = "flex";
    ProdUV.style.display = "none";
    ProdROUV.style.display = "none";
    ProdParts.style.display = "none";
    services.style.display = "none";
});

UV.addEventListener("click", function () {
    textAll.style.display = "none";
    textRO.style.display = "none";
    textUV.style.display = "flex";
    textROUV.style.display = "none";
    textParts.style.display = "none";
    ProdRO.style.display = "none";
    ProdUV.style.display = "flex";
    ProdROUV.style.display = "none";
    ProdParts.style.display = "none";
    services.style.display = "none";
});

ROUV.addEventListener("click", function () {
    textAll.style.display = "none";
    textRO.style.display = "none";
    textUV.style.display = "none";
    textROUV.style.display = "flex";
    textParts.style.display = "none";
    ProdRO.style.display = "none";
    ProdUV.style.display = "none";
    ProdROUV.style.display = "flex";
    ProdParts.style.display = "none";
    services.style.display = "none";
});

Parts.addEventListener("click", function () {
    textAll.style.display = "none";
    textRO.style.display = "none";
    textUV.style.display = "none";
    textROUV.style.display = "none";
    textParts.style.display = "flex";
    ProdRO.style.display = "none";
    ProdUV.style.display = "none";
    ProdROUV.style.display = "none";
    ProdParts.style.display = "flex";
    services.style.display = "flex";
});


document.addEventListener("DOMContentLoaded", function () {
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var buttonToClick = getUrlParameter('clickButton');

    if (buttonToClick) {
        var button = document.getElementById(buttonToClick);
        if (button) {
            button.click();
        }
    }
});
