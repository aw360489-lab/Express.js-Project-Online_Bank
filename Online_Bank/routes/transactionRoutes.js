const router = require('express').Router();
const transactionController = require('../controllers/transactionController');
const { ensureAuth, checkAccountOwnership } = require('../middleware/authMiddleware');

// All routes will login
router.use(ensureAuth);

// Separate schemas
const { depositSchema, withdrawSchema, transferSchema  } = require('../validators/transactionValidator');
const { validate } = require('../middleware/validationMiddleware');

router.post('/accounts/:id/deposit',
  validate(depositSchema),
  checkAccountOwnership,
  transactionController.deposit
);

router.post('/accounts/:id/withdraw',
  validate(withdrawSchema),
  checkAccountOwnership,
  transactionController.withdraw
);

router.post('/accounts/:id/transfer',
  validate(transferSchema),
  checkAccountOwnership,
  transactionController.transfer
);

router.get('/transactions',
  transactionController.searchTransactions
);

module.exports = router;