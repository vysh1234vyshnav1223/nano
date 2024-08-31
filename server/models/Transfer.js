const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    fromAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Beneficiary', required: true }, 
    toBank: String, 
    toAccountNumber: String, 
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['debit', 'credit']} 
});

const Transfer = mongoose.model('Transfer', transferSchema);
module.exports = Transfer;
