const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const allowRoles = require('../middleware/role');
const { listProducts, getProduct, createOrder, myOrders } = require('../controllers/buyerController');

router.get('/products', listProducts);
router.get('/products/:id', getProduct);
router.post('/orders', protect, allowRoles('buyer'), createOrder);
router.get('/orders/my', protect, allowRoles('buyer'), myOrders);

module.exports = router;
