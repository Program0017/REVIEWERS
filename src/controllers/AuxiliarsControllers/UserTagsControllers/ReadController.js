const UserTagService = require('../../../services/AuxiliarServices/UserTagsServices/UserTagService');
const messageService = require('../../../services/userServices/messageService');
const UserTagOutputDTO = require('../../../dto/AuxiliarsDtos/UserTags/UserTagOutputDTO');

const getAllUserTags = async(req, res) => {
    try{
         const tags = await UserTagService.getAllUsersTags();
        
         console.log(tags);
         
        if(!tags || tags.length === 0){
            return res.status(404).json({ message: messageService.getErrorMessage('NO_TAGS_FOUND') });

        }
        
        const Response = UserTagOutputDTO.format(tags)
        
        console.log(Response);

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
    getAllUserTags,
};