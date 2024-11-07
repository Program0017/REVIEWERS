const businessService = require('../../services/businessServices/businessService');
const messageService = require('../../services/userServices/messageService');
const businessOutputDTO = require('../../dto/establishments/businessOutputDTO');

const searchBusiness = async (req, res) => {
    const { name, businessId, location } = req.query;

    try {
        let businesses;

        if (!name && !businessId && !location) {
            return res.status(400).json({ message: messageService.getErrorMessage('MISSING_SEARCH_PARAMETERS') });
        }

        businesses = await businessService.searchBusinesses({
            id: businessId,
            name,
            location
        });

        if (businesses.length === 0) {
            return res.status(404).json({ message: messageService.getErrorMessage('BUSINESS_NOT_FOUND') });
        }

        const formattedBusinesses = businesses.map(business => businessOutputDTO.format(business));

        return res.status(200).json({
            message: messageService.getSuccessMessage('BUSINESS_FOUND'),
            businesses: formattedBusinesses,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('SEARCH_INTERNAL_SERVER_ERROR'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    searchBusiness,
};
