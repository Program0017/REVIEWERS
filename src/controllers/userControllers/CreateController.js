const bcrypt = require('bcrypt');
const { hashPassword } = require('../../utils/passwordUtils');
const userService = require('../../services/userServices/userService');
const userValidationMiddleware = require('../../middleware/userValidationMiddleware');
const UserInputDTO = require('../../dto/user/userInputDTO');
const UserOutputDTO = require('../../dto/user/userOutputDTO');
const messageService = require('../../services/userServices/messageService');


const registerUser = async (req, res) => {

        try {
            const userInput = UserInputDTO.fromRequestBody(req.body);

            const password_hash = await hashPassword(userInput.password)
            
            const user = await userService.createUser({
                username: userInput.username,
                email: userInput.email,
                password_hash,
                bio: userInput.bio,
                profile_picture_url: userInput.profile_picture_url,
                tags: userInput.tags,
                updated_date: new Date(),
                last_login: new Date(),
                itsActive: true
            });

            await messageService.sendConfirmationEmail(user);
            
            const userResponse = UserOutputDTO.format(user);

            res.status(201).json(userResponse);
        }catch(error) {
            console.error(messageService.getErrorMessage('REGISTRATION_FAILED'), error);
            res.status(500).json({message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
        }   
    };

module.exports = {
    registerUser,
    userValidationMiddleware 
}


