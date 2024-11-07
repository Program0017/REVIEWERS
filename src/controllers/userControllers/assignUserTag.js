const userService = require('../../services/userServices/userService');
const messageService = require('../../services/userServices/messageService');

const assignTag = async (req, res) => {
    const { userId, tagId } = req.body;

    console.log(req.body);
    
    try {
        const updatedUser = await userService.assignTagToUser(userId, tagId);
        // Enviar respuesta de éxito con el usuario actualizado
        
        res.status(200).json({
            message: 'Tag asignado exitosamente',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error al asignar el tag:', error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    assignTag,
};