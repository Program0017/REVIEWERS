const businessService = require('../../services/businessServices/businessService');
const messageService = require('../../services/userServices/messageService');
const businessOutputDTO = require('../../dto/establishments/businessOutputDTO');

const listOrSearchBusinesses  = async(req, res) => {
    const { category, tags } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try{
        let business;

        if (!category && tags) {
            business = await businessService.getAllBusiness(page, pageSize, { itsActive: true });
        }else{
            business = await businessService.searchBusinesses({
                category, 
                tags, 
                isActive: true
            }, page, pageSize);
        }
        if (business.length === 0) {
            return res.status(404).json({ message: messageService.getErrorMessage('BUSINESSES_NOT_FOUND') });
        }

        const sortedBusinesses = business.sort((a, b) => b.averageRating - a.averageRating);

        const formattedBusinesses = sortedBusinesses.map(business => businessOutputDTO.format(business));

        return res.status(200).json({
            message: messageService.getSuccessMessage('RETRIEVED_ALL_BUSINESSES'),
            businesses: formattedBusinesses,
            currentPage: page,
            totalResults: business.length,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('SEARCH_INTERNAL_SERVER_ERROR'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    listOrSearchBusinesses,
};