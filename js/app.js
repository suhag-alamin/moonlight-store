// load products
const loadProducts = async () => {
  const url = `https://fakestoreapi.com/products`;
  const res = await fetch(url);
  const data = await res.json()
  showProducts(data)
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => showProducts(data));
};
// call the function
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="fw-bold">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ <span class="price fw-bold">${product.price}</span> </h2>
      <button onclick="addToCart(${product.id},${product.price}), updateTotal()" id="addToCart-btn" class="buy-now btn btn-success border-0">Add to cart</button>
      <button onclick="showDetails(${product.id})" id="details-btn" class="btn btn-danger details-btn border-0">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// add product to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  // update grand total in the UI
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

/* // show product details

const showDetails = async id => {
  const singleUrl = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(singleUrl);
  const data = await res.json()
  console.log(data);
} */