const userService = require('../../services/userServices/userService');
const messageService = require('../../services/userServices/messageService');
const UserOutputDTO = require('../../dto/user/userOutputDTO');

const listUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        const userResponse = UserOutputDTO.format(users);

        res.status(200).json({
            message: messageService.getSuccessMessage('RETRIEVED_ALL_USERS'), 
            userResponse,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('ERROR_USERS_NOT_FOUND'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    listUsers,
};
