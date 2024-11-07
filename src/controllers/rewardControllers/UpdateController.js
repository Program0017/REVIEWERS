const rewardService = require('../../services/rewardServices/rewardService');
const RewardUpdateDTO = require('../../dto/reward/RewardUpdateDTO');
const RewardOutputDTO = require('../../dto/reward/RewardOutputDTO');
const messageService = require('../../services/userServices/messageService');
const emailService = require('../../services/userServices/emailService');

const updateReward = async(req, res) => {
    const rewardId = req.body.rewardId; 

    try {

        const rewardInput = RewardUpdateDTO.fromRequestBody(req.body); 

        const updatedData = {
            ...(rewardInput.pointsNeeded && { pointsNeeded: rewardInput.pointsNeeded }),
            ...(rewardInput.description && { description: rewardInput.description }),
            ...(rewardInput.expirationDate && { expirationDate: rewardInput.expirationDate }),
            ...(rewardInput.category && { category: rewardInput.category }),
        };

        const updatedReward = await rewardService.updateReward(rewardId, updatedData);

        const rewardOutput = RewardOutputDTO.format(updatedReward);

        return res.status(201).json({
            message: messageService.getSuccessMessage('REWARD_UPDATED'),
            reward: rewardOutput,
          });
    }catch(error){
        console.error(messageService.getErrorMessage('REWARD_UPDATE_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    updateReward
};
