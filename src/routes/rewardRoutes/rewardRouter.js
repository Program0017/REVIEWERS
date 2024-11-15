const express = require('express');
const router = express.Router();
const createReward = require('../../controllers/rewardControllers/CreateController');
const updateReward = require('../../controllers/rewardControllers/UpdateController');
const disableReward = require('../../controllers/rewardControllers/DisableController');
const listOrSearchRewards = require('../../controllers/rewardControllers/ReadController');
const claimReward  = require('../../controllers/rewardControllers/ClaimReward');
const rewardValidatorMiddleware = require('../../middleware/rewardValidatorMiddleware');
const { authorize, checkPermission } = require('../../middleware/authorize');


const authMiddleware = require('../../middleware/authMiddleware');

// Review Routes
router.post('/reward', authorize('admin'), rewardValidatorMiddleware, authMiddleware, createReward.createReward);
router.put('/edit', authorize('admin'), authMiddleware, updateReward.updateReward);
router.put('/toggle-status/:rewardId', authorize('admin'), authMiddleware, disableReward.toggleRewardActiveStatus);
router.get('/search',authMiddleware, listOrSearchRewards.listOrSearchRewards);
router.post('/claim/:rewardId', authMiddleware, claimReward.claimReward);




module.exports = router;
