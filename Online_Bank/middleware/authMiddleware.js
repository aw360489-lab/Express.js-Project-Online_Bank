const Account = require('../models/Account');

// must login, protect routes
exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

// Check Authorization (account ownership)
exports.checkAccountOwnership = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).send('Account not found');
    }

    // admin can access to all accounts
    if (req.user.isAdmin) {
      req.account = account;
      return next();
    }

    // user can only access to own accounts
    if (!account.createdBy.equals(req.user._id)) {
      return res.status(403).send('Access denied');
    }

    req.account = account;
    next();

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Admin
exports.isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send('Access denied');
  }
  next();
};