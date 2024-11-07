const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const voteService = {
    async findVoteByUserAndReview(userId, reviewId) {
        try {
            return await db.vote.findFirst({
                where: {
                    userId: userId,    // Ahora se usa 'userId' en lugar de 'user_id'
                    reviewId: reviewId, // Ahora se usa 'reviewId' en lugar de 'review_id'
                },
            });
        } catch (error) {
            console.error('Error buscando el voto:', error);
            throw new Error('Error en la búsqueda del voto');
        }
    },

    async createVote({ userId, reviewId, isHelpful }) {
        try {
            return await db.vote.create({
                data: {
                    userId: userId,       // Ahora se usa 'userId'
                    isHelpful: isHelpful,
                    reviewId: reviewId     // Ahora se usa 'reviewId'
                }
            });
        } catch (error) {
            console.error('Error creando el voto:', error);
            throw new Error('Error al crear el voto');
        }
    },

    async updateVote(voteId, { isHelpful }) {
        try {
            return await db.vote.update({
                where: { id: voteId }, // Cambiado a 'id' para reflejar el esquema
                data: { isHelpful: isHelpful },
            });
        } catch (error) {
            console.error('Error actualizando el voto:', error);
            throw new Error('Error al actualizar el voto');
        }
    },

    async deleteVote(voteId) {
        try {
            return await db.vote.delete({
                where: { id: voteId }, // Cambiado a 'id' para reflejar el esquema
            });
        } catch (error) {
            console.error('Error eliminando el voto:', error);
            throw new Error('Error al eliminar el voto');
        }
    },
};

module.exports = voteService;
