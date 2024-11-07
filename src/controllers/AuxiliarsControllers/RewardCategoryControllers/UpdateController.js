const rewardCategoryService = require('../../../services/AuxiliarServices/RewardCategoryServices/RewardCategoryService');
const messageService = require('../../../services/userServices/messageService');
const RewardCategoriesUpdateDTO = require('../../../dto/AuxiliarsDtos/RewardCategory/RewardCategoryUpdateDTO');
const RewardCategoriesOutputDTO = require('../../../dto/AuxiliarsDtos/RewardCategory/RewardCategoryOutputDTO');

const editRewardCategory = async(req, res) => {
    const categoryId = req.body.id;
    
    try {
        const rewardCategoryUpdateDTO = RewardCategoriesUpdateDTO.fromRequestBody(req.body);
        
        const updatedData = {
            ...(rewardCategoryUpdateDTO.category && { category: rewardCategoryUpdateDTO.category }),
            updatedDate: new Date(),
        };

        const updatedCategories = await rewardCategoryService.updateRewardCategory(categoryId, updatedData);

        const categoryOutput = RewardCategoriesOutputDTO.format(updatedCategories);

        res.status(200).json({
            message: messageService.getSuccessMessage('TYPE_UPDATED'),
            category: categoryOutput,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('TYPE_NOT_UPDATED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }

};

module.exports = {
    editRewardCategory
};