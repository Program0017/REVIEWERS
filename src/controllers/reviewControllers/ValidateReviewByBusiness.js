const reviewService = require('../../services/reviewServices/reviewService');
const messageService = require('../../services/userServices/messageService');
const { addActionPoint } = require('../../services/userServices/userService');
const ReviewOutputDTO = require('../../dto/review/reviewOutputDTO');
const actionPointService = require('../../services/AuxiliarServices/ActionPointServices/ActionPointService');

const validateReviewBusiness = async (req, res) => {
    const { reviewId, businessId } = req.params;
    console.log(req.params);
    
    try{
        const review = await reviewService.validateReviewBusiness(parseInt(reviewId), parseInt(businessId));
        console.log(review);
        
        const validatedReview = await actionPointService.findByAction('VALIDATE_REVIEW');

        await addActionPoint(review.id, validatedReview)

        const updatedReview = await reviewService.updateReview(review.id, { isValidated: true });

        const reviewOutput = ReviewOutputDTO.format(updatedReview);


        res.status(200).json({
            message: messageService.getSuccessMessage('REVIEW_VALIDATED'),
            review: reviewOutput,
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