const API_URL = "https://plgpggahzzambumpipsa.supabase.co/rest/v1/Products";
const API_KEY = "sb_publishable_ohoJAc6FlFxBuvcQv0-1WQ_2JiIkaGK";

let flashProducts = [];
let newArrivalsProducts = [];
let products = [];
async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch products. Status:", response.status);
      return;
    }

    products = await response.json();

    flashProducts = products.slice(0, 4);
    newArrivalsProducts = products.slice(4, 12);

    displayFlashProducts();
    displayNewArrivalsProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayFlashProducts() {
  const container = document.getElementById("flash-products");

  container.innerHTML = "";

  for (let i = 0; i < flashProducts.length; i++) {
    const product = flashProducts[i];

    container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <a href="/pages/Details.html" class="text-decoration-none text-dark">
        <div class="card" style="border-radius: 15px; border-color: #ffffff; overflow: hidden; min-height: 420px; display: flex; flex-direction: column;">
          
          <div style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center; background-color: #ffffff; flex-shrink: 0;">
            <img src="${product.image}" class="img-fluid" style="max-height: 100%; object-fit: contain;">
          </div>

          <div class="card-body py-2 px-3" style="display: flex; flex-direction: column; flex: 1;">
            <h5 class="card-title mb-1" style="height: 2.8em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 1.4em;">${product.title}</h5>
            <p class="card-text text-muted mb-2" style="font-size: 14px; height: 1.5em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${product.desc}
            </p>

            <div class="d-flex align-items-center gap-1 mb-3">
              <p class="fs-4 fw-normal mb-0">$${product.price}</p>
              <p class="text-danger text-decoration-line-through mb-0" style="font-size: 14px;">
                $${product.old_price}
              </p>
            </div>

            <div class="d-flex justify-content-between mt-auto">
              <button class="btn w-50 add-to-cart-flash" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}" style="background-color: #ff6b35; color: white;" onclick="event.stopPropagation(); event.preventDefault();"> 
                Add to Cart
              </button>
              <button class="btn bi bi-heart wishlist" style="border-color:#ff6b35; color:#ff6b35;"></button>
            </div>
          </div>
        </div>
        </a
      </div>
    `;
  }

  attachFlashCartListeners();
}
function attachFlashCartListeners() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-flash");

  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener("click", function () {
      const product = {
        id: parseInt(button.getAttribute("data-id")),
        title: button.getAttribute("data-title"),
        price: parseFloat(button.getAttribute("data-price")),
        image: button.getAttribute("data-image"),
      };
      addToCart(product);
    });
  }
}

function displayNewArrivalsProducts() {
  const container = document.getElementById("new-arrivals-products");

  if (!container) {
    console.error("New arrivals container not found!");
    return;
  }

  container.innerHTML = "";

  for (let i = 0; i < newArrivalsProducts.length; i++) {
    const product = newArrivalsProducts[i];

    container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card" style="border-radius: 10px; border-color: #ffffff; overflow: hidden; min-height: 420px; display: flex; flex-direction: column;">
          
          <div style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center; background-color: #ffffff; flex-shrink: 0;">
            <img src="${product.image}" class="img-fluid" style="max-height: 100%; object-fit: contain;">
          </div>

          <div class="card-body py-2 px-3" style="display: flex; flex-direction: column; flex: 1;">
            <h5 class="card-title mb-1" style="height: 2.8em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 1.4em;">${product.title}</h5>
            <p class="card-text text-muted mb-2" style="font-size: 14px; height: 1.5em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${product.desc}
            </p>

            <div class="d-flex align-items-center gap-1 mb-3">
              <p class="fs-4 fw-normal mb-0">$${product.price}</p>
            </div>

            <div class="d-flex justify-content-between mt-auto">
              <button class="btn w-50 add-to-cart-arrivals" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}" style="background-color: #ff6b35; color: white;">
                Add to Cart
              </button>
              <button class="btn bi bi-heart wishlist" style="border-color:#ff6b35; color:#ff6b35;"></button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachArrivalsCartListeners();
}

function attachArrivalsCartListeners() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-arrivals");

  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener("click", function () {
      const product = {
        id: parseInt(button.getAttribute("data-id")),
        title: button.getAttribute("data-title"),
        price: parseFloat(button.getAttribute("data-price")),
        image: button.getAttribute("data-image"),
      };
      addToCart(product);
    });
  }
}
fetchProducts();
