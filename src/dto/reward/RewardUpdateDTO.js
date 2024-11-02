class RewardUpdateDTO {
    constructor({ points_needed, reward_description, expiration_date, type, is_redeemed }) {
        this.points_needed = points_needed;
        this.reward_description = reward_description;
        this.expiration_date = expiration_date;
        this.type = type;
        this.is_redeemed = is_redeemed;
    }

    // Método para crear una instancia del DTO a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new RewardUpdateDTO({
            points_needed: body.points_needed,
            reward_description: body.reward_description,
            expiration_date: body.expiration_date,
            type: body.type,
            is_redeemed: body.is_redeemed
        });
    }
}

module.exports = RewardUpdateDTO;
