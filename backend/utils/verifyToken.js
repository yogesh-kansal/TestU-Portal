var jwt = require('jsonwebtoken');
const config = require('../utils/config');

exports.verifytoken = (req,res,next) => {
    const secretkey= config.secretKey;
    var token= req.headers.authorization;
    
    if(!token) {
        const err=new Error('Authorization falied: token is not there or invalid!!!');
        err.status=403;
        return next(err);
    }

    token=token.split(' ')[1];

    jwt.verify(token,secretkey,(err, decoded) => {
        if(err) {
            console.log( err.message)
            err.status=401;
            return next(err);
        }
        else {
            //console.log(decoded);
            return next();
        }
    })
};