const userService = require('../../services/userServices/userService');
const messageService = require('../../services/userServices/messageService'); // Importing message service

const toggleUserActiveStatus = async (req, res) => {
    const userId = req.user.userId;
 
    let action = '';

    try {
        const user = await userService.findUserById(parseInt(userId));

        if (!user) {
            return res.status(404).json({ message: messageService.getErrorMessage('USERS_NOT_FOUND') });
        }

        const newStatus = !user.isActive;
        action = newStatus ? 'activated' : 'deactivated';

        const updatedUser = await userService.updateUser(user.id, { isActive: newStatus });

        res.status(200).json({
            message: messageService.getSuccessMessage('USER_TOGGLED'), // New message key
            user: updatedUser,
        });
    } catch (error) {
        console.error(`Error while ${action || 'processing'} the user:`, error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    toggleUserActiveStatus,
};
