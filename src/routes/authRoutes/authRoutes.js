const express = require('express');
const router = express.Router();
const loginUser = require('../../controllers/authControllers/loginController');
const logoutUser = require('../../controllers/authControllers/logoutController');

// Auth Routes
router.post('/login', loginUser.loginUser);
router.post('/logout', logoutUser.logoutUser);

module.exports = router;
