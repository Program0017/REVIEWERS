const rewardService = require('../../services/rewardServices/rewardService');
const RewardInputDTO = require('../../dto/reward/RewardInputDTO');
const RewardOutputDTO = require('../../dto/reward/RewardOutputDTO');
const messageService = require('../../services/userServices/messageService');
const userService = require('../../services/userServices/userService');
const emailService = require('../../services/userServices/emailService');

const createReward = async(req, res) => {
    const rewardInputDTO = RewardInputDTO.fromRequestBody(req.body);

    try {
        const reward = await rewardService.createReward({
            points_needed: rewardInputDTO.points_needed,
            reward_description: rewardInputDTO.reward_description,
            expiration_date: new Date(rewardInputDTO.expiration_date),
            type: rewardInputDTO.type,
            itsAvailable: true

        });

        const allUsers = await userService.getAllUsers()

        const rewardOutputDTO = RewardOutputDTO.format(reward);


        await emailService.sendRewardNotificationToAllUsers(allUsers, rewardInputDTO.reward_description);

        return res.status(201).json({
            message: messageService.getSuccessMessage('REWARD_CREATED'),
            reward: rewardOutputDTO,
          });
    }catch(error){
        console.error(messageService.getErrorMessage('REWARD_CREATION_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    createReward
};
