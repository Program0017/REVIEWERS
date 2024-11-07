class RewardUpdateDTO {
    constructor({ pointsNeeded, description, expirationDate, category, isRedeemed }) {
        this.pointsNeeded = pointsNeeded;
        this.description = description;
        this.expirationDate = expirationDate;
        this.category = category;
        this.isRedeemed = isRedeemed;
    }

    // Método para crear una instancia del DTO a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new RewardUpdateDTO({
            pointsNeeded: body.pointsNeeded,
            description: body.description,
            expirationDate: body.expirationDate,
            category: body.category,
            isRedeemed: body.isRedeemed
        });
    }
}

module.exports = RewardUpdateDTO;
