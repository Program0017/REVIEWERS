const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const reviewService = {
    async createReview(data) {
        return await db.review.create({
            data
        });
    },

    // Buscar usuario por ID
    async findReviewById(reviewId) {
        return await db.review.findUnique({
            where:
                { review_id: reviewId }
        });
    },

    async validateReviewBusiness(reviewId, businessId) {
        const review = await this.findReviewById(reviewId);
        
        if (!review) {
            throw new Error('Review not found');
        }

        if (review.business_id !== businessId) {
            throw new Error('Business ID does not match the review');
        }

        return review;
    },

    async updateReview(reviewId, updatedData) {
        if (!reviewId) {
            throw new Error("El reviewId no puede ser undefined.");
        }

        return await db.review.update({
            where: { review_id: reviewId },
            data: updatedData,
        });
    },

    async searchReviews(filters, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const { userId, reviewId, bussinesId, rating, tags } = filters;

        const conditions = [];

        if (userId) conditions.push({ user_id: parseInt(userId, 10) });
        if (reviewId) conditions.push({ review_id: parseInt(reviewId, 10) });
        if (bussinesId) conditions.push({ bussines_id: parseInt(bussinesId, 10) });
        if (rating) conditions.push({ rating: parseFloat(rating) });
        if (tags) conditions.push({ tags: { contains: tags } });

        conditions.push({ itsHided: false });


        return await db.review.findMany({
            where: {
                AND: conditions,
            },
            select: {
                review_id: true,
                user_id: true,
                business_id: true,
                rating: true,
                title: true,
                content: true,
                tags: true,
                creation_date: true,
                updated_date: true,
            },
            skip,
            take,
        });
    },



    async getAllReviews(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return await db.review.findMany({
            where: {
                itsHided: false
            },
            select: {
                review_id: true,
                user_id: true,
                bussines_id: true,
                rating: true,
                title: true,
                content: true,
                tags: true,
                created_date: true,
                updated_date: true,
            },
            skip,
            take,
        });
    },

    async updateHelpfulVotes(reviewId, isHelpful, isWithdraw = false) {
        const review = await db.review.findUnique({ where: { review_id: reviewId } });

        if (isWithdraw) {
            await db.review.update({
                where: { review_id: reviewId },
                data: { helpful_votes: review.helpful_votes - (isHelpful ? 1 : 0) },
            });
        } else {
            await db.review.update({
                where: { review_id: reviewId },
                data: { helpful_votes: review.helpful_votes + (isHelpful ? 1 : -1) },
            });
        }
    }

};

module.exports = reviewService;
