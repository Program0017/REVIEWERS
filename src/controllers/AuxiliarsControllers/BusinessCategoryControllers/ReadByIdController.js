const businessTypeService = require('../../../services/AuxiliarServices/BusinessTypeServices/BusinessTypeService');
const messageService = require('../../../services/userServices/messageService');
const BusinessTypeInputDTO = require('../../../dto/AuxiliarsDtos/BusinessTypes/BusinessTypeInputDTO');
const BusinessTypeOutputDTO = require('../../../dto/AuxiliarsDtos/BusinessTypes/BusinessTypeOutputDTO');

const getTypesByBusinessId = async (req, res) => {
    const businessId = req.body.business_id;

    try {
        const types = await businessTypeService.getTypesByBusinessId(businessId);

        if (!types || types.length === 0) {
            return res.status(404).json({ message: messageService.getErrorMessage('NO_TYPES_FOUND_FOR_BUSINESS') });
        }

        return res.status(200).json({
            message: messageService.getSuccessMessage('BUSINESS_TYPES_RETRIEVED_SUCCESSFULLY'),
            types,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('TYPES_GET_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};


module.exports = {
    getTypesByBusinessId
};

