const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// Panel
exports.getAdminPanel = async (req, res) => {
  const users = await User.find();
  const accounts = await Account.find().populate('createdBy');
  const transactions = await Transaction.find().populate('account');

  res.render('admin/panel', {
    users,
    accounts,
    transactions
  });
};

// Toggle user state: Activate, deactivate
exports.toggleUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isActive = !user.isActive; 
  await user.save();

  res.redirect('/admin');
};

// Toggle account state: Activate, deactivate
exports.toggleAccount = async (req, res) => {
  const account = await Account.findById(req.params.id);

  account.status = account.status === 'Active' ? 'Inactive' : 'Active';
  await account.save();

  res.redirect('/admin');
};