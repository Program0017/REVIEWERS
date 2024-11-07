class RewardCategoryOutputDTO {
    constructor(rewardCategory) {
        this.id = rewardCategory.id;
        this.rewardId = rewardCategory.rewardId;
        this.category = rewardCategory.category;
        this.creationDate = rewardCategory.creationDate;
    }

    static format(rewardCategory) {
        if (Array.isArray(rewardCategory)) {
            return rewardCategory.map(rt => new RewardCategoryOutputDTO(rt));
        } else {
            return new RewardCategoryOutputDTO(rewardCategory);
        }
    }
}

module.exports = RewardCategoryOutputDTO;
