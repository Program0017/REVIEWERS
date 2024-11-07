const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const businessTagService = {
    async createTags(data) {
        return await db.businessTag.create({
            data
        });
    },

    async getAllBusinessTags() {
        const allTags = await db.businessTag.findMany();

        if (allTags.length === 0) {
            throw new Error('No hay etiquetas.');
        }

        return allTags;
    },
    
    async getTagsByBusinessId(businessId) {
        const tags = await db.businessTag.findMany({
            where: { businessId: businessId }
        });

        if (tags.length === 0) {
            throw new Error('No hay etiquetas asignadas a este comercio.');
        }

        return tags;
    },

    async updateTag(tagId, updatedData) {
        if (!tagId) {
            throw new Error("El tagId no puede ser undefined.");
        }

        return await db.businessTag.update({
            where: { id: tagId },
            data: updatedData,
        });
    },
}

module.exports = businessTagService;
