class BusinessCategoryUpdateDTO {
    constructor({ category }) {
        this.category = category;
    }

    static fromRequestBody(body) {
        return new BusinessCategoryUpdateDTO({
            category: body.category,
        });
    }
}

module.exports = BusinessCategoryUpdateDTO;
