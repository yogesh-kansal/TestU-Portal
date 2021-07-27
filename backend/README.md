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
__`POST`__ `/user/signup`  --- user signup
__`POST`__  `/user/login`  --- user login
__`GET`__ `/user/verifyUser?token=TOKEN` --- user verification

(can user after loggin only)
__`GET`__ `/user` --get user 
__`PATCH`__ `/user/edit/:id` --- user details update
__`PATCH`__ `/user/reset_password/:id` --- user password update

__`GET`__ `/user/forgot_password?email=EMAILID` --- reuest for forgot password
__`PATCH`__ `/user/change_password` --- set new password

### Test API 
__`GET`__ `/test/:id`  --- get test with id
__`GET`__  `/test?type=TYPE`  --- get list of tests of specific type (created,attempted,available).

__`POST`__ `/test/new` create a new test
__`POST`__ `/test/submit` submut the test