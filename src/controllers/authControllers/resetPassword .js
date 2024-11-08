const  validateToken  = require('../../utils/jwtUtils');
const { hashPassword } = require('../../utils/passwordUtils');
const userService = require('../../services/userServices/userService');
const messageService = require('../../services/userServices/messageService');
const e = require('express');

const resetPassword = async (req, res) =>{
    const { token, newPassword } = req.body;    

    try {
        
        const decodedToken = validateToken.verifyToken(token);
        const userId = decodedToken.userId;

        const hashedPassword = await hashPassword(newPassword);

        await userService.updateUser(userId, { passwordHash: hashedPassword });

    // Responder con un mensaje de éxito
    res.status(200).json({ message: messageService.getSuccessMessage('PASSWORD_CHANGED_SUCCESSFULLY') });
} catch (error) {
    console.error('Error al asignar el tag:', error);
    res.status(400).json({ message: messageService.getErrorMessage('INVALID_TOKEN_OR_PASSWORD_RESET_FAILED')});
}
};

module.exports = {
resetPassword,
};