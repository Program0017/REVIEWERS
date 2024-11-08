const { usernameValidator, emailValidator, passwordValidator, bioValidator, profilePictureUrlValidator, referredByIdValidator, idValidator } = require('../validators/userValidators/UserDataValidations');
const { validateUniqueEmail, validateUniqueUsername } = require('../validators/userValidators/userValidations');
const ERROR_MESSAGES = require('../constants/errorMessages');
const Joi = require('joi');

const userDataRegisterValidationMiddleware = async (req, res, next) => {
    const { username, email } = req.body;

    // Validar unicidad de email y username
    if (await validateUniqueEmail(email)) {
        return res.status(400).json({ message: ERROR_MESSAGES.EMAIL_IN_USE });
    }

    if (await validateUniqueUsername(username)) {
        return res.status(400).json({ message: ERROR_MESSAGES.USERNAME_IN_USE });
    }

    // Validación de los datos con Joi
    const schema = Joi.object({
        username: usernameValidator,
        email: emailValidator,  
        passwordHash: passwordValidator,
        bio: bioValidator,
        profilePictureUrl: profilePictureUrlValidator,
        referredById: referredByIdValidator,
        id: idValidator
    });

    try {
        // Usamos validateAsync para validación asincrónica
        await schema.validateAsync(req.body, { abortEarly: false });

        // Si todo es válido, pasamos al siguiente middleware
        next();
    } catch (error) {
        // Si hay errores de validación, respondemos con un error 400
        res.status(400).json({
            message: "Validation Error",
            details: error.details.map((err) => ({
                message: err.message
            }))
        });
    }
};

module.exports = userDataRegisterValidationMiddleware;
