const businessService = require('../../services/businessServices/businessService')
const messageService = require('../../services/userServices/messageService');
const businessUpdateDTO = require('../../dto/establishments/businessUpdateDTO');
const businessOutputDTO = require('../../dto/establishments/businessOutputDTO');
const authMiddleware = require('../../middleware/authMiddleware');

const editBusiness = async(req, res) => {
    const businessId = req.body.businessId;

    try{
        const businessInput = businessUpdateDTO.fromRequestBody(req.body);
        
        const updatedData = {
            ...(businessInput.name && { name: businessInput.name }),
            ...(businessInput.location && { location: businessInput.location }),
            ...(businessInput.category && { category: businessInput.category }),
            ...(businessInput.contact_info && { contact_info: businessInput.contact_info }),
            ...(businessInput.tags && { tags: businessInput.tags }),
            creation_date: new Date(),
            updated_date: new Date(),
        };

        const updatedBusiness = await businessService.updateBusiness(businessId, updatedData)
        
        const businessOutput = businessOutputDTO.format(updatedBusiness);

        res.status(200).json({
            message: messageService.getSuccessMessage('BUSINESS_UPDATED'),
            review: businessOutput,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('BUSINESS_NOT_UPDATED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    authMiddleware,
    editBusiness
};
