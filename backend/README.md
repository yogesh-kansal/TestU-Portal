# Docs
## Install dependencies
    npm  install
    npm install nodemon -g
    
## Instructions
 __Environment Variables__
  <br>
`PORT` - port number for server (__Default__: 3001)
<br>
`DBURL` - database url (__Default__: 'mongodb://localhost:27017/test-project')
<br>
`EMAIL` - Email used to send mail
<br>
`PASS` - password for the email account
<br>
`GENKEY` - jwt token signing key for general purposes (__Default__: '121212121211')
<br>
`REFRESHKEY` - jwt token signing key for refreshing token (__Default__: 1234567789')
<br>
`SECRETKEY` - jwt token signing key auth purpose (__Default__: '12344321')
<br>
`FRONTENDURL` - client url (__Default__: 'http://localhost:3000')
<br>
`BACKENDURL` - server url (__Default__: 'http://localhost:3001')
<br>

For more info refer to `/utils/config.js` file.


## Run the app
    npm start
<br>

## API reference
### User API 
__`POST`__ `/user/signup`  --- user signup  <br/>
__`POST`__  `/user/login`  --- user login <br/>
__`GET`__ `/user/verifyUser?token=TOKEN` --- user verification<br/>

__`GET`__ `/user/forgot_password?email=EMAILID` --- reuest for forgot password<br/>
__`PATCH`__ `/user/change_password` --- set new password<br/>

__Only after login of user__<br/>
__`GET`__ `/user` --get user <br/>
__`PATCH`__ `/user/edit/:id` --- user details update<br/>
__`PATCH`__ `/user/reset_password/:id` --- user password update<br/>

### Test API 
__`GET`__ `/test/:id`  --- get test with id<br/>
__`GET`__  `/test?type=TYPE`  --- get list of tests of specific type (created,attempted,available).<br/>

__`POST`__ `/test/new` create a new test<br/>
__`POST`__ `/test/submit` submut the test<br/>