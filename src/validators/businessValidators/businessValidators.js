const Joi = require('joi');

// Validador para el nombre del negocio
const nameValidator = Joi.string().min(3).max(20).required().messages({
  'string.base': 'Business name must be a string',
  'string.empty': 'Business name cannot be empty',
  'string.min': 'Business name must have at least 3 characters',
  'string.max': 'Business name must not exceed 100 characters',
  'any.required': 'Business name is required'
});

// Validador para la ubicación
const locationValidator = Joi.string().min(3).max(70).required().messages({  
  'string.base': 'Location must be a string',
  'string.empty': 'Location cannot be empty',
  'string.min': 'Location must have at least 3 characters',
  'string.max': 'Location must not exceed 70 characters',
  'any.required': 'Location is required'
});

// Validador para el rating promedio
const averageRatingValidator = Joi.number().min(0).max(5).messages({
  'number.base': 'Average rating must be a number',
  'number.min': 'Average rating must be at least 0',
  'number.max': 'Average rating must not exceed 5'
});

// Validador para el total de reseñas
const totalReviewsValidator = Joi.number().integer().min(0).messages({
  'number.base': 'Total reviews must be an integer',
  'number.min': 'Total reviews must be at least 0'
});

// Validador para la información de contacto
const contactInfoValidator = Joi.string().min(10).max(255).required().messages({
  'string.base': 'Contact information must be a string',
  'string.empty': 'Contact information cannot be empty',
  'string.min': 'Contact information must have at least 10 characters',
  'string.max': 'Contact information must not exceed 255 characters',
  'any.required': 'Contact information is required'
});

// Validador para la categoría (opcional)
const categoryIdValidator = Joi.number().integer().allow(null).messages({
  'number.base': 'Category ID must be an integer'
});

// Exportar validadores
module.exports = {
  nameValidator,
  locationValidator,
  averageRatingValidator,
  totalReviewsValidator,
  contactInfoValidator,
  categoryIdValidator
};
