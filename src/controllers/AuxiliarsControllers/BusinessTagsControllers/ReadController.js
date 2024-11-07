const BusinessTagService = require('../../../services/AuxiliarServices/BusinessTagServices/BusinessTagService');
const messageService = require('../../../services/userServices/messageService');
const BusinessTagOutputDTO = require('../../../dto/AuxiliarsDtos/BusinessTags/BusinessTagOutputDTO');


const getAllBusinessTags = async(req, res) => {
    try{
         const tags = await BusinessTagService.getAllBusinessTags();
         
        if(!tags || tags.length === 0){
            return res.status(404).json({ message: messageService.getErrorMessage('NO_TAGS_FOUND') });

        }
        const Response = BusinessTagOutputDTO.format(tags)

        return res.status(200).json({
            message: messageService.getSuccessMessage('TAGS_RETRIEVED_SUCCESSFULLY'),
            Response,
        });

    } catch (error) {
        console.error(messageService.getErrorMessage('TAGS_GET_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    getAllBusinessTags,
};