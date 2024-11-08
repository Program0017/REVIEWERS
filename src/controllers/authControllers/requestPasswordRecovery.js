const { generateToken } = require('../../utils/jwtUtils');
const userService = require('../../services/userServices/userService');
const messageService = require('../../services/userServices/messageService');

const requestPasswordRecovery = async(req,res) => {
    const { email }  = req.body;    

    try {
        const user = await userService.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: messageService.getErrorMessage('USERS_NOT_FOUND') });
        }

        const token = generateToken({ userId: user.id }, '1h'); 

        await messageService.sendRecoveryEmail(user, token);
        
        res.status(200).json({ message: messageService.getSuccessMessage('RECOVERY_EMAIL_SENT') });
    } catch (error) {
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    requestPasswordRecovery,
};