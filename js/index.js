let addCartItems = document.getElementsByClassName("product-box__btn");

for (let i = 0; i < addCartItems.length; i++) {
  let button = addCartItems[i];
  button.addEventListener("click", function (event) {
    console.log(event.target);

    updateCartTotall();
  });
}

function updateCartTotall() {
  const cartItemContainer = document.getElementsByClassName("products-box")[0];
  let cartRows = cartItemContainer.getElementsByClassName("product-box__item");
  let quantityInputs = document.getElementsByClassName("qty__item");
  let totalQuantity = 0;
  let totalPrice = 0;
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    // let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName("qty__item")[0];
    // let price = parseFloat(priceElement.innerText.replace("грн.", ""));
    let price = getProductPrice(cartRow);
    let quantity = parseFloat(quantityElement.value);
    if (isNaN(quantity)) {
      continue;
    }
    totalPrice += price * quantity;
    totalQuantity += quantity;
    console.log(totalPrice);
  }

  document.getElementsByClassName("red-info")[0].innerText = totalQuantity;
  document.getElementsByClassName("red-info")[1].innerText = totalPrice;
  quantityChanged();
}

function getProductPrice(element) {
  let priceElement = element.getElementsByClassName("cart-price")[0];
  return parseFloat(priceElement.innerText.replace("грн.", ""));
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) input.value = 1;
}

// filter by goods

document.getElementById("type-select").onchange = function (event) {
  filterProducts();
  //   let option = event.target.value;
  //   switch (option) {
  //     case "1":
  //       filterProducts("breakfast");
  //       break;
  //     case "2":
  //       filterProducts("soup");
  //       break;
  //     case "3":
  //       filterProducts("garnish");
  //       break;
  //     default:
  //       filterProducts();
  //   }
};

function getSelectedCategory() {
  const option = document.getElementById("type-select").value;
  switch (option) {
    case "1":
      return "breakfast";
    case "2":
      return "soup";
    case "3":
      return "garnish";
    default:
      return null;
  }
}

function filterProducts() {
  const className = getSelectedCategory();
  const maxPrice = getSelectedPrice();

  const productElements = document.getElementsByClassName("product-box__item");
  for (let element of productElements) {
    const price = getProductPrice(element);
    const shouldShowByCategory =
      !className || element.classList.contains(className);
    const shouldShowByPrice = maxPrice === 0 || price < maxPrice;
    if (shouldShowByCategory && shouldShowByPrice) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
}

// filter by price

document.getElementById("price-select").onchange = function (event) {
  filterProducts();
  //   let option = event.target.value;
  //   switch (option) {
  //     case "30":
  //       filterProducts(className, 30);
  //       break;
  //     case "50":
  //       filterProducts("to-50");
  //       break;
  //     case "100":
  //       filterProducts("to-100");
  //       break;
  //     case "150":
  //       filterProducts("to-150");
  //       break;
  //     default:
  //       filterProducts();
  //   }
};

function getSelectedPrice() {
  let option = document.getElementById("price-select").value;
  return parseInt(option);
}

// check
(function openCheckForm() {
  const checkBtn = document.getElementsByClassName("btn-check")[0];
  const cart = document.getElementsByClassName("check-form")[0];
  checkBtn.addEventListener("click", function () {
    cart.classList.toggle("show-form");
  });
})();

(function send() {
  const sendBtn = document.getElementById("send");
  let valid = document.forms["myForm"]["fname"].value;
  console.log(valid)

  sendBtn.addEventListener("click", function () {
debugger
    if (valid == "" || " ") {
      alert("Name must be filled out");
      return false;
    } else {
        alert('Thanks')
      document.getElementsByClassName("red-info")[0].innerText = '';
      document.getElementsByClassName("red-info")[1].innerText = '';
    }
  });
})();
