const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    profilepic: {
        type: String,
        default: ''
    },
    fullname: {
        type: String,
        default: ''
    },
    jobtitle: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        
    },
    phonenumber: {
        type: Number
    },
    department: {
        type: String
    }
});
const employee = new mongoose.model('Employee', schema);

module.exports = employee;