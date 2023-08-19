if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}
var count=5;
var f_click=false;
function ready() {
   

    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')   // shop-item-button is for ADD TO CART
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)

    var usetockenButton= document.getElementsByClassName('use-token')
    usetockenButton.addEventListener('click',some_func());

    var usetockenButton = document.getElementsByClassName('use-token')[0]; // Get the first element with the class 'use-token'
    usetockenButton.addEventListener('click', token_click); // Attach the click event listener
}
function token_click() {
    var contentcontainer = document.querySelector('.afterusetokenInput'); // Use querySelector to select the container
    if (contentcontainer) { // Check if the container was found
        var inputElement = document.createElement("input");
        inputElement.setAttribute("type", "number");
        contentcontainer.appendChild(inputElement);
    } else {
        console.error("Container not found!");
    }
}

function purchaseClicked(){
    alert('Thank You for your purchase')
    var cartItems= document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    addItemToCart(imageSrc , title, price)
    updateCartTotal()
}

function addItemToCart(imageSrc , title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item is already added to cart')
            return
        }
    }

    var cartRowContents = `<div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column"> ${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ' '))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    if(count>0 && f_click) {
        total=total-1;
    }
    
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total

}
if(count>0){
    token_click();
}

function token_click() {
    if(count==0){
        alert("Not enough token. All the available tokens were used.");

    }
    if (count > 0) {
        var cartCount = document.getElementsByClassName('cart-row').length;

        var cartRows = document.getElementsByClassName('cart-row');

        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i];
            var priceElement = cartRow.getElementsByClassName('cart-price')[0];

            var currentPrice = parseFloat(priceElement.innerText.replace('$', ''));
            if (!isNaN(currentPrice)) {
                var newPrice = Math.max(currentPrice - 0.1, 0);
                priceElement.innerText = '$' + newPrice.toFixed(2); // Ensure it has two decimal places
            }
        }
        count--;
    } else {
        console.log("Not enough tokens");
    }
    updateCartTotal();
}


 
