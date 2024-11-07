const rewardCategoryService = require('../../../services/AuxiliarServices/RewardCategoryServices/RewardCategoryService');
const messageService = require('../../../services/userServices/messageService');
const RewardCategoryInputDTO = require('../../../dto/AuxiliarsDtos/RewardCategory/RewardCategoryInputDTO');
const RewardCategoryOutputDTO = require('../../../dto/AuxiliarsDtos/RewardCategory/RewardCategoryOutputDTO');

const CreateRewardCategory = async(req, res) => {
    const rewardCategoryInput = RewardCategoryInputDTO.fromRequestBody(req.body);

    try {
        const category = await rewardCategoryService.createRewardCategory({
            category: rewardCategoryInput.category,
        });

        const response = RewardCategoryOutputDTO.format(category);

        res.status(201).json({
            message: messageService.getSuccessMessage('CATEGORY_CREATED'),
            category: response
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('CATEGORY_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    CreateRewardCategory
};