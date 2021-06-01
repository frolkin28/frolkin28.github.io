const deliveryPrice = 30.00;
let priceTotal = 0;


function getProductsFromStorage() {
    const products = JSON.parse(localStorage.getItem('cart'));
    if (products) {
        return Object.values(products);
    }
    return [];
}


function createCartProductNodes() {
    const products = getProductsFromStorage();
    const mountDiv = document.getElementsByClassName('caption-block-first')[0];
    if (products.length) {
        mountDiv.innerHTML = '<h2> Your Bag </h2>';
    } else {
        console.log('else')
        mountDiv.innerHTML = `<h2> Your Bag </h2>
        <h2> Your bag is currently empty </h2>
        `;
    }
    for (let product of products) {

        const div = document.createElement('div');
        div.id = product['id'];
        div.className = 'airsBig-block';

        const picAirDiv = document.createElement('div');
        picAirDiv.className = 'pic-air';
        const img = new Image();
        img.src = product['image'];
        img.style.width = '80%';
        img.alt = product['name'];
        picAirDiv.appendChild(img);

        const textBlock = document.createElement('div');
        textBlock.className = 'text-block';

        const header = document.createElement('h4');
        header.innerText = product['name'];

        const moveDivBlock = document.createElement('div');
        moveDivBlock.className = 'move-del-block';
        const a1 = document.createElement('a');
        const a2 = document.createElement('a');
        a1.innerText = 'Move to favorites';
        a2.innerText = 'Remove';
        a1.href = "javascript:void(0)";
        a2.href = "javascript:void(0)";
        a1.onclick = () => handleMoveTofavorites(product['id']);
        a2.onclick = () => handleRemove(product['id']);


        moveDivBlock.appendChild(a1)
        moveDivBlock.appendChild(a2)

        textBlock.appendChild(header);

        const select = document.createElement('div');
        const size = document.createElement('p');
        size.innerText = 'Size';
        select.appendChild(size);
        textBlock.appendChild(select);
        textBlock.appendChild(moveDivBlock);

        div.appendChild(picAirDiv);
        div.appendChild(textBlock);

        const priceDiv = document.createElement('div');
        priceDiv.innerHTML = `<h4>${product['price']}$</h4>`;
        priceTotal += product['price'];
        priceDiv.className = 'price-block'

        div.appendChild(priceDiv);
        mountDiv.appendChild(div);
    }

    const subtotal = document.getElementsByClassName('caption-block-second__text')[0];
    const p1 = subtotal.children[1];
    p1.innerHTML = `$${priceTotal}`;

    const cost = document.getElementsByClassName('caption-block-second__text')[1];
    const p2 = cost.children[1];
    p2.innerHTML = `$${deliveryPrice}`;

    const total = document.getElementsByClassName('caption-block-second__text')[2];
    const p3 = total.children[1];
    p3.innerHTML = `$${priceTotal + deliveryPrice}`;
}


function handleMoveTofavorites(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (cart) {
        const product = cart[id.toString()];
        console.log(product);
        delete cart[id.toString()];
        favorites[product.id] = product;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('favorites', JSON.stringify(favorites));
        createCartProductNodes();
    }
}


function handleRemove(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart) {
        priceTotal = 0;
        delete cart[id.toString()];
        localStorage.setItem('cart', JSON.stringify(cart));
        createCartProductNodes();
    }
}


function handleCreateOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (Object.keys(cart).length) window.open('./checkout.html');
}

window.addEventListener('load', () => createCartProductNodes())
