const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

exports.getProducts = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            console.log("product", products);
            res.render('admin/products', {
                pageTitle: 'Products',
                path: '/admin/products',
                prods: products
            });

        })
        .catch(err => console.log(err));

};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save()
        .then(result => {
            console.log(result.result);
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

//editting the product detail
exports.getEditProductDetail = (req, res, next) => {
    Product.findById(req.params.prodId)
        .then(product => {
            console.log('edit', product);
            res.render('admin/edit-product', {
                product: product,
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
            })
        })
}

//for posting edited product
exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(id, title, imageUrl, price, description);
    product.update()
        .then(product => {
            res.redirect('/admin/products/' + product.id);
        })
        .catch(err => console.log(err));;

}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id);
    res.redirect('/admin/products');
}