const ActionPointService = require('../../../services/AuxiliarServices/ActionPointServices/ActionPointService');
const messageService = require('../../../services/userServices/messageService');
const ActionPointOutputDTO = require('../../../dto/AuxiliarsDtos/ActionPoint/ActionPointOutputDTO');

const getAllActionPoints = async(req, res) => {
    try {
        const ActionPoint = await ActionPointService.getAllActionPoints();

        if (!ActionPoint || ActionPoint.length === 0) {
            return res.status(404).json({ message: messageService.getErrorMessage('NO_TYPES_FOUND') });
        }

        const ActionPointOutput = ActionPointOutputDTO.format(ActionPoint);

        return res.status(200).json({
            message: messageService.getSuccessMessage('REWARD_POINTS_RETRIEVED_SUCCESSFULLY'),
            ActionPointOutput,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('REWARD_POINTS_GET_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};
module.exports = {
    getAllActionPoints 
};