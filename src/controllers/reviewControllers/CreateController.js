const reviewService = require('../../services/reviewServices/reviewService')
const { updateBusinessReviewStats } = require('../../services/businessServices/updateBusinessReviewStatsService');
const { addRewardPoint } = require('../../services/userServices/userService');

const messageService = require('../../services/userServices/messageService');
const ReviewInputDTO = require('../../dto/review/reviewInputDTO'); // DTO de entrada
const ReviewOutputDTO = require('../../dto/review/reviewOutputDTO'); // DTO de salida
const authMiddleware = require('../../middleware/authMiddleware')


const createReview = async(req, res) =>{
    const reviewInput = ReviewInputDTO.fromRequestBody(req.body);

    try{
        const review = await reviewService.createReview({
            user_id: reviewInput.user_id,
            business_id: reviewInput.business_id,
            rating: reviewInput.rating,
            title: reviewInput.title,
            content: reviewInput.content,
            image_url: reviewInput.image_url || null,
            tags: reviewInput.tags,
            creation_date: new Date(),
            updated_date: new Date(),
            wasValidated: false
        });

        await updateBusinessReviewStats(review.business_id, review.rating);

        const rewardPoints = review.image_url ? 2 : 1;
        await addRewardPoint(review.user_id, rewardPoints);


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
