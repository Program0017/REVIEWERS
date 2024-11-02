class RewardInputDTO {
    constructor({ reward_id, points_needed, reward_description, expiration_date, type }) {
        this.reward_id = reward_id;
        this.points_needed = points_needed;
        this.reward_description = reward_description;
        this.expiration_date = expiration_date;
        this.type = type;
    }

    // Método para crear una instancia del DTO a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new RewardInputDTO({
            reward_id: body.reward_id,
            points_needed: body.points_needed,
            reward_description: body.reward_description,
            expiration_date: body.expiration_date,
            type: body.type
        });
    }
}

module.exports = RewardInputDTO;
