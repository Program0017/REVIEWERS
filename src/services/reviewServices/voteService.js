    const { PrismaClient } = require('@prisma/client');
    const db = new PrismaClient();

    const voteService = {
        async findVoteByUserAndReview(userId, reviewId) {
            try {
                return await db.vote.findFirst({
                    where: {
                        user_id: userId,
                        review_id: reviewId,  // Este debe ser un número entero
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
                        user_id: userId,       // Asigna el userId recibido
                        isHelpful: isHelpful,  // Asigna el valor de isHelpful
                        review_id: reviewId     // Asigna el reviewId recibido
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
                    where: { vote_id: voteId },
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
                    where: { vote_id: voteId },
                });
            } catch (error) {
                console.error('Error eliminando el voto:', error);
                throw new Error('Error al eliminar el voto');
            }
        },
    }
    module.exports = voteService;
