const ActionPointService = require('../../../services/AuxiliarServices/ActionPointServices/ActionPointService');
const messageService = require('../../../services/userServices/messageService');
const ActionPointUpdateDTO = require('../../../dto/AuxiliarsDtos/ActionPoint/ActionPointUpdateDTO');
const ActionPointOutputDTO = require('../../../dto/AuxiliarsDtos/ActionPoint/ActionPointOutputDTO');

const editActionPoint = async(req, res) => {
    const ActionPointId = req.body.ActionPointId;
    try{
        const ActionPointInput = ActionPointUpdateDTO.fromRequestBody(req.body);
        
        const updatedData = {
            ...(ActionPointInput.action && { action: ActionPointInput.action }),
            ...(ActionPointInput.points && { points: ActionPointInput.points }),
            creationDate: new Date(),
            updatedDate: new Date(),
        };

        const updatedActionPoint = await ActionPointService.updateActionPoint(ActionPointId, updatedData)
        
        const ActionPointOutput = ActionPointOutputDTO.format(updatedActionPoint);

        res.status(200).json({
            message: messageService.getSuccessMessage('REWARD_POINT_UPDATED'),
            review: ActionPointOutput,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('REWARD_POINT_NOT_UPDATED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    editActionPoint
};
