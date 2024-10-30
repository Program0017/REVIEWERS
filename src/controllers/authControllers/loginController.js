const SUCCESSFULL_MESSAGES = require('../../constants/successfullMessages');
const { generateToken } = require('../../utils/jwtUtils');
const { validatePassword, validateUserExists } = require('../../validators/authVaidators/loginValidators');
const userService = require('../../services/userServices/userService');
const UserOutputDTO = require('../../dto/user/userOutputDTO');





const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await userService.findUserByEmail(email);

        await validateUserExists(email);

        await validatePassword(password, user.password_hash)

        await userService.updateUser(user.user_id, {last_login: new Date()});

        const token = generateToken({
            userId: user.user_id,
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
