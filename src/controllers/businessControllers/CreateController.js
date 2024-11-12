const businessService = require('../../services/businessServices/businessService')
const messageService = require('../../services/userServices/messageService');
const businessInputDTO = require('../../dto/establishments/businessInputDTO');
const businessOutputDTO = require('../../dto/establishments/businessOutputDTO');
const businessDataValidationMiddleware = require('../../middleware/businessValidationMiddleware');
const authMiddleware = require('../../middleware/authMiddleware')

const createBusiness = async (req, res) => {
	const businessInput = businessInputDTO.fromRequestBody(req.body);

	try {
		const business = await businessService.createBusiness({
			name: businessInput.name,
			location: businessInput.location,
			averageRating: businessInput.averageRating || 0.00, // Default value if not provided
			totalReviews: businessInput.totalReviews || 0, // Default value if not provided
			contactInfo: businessInput.contactInfo,
			//tags: businessInput.tags,
			categoryId: businessInput.categoryId,
			creationDate: new Date() // Current date as the creation date
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
	businessDataValidationMiddleware,
	createBusiness
};