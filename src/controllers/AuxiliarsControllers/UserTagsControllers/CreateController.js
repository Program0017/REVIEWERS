const UserTagServices = require('../../../services/AuxiliarServices/UserTagsServices/UserTagService')
const messageService = require('../../../services/userServices/messageService');
const UserTagInputDTO = require('../../../dto/AuxiliarsDtos/UserTags/UserTagInputDTO');
const UserTagOutputDTO = require('../../../dto/AuxiliarsDtos/UserTags/UserTagOutputDTO');
const authMiddleware = require('../../../middleware/authMiddleware');

const createUserTags = async(req, res) => {
    const userInput = UserTagInputDTO.fromRequestBody(req.body);

    try{
        const tag = await UserTagServices.createTags({
            tag: userInput.tag,
        })

        const Response = UserTagOutputDTO.format(tag)

        res.status(201).json({
            message: messageService.getSuccessMessage('TAG_CREATED'),
            review: Response
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('TAG_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    authMiddleware,
    createUserTags
};