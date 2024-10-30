class BusinessOutputDTO {
    constructor(business) {
        this.business_id = business.business_id;
        this.name = business.name;
        this.location = business.location;
        this.category = business.category;
        this.average_rating = business.average_rating;
        this.total_reviews = business.total_reviews;
        this.contact_info = business.contact_info;
        this.creation_date = business.creation_date;
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
