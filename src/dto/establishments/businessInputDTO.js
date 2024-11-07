class BusinessInputDTO {
    constructor({ id, name, location, categoryId , averageRating, totalReviews, contactInfo, tags }) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.categoryId  = categoryId ;
        this.averageRating = averageRating || 0.00; // Default value
        this.totalReviews = totalReviews || 0; // Default value
        this.contactInfo = contactInfo;
        this.tags = tags;
    }

    static fromRequestBody(body) {
        return new BusinessInputDTO({
            id: body.id,
            name: body.name,
            location: body.location,
            categoryId : body.categoryId ,
            averageRating: body.averageRating,
            totalReviews: body.totalReviews,
            contactInfo: body.contactInfo,
            tags: body.tags
        });
    }
}

module.exports = BusinessInputDTO;
