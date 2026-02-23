const { getVendors, approveVendor, getStats } = require('../services/adminService');

const vendors = async (req, res) => {
    const list = await getVendors();
    res.json(list);
};

const approve = async (req, res) => {
    const vendor = await approveVendor(req.params.id);
    res.json({ message: 'Vendor approved', vendor });
};

const stats = async (req, res) => {
    const data = await getStats();
    res.json(data);
};

module.exports = { vendors, approve, stats };
