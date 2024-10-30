const express = require('express');
const router = express.Router();
const createReview = require('../../controllers/reviewControllers/CreateController');
const updateReview = require('../../controllers/reviewControllers/UpdateController');
const listOrSearchReviews = require('../../controllers/reviewControllers/ReadController');
const hideReview = require('../../controllers/reviewControllers/DeactivateController');
const voteOrWithdrawReview = require('../../controllers/reviewControllers/votes/voteOrWithdrawReview');
const reportReviewController = require('../../controllers/reviewControllers/reports/ReportController');
const authMiddleware = require('../../middleware/authMiddleware');

// Review Routes
router.post('/reviews', authMiddleware, createReview.createReview);
router.put('/edit', authMiddleware, updateReview.editReview);
router.get('/reviews', authMiddleware, listOrSearchReviews.listOrSearchReviews);
router.put('/toggle-status/:reviewId', authMiddleware, hideReview.toggleReviewActiveStatus);
router.post('/:reviewId/vote', authMiddleware, voteOrWithdrawReview.voteOrWithdrawReview);
router.post('/:reviewId/report', authMiddleware, reportReviewController.reportReview);

module.exports = router;
