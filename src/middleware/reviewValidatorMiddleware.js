const {   ratingValidator, titleValidator, contentValidator, imageUrlValidator, tagsValidator,  userIdValidator, businessIdValidator} = require('../validators/reviewValidators/reviewValidators');
const Joi = require('joi');

const reviewDataValidationMiddleware = async(req, res, next) => {
	const  schema = Joi.object({
		businessId: businessIdValidator,
		userId: userIdValidator,
		rating: ratingValidator,
		title: titleValidator,
		content: contentValidator,
		imageUrl: imageUrlValidator,
		tags: tagsValidator,
	})
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
  
  module.exports = reviewDataValidationMiddleware;