const userService = require('../../services/userServices/userService');
const bcrypt = require('bcrypt');

const validateUserExists = async (email) => {
    const user = await userService.findUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const validatePassword = async (password, passwordHash) => {
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (!isPasswordValid) {
        throw new Error('Incorrect password');
    }
    return true;
};

module.exports = {
    validateUserExists,
    validatePassword
};
