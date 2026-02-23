const Product = require('../models/Product');
const Order = require('../models/Order');

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

const getVendorOrders = async (vendorId) => {
    // Find products belonging to this vendor
    const vendorProducts = await Product.find({ vendor: vendorId }).select('_id');
    const productIds = vendorProducts.map(p => p._id);

    // Find orders containing any of these products
    return await Order.find({
        'products.productId': { $in: productIds }
    }).populate('products.productId', 'name price')
        .populate('buyer', 'name email');
};

const updateOrderStatus = async (orderId, status, vendorId) => {
    // Find the order
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    // Verify at least one product in the order belongs to this vendor
    const vendorProducts = await Product.find({ vendor: vendorId }).select('_id');
    const productIds = vendorProducts.map(p => p._id.toString());

    const hasVendorProduct = order.products.some(item =>
        productIds.includes(item.productId.toString())
    );

    if (!hasVendorProduct) throw new Error('Access denied to this order');

    order.status = status;
    return await order.save();
};

module.exports = {
    getVendorProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getVendorOrders,
    updateOrderStatus
};
