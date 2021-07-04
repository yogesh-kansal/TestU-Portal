var jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User=require('../models/user');

exports.verifytoken = (req,res,next) => {
    var token= req.headers.authorization;
    
    if(!token) {
        const err=new Error('Authorization falied: token is not there or invalid!!!');
        err.status=403;
        return next(err);
    }

    token=token.split(' ')[1];

    jwt.verify(token,config.secretKey,(err, decoded) => {
        if(err) {
            console.log( err.message)
            err.status=401;
            return next(err);
        }
        else {
            //console.log(decoded);
            req.userId=decoded.userId;
            return next();
        }
    })
};


exports.refreshtoken =(req,res,next) => {
    var token= req.headers.authorization;
    console.log(token)
    
    if(!token) {
        res.status(403).json({status:'refresh token is not there'});
    }

    token=token.split(' ')[1];

    jwt.verify(token,config.refreshKey,(err, decoded) => {
        if(err) {
            res.status(401).json({status:'refresh toeken is invalid or expired!!!'});
        }
        else {
            const accesstoken = jwt.sign(
                {userId:decoded.userId},
                config.secretKey,
                {expiresIn:60*60*1000} //expires in 1 hour
            );

            User.findById(decoded.userId)
            .then(user => {
                res.status(200).json({
                    status:true,
                    accesstoken,
                    user});
            })
            .catch(err => {
                res.status(403).json({status:'user not found'});
            })
        }
    })
}