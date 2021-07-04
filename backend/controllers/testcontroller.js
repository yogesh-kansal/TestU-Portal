const Test = require('../models/test');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.getTest=catchAsync(async (req,res,next) => {
    let test=await Test.findById(req.params.id);

    if(!test) {
        return next(new appError('test is not found',404));
    }

    res.status(200).json(test);
});

exports.getTestsList=catchAsync(async (req,res,next) => {

    console.log(req.query);
    let type=req.query.type;

    console.log(type)

    if(!type) 
        return next(new appError('query type is not specified!!!',403));

    let user=await User.findById(req.userId);
    let list=[];
    if(type==='available')
        list=user.availableList;
    else if(type==='taken')
        list=user.takenList;
    else if(type==='created')
        list=user.createdList;
    else
        return next(new appError('query type is wrong!!!',404));

    data=[];

    list.forEach(catchAsync( async (id) => {
        let test=await Test.findById(id);
        data.push({test:test});
    }))

    if(type==='taken') {
        list.forEach((id,pos) => {
            data[pos].answers=user.takenList[pos].answers;
            data[pos].marks_obt=user.takenList[pos].marks_obt;
        })
    }

    res.status(200).json(data);
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

    let user=await User.findByIDAndUpdate(req.userId,{
        $push:{createdList:test._id}
    })

    res.status(200).json({
        status: 'Test has been created successfully',
        user
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

    let user=await User.findByIDAndUpdate(req.userId, {
        $push: 
            {
                takenList:{
                    test: test._id,
                    answers: test.answers,
                    marks_obt: marks
                }
            }
    });

    res.status(200).json({
        status: 'Exam has been submitted successfully!!!',
        user
    });
});

exports.deleteTest=catchAsync(async (req,res,next) => {
    await Test.findByIdAndRemove(req.params.id);
    res.status(200).send(`Test with id ${req.params.id} is deleted successfully!!!`);
});
