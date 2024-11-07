const reviewService = require('../../services/reviewServices/reviewService');
const messageService = require('../../services/userServices/messageService');
const ReviewOutputDTO = require('../../dto/review/reviewOutputDTO');

const listOrSearchReviews = async (req, res) => {
    const { userId, reviewId, businessId, rating, tags } = req.query; 
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        let reviews;

        if (!userId && !reviewId && !businessId && !rating && !tags) {
            reviews = await reviewService.getAllReviews(page, pageSize, { isHidden: true });
        } else {
            reviews = await reviewService.searchReviews({ 
                userId, 
                reviewId, 
                businessId, 
                rating, 
                tags, 
                isHidden: false 
            }, page, pageSize);

            if (reviews.length === 0) {
                return res.status(404).json({ message: messageService.getErrorMessage('REVIEWS_NOT_FOUND') });
            }

            const formattedReviews = reviews.map(review => ReviewOutputDTO.format(review));

            return res.status(200).json({
                message: messageService.getSuccessMessage('RETRIEVED_ALL_REVIEWS'),
                reviews: formattedReviews,
                currentPage: page,
                totalResults: reviews.length,
            });
        }

    } catch (error) {
        console.error(messageService.getErrorMessage('INTERNAL_SERVER_ERROR_SEARCH'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    listOrSearchReviews,
};
