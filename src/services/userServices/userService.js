const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const userService = {
    // Crear usuario
    async createUser(userData) {
        return await db.user.create({ data: userData });
    },

    // Actualizar usuario
    async updateUser(userId, updatedData) {
        if (!userId) {
            throw new Error("El userId no puede ser undefined.");
        }
        return await db.user.update({
            where: { user_id: userId },
            data: updatedData,
        });
    },

    // Buscar usuarios por 'username', 'email' o 'tags', con paginación
    async searchUsers(query, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return await db.user.findMany({
            where: {
                OR: [
                    { username: { contains: query } },
                    { email: { contains: query } },
                    { tags: { contains: query } },
                ],
                itsActive: true,  // Solo usuarios activos
            },
            select: {
                username: true,
                email: true,
                registration_date: true,
                last_login: true,
                itsActive: true,
            },
            skip,
            take,
        });
    },

    // Desactivar usuario (actualizando campo 'itsActive' a falso)
    async deactivateUser(userId) {
        if (!userId) {
            throw new Error("El userId no puede ser undefined.");
        }
        return await db.user.update({
            where: { user_id: userId },
            data: { itsActive: false },  // Actualizar campo 'itsActive'
        });
    },

    // Buscar usuario por email
    async findUserByEmail(email) {
        return await db.user.findUnique({ where: { email } });
    },

    // Buscar usuario por ID
    async findUserById(userId) {
        return await db.user.findUnique({ where: { user_id: userId } });
    },

    // Obtener todos los usuarios
    async getAllUsers() {
        return await db.user.findMany({
            select: {
                username: true,
                email: true,
                registration_date: true,
                last_login: true,
                itsActive: true,
            },
        });
    },
    async addRewardPoint(userId) {
        try {
            const user = await db.user.findUnique({ where: { user_id: userId } });

            if (!user) {
                throw new Error('User not found');
            }
            const newTotalPoints = user.points + 1;
            console.log(user.points);
            console.log(newTotalPoints);



            const updatedUser = await db.user.update({
                where: { user_id: userId },
                data: {
                    points: newTotalPoints,
                    updated_date: new Date(),

                },
            });

            return updatedUser;
        } catch (error) {
            console.error('Error updating the user points:', error);
            throw new Error('Failed to update user points');
        }
    },

    async removeRewardPoint(userId) {
        try {
            const user = await db.user.findUnique({ where: { user_id: userId } });

            if (!user) {
                throw new Error('User not found');
            }
            const newTotalPoints = user.points - 1;

            const updatedUser = await db.user.update({
                where: { user_id: userId },
                data: {
                    points: newTotalPoints,
                    updated_date: new Date(),

                },
            });

            return updatedUser;
        } catch (error) {
            console.error('Error updating the user points:', error);
            throw new Error('Failed to update user points');
        }
    }
}

module.exports = userService;
