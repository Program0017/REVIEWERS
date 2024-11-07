const SUCCESSFULL_MESSAGES = require('../../constants/successfullMessages');
const { generateToken } = require('../../utils/jwtUtils');
const { validatePassword, validateUserExists } = require('../../validators/authVaidators/loginValidators');
const userService = require('../../services/userServices/userService');
const UserOutputDTO = require('../../dto/user/userOutputDTO');

const loginUser = async (req, res) => {
    const { email, passwordHash } = req.body;

    try {

        const user = await userService.findUserByEmail(email);

        await validateUserExists(email);

        await validatePassword(passwordHash, user.passwordHash)

        await userService.updateUser(user.id, {lastLogin: new Date()});

        const token = generateToken({
            userId: user.id,
            username: user.username,
            email: user.email
        });
        const userResponse = UserOutputDTO.format(user);

        res.status(200).json({
            message: SUCCESSFULL_MESSAGES.LOGIN_SUCCESSFULLY,
            user: userResponse,
            token

        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    loginUser,
};
