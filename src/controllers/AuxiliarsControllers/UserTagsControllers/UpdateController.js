const UserTagService = require('../../../services/AuxiliarServices/UserTagsServices/UserTagService');
const messageService = require('../../../services/userServices/messageService');
const UserTagUpdateDTO = require('../../../dto/AuxiliarsDtos/UserTags/UserTagUpdateDTO');
const UserTagOutputDTO = require('../../../dto/AuxiliarsDtos/UserTags/UserTagOutputDTO');

const editTag = async(req, res) => {
    const tagId = req.body.id;
    try {
        const userTagInputDTO = UserTagUpdateDTO.fromRequestBody(req.body);
        
        const updatedData = {
            ...(userTagInputDTO.tag && { tag: userTagInputDTO.tag }),
            updatedDate: new Date(),
        }

        const updatedTag = await UserTagService.updateTag(tagId, updatedData)

        const tagOutput = UserTagOutputDTO.format(updatedTag);

        res.status(200).json({
            message: messageService.getSuccessMessage('TAG_UPDATED'),
            review: tagOutput,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('TAG_NOT_UPDATED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    editTag
};
