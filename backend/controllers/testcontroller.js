const Test = require('../models/test');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.getTest=catchAsync(async (req,res,next) => {
    let test=await Test.findById(req.params.id);
    res.status(200).json(test);
});

exports.newTest=catchAsync(async (req,res,next) => {
    const test=new Test({...req.body,author:req.user});
    let total=0;
    for(let ques of test.questions) {
        total+=ques.marks;
    }

    test.total=total;
    await test.save();
  //  console.log(test,req.user);

    await User.updateOne({emailId:req.user},{
        $push:{createdList:test._id}
    })


    res.status(200).json({
        status: 'Test has been created successfully',
        test
    })
});

exports.submitTest=catchAsync(async (req,res,next) => {
    let test=req.body;
    let marks=0;
   // console.log(req.body)
    for(let i=0;i<test.answers.length;i++)
    {
        let correct=test.questions[i].correctOptions;
        let answers=test.answers[i];
        console.log(correct,answers);
        correct.sort();
        answers.sort();
        let f=0;

        for(let j=0;j<correct.length;j++) {
            if(answers.indexOf(correct[j])==-1) {
                f=1;
                break;
            }
        }
        if(f===0 && correct.length === answers.length)
            marks+=test.questions[i].marks;
    }

    console.log(marks);

    await User.updateOne({emailId:req.user}, {
        $push: 
            {
                takenList:{
                    test: test._id,
                    answers: test.answers,
                    marks_obt: marks
                }
            }
    });

    res.status(200).send('Exam has been submitted successfully!!!');
});

exports.getAll=catchAsync(async (req,res,next) => {
    
    let tests=await Test.find();
    res.status(200).json(tests);
});

exports.deleteTest=catchAsync(async (req,res,next) => {
    await Test.findByIdAndRemove(req.params.id);
    res.status(200).send(`Test with id ${req.params.id} is deleted successfully!!!`);
});
