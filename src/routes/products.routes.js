const express               = require('express');
const router                = express.Router();
const ProductsController    = require('../controllers/Products.js');
const authMiddleware        = require('../system/middlewares/Auth_Middleware');

router
    .route('/')
    .get(authMiddleware, ProductsController.getProducts);
router
    .route('/addProduct')
    .post(authMiddleware, ProductsController.addProduct);
router
    .route('/deleteProduct/:id')
    .delete(authMiddleware, ProductsController.deleteProduct);
router
    .route('/updateProduct/:id')
    .put(authMiddleware, ProductsController.updateProduct);

module.exports = router;