const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const UserTagService = {
    async createTags(data) {
        return await db.userTag.create({
            data
        });
    },

    async getAllUsersTags() {
        const allTags = await db.userTag.findMany(); // Update from findAll to findMany

        // Check if there are any tags
        if (allTags.length === 0) {
            throw new Error('No hay etiquetas.');
        }

        return allTags;
    },
    
    async getTagsByUserId(userId) {
        const tags = await db.userTag.findMany({ // Update from findAll to findMany
            where: { userId: userId } // Corrected to match the field in the schema
        });

        // Check if there are tags for the user
        if (tags.length === 0) {
            throw new Error('No hay etiquetas asignadas a este usuario.');
        }

        return tags;
    },

    async updateTag(tagId, updatedData) {
        if (!tagId) {
            throw new Error("El tagId no puede ser undefined.");
        }

        return await db.userTag.update({
            where: { id: tagId },
            data: updatedData,
        });
    },
}

module.exports = UserTagService;
