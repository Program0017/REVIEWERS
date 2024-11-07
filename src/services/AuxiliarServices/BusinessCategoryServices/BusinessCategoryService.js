const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const businessCategoryService = {
    async createBusinessCategory(data) {
        return await db.businessCategory.create({
            data
        });
    },

    async getAllBusinessCategories() {
        const allCategories = await db.businessCategory.findMany();

        if (allCategories.length === 0) {
            throw new Error('No hay ningun tipo de comercio actualmente.');
        }

        return allCategories;
    },

    async getCategoriesByBusinessId(businessId) {
        const categories = await db.businessCategory.findMany({
            where: { businessId: businessId }
        });

        if (categories.length === 0) {
            throw new Error('No hay comercios de este tipo, puedes ser el primero en crear uno :D.');
        }

        return categories;
    },

    async updateBusinessCategory(categoryId, updatedData) {
        if (!categoryId) {
            throw new Error("El categoryId no puede ser undefined.");
        }

        return await db.businessCategory.update({
            where: { id: categoryId },
            data: updatedData,
        });
    },
};

module.exports = businessCategoryService;
