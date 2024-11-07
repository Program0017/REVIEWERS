const rewardService = require('../../services/rewardServices/rewardService');
const messageService = require('../../services/userServices/messageService'); // Importing message service

const toggleRewardActiveStatus = async (req, res) => {
    const rewardId = parseInt(req.params.rewardId);

    let action = '';

    try {
        const reward = await rewardService.findRewardById(parseInt(rewardId));

        if (!reward) {
            return res.status(404).json({ message: messageService.getErrorMessage('REWARD_NOT_FOUND') });
        }

        const newStatus = !reward.isAvailable;
        action = newStatus ? 'activated' : 'deactivated';

        const updatedreward = await rewardService.updateReward(reward.id, { isAvailable: newStatus });

        res.status(200).json({
            message: messageService.getSuccessMessage('REWARD_STATUS_TOGGLED'), // New message key
            user: updatedreward,
        });
    } catch (error) {
        console.error(`Error while ${action || 'processing'} the user:`, error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    toggleRewardActiveStatus,
};
