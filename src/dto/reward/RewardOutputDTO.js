class RewardOutputDTO {
    constructor(reward) {
        this.reward_id = reward.reward_id;
        this.points_needed = reward.points_needed;
        this.reward_description = reward.reward_description;
        this.is_redeemed = reward.is_redeemed;
        this.creation_date = reward.creation_date;
        this.redeemed_date = reward.redeemed_date;
        this.expiration_date = reward.expiration_date;
        this.type = reward.type;
    }

    // Método para formatear uno o más objetos reward
    static format(reward) {
        if (Array.isArray(reward)) {
            return reward.map(r => new RewardOutputDTO(r));
        } else {
            return new RewardOutputDTO(reward);
        }
    }
}

module.exports = RewardOutputDTO;
