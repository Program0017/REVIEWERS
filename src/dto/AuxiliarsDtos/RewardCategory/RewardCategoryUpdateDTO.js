class RewardCategoryUpdateDTO {
    constructor({ category }) {
        this.category = category;
    }

    static fromRequestBody(body) {
        return new RewardCategoryUpdateDTO({
            category: body.category,
        });
    }
}

module.exports = RewardCategoryUpdateDTO;
