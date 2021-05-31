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
}


function handleAddToCart() {
	var change = document.getElementsByClassName("button_cart")[0];
    if (change.innerHTML=="Add to Bag") change.innerHTML = "Remove from Bag";
    else change.innerHTML = "Add to Bag";
		
    const product = parseProduct();
    if (product) {
        const storage = new Storage();
        storage.addToCart(product);
    }
}

function handleAddToFavorites() {
	var change = document.getElementsByClassName("button_fav")[0];
    if (change.innerHTML=="Favorite ") change.innerHTML = "Remove from favorite";
    else change.innerHTML = "Favorite ";
	
    const product = parseProduct();
    if (product) {
        const storage = new Storage();
        storage.addToFavorites(product);
    }
}


function parseProductId(RawId) {
    const pattern = /Code:\s+(\d+)/;
    if (RawId.match(pattern)) {
        return Number(RawId.match(pattern)[1]);
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
    const productIdElement = document.getElementById('productId');
    const imgElement = document.getElementById('image');
    const nameElement = document.getElementById('name');
    const priceElement = document.getElementById('price');
    let id, image, name, price;
    if (productIdElement) {
        id = parseProductId(productIdElement.firstElementChild.textContent);
    }
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