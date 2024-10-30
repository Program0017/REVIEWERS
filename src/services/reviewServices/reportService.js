const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();


const reportService = {
    async createReport({ userId, reviewId, reason }) {
        try {
            // Crear el nuevo reporte en la base de datos
            return await db.report.create({
                data: {
                    userId: userId,        
                    reviewId: reviewId,    
                    reason: reason,        
                    reportDate: new Date(), 
                },
            });
        } catch (error) {
            console.error('Error creando el reporte:', error);
            throw new Error('Error al crear el reporte');
        }
    },
    async findReportById(reportId) {
        return await db.report.findUnique({
            where:
                { id: reportId }
        });
    },
    async updateReport(reportId, updatedData) {
        if (!reportId) {
            throw new Error("El reportId no puede ser undefined.");
        }

        return await db.report.update({
            where: { id: reportId },
            data: updatedData,
        });
    },
};

module.exports = reportService;