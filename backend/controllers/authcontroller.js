//use to hash password
//const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

//to get a jwt signed token
/*const token = jwt.sign({
    data: 'foobar'
  }, 'secret', { expiresIn: 60 * 60 });
*/

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const config = require('../utils/config');
const nodemailer =require('../utils/send_mail');


exports.signup=catchAsync(async (req,res,next) => {

    const user=await User.findOne({emailId: req.body.emailId});

    if(user) {
        return next(new appError('Email id already exists!!!',403));
    }

    const token = jwt.sign(
        {emailId:req.body.emailId},
        config.secretKey,
        {expiresIn:10*60}
    );
    //token is valid till 10 minutes only

    let newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10),
        emailId: req.body.emailId,
    });

    await nodemailer.sendMail_to_verify(newUser.username, newUser.emailId,token);
    await newUser.save();

    res.status=200;
    res.setHeader('Content-Type','application/json');
    res.json(newUser);
});


exports.login=catchAsync(async (req,res,next) => {

    const email=req.body.emailId;
    const pass=req.body.password;

    const user=await User.findOne({emailId: email});

    if(!user) {
        return next(new appError('User not found!!!!',404));
    }

    const isMatched=bcrypt.compareSync(pass, user.password);

    if(!isMatched) {
        return next(new appError('Incorrect password!!!',401));
    }

    if(!user.isVerified) {
        return next(new appError('Account is not verified!!!',403));
    }

    const token = jwt.sign(
        {emailId:email},
        config.secretKey,
        {expiresIn:60*60}
    );

    res.status(200).json({
        message:'logged in successfully!!!',
        token
    });
});


exports.logout=catchAsync(async (req,res,next) => {
    console.log("you are at /user/logout");

});


exports.verifyUser=catchAsync(async (req,res,next) => {

    const jwttoken = jwt.decode(req.query.token);

    if(!jwttoken) {
        return next(new appError('Used wrong url for verification!!!', 403));    
    }
    
    let user=await User.findOne({emailId: jwttoken.emailId});

    if(!user) {
        return next(new appError('User not found in our database!!!', 404));    
    }

    //because timestamp is in miliseconds
    if(Date.now() >(1000*jwttoken.exp)) {
        return next(new appError('Token is expired!!!', 401));    
    }

    user.isVerified=true;
    await user.save();
    res.status(200).send('User verified succefully!!!')
});


exports.forgotPassword=catchAsync(async (req,res,next) => {

    const emailId=req.query.email;

    const token = jwt.sign(
        {emailId:emailId},
        config.secretKey,
        {expiresIn:10*60}
    );

    await nodemailer.sendMail_to_change_pass(emailId,token);
    res.status(200).send(`mail has been sent to ${emailId}`);
}); 