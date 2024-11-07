const rewardCategoryService = require('../../../services/AuxiliarServices/RewardCategoryServices/RewardCategoryService');
const messageService = require('../../../services/userServices/messageService');

const getAllRewardCategories = async(req, res) => {
    try {
        const Categories = await rewardCategoryService.getAllRewardCategories();

        if (!Categories || Categories.length === 0) {
            return res.status(404).json({ message: messageService.getErrorMessage('NO_TYPES_FOUND') });
        }

        return res.status(200).json({
            message: messageService.getSuccessMessage('TYPES_RETRIEVED_SUCCESSFULLY'),
            Categories,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('TYPES_GET_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};
module.exports = {
    getAllRewardCategories 
};