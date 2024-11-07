const businessCategoryService = require('../../../services/AuxiliarServices/businessCategoryServices/businessCategoryService');
const messageService = require('../../../services/userServices/messageService');

const getAllbusinessCategorys = async(req, res) => {
    try {
        const types = await businessCategoryService.getAllBusinessCategories();

        if (!types || types.length === 0) {
            return res.status(404).json({ message: messageService.getErrorMessage('NO_TYPES_FOUND') });
        }

        return res.status(200).json({
            message: messageService.getSuccessMessage('TYPES_RETRIEVED_SUCCESSFULLY'),
            types,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('TYPES_GET_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};
module.exports = {
    getAllbusinessCategorys 
};