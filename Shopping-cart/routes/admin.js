const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getProductForm);

router.post('/save-product', adminController.saveProduct);

router.get(['/', '/products'], adminController.getAllProducts);

router.get('/products/:productId', adminController.getProductById);

router.get('/edit-product/:productId', adminController.editProductPage);

router.post('/edit-product', adminController.editProductPost);

router.post('/delete-product', adminController.deleteProduct);

//add to cart
router.get(['/', '/add-to-cart'], adminController.addProductToCart);





module.exports = router;