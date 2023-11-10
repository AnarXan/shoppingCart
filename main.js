var modulClass = document.querySelector(".basket")
var iconCart = document.querySelector(".icon-cart")
var close = document.querySelector(".close")
var listBasketHtml = document.querySelector(".basketProduct")
var iconCartSpan = document.querySelector(".icon-cart span")
var listProduct = document.querySelector(".listProduct");
var itemTwo = document.querySelector(".item2")

function basketToggle(){
  modulClass.classList.toggle("active")
}



var minus = document.querySelector(".minus")
var quantity = document.querySelector(".quantity")
var plus = document.querySelector('.plus')

var listProductArray = [];
var carts = []

const addDataToHtml = () => {
  listProduct.innerHTML = "";
  if (listProductArray.length > 0) {
    listProductArray.forEach((product) => {
      var newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <img class="productImg" src="${product.image}" alt="">
        <h2 class="productName">${product.name}</h2>
        <div class="productPrice">$${product.price}</div>
        <button class="addCart"">
            Add To Cart
        </button>
      `;
      listProduct.appendChild(newProduct);
    });
  }
}

listProduct.addEventListener("click", (event) => {
  let positionClick = event.target
  if(positionClick.classList.contains("addCart")){
    let productId = positionClick.parentElement.dataset.id
    addToCart(productId)
  }
})

var addToCart =(productId) => {
  let postionThisProductInCart = carts.findIndex((value) => value.productId == productId)
  if(carts.length <= 0){
    carts=[{
      productId: productId,
      quantity: 1
    }];
  }else if(postionThisProductInCart < 0){
    carts.push({
      productId: productId,
      quantity: 1
    });
  }else{
    carts[postionThisProductInCart].quantity += 1
  }
  addtoCartHtml()
}
console.log(carts);

const addtoCartHtml = () => {
  itemTwo.innerHTML = ''
  if(carts.length > 0){
    carts.forEach(cart => {
      var newCartDiv = document.createElement('div')
      newCartDiv.classList.add('.item2')
      newCartDiv.innerHTML=`
      <img src="images/f1.jpg" alt="" />
      <h4>name product</h4>
      <span>200</span>
      <span class="minus btn-count"> - </span>
      <span class="quantity"> 1 </span>
      <span class="plus btn-count"> + </span>
      `
      itemTwo.appendChild(newCartDiv)
    });
  }

}


async function logProducts(){
    var response = await fetch("products.json");
    var products = await response.json();
    listProductArray = products;
    addDataToHtml();
  }
  
  logProducts();