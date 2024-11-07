const rewardService = require('../../services/rewardServices/rewardService');
const messageService = require('../../services/userServices/messageService');
const RewardOutputDTO = require('../../dto/reward/RewardOutputDTO'); // Asegúrate de tener un DTO similar

const listOrSearchRewards = async (req, res) => {
    const { rewardId, category, isRedeemed, isAvailable,   } = req.query; 
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        let rewards;

        if (!rewardId && !category && isRedeemed === undefined && isAvailable === undefined) {
            rewards = await rewardService.getAllRewards(page, pageSize, { isAvailable: true });
        } else {
            // Busca recompensas basadas en los parámetros proporcionados
            rewards = await rewardService.searchRewards({ 
                rewardId, 
                category, 
                isRedeemed, 
                isAvailable 
            }, page, pageSize);

            // Si no se encuentran recompensas
            if (rewards.length === 0) {
                return res.status(404).json({ message: messageService.getErrorMessage('REWARDS_NOT_FOUND') });
            }

            const formattedRewards = rewards.map(reward => RewardOutputDTO.format(reward));

            return res.status(200).json({
                message: messageService.getSuccessMessage('RETRIEVED_ALL_REWARDS'),
                rewards: formattedRewards,
                currentPage: page,
                totalResults: rewards.length,
            });
        }

    } catch (error) {
        console.error(messageService.getErrorMessage('INTERNAL_SERVER_ERROR_SEARCH'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    listOrSearchRewards,
};
