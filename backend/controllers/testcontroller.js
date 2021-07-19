const Test = require('../models/test');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const {sendMail_to_users} =require('../utils/send_mail');
const test = require('../models/test');

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
    else if(type==='taken') {
        user.takenList.forEach(lst =>list.push(lst.id))
    }
    else if(type==='created')
        list=user.createdList;
    else
        return next(new appError('query type is wrong!!!',404));

    let data=await Test.find({_id: {$in: list}});
    let ans=[];

    data.forEach((_,pos) => {
        if(type==='taken') {
            ans.push({ test:data[pos], 
                    answers:user.takenList[pos].answers,
                    marks_obt:user.takenList[pos].marks_obt});
        }
        else {
            ans.push({ test:data[pos]});
        }
    })
    
    res.status(200).json({
        data: ans
    });
});

exports.newTest=catchAsync(async (req,res,next) => {
    let user=await User.findById(req.userId);
    const test=new Test({...req.body,author:user.username});
    let total=0;
    for(let ques of test.questions) {
        total+=ques.marks;
    }

    test.total=total;
    await test.save();
    user.createdList.push(test._id);
    await user.save();
    console.log(test)

    test.users.forEach(catchAsync(async (email) => {
        let testee=await User.find({emailId:email});
        if(testee) {
            testee.availableList.push(test._id);
            await testee.save();
            await sendMail_to_users(email,test);
        }
    }));

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

    let user=await User.findByIdAndUpdate(req.userId, {
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
