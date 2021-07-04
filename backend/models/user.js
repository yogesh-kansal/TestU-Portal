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

    institute: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    createdList: [{
        type: Schema.Types.ObjectId,
        required:true
    }],
    
    takenList: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'quiz'
        },
        answers: {
            type: Array,
        },
        marks_obt: {
            type: Number,
            default: 0
        }
    }],

    availableList: [{
        type: Schema.Types.ObjectId,
        required:true
    }]
},
{
    timestamps: true
});

const user = mongoose.model('user',userschema);
module.exports = user;