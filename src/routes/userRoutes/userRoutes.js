const express = require('express');
const router = express.Router();
const registerUser = require('../../controllers/userControllers/CreateController');
const editUserProfile = require('../../controllers/userControllers/UpdateController');
const searchUsers = require('../../controllers/userControllers/ReadController');
const deactiveUsers = require('../../controllers/userControllers/DeactivateController');
const assignTag = require('../../controllers/userControllers/assignUserTag');

const authMiddleware = require('../../middleware/authMiddleware');
const { authorize, checkPermission } = require('../../middleware/authorize');


// User Routes
router.post('/register', registerUser.userValidationMiddleware, registerUser.registerUser);
router.put('/edit', authMiddleware, editUserProfile.userValidationMiddleware, editUserProfile.editUserProfile);
router.get('/:userId', authMiddleware, searchUsers.listOrSearchUsers);
router.put('/toggle-status/:userId', authMiddleware, deactiveUsers.toggleUserActiveStatus);
router.post('/assign-tag',authorize('admin'), authMiddleware, assignTag.assignTag);


module.exports = router;
