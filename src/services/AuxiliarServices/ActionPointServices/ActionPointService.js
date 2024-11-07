const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const actionPointService = {
    async createActionPoint(data) {
        if (!data.action || typeof data.points !== 'number') {
            throw new Error("Los datos de acción y puntos son obligatorios y deben ser válidos.");
        }

        return await db.actionPoint.create({
            data
        });
    },

    async updateActionPoint(actionPointId, updatedData) {
        if (!actionPointId) {
            throw new Error("El actionPointId no puede ser undefined.");
        }

        return await db.actionPoint.update({
            where: { id: actionPointId },
            data: updatedData,
        });
    },

    async getAllActionPoints() {
        const allPoints = await db.actionPoint.findMany();

        if (allPoints.length === 0) {
            throw new Error('No hay ningún tipo de punto de recompensa.');
        }

        return allPoints;
    },

    async findActionPointByID(actionPointId) {
        if (!actionPointId) {
            throw new Error("El actionPointId no puede ser undefined.");
        }

        const actionPoint = await db.actionPoint.findUnique({
            where: { id: actionPointId }
        });

        if (!actionPoint) {
            throw new Error(`No se encontró el punto de acción con ID: ${actionPointId}`);
        }

        return actionPoint;
    },

    async findActionPointsByPoints(points) {
        if (typeof points !== 'number' || points < 0) {
            throw new Error("El valor de puntos debe ser un número válido.");
        }

        return await db.actionPoint.findMany({
            where: {
                points: points
            }
        });
    },
    async findByAction(action) {
        return await db.actionPoint.findUnique({
            where: {
                action: action
            }
        });
    }
};

module.exports = actionPointService;
