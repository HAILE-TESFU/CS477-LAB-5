const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    res.render('shop/product-list', {
        prods: Product.fetchAll(),
        pageTitle: 'Shop',
        path: '/',
    });
}

exports.getProducts = (req, res, next) => {
    res.render('shop/product-list', {
        prods: Product.fetchAll(),
        pageTitle: 'Shop',
        path: '/',
    });
};

//view product detail
exports.getProductDetail = (req, res, next) => {

    Product.findById(req.params.prodId)
        .then(product => {
            console.log('product detail', product);
            res.render('shop/product-detail', {
                product: product,
                pageTitle: 'Product Detail',
                path: 'shop/product-detail',
            })
        })
    const prodId = req.params.prodId;

}

exports.getCart = (req, res, next) => {
    const cartProducts = [];

    if (!Cart.isEmpty()) {
        for (let cartProduct of Cart.getCart().products) {
            const product = Product.findById(cartProduct.id);
            cartProducts.push({ productData: product, qty: cartProduct.qty });
        }
    }
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    const product = Product.findById(prodId);
    Cart.addProduct(prodId, product.price);
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const product = Product.findById(prodId);
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};