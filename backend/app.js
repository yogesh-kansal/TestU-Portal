var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
const config=require('./utils/config');

const nodemailer =require('./utils/mailer_config');
var usersRouter = require('./routes/users');

//connecting to database 
const url=config.dburl;
mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
});
mongoose.connection.on('error', (err) => {
    console.log("Mongoose Connection error " + err.message);
  });
mongoose.connection.once('open', () => {
    console.log("MongoDB connected on "+url); 
});


//setting up nodemailer account
nodemailer.setup()
.then(() => {console.log(`nodemailer set-up is successfull!!!`)})
.catch((err) => {console.log(`nodemailer set-up is not successfull!!!\n${err}`)})

var app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/user', usersRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(3000, () => {
  console.log("Server is runnig on http://localhost:3000");
});



