const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// Show create page
exports.getCreatePage = (req, res) => {
  res.render('account/create');
};

// Create accounts
exports.createAccount = async (req, res) => {
  try {
    const { accountType } = req.body;
    
    const existingAccount = await Account.findOne({
      accountType,
      createdBy: req.user._id
    });

    if (existingAccount) {
      req.flash('error', `You already have a ${accountType} account`);
      return res.redirect('/accounts/create');
    }

    const account = new Account({
      accountType,
      createdBy: req.user._id
    });

    await account.save();

    req.flash('success', 'Account created successfully');
    res.redirect('/accounts'); 

  } catch (err) {
    console.error(err);
    req.flash('error', 'Error creating account');
    res.redirect('/accounts/create');
  }
};

// view own accounts
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ createdBy: req.user._id });

    res.render('account/dashboard', { accounts });

  } catch (err) {
    console.error(err);
    res.send('Error loading dashboard');
  }
};

// Account detail
exports.getAccountDetail = async (req, res) => {
  try {
    const account = req.account;

    const transactions = await Transaction.find({ account: account._id })
      .sort({ createdAt: -1 });

    const accounts = await Account.find({
      createdBy: req.user._id
    });

    res.render('account/detail', {
      account,
      transactions,
      accounts
    });

  } catch (err) {
    console.error(err);
    req.flash('error', 'Error loading account details');
    res.redirect('/accounts');
  }
};

// Toggle account status
exports.toggleStatus = async (req, res) => {
  const account = req.account;

  account.status = account.status === 'Active' ? 'Inactive' : 'Active';
  await account.save();

  req.flash('success', 'Account status updated');
  res.redirect(`/accounts/${account._id}`);
};


// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const account = req.account;

    await Transaction.deleteMany({ account: account._id });
    await Account.findByIdAndDelete(account._id);

    req.flash('success', 'Account deleted successfully');
    res.redirect('/accounts');

  } catch (err) {
    console.error(err);
    req.flash('error', 'Error deleting account');
    res.redirect('/accounts');
  }
};