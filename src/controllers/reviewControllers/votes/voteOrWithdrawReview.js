const reviewService = require('../../../services/reviewServices/reviewService');
const voteService = require('../../../services/reviewServices/voteService');
const messageService = require('../../../services/userServices/messageService');

const voteOrWithdrawReview = async (req, res) => {
    const userId = req.user.userId;
    const reviewId = parseInt(req.params.reviewId);
    const { isHelpful } = req.body;

    try {
        const existingVote = await voteService.findVoteByUserAndReview(userId, reviewId);
        
        if (existingVote) {
            await voteService.deleteVote(existingVote.id);
            await reviewService.updateHelpfulVotes(reviewId, existingVote.isHelpful, true);

            return res.status(200).json({
                message: messageService.getSuccessMessage('VOTE_REMOVED'),
            });
        } else {
            const newVote = await voteService.createVote({ userId, reviewId, isHelpful });
            await reviewService.updateHelpfulVotes(reviewId, isHelpful);

            return res.status(201).json({
                message: messageService.getSuccessMessage('VOTE_REGISTERED'),
                vote: newVote,
            });
        }
    } catch (error) {
        console.error(messageService.getErrorMessage('VOTE_ACTION_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    voteOrWithdrawReview,
};
