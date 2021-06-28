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
        type: String,
        required: [true, 'must have atleat one correct option']
    },
    maxMarks: {
        type: Number,
        default: 0
    }
});

const testschema=new Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: [true,'quizz creator is reuired']
    },

    name: {
        type: String,
        default: 'Online Quiz'
    },

    description: {
        type: String,
        default:'Online Quiz'
    },

    associatedUsers: [{
        emailId: {
            type: String
        }
    }],

    questions: [questionschema],
    
    startTime: Date,
    endTime: Date
},
{
    timestamps: true
});

const test=mongoose.model('test',testschema);
module.exports=test;