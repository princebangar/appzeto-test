const Product = require('../models/Product');

const getVendorProducts = async (vendorId) => {
    return await Product.find({ vendor: vendorId });
};

const createProduct = async (data, vendorId) => {
    return await Product.create({ ...data, vendor: vendorId });
};

const updateProduct = async (id, data, vendorId) => {
    const product = await Product.findOne({ _id: id, vendor: vendorId });
    if (!product) throw new Error('Product not found or access denied');
    Object.assign(product, data);
    return await product.save();
};

const deleteProduct = async (id, vendorId) => {
    const product = await Product.findOne({ _id: id, vendor: vendorId });
    if (!product) throw new Error('Product not found or access denied');
    await product.deleteOne();
    return { message: 'Product deleted' };
};

module.exports = { getVendorProducts, createProduct, updateProduct, deleteProduct };
