// selecting elements by class

const shoppingCartBtn = document.querySelector(".shopping-cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// creating cart
let cart = [];

// retrieving buttons
let buttonsDOM = [];

// getting the products
class Products {
  async getProduct() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      // destructuring data received
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return {
          title,
          price,
          id,
          image,
        };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// ui display products
class UI {
  displayProducts(products) {
    //console.log(products);
    let result = "";
    products.forEach((product) => {
      result += `
        <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img
              src="${product.image}"
              alt="${product.title}"
              class="product-img"
            />
            <button class="cart-btn" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
              add to cart
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
        <!-- end of single product -->
        `;
    });
    productsDOM.innerHTML = result;
  }
  getCartButtons() {
    const buttons = [...document.querySelectorAll(".cart-btn")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      // getting id item by data attribute
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "in cart";
        button.disabled = true;
      }
      button.addEventListener("click", (event) => {
        // console.log(event);
        // change button text
        event.target.innerText = "in cart";
        // disable click button
        event.target.disabled = true;
        // get product from products based on the id
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        console.log(cartItem);
        // add product to the cart
        cart = [...cart, cartItem];
        console.log(cart);
        // save cart in the localStorage
        Storage.saveCart(cart);
        // set cart values
        this.setCartValues(cart);
        // display cart item
        this.addCartItem(cartItem);
        // show the cart
        this.showCart();
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
    //console.log(cartTotal, cartItems);
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
    <img src="${item.image}" alt="${item.title}" />
            <div>
              <h4>${item.title}</h4>
              <h5>${item.price}</h5>
              <span class="remove-item" data-id="${item.id}">remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id="${item.id}"></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id="${item.id}"></i>
            </div>
    `;
    cartContent.appendChild(div);
    console.log(cartContent);
  }
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    shoppingCartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }
  cartLogic() {
    // clear cart button
    clearCartBtn.addEventListener("click", () => this.clearCart());
    // cart functionality
    // event listeners using bubbling
    cartContent.addEventListener("click", (event) => {
      console.log(event.target);

      // removing item
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        console.log("id: ", id);
        //removing from the DOM
        console.log(
          "cart item to be removed: ",
          removeItem.parentElement.parentElement
        );
        cartContent.removeChild(removeItem.parentElement.parentElement);
        // removing from the cart
        this.removeItem(id);
      }
      // handling increase amounts in the cart
      else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        // save to the localStorage
        Storage.saveCart(cart);
        // new total
        this.setCartValues(cart);
        // new amount displayed
        addAmount.nextElementSibling.innerText = tempItem.amount;
      }
      // handling decrease amounts in the cart
      else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          // save to the localStorage
          Storage.saveCart(cart);
          // new total
          this.setCartValues(cart);
          // new amount displayed
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
        }
      }
    });
  }
  clearCart() {
    // get all items in the cart by id
    let cartItems = cart.map((item) => item.id);
    // console.log(cartItems)
    cartItems.forEach((id) => this.removeItem(id));
    // clearing cart
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
  }
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

// event listeners
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  // setup app
  ui.setupAPP();
  // get all products and
  products
    .getProduct()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getCartButtons();
      ui.cartLogic();
    });
});
