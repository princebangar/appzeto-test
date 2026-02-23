const { getVendorProducts, createProduct, updateProduct, deleteProduct } = require('../services/vendorService');

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

module.exports = { getProducts, addProduct, editProduct, removeProduct };
