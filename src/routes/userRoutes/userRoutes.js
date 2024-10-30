const express = require('express');
const router = express.Router();
const registerUser = require('../../controllers/userControllers/CreateController');
const editUserProfile = require('../../controllers/userControllers/UpdateController');
const searchUsers = require('../../controllers/userControllers/ReadController');
const deactiveUsers = require('../../controllers/userControllers/DeactivateController');   
const authMiddleware = require('../../middleware/authMiddleware');

// User Routes
router.post('/register', registerUser.userValidationMiddleware, registerUser.registerUser);
router.put('/edit', authMiddleware, editUserProfile.userValidationMiddleware, editUserProfile.editUserProfile);
router.get('/:userId', authMiddleware, searchUsers.listOrSearchUsers);
router.put('/toggle-status/:userId', authMiddleware, deactiveUsers.toggleUserActiveStatus);

module.exports = router;
