const businessCategoryService = require('../../../services/AuxiliarServices/businessCategoryServices/businessCategoryService');
const messageService = require('../../../services/userServices/messageService');
const BusinessCategoryUpdateDTO = require('../../../dto/AuxiliarsDtos/BusinessCategory/BusinessCategoryUpdateDTO');
const BusinessCategoryOutputDTO = require('../../../dto/AuxiliarsDtos/businessCategory/BusinessCategoryOutputDTO');


const editbusinessCategory = async(req, res) => {
    const categoryId = req.body.id;

    try {
        const businessCategoryUpdateDTO = BusinessCategoryUpdateDTO.fromRequestBody(req.body);
        
        const updatedData = {
            ...(businessCategoryUpdateDTO.category && { category: businessCategoryUpdateDTO.category }),
            updatedDate: new Date(),
        };

        const updatedCategory = await businessCategoryService.updateBusinessCategory(categoryId, updatedData);

        const Output = BusinessCategoryOutputDTO.format(updatedCategory);

        res.status(200).json({
            message: messageService.getSuccessMessage('TYPE_UPDATED'),
            type: Output,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('TYPE_NOT_UPDATED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }

};

module.exports = {
    editbusinessCategory
};