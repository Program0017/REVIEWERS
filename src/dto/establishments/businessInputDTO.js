class BusinessInputDTO {
    constructor({ business_id, name, location, category, average_rating, total_reviews, contact_info, tags }) {
        this.business_id = business_id;
        this.name = name;
        this.location = location;
        this.category = category;
        this.average_rating = average_rating || 0.00; // Default value
        this.total_reviews = total_reviews || 0; // Default value
        this.contact_info = contact_info;
        this.tags = tags;
    }

    static fromRequestBody(body) {
        return new BusinessInputDTO({
            business_id: body.business_id,
            name: body.name,
            location: body.location,
            category: body.category,
            average_rating: body.average_rating,
            total_reviews: body.total_reviews,
            contact_info: body.contact_info,
            tags: body.tags
        });
    }
}

module.exports = BusinessInputDTO;
