// dto/reviewInputDTO.js

class ReviewInputDTO {
    constructor({ user_id, business_id, rating, title, content, image_url, tags,  }) {
        this.user_id = user_id;
        this.business_id = business_id;
        this.rating = rating;
        this.title = title;
        this.content = content;
        this.image_url = image_url;
        this.tags = tags;
    }

    // Método estático para crear un DTO de entrada a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new ReviewInputDTO({
            user_id: body.user_id,
            business_id: body.business_id,
            rating: body.rating,
            title: body.title,
            content: body.content,
            image_url: body.image_url,
            tags: body.tags
        });
    }
}

module.exports = ReviewInputDTO;
