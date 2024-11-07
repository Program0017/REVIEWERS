const ActionPointService = require('../../../services/AuxiliarServices/ActionPointServices/ActionPointService');
const messageService = require('../../../services/userServices/messageService');
const ActionPointOutputDTO = require('../../../dto/AuxiliarsDtos/ActionPoint/ActionPointOutputDTO');

const getActionPointsById = async (req, res) => {
    const actionPointId = req.params.id;

    
    try {
        const ActionPoint = await ActionPointService.findActionPointByID(parseInt(actionPointId));
        
        const actionPointOutput = ActionPointOutputDTO.format(ActionPoint);

        // Return the tags with a success message
        return res.status(200).json({
            message: messageService.getSuccessMessage('REWARD_POINT_FOUND'),
            actionPointOutput,
        });

    } catch (error) {
        console.error(messageService.getErrorMessage('REWARD_POINT_NOT_FOUND'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    getActionPointsById,
};