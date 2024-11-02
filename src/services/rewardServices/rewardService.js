const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const rewardService = {
    async createReward(rewardData) {
        return await db.reward.create({ data: rewardData });
    },

    async updateReward(rewardId, updatedData) {
        if (!rewardId) {
            throw new Error("El rewardId no puede ser undefined.");
        }

        return await db.reward.update({
            where: { reward_id: rewardId },
            data: updatedData,
        });
    },

    // Buscar usuario por ID
    async findRewardById(rewardId) {
        return await db.reward.findUnique({ where: { reward_id: rewardId } });
    },
    async getAllRewards(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return await db.reward.findMany({
            where: {
                itsAvailable: true
            },
            select: {
                reward_id: true,
                points_needed: true,
                reward_description: true,
                is_redeemed: true,
                creation_date: true,
                redeemed_date: true,
                expiration_date: true,
                type: true,
                itsAvailable: true,
            },
            skip,
            take,
        });
    },

    async searchRewards(filters, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const { rewardId, type, isRedeemed, itsAvailable } = filters;

        const conditions = [];

        if (rewardId) conditions.push({ reward_id: parseInt(rewardId, 10) });
        if (type) conditions.push({ type: { contains: type } }); // Asumiendo que deseas hacer una búsqueda de texto
        if (isRedeemed !== undefined) conditions.push({ is_redeemed: isRedeemed === 'true' }); // Convertir a booleano
        if (itsAvailable !== undefined) conditions.push({ itsAvailable: itsAvailable === 'true' }); // Convertir a booleano

        conditions.push({ itsAvailable: true });

        return await db.reward.findMany({
            where: {
                AND: conditions,
            },
            select: {
                reward_id: true,
                points_needed: true,
                reward_description: true,
                is_redeemed: true,
                creation_date: true,
                redeemed_date: true,
                expiration_date: true,
                type: true,
                itsAvailable: true,
            },
            skip,
            take,
        });
    },
    async expireRewards() {
        const now = new Date();

        const expiredRewards = await db.reward.findMany({
            where: {
                expiration_date: { lt: now },
                itsAvailable: true,
            }
        });

        if (expiredRewards.length > 0) {
            await db.reward.updateMany({
                where: {
                    reward_id: {
                        in: expiredRewards.map(reward => reward.reward_id)
                    }
                },
                data: {
                    itsAvailable: false
                }
            });
        }

        return expiredRewards.length;
    },

    async claimReward(userId, rewardId) {
        try {
            const user = await db.user.findUnique({
                where: { user_id: userId },
                include: { Reward: true },
            });

            const reward = await db.reward.findUnique({
                where: { reward_id: rewardId },
            });

            if (!reward || !reward.itsAvailable) {
                throw new Error('Recompensa no disponible o ya reclamada.');
            }

            if (user.points < reward.points_needed) {
                throw new Error('No tienes suficientes puntos para reclamar esta recompensa.');
            }

            const updatedPoints = user.points - reward.points_needed;
            await db.user.update({
                where: { user_id: userId },
                data: { points: updatedPoints },
            });

            await db.reward.update({
                where: { reward_id: rewardId },
                data: {
                    is_redeemed: true,
                    redeemed_date: new Date(),
                    users: {
                        connect: { user_id: userId }
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