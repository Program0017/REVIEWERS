const businessService = require('../../services/businessServices/businessService');
const messageService = require('../../services/userServices/messageService');

const toggleBusinessActiveStatus = async(req,res) => {
    const businessId = req.params.businessId
    

    let action = '';

    try{
        const business = await businessService.findBusinessById(parseInt(businessId));
    
        const newStatus = !business.itsActive
        action = newStatus ? 'activated' : 'deactivated';

        const updatedBusiness = await businessService.updateBusiness(business.business_id, { itsActive: newStatus });

        res.status(200).json({
            message: messageService.getSuccessMessage('BUSINESS_STATUS_TOGGLED'),
            review: updatedBusiness,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('TOGGLE_BUSINESS_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    toggleBusinessActiveStatus
};