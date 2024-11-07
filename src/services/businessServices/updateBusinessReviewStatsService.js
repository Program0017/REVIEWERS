const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const updateBusinessReviewStats = async (businessId, newRating) => {
  try {
    const business = await db.business.findUnique({
      where: { id: businessId },
    });

    if (!business) {
      throw new Error('Business not found');
    }

    const newTotalReviews = business.totalReviews + 1;
    const newAverageRating = ((business.averageRating * business.totalReviews) + newRating) / newTotalReviews;

    const roundedAverageRating = parseFloat(newAverageRating.toFixed(1));

    const updatedBusiness = await db.business.update({
      where: { id: businessId },
      data: {
        totalReviews: newTotalReviews,
        averageRating: roundedAverageRating,
        updatedDate: new Date(),
      },
    });

    return updatedBusiness;
  } catch (error) {
    console.error('Error updating business review stats:', error);
    throw new Error('Failed to update business review stats');
  }
};

module.exports = { updateBusinessReviewStats };
