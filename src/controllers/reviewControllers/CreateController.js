const reviewService = require('../../services/reviewServices/reviewService')
const { updateBusinessReviewStats } = require('../../services/businessServices/updateBusinessReviewStatsService');
const { addActionPoint } = require('../../services/userServices/userService');

const messageService = require('../../services/userServices/messageService');
const ReviewInputDTO = require('../../dto/review/reviewInputDTO'); // DTO de entrada
const ReviewOutputDTO = require('../../dto/review/reviewOutputDTO'); // DTO de salida
const authMiddleware = require('../../middleware/authMiddleware');
const actionPointService = require('../../services/AuxiliarServices/ActionPointServices/ActionPointService');

const createReview = async(req, res) =>{
    const reviewInput = ReviewInputDTO.fromRequestBody(req.body);

    try{
        const review = await reviewService.createReview({
            userId: reviewInput.userId,
            businessId: reviewInput.businessId,
            rating: reviewInput.rating,
            title: reviewInput.title,
            content: reviewInput.content,
            imageUrl: reviewInput.imageUrl || null,
            tags: reviewInput.tags,
            creationDate: new Date(),
            updatedDate: new Date(),
            isValidated: false
        });

        await updateBusinessReviewStats(review.businessId, review.rating);

        const createReviewWithImage = await actionPointService.findByAction('CREATE_REVIEW_WITH_IMAGE');
        const createReviewWithoutImage = await actionPointService.findByAction('CREATE_REVIEW_WITHOUT_IMAGE');

        if (createReviewWithImage && createReviewWithoutImage) {

            const ActionPoints = review.imageUrl ? createReviewWithImage : createReviewWithoutImage;
            await addActionPoint(review.userId, ActionPoints);

        }

        const reviewResponse = ReviewOutputDTO.format(review);

        res.status(201).json({
            message: messageService.getSuccessMessage('REVIEW_CREATED'), 
            review: reviewResponse
        });
    }catch(error){
        console.error(messageService.getErrorMessage('REVIEW_CREATION_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    authMiddleware,
    createReview
};
