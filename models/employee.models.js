const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    profilepic: {
        type: String,
        default: ''
    },
    fullname: {
        type: String,
        required: true,
    },
    jobtitle: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        min: 8,
        required: true,
    },
    phonenumber: {
        type: Number,
        maxlength: 10,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
});
const employee = new mongoose.model('Employee', schema);

module.exports = employee;