const reviewService = require('../../services/reviewServices/reviewService');
const messageService = require('../../services/userServices/messageService');
const { removeRewardPoint } = require('../../services/userServices/userService');

const toggleReviewActiveStatus = async(req,res) => {
    const reviewId = req.params.reviewId
    

    let action = '';

    try{
        const review = await reviewService.findReviewById(parseInt(reviewId));
    
        const newStatus = !review.itsHided
        action = newStatus ? 'activated' : 'deactivated';

        const updatedReview = await reviewService.updateReview(review.review_id, { itsHided: newStatus });
        
        // Solo remover puntos si la reseña es desactivada
        //if (!newStatus) {
        //    await removeRewardPoint(review.user_id);
        //}

        res.status(200).json({
            message: messageService.getSuccessMessage('REVIEW_TOGGLED'),
            review: updatedReview,
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('TOGGLE_REVIEW_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    toggleReviewActiveStatus
};