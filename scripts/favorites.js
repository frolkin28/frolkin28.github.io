function getProductsFromStorage() {
    const products = JSON.parse(localStorage.getItem('favorites'));
    if (products) {
        return Object.values(products);
    }
    return [];
}



function createCartProductNodes() {
    const products = getProductsFromStorage();
    const mountDiv = document.getElementsByClassName('caption-block-first')[0];
    if (products.length) {
        mountDiv.innerHTML = '<h2> Favorites </h2>';
    } else {
        console.log('else')
        mountDiv.innerHTML = `<h2> Favorites </h2>
        <h2> Favorites is currently empty </h2>
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
        a1.innerText = 'Move to cart';
        a2.innerText = 'Remove';
        a1.href = "javascript:void(0)";
        a2.href = "javascript:void(0)";
        a1.onclick = () => handleMoveToCart(product['id']);
        a2.onclick = () => handleRemove(product['id']);


        moveDivBlock.appendChild(a1)
        moveDivBlock.appendChild(a2)

        textBlock.appendChild(header);

        const select = document.createElement('div');
        const size = document.createElement('p');
        size.innerText = 'Размер';
        select.appendChild(size);
        textBlock.appendChild(select);
        textBlock.appendChild(moveDivBlock);

        div.appendChild(picAirDiv);
        div.appendChild(textBlock);

        const priceDiv = document.createElement('div');
        priceDiv.innerHTML = `<h4>$${product['price']}</h4>`;
        priceDiv.className = 'price-block'

        div.appendChild(priceDiv);
        mountDiv.appendChild(div);
    }
}


function handleMoveToCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (favorites) {
        const product = favorites[id.toString()];
        delete favorites[id.toString()];
        cart[product.id] = product;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('favorites', JSON.stringify(favorites));
        createCartProductNodes();
    }
}


function handleRemove(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (favorites) {
        delete favorites[id.toString()];
        localStorage.setItem('favorites', JSON.stringify(favorites));
        createCartProductNodes();
    }
}

window.addEventListener('load', () => createCartProductNodes())
