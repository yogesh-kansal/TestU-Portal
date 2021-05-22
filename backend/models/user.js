const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const userschema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

const user = mongoose.model('user',userschema);
module.exports = user;