const express = require('express');
const router = express.Router();
const createReview = require('../../controllers/reviewControllers/CreateController');
const updateReview = require('../../controllers/reviewControllers/UpdateController');
const listOrSearchReviews = require('../../controllers/reviewControllers/ReadController');
const hideReview = require('../../controllers/reviewControllers/DeactivateController');
const voteOrWithdrawReview = require('../../controllers/reviewControllers/votes/voteOrWithdrawReview');
const reportReviewController = require('../../controllers/reviewControllers/Reports/ReportController');
const validateReviewBusiness = require('../../controllers/reviewControllers/ValidateReviewByBusiness');

const authMiddleware = require('../../middleware/authMiddleware');
const reviewValidatorMiddleware = require('../../middleware/reviewValidatorMiddleware');
const { authorize, checkPermission } = require('../../middleware/authorize');


// Review Routes
router.post('/', authMiddleware, reviewValidatorMiddleware, createReview.createReview);
router.put('/edit', authMiddleware,reviewValidatorMiddleware, updateReview.editReview);
router.get('/search', authMiddleware, listOrSearchReviews.listOrSearchReviews);
router.put('/toggle-status/:reviewId', authMiddleware, authorize('admin'), hideReview.toggleReviewActiveStatus);
router.post('/:reviewId/vote', authMiddleware, voteOrWithdrawReview.voteOrWithdrawReview);
router.post('/:reviewId/report', authMiddleware, reportReviewController.reportReview);
router.get('/:reviewId/validate/:businessId', authMiddleware, validateReviewBusiness.validateReviewBusiness);


module.exports = router;
