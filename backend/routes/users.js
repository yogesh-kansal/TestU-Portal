const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontroller');
const usercontroller = require('../controllers/usercontroller');
const auth=require('../utils/verifyToken');

//signup, login, logout
router.post('/signup', authcontroller.signup );
router.post('/login', authcontroller.login);
router.get('/logout', auth.verifytoken, authcontroller.logout);

//user verification
router.get('/verifyUser', authcontroller.verifyUser);

//passwords
router.get('/forgot_password', authcontroller.forgotPassword);
router.patch('/reset_password/:id', auth.verifytoken, usercontroller.resetPassword);
router.patch('/change_password', usercontroller.changePassword);

router.patch('/edit/:id', auth.verifytoken, usercontroller.updateUser);
router.get('/', auth.verifytoken, usercontroller.getUser);
router.delete('/:id', auth.verifytoken, usercontroller.deleteUser);


module.exports = router;
