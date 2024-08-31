const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    aadhar:{
        type: Number,
        required: true
    },
    pan:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        required: true,
    },
    accountNumber: {
        type: String,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;