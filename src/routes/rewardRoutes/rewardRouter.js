const express = require('express');
const router = express.Router();
const createReward = require('../../controllers/rewardControllers/CreateController');
const updateReward = require('../../controllers/rewardControllers/UpdateController');
const disableReward = require('../../controllers/rewardControllers/DisableController');
const listOrSearchRewards = require('../../controllers/rewardControllers/ReadController');
const claimReward  = require('../../controllers/rewardControllers/ClaimReward');
const rewardValidatorMiddleware = require('../../middleware/rewardValidatorMiddleware');

const authMiddleware = require('../../middleware/authMiddleware');

// Review Routes
router.post('/reward',  rewardValidatorMiddleware, authMiddleware, createReward.createReward);
router.put('/edit', authMiddleware, updateReward.updateReward);
router.put('/toggle-status/:rewardId', authMiddleware, disableReward.toggleRewardActiveStatus);
router.get('/search', authMiddleware, listOrSearchRewards.listOrSearchRewards);
router.post('/claim/:rewardId', authMiddleware, claimReward.claimReward);




module.exports = router;
