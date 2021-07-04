const express = require('express');
const router = express.Router();
const testcontroller = require('../controllers/testcontroller');
const auth=require('../utils/verifyToken');


router.get('/',auth.verifytoken,testcontroller.getTestsList);
router.get('/:id',auth.verifytoken,testcontroller.getTest);
router.post('/new', auth.verifytoken, testcontroller.newTest);
router.post('/submit',auth.verifytoken,testcontroller.submitTest);

module.exports = router;
