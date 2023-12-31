const productContainer = document.getElementById("product-container");
const seeAllButton = document.querySelector(".btn-shop");
const numberOfItemsLoadedOnFirstPage = 3;
const URL = "https://fakestoreapi.com/products/category/women's clothing";
let numberOfItemsLoaded = numberOfItemsLoadedOnFirstPage;


async function loadProducts() {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error("Error while downloading data from API", error);
    return [];
  }
}

function setBestSellingProducts(products) {
  products.sort((a, b) => {
    if (a.rating.rate > b.rating.rate) return -1;
    if (a.rating.rate < b.rating.rate) return 1;
    
    return 0;
  });

  products.slice(0, numberOfItemsLoaded).forEach(product => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("col");
  card.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.title}" style="width: 100%; height: 500px;">
        <div class="card-body">
          <h5 class="card-title"><b>${product.title}</b></h5>
          <p class="text-center d-flex justify-content-between align-items-center text-card">
            <span>$${product.price}</span>
            <span class="text-muted">|</span>
            <span>${product.rating.rate.toFixed(1)}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            </span>
          </p>
        </div>
      </div>
    `;
  return card;
}

function initializePage() {
  loadProducts().then(setBestSellingProducts);

  /* When loading another 6 products by clicking on the "se all" button,
  the first 3 products are duplicated. This can be avoided by clearing productContainer:
  "productContainer.innerHTML = ''. I didn't use this solution because in the task
  you need to load 6 more products, and the database has only 3 other than the ones displayed.
  Information found in the API documentation: 
  https://github.com/keikaavousi/fake-store-api/blob/master/controller/product.js*/

  seeAllButton.addEventListener("click", function () {
    numberOfItemsLoaded = 9;
    loadProducts().then(setBestSellingProducts);
    seeAllButton.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", initializePage);