const userService = require('../../services/userServices/userService');
const userValidationMiddleware = require('../../middleware/userValidationMiddleware')
const messageService = require('../../services/userServices/messageService');
const SUCCESSFULL_MESSAGES = require('../../constants/successfullMessages')
const { hashPassword } = require('../../utils/passwordUtils');
const UserUpdateDTO = require('../../dto/user/userUpdateDTO ');
const UserOutputDTO = require('../../dto/user/userOutputDTO'); // DTO de salida

const editUserProfile = async (req, res) => {
    const userId = req.user.userId;

    try{

        const userInput = UserUpdateDTO.fromRequestBody(req.body);

        const updatedData = {
            ...(userInput.username && { username: userInput.username}),
            ...(userInput.email && { email: userInput.email }), 
            bio: userInput.bio,
            profilePictureUrl: userInput.profilePictureUrl,
            updatedDate: new Date(),
        }

        if (userInput.newPassword) {
            const hashedPassword = await hashPassword(userInput.newPassword);
            updatedData.passwordHash = hashedPassword;
        }


        await messageService.sendConfirmationEmail(req.user);

        const updatedUser = await userService.updateUser(userId, updatedData);

        const formattedUser = UserOutputDTO.format(updatedUser);
        
        res.status(200).json({ 
            message: messageService.getSuccessMessage('PROFILE_UPDATED'), // Use messageService for success message
            user: formattedUser 
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('PROFILE_NO_UPDATED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    editUserProfile,
    userValidationMiddleware,
};


