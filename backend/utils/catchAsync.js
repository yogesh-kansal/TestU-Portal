module.exports = fcn => (req,res,next) => {
    return fcn(req,res,next).catch(err => next(err));
} 

//we are doing currying of function because first we are calling function
//then after some time we are passing parameters