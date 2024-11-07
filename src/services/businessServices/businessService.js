const { PrismaClient } = require('@prisma/client'); 
const db = new PrismaClient();

const businessService = {
    async createBusiness(data) {
        const { categoryId, ...restData } = data; 

        return await db.business.create({
            data: {
                ...restData,
                category: {
                    connect: { id: categoryId } // Conectamos el negocio a la categoría usando el ID
                }
            }
        });
    },

    async updateBusiness(businessId, updatedData) {
        if (!businessId) {
            throw new Error("El businessId no puede ser undefined.");
        }

        return await db.business.update({
            where: { id: businessId }, // Actualizado para reflejar el nuevo esquema
            data: updatedData,
        });
    },

    async findBusinessById(businessId) {
        return await db.business.findUnique({
            where: { id: businessId } // Actualizado para reflejar el nuevo esquema
        });
    },

    async getAllBusiness(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return await db.business.findMany({
            where: {
                isActive: true // Actualizado para reflejar el nuevo esquema
            },
            select: {
                id: true, // Actualizado para reflejar el nuevo esquema
                name: true,
                location: true,
                category: true,
                averageRating: true, // Actualizado para reflejar el nuevo esquema
                totalReviews: true, // Actualizado para reflejar el nuevo esquema
                creationDate: true, // Actualizado para reflejar el nuevo esquema
                updatedDate: true, // Actualizado para reflejar el nuevo esquema
                tags: true,
                contactInfo: true, // Actualizado para reflejar el nuevo esquema
                isActive: true,
                isReported: true, // Actualizado para reflejar el nuevo esquema
            },
            skip,
            take,
        });
    },

    async searchBusinesses(filters, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const { businessId, name, location, category, averageRating, tags } = filters;

        const conditions = [];

        if (businessId) conditions.push({ id: parseInt(businessId, 10) }); // Actualizado para reflejar el nuevo esquema
        if (name) conditions.push({ name: { contains: name } });
        if (location) conditions.push({ location: { contains: location } });
        if (category) conditions.push({ category: { contains: category } });
        if (averageRating) conditions.push({ averageRating: parseFloat(averageRating) }); // Actualizado para reflejar el nuevo esquema
        if (tags) conditions.push({ tags: { some: { tag: { contains: tags } } }}); // Ajustado para el modelo BusinessTag

        conditions.push({ isActive: true }); // Actualizado para reflejar el nuevo esquema

        return await db.business.findMany({
            where: {
                AND: conditions,
            },
            select: {
                id: true, // Actualizado para reflejar el nuevo esquema
                name: true,
                location: true,
                category: true,
                averageRating: true, // Actualizado para reflejar el nuevo esquema
                totalReviews: true, // Actualizado para reflejar el nuevo esquema
                contactInfo: true, // Actualizado para reflejar el nuevo esquema
                tags: true,
                creationDate: true, // Actualizado para reflejar el nuevo esquema
                updatedDate: true, // Actualizado para reflejar el nuevo esquema
                isActive: true,
            },
            skip,
            take,
        });
    },

    async assignTagToBusiness(businessId, tagId) {
        // Asignar el tag al usuario
        const updatedBusiness = await db.business.update({
          where: { id: businessId },
          data: {
            tags: {
              connect: { id: tagId }, // Conectar el tag con el usuario
            },
          },
          include: {
            tags: true, // Incluir los tags para verificar la actualización
          },
        });
        return updatedBusiness;
    },
};

module.exports = businessService;
