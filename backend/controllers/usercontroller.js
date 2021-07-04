const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const config= require('../utils/config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getUser=catchAsync(async (req,res,next) => {    
    let user=await User.findById(req.userId);

    if(!user) {
        return next(new appError('User not found in our database!!!', 404));    
    }

    res.status(200).json(user);
});


exports.updateUser=catchAsync(async (req,res,next) => {
    console.log(req.body);

    await User.findByIdAndUpdate(req.params.id, {
        $set:
            req.body
        },
        {runValidators: true}
    );

    let user=await User.findById(req.params.id);

    res.status(200).json({
        status:'Info modified successfully',
        user
    });
});

exports.resetPassword=catchAsync(async (req,res,next) => {
    const oldpswd=req.body.old;
    const newpswd=bcrypt.hashSync(req.body.new,10);

    let user=await User.findById(req.params.id);
    let isMatched=bcrypt.compareSync(oldpswd, user.password);
    if(isMatched) {
        await User.findByIdAndUpdate(req.params.id,{
            $set: 
                {password:newpswd}
            },
            {runValidators: true}
        );
        
        res.status(200).send('password reset done!!!');
    }
    else {
        return next(new appError('Incorrect old password!!!',403));
    }
});

exports.redirects=catchAsync(async (req,res,next) => {
    const jwttoken = jwt.decode(req.query.token);
    if(!jwttoken) {
        return next(new appError('Used wrong url!!!', 403));    
    }

    let user=await User.findOne({emailId: jwttoken.emailId});
    if(!user) {
        return next(new appError('User not found in our database!!!', 404));    
    }

    res.redirect(301,config.clientUrl+`/forgotPswd?emailId=${emailId}`);
});

exports.changePassword=catchAsync(async (req,res,next) => {
    const jwttoken = jwt.decode(req.body.token);
    if(!jwttoken) {
        return next(new appError('Used wrong url!!!', 403));    
    }

    if(Date.now() >(jwttoken.exp)) {
        return next(new appError('Link is expired!!!\nRetry', 401));    
    }

    let user=await User.findOne({emailId: jwttoken.emailId});
    if(!user) {
        return next(new appError('User not found in our database!!!', 404));    
    }

    let newPass=bcrypt.hashSync(req.body.password,10);

    if(!newPass)    
        return next(new appError('password must be non-empty',403));

    user.password=newPass;
    await user.save();

    res.status(200).send('password changed successfully!!!');
});


exports.deleteUser=catchAsync(async (req,res,next) => {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).send(`user with id ${req.params.id} is deleted successfully!!!`);
});


exports.getAll=catchAsync(async (req,res,next) => {
    
    let users=await User.find();
    res.status(200).json(users);
});