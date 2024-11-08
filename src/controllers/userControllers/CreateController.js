const { hashPassword } = require('../../utils/passwordUtils');
const userService = require('../../services/userServices/userService');
const userValidationMiddleware = require('../../middleware/userValidationMiddleware');
const UserInputDTO = require('../../dto/user/userInputDTO');
const UserOutputDTO = require('../../dto/user/userOutputDTO');
const messageService = require('../../services/userServices/messageService');
const actionPointService = require('../../services/AuxiliarServices/ActionPointServices/ActionPointService');



const registerUser = async (req, res) => {

    try {
        const userInput = UserInputDTO.fromRequestBody(req.body);

        const passwordHash = await hashPassword(userInput.passwordHash)

        let referredById = null;
        if (userInput.referredById) {
            const referrer = await userService.findUserById(userInput.referredById);
            if (referrer) {
                referredById = referrer.id; // Asignar el ID del usuario que refiere
            }
        }

        const user = await userService.createUser({
            username: userInput.username,
            email: userInput.email,
            passwordHash,
            bio: userInput.bio,
            profilePictureUrl: userInput.profilePictureUrl,
            tags: userInput.tags,
            updatedDate: new Date(),
            lastLogin: new Date(),
            isActive: true,
            referredById: userInput.referredById || null,

        });

        // Verificar si hay un referrer y agregar recompensa
        if (userInput.referredById) {
            await userService.addReferral(userInput.referredById, user.id);

            const referralAction = await actionPointService.findByAction('REGISTER_WITH_A_REFERRAL_CODE');

            const newUserAction = await actionPointService.findByAction('REFER_NEW_USER');

            if (referralAction && newUserAction) {
                await userService.addActionPoint(referredById, referralAction.points);

                await userService.addActionPoint(user.id, newUserAction.points);
            }
        } 
        await messageService.sendConfirmationEmail(user);

        const userResponse = UserOutputDTO.format(user);

        res.status(201).json(userResponse);
    } catch (error) {
        console.error(messageService.getErrorMessage('REGISTRATION_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    registerUser,
    userValidationMiddleware
}


