const Joi = require('joi');

const { 
  nameValidator, 
  locationValidator, 
  averageRatingValidator, 
  totalReviewsValidator, 
  contactInfoValidator, 
  categoryIdValidator 
} = require('../validators/businessValidators/businessValidators');

const businessDataValidationMiddleware = async (req, res, next) => {
  // Definir el esquema de validación con Joi
  const schema = Joi.object({
      name: nameValidator,
      location: locationValidator,
      averageRating: averageRatingValidator,
      totalReviews: totalReviewsValidator,
      contactInfo: contactInfoValidator,
      categoryId: categoryIdValidator
  });

  try {
      // Validar los datos de entrada
      await schema.validateAsync(req.body, { abortEarly: false });

      // Si todo es válido, continúa al siguiente middleware
      next();
  } catch (error) {
      // Si hay errores, responde con un 400 y los detalles del error
      res.status(400).json({
          message: "Validation Error",
          details: error.details.map((err) => ({
              message: err.message
          }))
      });
  }
};

module.exports = businessDataValidationMiddleware;