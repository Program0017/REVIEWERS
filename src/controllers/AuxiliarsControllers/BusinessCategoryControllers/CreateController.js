const businessCategoryService = require('../../../services/AuxiliarServices/businessCategoryServices/businessCategoryService');
const messageService = require('../../../services/userServices/messageService');
const BusinessCategoryInputDTO = require('../../../dto/AuxiliarsDtos/BusinessCategory/BusinesCategoryInputDTO');
const BusinessCategoryOutputDTO = require('../../../dto/AuxiliarsDtos/businessCategory/BusinessCategoryOutputDTO');

const createbusinessCategory = async(req, res) => {
    const businessCategoryInput = BusinessCategoryInputDTO.fromRequestBody(req.body);
    
    try {
        const category = await businessCategoryService.createBusinessCategory({
            category: businessCategoryInput.category,
            creationDate: new Date() 
        });

        const response = BusinessCategoryOutputDTO.format(category);

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
    createbusinessCategory
};