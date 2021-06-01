class Storage {
    cartKey = 'cart';
    favoritesKey = 'favorites'

    constructor() {
        this.cartProducts = this.loadFromLocalStorage(this.cartKey);
        this.favoritesProducts = this.loadFromLocalStorage(this.favoritesKey);
    }

    loadFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || {};
    }

    writeToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    addToCart(element) {
        this.cartProducts[element.id] = element;
        this.writeToLocalStorage(this.cartKey, this.cartProducts);
    }

    addToFavorites(element) {
        this.favoritesProducts[element.id] = element;
        this.writeToLocalStorage(this.favoritesKey, this.favoritesProducts);
    }

    removeFromCart(id) {
        const cartProducts = this.loadFromLocalStorage(this.cartKey);
        delete cartProducts[id.toString()];
        this.writeToLocalStorage(this.cartKey, cartProducts);
    }

    removeFromFavorites(id) {
        const cartProducts = this.loadFromLocalStorage(this.favoritesKey);
        delete cartProducts[id.toString()];
        this.writeToLocalStorage(this.favoritesKey, cartProducts);
    }

    isProductInCart(id) {
        const productsKeys = Object.keys(this.loadFromLocalStorage(this.cartKey));
        return productsKeys.includes(id.toString());
    }

    isProductInFavorites(id) {
        const productsKeys = Object.keys(this.loadFromLocalStorage(this.favoritesKey));
        return productsKeys.includes(id.toString());
    }
}


function handleCart() {
    const product = parseProduct();
    const storage = new Storage();
    if (product) {
        const isProductInCart = new Storage().isProductInCart(product.id);
        if (isProductInCart) {
            storage.removeFromCart(product.id);
            changeCartButtonName("Add to bag");
        } else {
            storage.addToCart(product);
            changeCartButtonName("Remove from bag");
        }
    }
}

function handleFavorites() {
    const product = parseProduct();
    const storage = new Storage();
    if (product) {
        const isProductInFavorites = new Storage().isProductInFavorites(product.id);
        if (isProductInFavorites) {
            storage.removeFromFavorites(product.id);
            changeFavoritesButtonName("Add to bag");
        } else {
            storage.addToFavorites(product);
            changeFavoritesButtonName("Remove from bag");
        }
    }
}


function getProductId() {
    const productIdElement = document.getElementById('productId');
    const rawId = productIdElement.firstElementChild.textContent;
    const pattern = /Code:\s+(\d+)/;
    if (rawId.match(pattern)) {
        return Number(rawId.match(pattern)[1]);
    }
    return null;
}

function parsePrice(RawPrice) {
    try {
        return Number(RawPrice.trim().replace('$', ''));
    }
    catch (NumberFormatException) {
        return null;
    }
}

function parseProduct() {
    const id = getProductId();
    const imgElement = document.getElementById('image');
    const nameElement = document.getElementById('name');
    const priceElement = document.getElementById('price');
    let image, name, price;
    if (imgElement) {
        image = imgElement.src;
    }
    if (nameElement) {
        name = nameElement.textContent.trim();
    }
    if (priceElement) {
        price = parsePrice(priceElement.textContent);
    }
    if (image && name && price && id) {
        return {
            id,
            image,
            name,
            price
        };

    } else {
        return null;
    }
}


function changeCartButtonName(name) {
    const change = document.getElementsByClassName("button_cart")[0];
    change.innerHTML = name;
}


function changeFavoritesButtonName(name) {
    const change = document.getElementsByClassName("button_fav")[0];
    change.innerHTML = name;
}


window.addEventListener('load', () => {
    const id = getProductId()
    const isProductInCart = new Storage().isProductInCart(id);
    const isProductInFavorites = new Storage().isProductInFavorites(id);
    if (isProductInCart) {
        changeCartButtonName("Remove from bag");
    } else {
        changeCartButtonName("Add to bag");
    }

    if (isProductInFavorites) {
        changeFavoritesButtonName("Remove from favorite");
    } else {
        changeFavoritesButtonName("Add to favorite")
    }
})