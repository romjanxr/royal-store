
// Load products from API

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 

const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${image}" class="product-image mx-auto my-3" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p>Category: ${product.category}</p>
          <p>Rating: ${product.rating.rate}</p>
          <p>Total Rated: ${product.rating.count}</p>
          <h5 class="card-title">Price: $ ${product.price}</h5>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-info">Add to
              Cart</button>
          <button onclick="showDetails(${product.id})" id="details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning">Details</button>
        </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


// show details function

const showDetails = id => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.title)
      document.getElementById('modal-body').innerHTML = `
      <div class="p-3">
        <h4>${data.title}</h4>
        <p>${data.description}</p>
        <h5>Price: $${data.price}</h5>
      </div>
      `
    })
}

// Add To cart Button Onclick Function

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();

  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// get the input value

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
  document.getElementById(id).innerText = value.toFixed(2);
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
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
