const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const reviewService = {
    async createReview(data) {
        const { userId, businessId, ...restData } = data;

        return await db.review.create({
            data: {
                ...restData,
                user: {
                    connect: { id: userId }
                },
                business: {
                    connect: {id: businessId}
                }
            }
        });
    },

    // Buscar reseña por ID
    async findReviewById(reviewId) {
        return await db.review.findUnique({
            where: { id: reviewId } // Updated to match schema
        });
    },

    async validateReviewBusiness(reviewId, businessId) {
        const review = await this.findReviewById(reviewId);

        if (!review) {
            throw new Error('Review not found');
        }

        if (review.businessId !== businessId) { // Updated to match schema
            throw new Error('Business ID does not match the review');
        }

        return review;
    },

    async updateReview(reviewId, updatedData) {
        if (!reviewId) {
            throw new Error("Review ID cannot be undefined.");
        }

        return await db.review.update({
            where: { id: reviewId }, // Updated to match schema
            data: updatedData,
        });
    },

    async searchReviews(filters, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;

        const { userId, reviewId, businessId, rating, tags } = filters;

        const conditions = {
            isHidden: false
        };

        if (userId) conditions.userId = parseInt(userId, 10); // Updated to match schema
        if (reviewId) conditions.id = parseInt(reviewId, 10); // Updated to match schema
        if (businessId) conditions.businessId = parseInt(businessId, 10); // Updated to match schema
        if (rating) conditions.rating = parseFloat(rating);
        if (tags) conditions.tags = { contains: tags }; // Presuming tags is a string field

        return await db.review.findMany({
            where: conditions,
            select: {
                id: true, // Updated to match schema
                userId: true, // Updated to match schema
                businessId: true, // Updated to match schema
                rating: true,
                title: true,
                content: true,
                tags: true,
                creationDate: true, // Updated to match schema
                updatedDate: true, // Updated to match schema
            },
            skip,
            take: pageSize,
        });
    },

    async getAllReviews(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;

        return await db.review.findMany({
            where: {
                isHidden: false // Updated to match schema
            },
            select: {
                id: true, // Updated to match schema
                userId: true, // Updated to match schema
                businessId: true, // Updated to match schema
                rating: true,
                title: true,
                content: true,
                tags: true,
                creationDate: true, // Updated to match schema
                updatedDate: true, // Updated to match schema
            },
            skip,
            take: pageSize,
        });
    },

    async updateHelpfulVotes(reviewId, isHelpful, isWithdraw = false) {
        const review = await db.review.findUnique({ where: { id: reviewId } }); // Updated to match schema

        if (!review) {
            throw new Error('Review not found');
        }

        const newHelpfulVotes = isWithdraw
            ? review.helpfulVotes - (isHelpful ? 1 : 0)
            : review.helpfulVotes + (isHelpful ? 1 : -1);

        await db.review.update({
            where: { id: reviewId }, // Updated to match schema
            data: { helpfulVotes: newHelpfulVotes }, // Updated to match schema
        });
    }
};

module.exports = reviewService;
