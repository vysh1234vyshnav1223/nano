const mongoose = require('mongoose');

const BeneficiarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  maxTransferLimit: {
    type: Number,
    required: true
  }
});

const Beneficiary = mongoose.model('Beneficiary', BeneficiarySchema);

module.exports = Beneficiary;
