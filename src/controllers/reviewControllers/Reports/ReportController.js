const businessService = require('../../../services/businessServices/businessService');
const messageService = require('../../../services/userServices/messageService');
const emailService = require('../../../services/userServices/emailService');
const reportService = require('../../../services/reviewServices/reportService');
const reviewService = require('../../../services/reviewServices/reviewService');

const reportReview = async (req, res) => {
    const userId = req.user.userId; 
    const reviewId = parseInt(req.params.reviewId); 
    const { reason } = req.body;

    if (!reason) {
        return res.status(400).json({ message: messageService.getErrorMessage('REPORT_REASON_REQUIRED') });
    }

    try {
        const review = await reviewService.findReviewById(reviewId);
        await reviewService.updateReview(reviewId, { isReported: true });

        const newReport = await reportService.createReport({ userId, reviewId, reason });
        await emailService.sendConfirmationReportMail(userId, reviewId, reason);

        return res.status(201).json({ 
            message: messageService.getSuccessMessage('REPORT_SUBMITTED'),
            report: newReport
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('REPORT_ERROR'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

const unreportReview = async (req, res) => {
    const reviewId = parseInt(req.params.reviewId); 
    const reportId = parseInt(req.params.reportId); 

    try {
        const review = await reviewService.findReviewById(reviewId);
        if (!review) {
            return res.status(404).json({ message: messageService.getErrorMessage('REVIEW_NOT_FOUND') });
        }

        const report = await reportService.findReportById(reportId);
        if (!report) {
            return res.status(404).json({ message: messageService.getErrorMessage('REPORT_NOT_FOUND') });
        }

        await reportService.updateReport(report.id, { isActive: false });
        await reviewService.updateReview(review.review_id, { isReported: false });

        return res.status(200).json({ 
            message: messageService.getSuccessMessage('REVIEW_UNREPORTED'), 
            report 
        });
    } catch (error) {
        console.error(messageService.getErrorMessage('UNREPORT_ERROR'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    reportReview,
    unreportReview
};
