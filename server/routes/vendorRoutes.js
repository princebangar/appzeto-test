const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const allowRoles = require('../middleware/role');
const upload = require('../utils/upload');
const {
    getProducts,
    addProduct,
    editProduct,
    removeProduct,
    getOrders,
    approveOrder
} = require('../controllers/vendorController');

router.use(protect, allowRoles('vendor'));

router.get('/products', getProducts);
router.post('/products', upload.array('images', 5), addProduct);
router.put('/products/:id', upload.array('images', 5), editProduct);
router.delete('/products/:id', removeProduct);

router.get('/orders', getOrders);
router.put('/orders/:id/approve', approveOrder);

module.exports = router;
