class RewardOutputDTO {
    constructor(reward) {
        this.id = reward.id;
        this.pointsNeeded = reward.pointsNeeded;
        this.description = reward.description;
        this.isRedeemed = reward.isRedeemed;
        this.creationDate = reward.creationDate;
        this.redeemed_date = reward.redeemed_date;
        this.redeemedDate = reward.redeemedDate;
        this.category = reward.category;
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
