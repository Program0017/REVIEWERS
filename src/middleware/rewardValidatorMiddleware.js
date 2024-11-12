const Joi = require('joi');

const {
    pointsNeededValidator,
    descriptionValidator,
    expirationDateValidator,
    categoryIdValidator
} = require('../validators/rewardsValidators/rewardValidator');

const rewardDataValidationMiddleware = async (req, res, next) => {
    // Definir el esquema de validación con Joi
    const schema = Joi.object({
        pointsNeeded: pointsNeededValidator,
        description: descriptionValidator,
        expirationDate: expirationDateValidator,
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

module.exports = rewardDataValidationMiddleware;