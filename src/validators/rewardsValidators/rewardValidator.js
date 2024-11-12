const Joi = require('joi');

// Validador para pointsNeeded (número entero requerido)
const pointsNeededValidator = Joi.number().integer().min(10).required().messages({
  'number.base': 'Points needed must be an integer',
  'number.min': 'Points needed must be at least 10',
  'any.required': 'Points needed is required'
});

// Validador para description (cadena de texto requerida, mínimo 10 y máximo 255 caracteres)
const descriptionValidator = Joi.string().min(10).max(255).required().messages({
  'string.base': 'Description must be a string',
  'string.empty': 'Description cannot be empty',
  'string.min': 'Description must have at least 10 characters',
  'string.max': 'Description must not exceed 255 characters',
  'any.required': 'Description is required'
});

// Validador para expirationDate (fecha requerida)
const expirationDateValidator = Joi.date().greater('now').required().messages({
  'date.base': 'Expiration date must be a valid date',
  'date.greater': 'Expiration date must be later than today',
  'any.required': 'Expiration date is required'
});

const categoryIdValidator = Joi.number().integer().allow(null).messages({
  'number.base': 'Category ID must be an integer'
});


// Exportar validadores
module.exports = {
  pointsNeededValidator,
  descriptionValidator,
  expirationDateValidator,
  categoryIdValidator
};
