class RewardCategoryInputDTO {
    constructor({ rewardId, category }) {
        this.rewardId = rewardId;
        this.category = category;
    }

    // Método estático para crear un DTO de entrada a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new RewardCategoryInputDTO({
            rewardId: body.rewardId,
            category: body.category,
        });
    }
}

module.exports = RewardCategoryInputDTO;
