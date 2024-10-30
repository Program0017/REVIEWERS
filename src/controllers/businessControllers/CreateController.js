const businessService = require('../../services/businessServices/businessService')
const messageService = require('../../services/userServices/messageService');
const businessInputDTO = require('../../dto/establishments/businessInputDTO');
const businessOutputDTO = require('../../dto/establishments/businessOutputDTO');
const authMiddleware = require('../../middleware/authMiddleware')

const createBusiness = async (req, res) => {
    const businessInput = businessInputDTO.fromRequestBody(req.body);

    try {
        const business = await businessService.createBusiness({
            name: businessInput.name,
            location: businessInput.location,
            category: businessInput.category,
            average_rating: businessInput.average_rating || 0.00, // Default value if not provided
            total_reviews: businessInput.total_reviews || 0, // Default value if not provided
            contact_info: businessInput.contact_info,
            tags: businessInput.tags,
            creation_date: new Date() // Current date as the creation date
        });

        const Response = businessOutputDTO.format(business);

        res.status(201).json({
            message: messageService.getSuccessMessage('BUSINESS_CREATED'),
            review: Response
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('BUSINESS_CREATION_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    authMiddleware,
    createBusiness
};