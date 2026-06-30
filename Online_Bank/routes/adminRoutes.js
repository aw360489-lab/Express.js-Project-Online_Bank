const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { ensureAuth, isAdmin } = require('../middleware/authMiddleware');

// All admin routes must login + isAdmin
router.use(ensureAuth, isAdmin);

// Panel
router.get('/admin', adminController.getAdminPanel);

// Activate or deactivate - User or account
router.post('/admin/user/:id/toggle', adminController.toggleUser);
router.post('/admin/account/:id/toggle', adminController.toggleAccount);

module.exports = router;