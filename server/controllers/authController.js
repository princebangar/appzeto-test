const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const { user, token } = await registerUser(name, email, password, role);
    res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
};

module.exports = { register, login };
