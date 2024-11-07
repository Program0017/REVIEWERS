const businessService = require('../../services/businessServices/businessService');
const messageService = require('../../services/userServices/messageService');

const assignTag = async (req, res) => {
    const { businessId, tagId } = req.body;
    console.log(req.body);
    
    try {
        const updatedBusiness = await businessService.assignTagToBusiness(businessId, tagId);
        // Enviar respuesta de éxito con el usuario actualizado
        
        res.status(200).json({
            message: 'Tag asignado exitosamente',
            user: updatedBusiness,
        });
    } catch (error) {
        console.error('Error al asignar el tag:', error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    assignTag,
};