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
            where: { id: userId },
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
                    { tags: { some: { tag: { contains: query } } } },
                ],
                isActive: true,  // Solo usuarios activos
            },
            select: {
                username: true,
                email: true,
                registrationDate: true,
                lastLogin: true,
                isActive: true,
            },
            skip,
            take,
        });
    },

    // Desactivar usuario (actualizando campo 'isActive' a falso)
    async deactivateUser(userId) {
        if (!userId) {
            throw new Error("El userId no puede ser undefined.");
        }
        return await db.user.update({
            where: { id: userId },
            data: { isActive: false },  // Actualizar campo 'isActive'
        });
    },

    // Buscar usuario por email
    async findUserByEmail(email) {
        return await db.user.findUnique({ where: { email } });
    },

    // Buscar usuario por ID
    async findUserById(userId) {
        return await db.user.findUnique({ where: { id: userId } });
    },

    // Obtener todos los usuarios
    async getAllUsers() {
        const allUsers = await db.user.findMany({
            select: {
                username: true,
                email: true,
                registrationDate: true,
                lastLogin: true,
                isActive: true,
            },
        });

        // Verificar si existen usuarios registrados
        if (allUsers.length === 0) {
            throw new Error('No hay usuarios registrados para notificar.');
        }

        return allUsers;
    },

    // Agregar puntos de recompensa
    async addActionPoint(userId, ActionPoints) {
        try {
            if (!userId) {
                throw new Error('UserId is required to add reward points.');
            }
    
            const user = await db.user.findUnique({
                where: { id: userId },  // Asegúrate de que `userId` está presente
            });
    
            if (!user) {
                throw new Error('User not found');
            }
    
            const newTotalPoints = (user.points || 0) + ActionPoints;  // Manejar si `points` es nulo
    
            const updatedUser = await db.user.update({
                where: { id: userId },
                data: {
                    points: newTotalPoints,
                    updatedDate: new Date(),
                },
            });
    
            return updatedUser;
        } catch (error) {
            console.error('Error updating the user points:', error);
            throw new Error('Failed to update user points');
        }
    },

    // Quitar un punto de recompensa
    async removeActionPoint(userId) {
        try {
            const user = await db.user.findUnique({ where: { id: userId } });

            if (!user) {
                throw new Error('User not found');
            }
            const newTotalPoints = user.points - 1;

            const updatedUser = await db.user.update({
                where: { id: userId },
                data: {
                    points: newTotalPoints,
                    updatedDate: new Date(),
                },
            });

            return updatedUser;
        } catch (error) {
            console.error('Error updating the user points:', error);
            throw new Error('Failed to update user points');
        }
    },

    // Agregar una referencia (relación entre usuario referido y el que refirió)
    async addReferral(referrerId, referredUserId) {
        if (!referrerId || !referredUserId) {
            throw new Error("Los IDs no pueden ser undefined.");
        }

        return await db.user.update({
            where: { id: referrerId },
            data: {
                referrals: {
                    connect: { id: referredUserId },
                },
            },
        });
    },

    async assignTagToUser(userId, tagId) {
          // Asignar el tag al usuario
          const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
              tags: {
                connect: { id: tagId }, // Conectar el tag con el usuario
              },
            },
            include: {
              tags: true, // Incluir los tags para verificar la actualización
            },
          });
          return updatedUser;
      },
};

module.exports = userService;
