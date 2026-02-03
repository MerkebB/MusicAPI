const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/signup', authController.postSignup);
router.post('/login', authController.postLogin);


module.exports = router;