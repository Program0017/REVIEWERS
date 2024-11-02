const rewardService = require('../../services/rewardServices/rewardService');
const messageService = require('../../services/userServices/messageService');

const claimReward = async(req, res) => {
    const userId = req.user.userId;
    const { rewardId } = req.params;

    try{
        const reward = await rewardService.claimReward(userId, parseInt(rewardId, 10));

        return res.status(200).json({
            message: messageService.getSuccessMessage('REWARD_CLAIMED'),
            reward
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('REWARD_CLAIM_FAILED'), error);
        return res.status(400).json({
            message: error.message || messageService.getErrorMessage('INTERNAL_SERVER_ERROR')
        });
    }
};

module.exports = {
    claimReward
};