const { PrismaClient } = require('@prisma/client');
const messageService = require('../../services/userServices/messageService');
const db = new PrismaClient();

const userService = {
    // Create a new user
    async createUser(userData) {
        return await db.user.create({ data: userData });
    },

    // Update a user
    async updateUser(userId, updatedData) {
        if (!userId) {
            throw new Error(messageService.getErrorMessage('USER_ID_REQUIRED'));
        }
        return await db.user.update({
            where: { id: userId },
            data: updatedData,
        });
    },

    // Find a user by email
    async findUserByEmail(email) {
        return await db.user.findUnique({ where: { email } });
    },

    // Find a user by ID
    async findUserById(userId) {
        return await db.user.findUnique({ where: { id: userId } });
    },

    // Search users by 'username', 'email', or 'tags', with pagination
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
                isActive: true,  // Only active users
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
    
    // Get all users
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

        // Check if there are any registered users
        if (allUsers.length === 0) {
            throw new Error(messageService.getErrorMessage('USERS_NOT_FOUND'));
        }
        return allUsers;
    },

    // Deactivate a user (updating 'isActive' field to false)
    async deactivateUser(userId) {
        if (!userId) {
            throw new Error(messageService.getErrorMessage('USER_ID_REQUIRED'));
        }
        return await db.user.update({
            where: { id: userId },
            data: { isActive: false },  // Set 'isActive' to false
        });
    },


    // Add reward points
    async addActionPoint(userId, ActionPoints) {
        try {
            if (!userId) {
                throw new Error(messageService.getErrorMessage('USER_ID_REQUIRED'));
            }

            const user = await db.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new Error(messageService.getErrorMessage('USER_NOT_FOUND'));
            }

            const newTotalPoints = (user.points || 0) + ActionPoints;

            const updatedUser = await db.user.update({
                where: { id: userId },
                data: {
                    points: newTotalPoints,
                    updatedDate: new Date(),
                },
            });

            return updatedUser;
        } catch (error) {
            throw new Error(messageService.getErrorMessage('REWARD_UPDATE_FAILED'));
        }
    },

    // Remove one reward point
    async removeActionPoint(userId) {
        try {
            const user = await db.user.findUnique({ where: { id: userId } });

            if (!user) {
                throw new Error(messageService.getErrorMessage('USER_NOT_FOUND'));
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
            throw new Error(messageService.getErrorMessage('REWARD_UPDATE_FAILED'));
        }
    },

    // Add a referral (relationship between the referred user and the referrer)
    async addReferral(referrerId, referredUserId) {
        if (!referrerId || !referredUserId) {
            throw new Error(messageService.getErrorMessage('USER_ID_REQUIRED'));
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


    // Assign a tag to a user
    async assignTagToUser(userId, tagId) {
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                tags: {
                    connect: { id: tagId },
                },
            },
            include: {
                tags: true, // Include tags to verify the update
            },
        });
        return updatedUser;
    },
};

module.exports = userService;
