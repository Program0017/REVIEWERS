const businessTagService = require('../../../services/AuxiliarServices/BusinessTagServices/BusinessTagService');
const messageService = require('../../../services/userServices/messageService');
const BusinessTagUpdateDTO = require('../../../dto/AuxiliarsDtos/BusinessTags/BusinessTagUpdateDTO');
const BusinessTagOutputDTO = require('../../../dto/AuxiliarsDtos/BusinessTags/BusinessTagOutputDTO');

const editTag = async(req, res) => {
    const tagId = req.body.id;
    try {
        const businessTagInputDTO = BusinessTagUpdateDTO.fromRequestBody(req.body);
        
        const updatedData = {
            ...(businessTagInputDTO.tag && { tag: businessTagInputDTO.tag }),
            updatedDate: new Date(),
        }

        const updatedTag = await businessTagService.updateTag(tagId, updatedData)

        const tagOutput = BusinessTagOutputDTO.format(updatedTag);

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
