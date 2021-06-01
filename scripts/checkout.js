const deliveryPrice = 30.00;
let priceTotal = 0;

function getProductsFromStorage() {
    const products = JSON.parse(localStorage.getItem('cart'));
    if (products) {
        return Object.values(products);
    }
    return [];
}

function createProductNodes() {
    const products = getProductsFromStorage();
    const mountDiv = document.getElementsByClassName('order-info-first')[1];
    let innerHtml = `        
    <div class="order-info-first-text">
        <h5>Estimated delivery time: 3/3-28/3 </h5>
    </div>
`;
    for (let product of products) {
        const html = `
            <div class="order-info-basket">
                <div class="order-info-img">
                    <img src="${product['image']}" width="60%" alt="close">
                </div>
                <div class="order-info-basket-text">
                    <p>${product['name']}</p>
                    <p><b>Size:</b> M</p>
                    <p class="order-info-orange size">Price: $${product['price']}</p>
                </div>
            </div>
        `;
        priceTotal += product['price'];
        innerHtml += html;
    }
    if (products) {
        innerHtml += `
                <hr>
        `;
        mountDiv.innerHTML = innerHtml;
    }
    const productPriceDiv = document.getElementsByClassName('order-info-first-text')[0];
    const p1 = productPriceDiv.children[1];
    p1.innerHTML = `${priceTotal}$`;
    
    const deliveryPriceDiv = document.getElementsByClassName('order-info-first-text')[1];
    const p2 = deliveryPriceDiv.children[1];
    p2.innerHTML = `${deliveryPrice}$`;
    
    const totalPriceDiv = document.getElementsByClassName('order-info-first-text')[2];
    const p3 = totalPriceDiv.children[1];
    p3.innerHTML = `${priceTotal + deliveryPrice}$`;
}


window.addEventListener('load', () => createProductNodes());