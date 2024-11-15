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

    async findUserWithRolesAndPermissions(userId) {
        try {
            const user = await db.user.findUnique({
                where: { id: userId },
                iinclude: {
                    roles: {
                        include: {
                            permissions: true,
                        },
                    },
                },
            });

            if (!user) {
                throw new Error(messageService.getErrorMessage('USER_NOT_FOUND'));
            }

            return user;
        } catch (error) {
            console.error('Error fetching user with roles and permissions:', error);
            throw new Error(messageService.getErrorMessage('USER_FETCH_FAILED'));
        }
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
        try {
            // Check if referrerId and referredUserId are provided
            if (!referrerId) {
                throw new Error(messageService.getErrorMessage('REFERRER_ID_REQUIRED'));
            }
            if (!referredUserId) {
                throw new Error(messageService.getErrorMessage('REFERRED_USER_ID_REQUIRED'));
            }

            // Check if the referrer exists
            const referrerExists = await db.user.findUnique({
                where: { id: referrerId },
            });
            if (!referrerExists) {
                throw new Error(messageService.getErrorMessage('REFERRER_NOT_FOUND'));
            }

            // Check if the referred user exists
            const referredUserExists = await db.user.findUnique({
                where: { id: referredUserId },
            });
            if (!referredUserExists) {
                throw new Error(messageService.getErrorMessage('REFERRED_USER_NOT_FOUND'));
            }

            // Proceed with connecting the referral
            const updatedReferrer = await db.user.update({
                where: { id: referrerId },
                data: {
                    referrals: {
                        connect: { id: referredUserId },
                    },
                },
            });

            return updatedReferrer;
        } catch (error) {
            // Log the error and throw it to the calling function
            console.error('Error adding referral:', error.message);
            throw new Error(error.message);
        }
    },



    // Assign a tag to a user
    async assignTagToUser(userId, tagId) {
        try {
            // Check if userId and tagId are provided
            if (!userId) {
                throw new Error(messageService.getErrorMessage('USER_ID_REQUIRED'));
            }
            if (!tagId) {
                throw new Error(messageService.getErrorMessage('TAG_ID_REQUIRED'));
            }

            // Check if the user exists
            const userExists = await db.user.findUnique({
                where: { id: userId },
            });
            if (!userExists) {
                throw new Error(messageService.getErrorMessage('USER_NOT_FOUND'));
            }

            // Check if the tag exists
            const tagExists = await db.userTag.findUnique({
                where: { id: tagId },
            });
            if (!tagExists) {
                throw new Error(messageService.getErrorMessage('TAG_NOT_FOUND'));
            }

            // Proceed with assigning the tag if both user and tag exist
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
        } catch (error) {
            // Log the error and throw it to the calling function
            console.error('Error assigning tag to user:', error.message);
            throw new Error(error.message);
        }
    },
};

module.exports = userService;
