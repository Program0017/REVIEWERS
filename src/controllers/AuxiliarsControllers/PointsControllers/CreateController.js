const ActionPointService = require('../../../services/AuxiliarServices/ActionPointServices/ActionPointService');
const messageService = require('../../../services/userServices/messageService');
const ActionPointInputDTO = require('../../../dto/AuxiliarsDtos/ActionPoint/ActionPointInputDTO');
const ActionPointOutputDTO = require('../../../dto/AuxiliarsDtos/ActionPoint/ActionPointOutputDTO');

const createActionPoint = async(req, res) => {
    const ActionPointInput = ActionPointInputDTO.fromRequestBody(req.body);

    try {
        const ActionPoint = await ActionPointService.createActionPoint({
            action: ActionPointInput.action,
            points: ActionPointInput.points,
            creationDate: new Date() 
        })
        const Response = ActionPointOutputDTO.format(ActionPoint);

        res.status(201).json({
            message: messageService.getSuccessMessage('REWARD_POINT_CREATED'),
            review: Response
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('REWARD_POINT_CREATION_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    createActionPoint
};