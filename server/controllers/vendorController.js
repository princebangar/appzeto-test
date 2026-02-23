const {
    getVendorProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getVendorOrders,
    updateOrderStatus
} = require('../services/vendorService');

const getProducts = async (req, res) => {
    const products = await getVendorProducts(req.user._id);
    res.json(products);
};

const addProduct = async (req, res) => {
    const images = req.files ? req.files.map(f => f.path) : [];
    const product = await createProduct({ ...req.body, images }, req.user._id);
    res.status(201).json(product);
};

const editProduct = async (req, res) => {
    const images = req.files ? req.files.map(f => f.path) : undefined;
    const data = images ? { ...req.body, images } : req.body;
    const product = await updateProduct(req.params.id, data, req.user._id);
    res.json(product);
};

const removeProduct = async (req, res) => {
    const result = await deleteProduct(req.params.id, req.user._id);
    res.json(result);
};

const getOrders = async (req, res) => {
    const orders = await getVendorOrders(req.user._id);
    res.json(orders);
};

const approveOrder = async (req, res) => {
    try {
        const order = await updateOrderStatus(req.params.id, 'processing', req.user._id);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    addProduct,
    editProduct,
    removeProduct,
    getOrders,
    approveOrder
};
