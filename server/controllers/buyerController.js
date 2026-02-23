const { getAllProducts, getProductById, placeOrder, getBuyerOrders } = require('../services/buyerService');

const listProducts = async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
};

const getProduct = async (req, res) => {
    const product = await getProductById(req.params.id);
    res.json(product);
};

const createOrder = async (req, res) => {
    const order = await placeOrder(req.user._id, req.body.items);
    res.status(201).json(order);
};

const myOrders = async (req, res) => {
    const orders = await getBuyerOrders(req.user._id);
    res.json(orders);
};

module.exports = { listProducts, getProduct, createOrder, myOrders };
