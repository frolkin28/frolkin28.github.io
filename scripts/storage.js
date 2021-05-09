class Storage {
    key = 'products';

    constructor() {
        this.savedProducts = this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        return JSON.parse(localStorage.getItem(this.key)) || {};
    }

    writeToLocalStorage(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    add(element) {
        this.savedProducts[element.id] = element;
        this.writeToLocalStorage(this.savedProducts);
    }
}


function handleAddToCart() {
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
        const product = {
            id,
            image,
            name,
            price
        }
        const storage = new Storage();
        storage.add(product);
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