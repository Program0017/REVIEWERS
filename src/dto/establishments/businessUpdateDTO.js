class BusinessUpdateDTO {
    constructor({ name, location, category, contactInfo, tags }) {
        this.name = name;
        this.location = location;
        this.category = category;
        this.contactInfo = contactInfo;
        this.tags = tags;
    }

    static fromRequestBody(body) {
        return new BusinessUpdateDTO({
            name: body.name,
            location: body.location,
            category: body.category,
            contactInfo: body.contactInfo,
            tags: body.tags
        });
    }
}

module.exports = BusinessUpdateDTO;
