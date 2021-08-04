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
    let type=req.query.type;
    if(!type) 
        return next(new appError('query type is not specified!!!',403));

    let user=await User.findById(req.userId);
    let data=[], ans=[];

    if(type==='available') {
        let list=await Test.find({_id: {$in: user.availableList}});
        
        let cur=Date.now();
        list.forEach(item => {
            let {hours,minutes,seconds}=item.duration;
            let dead=new Date(item.deadline).setHours(0,0,0,0)+24*3600*1000;
            let tmp=cur+(hours*3600+minutes*60+seconds)*1000;

            if(tmp<=dead) {
                data.push({test:item});
            }
        })

        res.status(200).json({
            data
        });

        return ;
    }
    
    if(type==='taken') {
        let list=[];
        user.takenList.forEach(lst =>list.push(lst.id));
        data=await Test.find({_id: {$in: list}});
    }
    else if(type==='created') {
        data=await Test.find({_id: {$in: user.createdList}});
    }
    else
        return next(new appError('query type is wrong!!!',404));


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

    let dead=new Date(req.body.deadline).setHours(0,0,0,0);
    let cur=new Date().setHours(0,0,0,0);
    if(dead<cur) {
        return next(new appError('deadline must be greater or eqaul to todays date!!!',403));
    } 

    let {hours,minutes,seconds}=req.body.duration;
    if(hours+minutes+seconds<= 0) {
        return next(new appError('time duration should be non 0!!!',403));
    } 


    const test=new Test({...req.body,author:user.username});
    let total=0;
    for(let ques of test.questions) {
        total+=ques.marks;
    }

    test.total=total;
    user.createdList.push(test._id);
    await test.save();
    await user.save();

    await User.updateMany({emailId: {$in: test.users}}, {
        $push: {
            availableList:test._id
        }
    })

    await sendMail_to_users(test.users,test);

    res.status(200).json({
        status: 'Test has been created successfully',
        user
    })
});

exports.submitTest=catchAsync(async (req,res,next) => {
    let test=req.body;
    let marks=0;
    console.log(req.body) 
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
        $push: {
                takenList:{
                    id: test._id,
                    answers: test.answers,
                    marks_obt: marks
                }
            },
        $pull: {
                availableList:test._id
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
