const { validateUniqueEmail, validateUniqueUsername } = require('../validators/userValidators/userValidations');
const ERROR_MESSAGES = require('../constants/errorMessages');

const userValidationMiddleware = async (req, res, next) => {
    const { username, email } = req.body;

    if (await validateUniqueEmail(email)) {
        return res.status(400).json({ message: ERROR_MESSAGES.EMAIL_IN_USE });
    }
    if (await validateUniqueUsername(username)) {
        return res.status(400).json({ message: ERROR_MESSAGES.USERNAME_IN_USE });
    }
    
    next();
};

module.exports = userValidationMiddleware;
