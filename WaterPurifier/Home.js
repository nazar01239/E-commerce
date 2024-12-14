// ROpurifier data area

document.addEventListener("DOMContentLoaded", function () {
  fetch('http://127.0.0.1:5500/productsdata/RO-products.json')
      .then(response => response.json())
      .then(data => {
          const roProductsContainer = document.getElementById("ro-products");
          roProductsContainer.innerHTML = data.map(product => `
              <a href="/products.html">
                  <div class="item-block block-1">
                      <img src="${product.image}" alt="${product.name}">
                  </div>
              </a>
          `).join('');
      })
      .catch(error => console.error("Error loading RO products:", error));
});


// UV purifier data area 

document.addEventListener("DOMContentLoaded", function () {
  fetch('http://127.0.0.1:5500/productsdata/UV-products.json')
      .then(response => response.json())
      .then(data => {
          const uvProductsContainer = document.getElementById("uv-products");
          uvProductsContainer.innerHTML = data.map(product => `
              <a href="/products.html">
                  <div class="item-block block-1">
                      <img src="${product.image}" alt="${product.name}">
                  </div>
              </a>
          `).join('');
      })
      .catch(error => console.error("Error loading UV products:", error));
});


// ROUV purifier data area 

document.addEventListener("DOMContentLoaded", function () {
  fetch('http://127.0.0.1:5500/productsdata/ROUV-products.json')
      .then(response => response.json())
      .then(data => {
          const rouvProductsContainer = document.getElementById("rouv-products");
          rouvProductsContainer.innerHTML = data.map(product => `
              <a href="/products.html">
                  <div class="item-block block-1">
                      <img src="${product.image}" alt="${product.name}">
                  </div>
              </a>
          `).join('');
      })
      .catch(error => console.error("Error loading RO and UV products:", error));
});





// *************sliding window start 
let slideIndex = 0;
let timer;

function moveSlide(n) {
  clearInterval(timer); // Clear any existing timer
  const slides = document.querySelectorAll('.slide');
  const texts = document.querySelectorAll('.text');
  slideIndex += n;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  const offset = -slideIndex * 100 + '%';
  document.querySelector('.slides').style.transform = `translateX(${offset})`;

  // Show the corresponding text
  for (let i = 0; i < texts.length; i++) {
    if (i === slideIndex) {
      texts[i].classList.add('active');
    } else {
      texts[i].classList.remove('active');
    }
  }

  // Reset the timer after manual slide
  startTimer();
}

function startTimer() {
  timer = setInterval(function() {
    moveSlide(1);
  }, 3000); // Adjust the interval as needed (3000 milliseconds = 3 seconds)
}

// Automatically start sliding
startTimer();

// ********************************************sliding window end 
// ********************************************sliding window end 
// ********************************************sliding window end 

// document.getElementById('btn-search').addEventListener("click", function() {
//   const searchArea = document.getElementById('search-area');
//   if (searchArea.style.display === "inline") {
//     searchArea.style.display = "none";
//   } else {
//     searchArea.style.display = "inline";
//   }
// });



document.getElementById('Service').addEventListener("click", function () {

    window.location.href = "products.html?clickButton=btn-Parts";
});

