const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const updateBusinessReviewStats = async (businessId, newRating) => {
  try {
    const business = await db.business.findUnique({
      where: { business_id: businessId },
    });

    if (!business) {
      throw new Error('Business not found');
    }

    const newTotalReviews = business.total_reviews + 1;
    const newAverageRating = ((business.average_rating * business.total_reviews) + newRating) / newTotalReviews;

    const roundedAverageRating = parseFloat(newAverageRating.toFixed(1));


    const updatedBusiness = await db.business.update({
      where: { business_id: businessId },
      data: {
        total_reviews: newTotalReviews,
        average_rating: roundedAverageRating,
        updated_date: new Date(),
      },
    });

    return updatedBusiness;
  } catch (error) {
    console.error('Error updating business review stats:', error);
    throw new Error('Failed to update business review stats');
  }
};

module.exports = { updateBusinessReviewStats };
