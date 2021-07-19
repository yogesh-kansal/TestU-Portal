const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const questionschema=new Schema({
    statement: {
        type: String,
        required: [true, 'unkonwn question']
    },
    options: {
        type: Array,
        required: [true, 'must have options']
    },
    correctOptions: {
        type: Array,
        required: [true, 'must have atleat one correct option']
    },
    marks: {
        type: Number,
        default: 0
    }
});

const testschema=new Schema({
    author: {
        type: String, 
        required: [true,'test creator is reuired']
    },

    name: {
        type: String,
        default: 'Online Exam'
    },

    description: {
        type: String,
        default:'Online Exam'
    },

    users: [{

            type: String
        }],

    questions: [questionschema],
    total: {type:Number,default:0},    
    duration: {
        hours:{type:Number},
        minutes:{type:Number},
        seconds:{type:Number}
    },
    deadline: {type:String}
},
{
    timestamps: true
});

const test=mongoose.model('test',testschema);
module.exports=test;