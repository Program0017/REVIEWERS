const BusinessTagService = require('../../../services/AuxiliarServices/BusinessTagServices/BusinessTagService');
const messageService = require('../../../services/userServices/messageService');

const getTagsByBusinessId = async (req, res) => {

    const  BusinessId  = req.body.BusinessId;

    try {
        const tags = await BusinessTagService.getTagsByBusinessId(BusinessId);

        if (!tags || tags.length === 0) {
            return res.status(404).json({ message: messageService.getErrorMessage('NO_TAGS_FOUND_FOR_BUSINESS') });
        }
        
        // Return the tags with a success message
        return res.status(200).json({
            message: messageService.getSuccessMessage('BUSINESS_TAGS_RETRIEVED_SUCCESSFULLY'),
            tags,
        });

    } catch (error) {
        console.error(messageService.getErrorMessage('TAGS_GET_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    getTagsByBusinessId,
};