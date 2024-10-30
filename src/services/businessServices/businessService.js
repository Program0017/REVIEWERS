const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const businessService = {
    async createBusiness(data) {
        return await db.business.create({
            data
        });
    },

    async updateBusiness(businessId, updatedData) {
        if (!businessId) {
            throw new Error("El businessId no puede ser undefined.");
        }

        return await db.business.update({
            where: { business_id: businessId },
            data: updatedData,
        });
    },

    async findBusinessById(businessId) {
        return await db.business.findUnique({
            where:
                { business_id: businessId }
        });
    },

    async getAllBusiness(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return await db.business.findMany({
            where: {
                itsActive: true
            },
            select: {
                business_id: true,
                name: true,
                location: true,
                category: true,
                average_rating: true,
                total_reviews: true,
                created_date: true,
                updated_date: true,
                tags: true,
                contact_info: true,
                itsActive: true,
                itsReported: true,
            },
            skip,
            take,
        });
    },

    async searchBusinesses (filters, page = 1, pageSize = 10){
        const skip = (page - 1) * pageSize;
        const take = pageSize;
    
        const { businessId, name, location, category, averageRating, tags } = filters;
    
        const conditions = [];
    
        if (businessId) conditions.push({ business_id: parseInt(businessId, 10) });
        if (name) conditions.push({ name: { contains: name } });
        if (location) conditions.push({ location: { contains: location } });
        if (category) conditions.push({ category: { contains: category } });
        if (averageRating) conditions.push({ average_rating: parseFloat(averageRating) });
        if (tags) conditions.push({ tags: { contains: tags } });
    
        conditions.push({ itsActive: true });
    
        return await db.business.findMany({
            where: {
                AND: conditions,
            },
            select: {
                business_id: true,
                name: true,
                location: true,
                category: true,
                average_rating: true,
                total_reviews: true,
                contact_info: true,
                tags: true,
                creation_date: true,
                updated_date: true,
                itsActive: true,
            },
            skip,
            take,
        });
    }
   
}
module.exports = businessService;
