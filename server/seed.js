require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const existing = await User.findOne({ email: 'admin@test.com' });
    if (existing) {
        console.log('Admin already exists');
    } else {
        await User.create({
            name: 'Admin',
            email: 'admin@test.com',
            password: 'admin123',
            role: 'admin',
            isApproved: true,
        });
        console.log('Admin created: admin@test.com / admin123');
    }
    process.exit();
}).catch((err) => { console.error(err); process.exit(1); });
