const express = require('express');
const router = express.Router();
const loginUser = require('../../controllers/authControllers/loginController');
const logoutUser = require('../../controllers/authControllers/logoutController');
const  requestPasswordRecovery = require('../../controllers/authControllers/requestPasswordRecovery');
const  resetPassword  = require('../../controllers/authControllers/resetPassword ');


// Auth Routes
router.post('/login', loginUser.loginUser);
router.post('/logout', logoutUser.logoutUser);
router.post('/recover-password', requestPasswordRecovery.requestPasswordRecovery);
router.post('/reset-password', resetPassword.resetPassword);


module.exports = router;
