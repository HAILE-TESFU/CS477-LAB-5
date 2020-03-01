let products = [];

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.floor(Math.random() * 100000);
        products.push(this);
    }

    static getAll() {
        return products;
    }

    static findById(prodId) {
        return products.filter(p => p.id == prodId);
    }

    update() {
        const findProductIndex = products.findIndex(p => p.id == this.id);
        products[findProductIndex] = this;
        console.log(products);
    }

    static deleteById(productId) {
        products = products.filter(p => p.id != productId);
    }

    //add to cart
    static addTocart(productId) {
        const product = [];
        product.push(productId);
        return product;
    }
}