const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const config=require('./utils/config');
const AppError=require('./utils/appError');
const cors=require('cors');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/tests');
const {refreshtoken} =require('./utils/verifyToken');

 
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


var app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: config.clientUrl, credentials:true
  }));

//routes
app.get('/refreshtoken',refreshtoken);
app.use('/user', usersRouter);
app.use('/test',testRouter);

app.all('*', (req,res,next) => {
  next(new AppError(`Can't reach ${req.originalUrl} on this server!!`, 404));
});


// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

const port=config.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server is runnig on http://localhost:${port}`);
});


process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!  Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});