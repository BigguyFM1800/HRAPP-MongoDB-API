const monggose = require('mongoose')

const schema = new monggose.Schema({
    avatar: {
        type: String,
        default: "",
    },
     firstname: {
        type: String,
        required: true,
     },
     lastname: {
        type: String,
        required: true,
     },
     email: {
        type: String,
        required: true,
     },
     password: {
        type: String,
        required: true,
        min: 6
     },
})

const user = monggose.model('User', schema)
module.exports = user