function getCart() {
  const cart = localStorage.getItem("techmart_cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("techmart_cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  console.log("Adding to cart:" + product);
  const cart = getCart();

  let existingItem = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      existingItem = cart[i];
      break;
    }
  }

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  saveCart(cart);
  console.log("Cart updated:", cart);
  return cart;
}

function removeFromCart(productId) {
  let cart = getCart();

  let newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== productId) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;

  saveCart(cart);
  return cart;
}

function updateQuantity(productId, quantity) {
  const cart = getCart();
  let item = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      item = cart[i];
      break;
    }
  }

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
    saveCart(cart);
  }

  return cart;
}

function clearCart() {
  localStorage.removeItem("techmart_cart");
  updateCartCount();
}
function getCartTotal() {
  const cart = getCart();
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].quantity;
  }
  return total;
}

function getCartItemCount() {
  const cart = getCart();
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }
  return count;
}

function updateCartCount() {
  const badges = document.querySelectorAll(".cart-badge, .badge");
  const count = getCartItemCount();
  for (let i = 0; i < badges.length; i++) {
    const badge = badges[i];
    if (badge.closest('a[href*="cart"]')) {
      badge.textContent = count;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();

  if (document.getElementById("cart-items-container")) {
    initCartPage();
  }
});

function initCartPage() {
  displayCart();

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      const cart = getCart();
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      window.location.href = "../checkout.html";
    });
  }
}

function displayCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items-container");

  if (cart.length === 0) {
    container.innerHTML = `
  <div class="empty-cart">
        <i class="bi bi-cart-x"></i>
        <h4 class="mt-3">Your cart is empty</h4>
        <p class="text-muted">Add some products to get started!</p>
        <a href="products.html" class="btn text-white mt-3" style="background-color: #ff6b35">
          Shop Now
        </a>
  </div>
    `;
    updateSummary();
    return;
  }

  container.innerHTML = cart
    .map(function (item) {
      let imagePath = item.image;

      if (imagePath.startsWith("Assets/")) {
        imagePath = "../" + imagePath;
      }
      return `
   <div class="cart-item" data-id="${item.id}">
    <div class="row align-items-center">
      <div class="col-md-2">
            
      
      <img src="${imagePath}" class="img-fluid" alt="${item.title}" style="max-height: 100px; object-fit: contain;">
        </div>
            <div class="col-md-4">
              <h6 class="mb-1">${item.title}</h6>
              <p class="text-muted mb-0" style="font-size: 14px;">Product ID: ${item.id}</p>
        </div>
            <div class="col-md-2">
              <strong>$${item.price.toFixed(2)}</strong>
            </div>
    <div class="col-md-3">
        <div class="d-flex align-items-center gap-2">
       <button class="quantity-btn" onclick="changeQuantity(${item.id}, ${item.quantity - 1})">
     <i class="bi bi-dash"></i>
                </button>
                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, ${item.quantity + 1})">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
    <div class="col-md-1 text-end">
              <i class="bi bi-trash remove-btn fs-5" onclick="removeItem(${item.id})"></i>
        </div>
          </div>
        </div>
      `;
    })
    .join("");
  updateSummary();
}

function updateSummary() {
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
  document.getElementById("shipping").textContent = "$" + shipping.toFixed(2);
  document.getElementById("tax").textContent = "$" + tax.toFixed(2);
  document.getElementById("total").textContent = "$" + total.toFixed(2);
}

function changeQuantity(productId, newQuantity) {
  const quantity = parseInt(newQuantity);
  if (quantity > 0) {
    updateQuantity(productId, quantity);
    displayCart();
  }
}

function removeItem(productId) {
  if (confirm("Are you sure you want to remove this item from your cart??")) {
    removeFromCart(productId);
    displayCart();
  }
}
