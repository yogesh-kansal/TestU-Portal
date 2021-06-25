const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAll=catchAsync(async (req,res,next) => {
    
    let users=await User.find();
    res.status(200).json(users);
});

exports.getUser=catchAsync(async (req,res,next) => {
    var token= req.headers.authorization;
    token=token.split(' ')[1];
    const jwttoken = jwt.decode(token);
    
    let user=await User.findOne({emailId: jwttoken.emailId});

    if(!user) {
        return next(new appError('User not found in our database!!!', 404));    
    }

    res.status(200).json(user);
});

exports.deleteUser=catchAsync(async (req,res,next) => {
    
    await User.findByIdAndRemove(req.params.id);
    res.status(200).send(`user with id ${req.params.id} is deleted successfully!!!`);
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
        return next(new appError('Used wrong url for verification!!!', 403));    
    }

    let user=await User.findOne({emailId: jwttoken.emailId});
    if(!user) {
        return next(new appError('User not found in our database!!!', 404));    
    }

    res.redirect(301,'../../change');
});

exports.changePassword=catchAsync(async (req,res,next) => {
    let newPass=bcrypt.hashSync(req.body.password,10);
    await User.findByOneAndUpdate(req.body.emailId,{
        $set: 
            {password:newPass}
        },
        {runValidators: true}
    );
    
    res.status(200).send('password changed successfully!!!');
});