const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// Deposit
exports.deposit = async (req, res) => {
  const account = req.account;
  const amount = Number(req.body.amount);
  const { description } = req.body;

  account.balance += amount;
  await account.save();

  await Transaction.create({
    account: account._id,
    type: 'deposit',
    amount,
    description
  });

  res.redirect(`/accounts/${account._id}`);
};

// Withdraw
exports.withdraw = async (req, res) => {
  const account = req.account;
  const amount = Number(req.body.amount);
  const { description } = req.body;

  if (account.balance < amount) {
    return res.send('Insufficient funds');
  }

  account.balance -= Number(amount);
  await account.save();

  await Transaction.create({
    account: account._id,
    type: 'withdraw',
    amount,
    description
  });

  res.redirect(`/accounts/${account._id}`);
};

// Transfer
exports.transfer = async (req, res) => {
  try {
    const fromAccount = req.account;
    const { toAccountId, amount, description } = req.body;
    const transferAmount = Number(amount);

    const toAccount = await Account.findById(toAccountId);

    if (!toAccount) {
      req.flash('error', 'Target account not found');
      return res.redirect(`/accounts/${fromAccount._id}`);
    }

    if (!toAccount.createdBy.equals(req.user._id)) {
      return res.status(403).send('Access denied');
    }

    if (fromAccount.balance < transferAmount) {
      req.flash('error', 'Insufficient funds');
      return res.redirect(`/accounts/${fromAccount._id}`);
    }

    fromAccount.balance -= transferAmount;
    toAccount.balance += transferAmount;

    await fromAccount.save();
    await toAccount.save();

    await Transaction.create({
      account: fromAccount._id,
      type: 'transfer',
      amount: transferAmount,
      description
    });

    req.flash('success', 'Transfer completed');
    res.redirect(`/accounts/${fromAccount._id}`);

  } catch (err) {
    console.error(err);
    res.send('Transfer error');
  }
};

// Search
exports.searchTransactions = async (req, res) => {

  const { search, account, dateFrom, dateTo, amount } = req.query;

  // User's accounts
  const userAccounts = await Account.find({ createdBy: req.user._id });
  const accountIds = userAccounts.map(acc => acc._id);

  // Create query condition
  let query = {
    account: { $in: accountIds }  // Only check own accounts
  };

  // description: fuzzy search
  if (search) {
    // query.description = {
    //   $regex: search,
    //   $options: 'i' // case-insensitive
    // };

    // Muti-condition search
    query.$or = [
     { description: { $regex: search, $options: 'i' } },
     { type: { $regex: search, $options: 'i' } }
    ];
  }

  // Specify account
  if (account) {
    // Prevent users from changing URL to check other's account
    if (!accountIds.some(id => id.equals(account))) {
      return res.status(403).send('Forbidden');
    }
    query.account = account;
  }

  // date range
  if (dateFrom || dateTo) {
    query.createdAt = {};

    if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
    if (dateTo) query.createdAt.$lte = new Date(dateTo);
  }

  // amount
  if (amount) {
    query.amount = Number(amount);
  }

  const transactions = await Transaction.find(query)
    .populate('account')
    .sort({ createdAt: -1 });

  res.render('transaction/history', {
    transactions,
    filters: req.query,
    userAccounts
  });
};