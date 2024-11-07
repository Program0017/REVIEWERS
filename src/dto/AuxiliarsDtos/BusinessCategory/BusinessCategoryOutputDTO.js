class BusinessCategoryOutputDTO {
    constructor(businessCategory) {
        this.id = businessCategory.id;
        this.id = businessCategory.id;
        this.category = businessCategory.category;
        this.creationDate = businessCategory.creationDate;
    }

    static format(businessCategory) {
        if (Array.isArray(businessCategory)) {
            return businessCategory.map(bt => new BusinessCategoryOutputDTO(bt));
        } else {
            return new BusinessCategoryOutputDTO(businessCategory);
        }
    }
}

module.exports = BusinessCategoryOutputDTO;
