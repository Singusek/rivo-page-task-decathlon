document.addEventListener("DOMContentLoaded", function () {
    const productContainer = document.getElementById("product-container");
    const seeAllButton = document.querySelector(".btn-shop");
    const numberOfItemsLoadedOnFirstPage = 3;
    let numberOfItemsLoaded = numberOfItemsLoadedOnFirstPage;
    let productsArray = [];

    async function loadAllProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/category/women's clothing"
        );
        
          productsArray = await response.json();
          setBestSellingProducts();

      } catch (error) {
        console.error("Błąd podczas pobierania danych z API", error);
      }
    }

    function setBestSellingProducts() {
        productsArray.sort((a, b) => {
        if (a.rating.rate > b.rating.rate) return -1;
        if (a.rating.rate < b.rating.rate) return 1;
    
        if (a.rating.count > b.rating.count) return -1;
        if (a.rating.count < b.rating.count) return 1;
    
        return 0; 
      });

      productContainer.innerHTML = '';

      productsArray.slice(0, numberOfItemsLoaded).forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
      });

    }
  
    function createProductCard(product) {
      const card = document.createElement("div");
      card.classList.add("col");
      card.innerHTML = `
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.title}" style="width: 100%; height: 500px;>
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
    
    seeAllButton.addEventListener("click", function () {
      numberOfItemsLoaded = 9;
      loadAllProducts();
      seeAllButton.style.display = "none";
    });

    loadAllProducts();
    setBestSellingProducts();
  });