class BusinessOutputDTO {
    constructor(business) {
        this.id = business.id;
        this.name = business.name;
        this.location = business.location;
        this.category = business.category;
        this.averageRating = business.averageRating;
        this.totalReviews = business.totalReviews;
        this.contactInfo = business.contactInfo;
        this.creationDate = business.creationDate;
        this.tags = business.tags;
    }

    static format(business) {
        if (Array.isArray(business)) {
            return business.map(b => new BusinessOutputDTO(b));
        } else {
            return new BusinessOutputDTO(business);
        }
    }
}

module.exports = BusinessOutputDTO;
