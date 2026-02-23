const Product = require('../models/Product');
const Order = require('../models/Order');

const getAllProducts = async () => {
    return await Product.find().populate('vendor', 'name');
};

const getProductById = async (id) => {
    const product = await Product.findById(id).populate('vendor', 'name');
    if (!product) throw new Error('Product not found');
    return product;
};

const placeOrder = async (buyerId, items) => {
    let totalAmount = 0;
    const orderProducts = [];

    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

        totalAmount += product.price * item.quantity;
        orderProducts.push({ productId: product._id, quantity: item.quantity, price: product.price });
        product.stock -= item.quantity;
        await product.save();
    }

    return await Order.create({ buyer: buyerId, products: orderProducts, totalAmount });
};

const getBuyerOrders = async (buyerId) => {
    return await Order.find({ buyer: buyerId }).populate('products.productId', 'name price');
};

module.exports = { getAllProducts, getProductById, placeOrder, getBuyerOrders };
