let products = [];
const getDB = require('../util/database').getDB;
const ObjectId = require('mongodb').ObjectId;

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this._id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        const db = getDB();
        return db.collection('products')
            .insertOne(this)
    }

    update() {
        // const existingProdIndex = products.findIndex(p => p.id === this.id);
        // products.splice(existingProdIndex, 1, this);

        const db = getDB();
        return db.collection('products')
            .updateOne({ _id: new ObjectId(this._id) }, {
                $set: {
                    title: this.title,
                    price: this.price,
                    imageUrl: this.imageUrl,
                    description: this.description
                }
            })

    }

    static fetchAll() {

        const db = getDB();
        return db.collection('products')
            .find()
            .toArray()
    }

    static findById(prodId) {
        // return products.find(p => p.id === prodId);

        const db = getDB();
        return db.collection('products')
            .findOne({ _id: new ObjectId(prodId) });
    }

    static deleteById(prodId) {
        products = products.filter(p => p.id !== prodId);
    }

};