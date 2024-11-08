const Joi = require('joi');

const usernameValidator = Joi.string()
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)
    .min(8)
    .max(12)
    .required()

const emailValidator = Joi.string()
    .email({ tlds: { allow: ['com', 'net', 'org'] } })  // Correcta validación del dominio del email
    .required();

const passwordValidator = Joi.string()
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)
    .min(8)
    .max(12)
    .required();

const bioValidator = Joi.string()
    .max(250)
    .allow(null)
    .optional();

const profilePictureUrlValidator = Joi.string()
    .uri()
    .allow(null)

const referredByIdValidator = Joi.number().integer().optional();

const idValidator = Joi.number().integer().optional();

module.exports = {
    usernameValidator,
    emailValidator,
    passwordValidator,
    bioValidator,
    profilePictureUrlValidator,
    referredByIdValidator,
    idValidator
};