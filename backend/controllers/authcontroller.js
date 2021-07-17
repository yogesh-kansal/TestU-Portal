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
const {sendMail_to_verify, sendMail_to_change_pass} =require('../utils/send_mail');


exports.signup=catchAsync(async (req,res,next) => {

    const user=await User.findOne({emailId: req.body.emailId});

    if(user) {
        return next(new appError(`User with Email id ${req.body.emailId} already exists!!!`,403));
    }

    const token = jwt.sign(
        {emailId:req.body.emailId},
        config.genKey,
        {expiresIn:10*60}
    );
    //token is valid till 10 minutes only

    let newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10),
        emailId: req.body.emailId,
        institute: req.body.institute
    });

    await sendMail_to_verify(newUser.username, newUser.emailId,token);
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
        return next(new appError('Incorrect password!!!',403));
    }

    if(!user.isVerified) {
        return next(new appError('Account is not verified!!!',403));
    }

    const accesstoken = jwt.sign(
        {userId:user._id},
        config.secretKey,
        {expiresIn:60*60} //expires in 1 hour
    );

    const refreshtoken = jwt.sign(
        {userId:user._id},
        config.refreshKey,
        {expiresIn:30*60*60} //expires in 1 month
    );

    res.status(200).json({
        message:'logged in successfully!!!',
        accesstoken,
        refreshtoken,
        user
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
    if(Date.now() >(jwttoken.exp*1000)) {
        return next(new appError('Token is expired!!!', 401));    
    }

    user.isVerified=true;
    await user.save();
    res.redirect(`${config.baseUrl}/verify.html`);
});


exports.forgotPassword=catchAsync(async (req,res,next) => {

    if(!req.query.email)
        return next(new appError('email is not specified!!!',401));

    const emailId=req.query.email;

    const token = jwt.sign(
        {emailId:emailId},
        config.genKey,
        {expiresIn:60*60*1000}
    );

    await sendMail_to_change_pass(emailId,token);
    res.status(200).send(`mail has been sent to ${emailId}`);
}); 