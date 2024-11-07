const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const rewardCategoryService = {
    async createRewardCategory(data) {
        return await db.rewardCategory.create({
            data
        });
    },

    async getAllRewardCategories() {
        const allCategories = await db.rewardCategory.findMany();

        if (allCategories.length === 0) {
            throw new Error('No hay ningun tipo de recompensa.');
        }

        return allCategories;
    },

    async updateRewardCategory(categoryId, updatedData) {
        if (!categoryId) {
            throw new Error("El categoryId no puede ser undefined.");
        }

        return await db.rewardCategory.update({
            where: { id: categoryId },
            data: updatedData,
        });
    },

    async findRewardCategoryById(categoryId) {
        if (!categoryId) {
            throw new Error("El categoryId no puede ser undefined.");
        }

        const category = await db.rewardCategory.findUnique({
            where: { id: categoryId }
        });

        if (!category) {
            throw new Error("La categoría de recompensa no fue encontrada.");
        }

        return category;
    },

    async deleteRewardCategory(categoryId) {
        if (!categoryId) {
            throw new Error("El categoryId no puede ser undefined.");
        }

        const deletedCategory = await db.rewardCategory.delete({
            where: { id: categoryId }
        });

        return deletedCategory;
    }
};

module.exports = rewardCategoryService;
