const Product = require('../models/product');

exports.getProductForm = (req, res, next) => {
    res.render('shop');
};

exports.saveProduct = (req, res, next) => {
    console.log(req.body);
    const prod = new Product(null, req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    prod.save();
    console.log(Product.getAll());
    // res.end('Save successfully');
    res.redirect('/');
}

exports.getAllProducts = (req, res, next) => {
    console.log(Product.getAll());
    res.render('products', { 'products': Product.getAll() });
}

exports.getProductById = (req, res, next) => {
    console.log(req.params);
    const filterProductResults = Product.findById(req.params.productId);
    console.log(filterProductResults);
    // res.send('Product detail');
    res.render('product-detail', { prod: filterProductResults[0] });
};

exports.editProductPage = (req, res, next) => {
    const filterProductResults = Product.findById(req.params.productId);
    console.log(filterProductResults);
    // res.send('Product detail');
    res.render('edit-product', { prod: filterProductResults[0] });
}


exports.editProductPost = (req, res, next) => {
    console.log(req.body);
    const updatedProduct = new Product(req.body.id, req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    updatedProduct.update();
    // res.send('Update successfully');
    // res.redirect('/'); // ask brower to make a request to http://localhost:3000/ home page
    res.redirect('/products/' + updatedProduct.id); // ask browser to make a request to http://localhost:3000/57899 detail page
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.id;
    Product.deleteById(prodId);
    res.redirect('/');
}


//adding product to cart
exports.addProductToCart = (req, res, next) => {
    //console.log(Product.getAll());
    const prodId = req.body.id;
    Product.addTocart(prodId)
    res.redirect('/');
}