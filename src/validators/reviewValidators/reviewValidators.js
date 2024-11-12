const Joi = require('joi');

const userIdValidator = Joi.number().integer().min(1).required().messages({
    'number.base': 'userId must be an integer',
    'number.min': 'userId must be at least 1',
    'any.required': 'userId is required'
})


const businessIdValidator = Joi.number().integer().min(1).required().messages({
    'number.base': 'businessId must be an integer',
    'number.min': 'businessId must be at least 1',
    'any.required': 'businessId is required'
})

// Validador para el rating (debe estar entre 1 y 5)
const ratingValidator = Joi.number().integer().min(1).max(5).required().messages({
  'number.base': 'Rating must be an integer',
  'number.min': 'Rating must be at least 1',
  'number.max': 'Rating must not exceed 5',
  'any.required': 'Rating is required'
});

// Validador para el título (entre 3 y 100 caracteres)
const titleValidator = Joi.string().min(3).max(100).required().messages({
  'string.base': 'Title must be a string',
  'string.empty': 'Title cannot be empty',
  'string.min': 'Title must have at least 3 characters',
  'string.max': 'Title must not exceed 100 characters',
  'any.required': 'Title is required'
});

// Validador para el contenido (entre 10 y 2000 caracteres)
const contentValidator = Joi.string().min(10).max(2000).required().messages({
  'string.base': 'Content must be a string',
  'string.empty': 'Content cannot be empty',
  'string.min': 'Content must have at least 10 characters',
  'string.max': 'Content must not exceed 2000 characters',
  'any.required': 'Content is required'
});

// Validador para la URL de la imagen (opcional, si se incluye debe ser una URL válida)
const imageUrlValidator = Joi.string().uri().optional().allow(null).messages({
  'string.base': 'Image URL must be a string',
  'string.uri': 'Image URL must be a valid URL',
  'string.empty': 'Image URL cannot be empty'
});

// Validador para las etiquetas (opcional, máximo 100 caracteres)
const tagsValidator = Joi.string().max(100).optional().allow(null).messages({
  'string.base': 'Tags must be a string',
  'string.max': 'Tags must not exceed 100 characters'
});

// Exportar validadores
module.exports = {
  ratingValidator,
  titleValidator,
  contentValidator,
  imageUrlValidator,
  tagsValidator,
};
