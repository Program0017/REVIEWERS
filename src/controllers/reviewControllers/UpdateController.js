const reviewService = require('../../services/reviewServices/reviewService');
const messageService = require('../../services/userServices/messageService');
const ReviewUpdateDTO = require('../../dto/review/reviewUpdateDTO');
const ReviewOutputDTO = require('../../dto/review/reviewOutputDTO');
const authMiddleware = require('../../middleware/authMiddleware');
const reviewValidatorMiddleware = require('../../middleware/reviewValidatorMiddleware');


const editReview = async (req, res) => {
    const reviewId = req.body.reviewId; 

    try {
        const reviewInput = ReviewUpdateDTO.fromRequestBody(req.body); 

        const updatedData = {
            ...(reviewInput.rating && { rating: reviewInput.rating }),
            ...(reviewInput.title && { title: reviewInput.title }),
            ...(reviewInput.content && { content: reviewInput.content }),
            ...(reviewInput.imageUrl && { imageUrl: reviewInput.imageUrl }),
            ...(reviewInput.tags && { tags: reviewInput.tags }),
            updatedDate: new Date(),
        };

        const updatedReview = await reviewService.updateReview(reviewId, updatedData);

        const reviewOutput = ReviewOutputDTO.format(updatedReview);

        res.status(200).json({
            message: messageService.getSuccessMessage('REVIEW_UPDATED'),
            review: reviewOutput,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('REVIEW_NO_UPDATED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    authMiddleware,
    reviewValidatorMiddleware,
    editReview
};
