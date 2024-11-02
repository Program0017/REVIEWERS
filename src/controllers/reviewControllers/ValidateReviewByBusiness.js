const reviewService = require('../../services/reviewServices/reviewService');
const messageService = require('../../services/userServices/messageService');
const { addRewardPoint } = require('../../services/userServices/userService');


const validateReviewBusiness = async (req, res) => {
    const { reviewId, businessId } = req.params;

    try{
        const review = await reviewService.validateReviewBusiness(parseInt(reviewId), parseInt(businessId));

        await addRewardPoint(review.user_id, 1)

        const updatedReview = await reviewService.updateReview(review.review_id, { wasValidated: true });


        res.status(200).json({
            message: messageService.getSuccessMessage('REVIEW_VALIDATED'),
            review: review,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('REVIEW_VALIDATION_FAILED'), error);
        res.status(400).json({
            message: messageService.getErrorMessage(error.message),
        });
    }
};

module.exports = {
    validateReviewBusiness,
};