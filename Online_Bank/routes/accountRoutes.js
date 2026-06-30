const router = require('express').Router();
const accountController = require('../controllers/accountController');
const { ensureAuth, checkAccountOwnership } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { accountSchema } = require('../validators/accountValidator');

// All routes need login
router.use(ensureAuth);

// dashboard（show account）
router.get('/dashboard', accountController.getAccounts);

// list
router.get('/accounts', accountController.getAccounts);

// create page
router.get('/accounts/create', accountController.getCreatePage);

// create account
router.post('/accounts/create',
  validate(accountSchema),
  accountController.createAccount
);

// account detail
router.get('/accounts/:id',
  checkAccountOwnership,
  accountController.getAccountDetail
);

// Toggle status（must be owner）
router.post('/accounts/:id/toggle',
  checkAccountOwnership,
  accountController.toggleStatus
);

// Delete account
router.post('/accounts/:id/delete',
  checkAccountOwnership,
  accountController.deleteAccount
);

module.exports = router;