const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (name, email, password, role) => {
    const exists = await User.findOne({ email });
    if (exists) throw new Error('Email already registered');

    const user = await User.create({ name, email, password, role });
    return { user, token: generateToken(user._id) };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const match = await user.matchPassword(password);
    if (!match) throw new Error('Invalid credentials');

    if (user.role === 'vendor' && !user.isApproved) {
        throw new Error('Your vendor account is pending approval');
    }

    return { user, token: generateToken(user._id) };
};

module.exports = { registerUser, loginUser };
