class BusinessUpdateDTO {
    constructor({ name, location, category, average_rating, contact_info, tags }) {
        this.name = name;
        this.location = location;
        this.category = category;
        this.average_rating = average_rating; // Optional if not updating
        this.contact_info = contact_info;
        this.tags = tags;
    }

    static fromRequestBody(body) {
        return new BusinessUpdateDTO({
            name: body.name,
            location: body.location,
            category: body.category,
            average_rating: body.average_rating,
            contact_info: body.contact_info,
            tags: body.tags
        });
    }
}

module.exports = BusinessUpdateDTO;
