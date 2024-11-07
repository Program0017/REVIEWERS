const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const rewardService = {
    async createReward(data) {
        const { categoryId, ...restData } = data;

        return await db.reward.create({ 
            data: {
                ...restData,
                category:{
                    connect: { id: categoryId }
                }
            } 
        });
    },

    async updateReward(rewardId, updatedData) {
        if (!rewardId) {
            throw new Error("El rewardId no puede ser undefined.");
        }

        return await db.reward.update({
            where: { id: rewardId }, // Cambiado a "id"
            data: updatedData,
        });
    },

    async findRewardById(rewardId) {
        return await db.reward.findUnique({ where: { id: rewardId } }); // Cambiado a "id"
    },

    async getAllRewards(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return await db.reward.findMany({
            where: { isAvailable: true }, // Cambiado a "isAvailable"
            select: {
                id: true, // Cambiado a "id"
                pointsNeeded: true, // Cambiado a "pointsNeeded"
                description: true, // Cambiado a "description"
                isRedeemed: true, // Cambiado a "isRedeemed"
                creationDate: true,
                redeemedDate: true,
                expirationDate: true,
                category: true,
                isAvailable: true, // Cambiado a "isAvailable"
            },
            skip,
            take,
        });
    },

    async searchRewards(filters, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const { rewardId, category, isRedeemed, isAvailable } = filters;

        const conditions = [];

        if (rewardId) conditions.push({ id: parseInt(rewardId, 10) }); // Cambiado a "id"
        if (category) conditions.push({ category: { contains: category } }); 
        if (isRedeemed !== undefined) conditions.push({ isRedeemed: isRedeemed === 'true' }); // Cambiado a "isRedeemed"
        if (isAvailable !== undefined) conditions.push({ isAvailable: isAvailable === 'true' }); // Cambiado a "isAvailable"

        conditions.push({ isAvailable: true });

        return await db.reward.findMany({
            where: {
                AND: conditions,
            },
            select: {
                id: true, // Cambiado a "id"
                pointsNeeded: true, // Cambiado a "pointsNeeded"
                description: true, // Cambiado a "description"
                isRedeemed: true, // Cambiado a "isRedeemed"
                creationDate: true,
                redeemedDate: true,
                expirationDate: true,
                category: true,
                isAvailable: true, // Cambiado a "isAvailable"
            },
            skip,
            take,
        });
    },

    async expireRewards() {
        const now = new Date();

        const expiredRewards = await db.reward.findMany({
            where: {
                expirationDate: { lt: now }, // Cambiado a "expirationDate"
                isAvailable: true, // Cambiado a "isAvailable"
            }
        });

        if (expiredRewards.length > 0) {
            await db.reward.updateMany({
                where: {
                    id: {
                        in: expiredRewards.map(reward => reward.id), // Cambiado a "id"
                    }
                },
                data: {
                    isAvailable: false // Cambiado a "isAvailable"
                }
            });
        }

        return expiredRewards.length;
    },

    async claimReward(userId, rewardId) {
        try {
            const user = await db.user.findUnique({
                where: { id: userId }, // Cambiado a "id"
                include: { rewards: true }, // Cambiado a "rewards"
            });

            const reward = await db.reward.findUnique({
                where: { id: rewardId }, // Cambiado a "id"
            });

            if (!reward || !reward.isAvailable) { // Cambiado a "isAvailable"
                throw new Error('Recompensa no disponible o ya reclamada.');
            }

            if (user.points < reward.pointsNeeded) { // Cambiado a "pointsNeeded"
                throw new Error('No tienes suficientes puntos para reclamar esta recompensa.');
            }

            const updatedPoints = user.points - reward.pointsNeeded; // Cambiado a "pointsNeeded"
            await db.user.update({
                where: { id: userId }, // Cambiado a "id"
                data: { points: updatedPoints },
            });

            await db.reward.update({
                where: { id: rewardId }, // Cambiado a "id"
                data: {
                    isRedeemed: true, // Cambiado a "isRedeemed"
                    redeemedDate: new Date(),
                    users: {
                        connect: { id: userId } // Cambiado a "id"
                    }
                }
            });

            return {
                message: 'Recompensa reclamada exitosamente.',
            };
        } catch (error) {
            return {
                error: error.message,
            };
        }
    }
};

module.exports = rewardService;
