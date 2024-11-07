const BusinessTagServices = require('../../../services/AuxiliarServices/BusinessTagServices/BusinessTagService')
const messageService = require('../../../services/userServices/messageService');
const BusinessTagInputDTO = require('../../../dto/AuxiliarsDtos/BusinessTags/BusinessTagInputDTO');
const BusinessTagOutputDTO = require('../../../dto/AuxiliarsDtos/BusinessTags/BusinessTagOutputDTO');

const createBusinessTags = async(req, res) => {
    const BusinessInput = BusinessTagInputDTO.fromRequestBody(req.body);

    try{
        const tag = await BusinessTagServices.createTags({
            tag: BusinessInput.tag,
        })

        const Response = BusinessTagOutputDTO.format(tag)

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
    createBusinessTags
};