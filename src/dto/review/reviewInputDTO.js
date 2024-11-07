// dto/reviewInputDTO.js

class ReviewInputDTO {
    constructor({ userId, businessId, rating, title, content, imageUrl, tags,  }) {
        this.userId = userId;
        this.businessId = businessId;
        this.rating = rating;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.tags = tags;
    }

    // Método estático para crear un DTO de entrada a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new ReviewInputDTO({
            userId: body.userId,
            businessId: body.businessId,
            rating: body.rating,
            title: body.title,
            content: body.content,
            imageUrl: body.imageUrl,
            tags: body.tags
        });
    }
}

module.exports = ReviewInputDTO;
