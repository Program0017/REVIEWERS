const ActionPointService = require('../../../services/AuxiliarServices/ActionPointServices/ActionPointService');
const messageService = require('../../../services/userServices/messageService');
const ActionPointOutputDTO = require('../../../dto/AuxiliarsDtos/ActionPoint/ActionPointOutputDTO');

const getActionPointByPoints = async (req, res) => {
    const points = req.params.points;
    
    try {
        const ActionPoints = await ActionPointService.findActionPointsByPoints(parseInt(points)); // Llamada al servicio

        if (!ActionPoints || ActionPoints.length === 0) {
            return res.status(404).json({ message: messageService.getErrorMessage('NO_REWARD_POINTS_FOUND') });
        }
        const ActionPointsOutput = ActionPointOutputDTO.format(ActionPoints);

        return res.status(200).json({
            message: messageService.getSuccessMessage('REWARD_POINTS_FOUND'),
            ActionPoints: ActionPointsOutput,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('REWARD_POINTS_GET_FAILED'), error);
        return res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    getActionPointByPoints,
};
