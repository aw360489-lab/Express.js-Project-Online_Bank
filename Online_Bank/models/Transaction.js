const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  type: String, // deposit / withdraw / transfer
  amount: Number,
  description: { type: String, required: true },   // Used to search
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);