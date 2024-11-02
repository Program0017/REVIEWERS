const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const validateUniqueEmail = async (email) => {
    const existingEmail = await db.user.findUnique({
        where: { email }
    });
    return existingEmail !== null; 
};

const validateUniqueUsername = async (username) => {
    const existingUser = await db.user.findUnique({
        where: { username }
    });
    return existingUser !== null; 
};



module.exports = {
    validateUniqueEmail,
    validateUniqueUsername
};
