const User = require('../models/User');
const Order = require('../models/Order');

const getVendors = async () => {
    return await User.find({ role: 'vendor' }).select('-password');
};

const approveVendor = async (id) => {
    const vendor = await User.findById(id);
    if (!vendor || vendor.role !== 'vendor') throw new Error('Vendor not found');
    vendor.isApproved = true;
    return await vendor.save();
};

const getStats = async () => {
    const totalVendors = await User.countDocuments({ role: 'vendor' });
    const totalOrders = await Order.countDocuments();
    const revenueResult = await Order.aggregate([
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueResult.length ? revenueResult[0].total : 0;
    return { totalVendors, totalOrders, totalRevenue };
};

module.exports = { getVendors, approveVendor, getStats };
