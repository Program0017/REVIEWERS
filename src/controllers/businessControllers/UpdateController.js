    const businessService = require('../../services/businessServices/businessService')
    const messageService = require('../../services/userServices/messageService');
    const businessUpdateDTO = require('../../dto/establishments/businessUpdateDTO');
    const businessOutputDTO = require('../../dto/establishments/businessOutputDTO');
    const authMiddleware = require('../../middleware/authMiddleware');
    const businessDataValidationMiddleware = require('../../middleware/businessValidationMiddleware');

    const editBusiness = async(req, res) => {
        const businessId = parseInt(req.params.businessId);  // Tomar el businessId de req.params

        try{
            const businessInput = businessUpdateDTO.fromRequestBody(req.body);
            
            const updatedData = {
                ...(businessInput.name && { name: businessInput.name }),
                ...(businessInput.location && { location: businessInput.location }),
                ...(businessInput.category && { category: businessInput.category }),
                ...(businessInput.contactInfo && { contactInfo: businessInput.contactInfo }),
                ...(businessInput.tags && { tags: businessInput.tags }),
                creationDate: new Date(),
                updatedDate: new Date(),
            };

            const updatedBusiness = await businessService.updateBusiness(businessId, updatedData)
            
            const businessOutput = businessOutputDTO.format(updatedBusiness);

            res.status(200).json({
                message: messageService.getSuccessMessage('BUSINESS_UPDATED'),
                review: businessOutput,
            });
        } catch (error) {
            console.error(messageService.getErrorMessage('BUSINESS_NOT_UPDATED'), error);
            res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR'), error });
        }
    };

    module.exports = {
        authMiddleware,
        businessDataValidationMiddleware,
        editBusiness
    };
