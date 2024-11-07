class RewardInputDTO {
    constructor({ id, pointsNeeded, description, expirationDate, categoryId }) {
        this.id = id;
        this.pointsNeeded = pointsNeeded;
        this.description = description;
        this.expirationDate = expirationDate;
        this.categoryId = categoryId;
    }

    // Método para crear una instancia del DTO a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new RewardInputDTO({
            id: body.id,
            pointsNeeded: body.pointsNeeded,
            description: body.description,
            expirationDate: body.expirationDate,
            categoryId: body.categoryId
        });
    }
}

module.exports = RewardInputDTO;
