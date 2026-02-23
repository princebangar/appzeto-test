const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const allowRoles = require('../middleware/role');
const { vendors, approve, stats } = require('../controllers/adminController');

router.use(protect, allowRoles('admin'));

router.get('/vendors', vendors);
router.patch('/vendors/:id/approve', approve);
router.get('/stats', stats);

module.exports = router;
