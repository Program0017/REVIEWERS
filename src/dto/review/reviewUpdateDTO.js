class ReviewUpdateDTO {
    constructor({ rating, title, content, imageUrl, tags }) {
        this.rating = rating;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.tags = tags;
    }

    static fromRequestBody(body) {
        return new ReviewUpdateDTO({
            rating: body.rating,
            title: body.title,
            content: body.content,
            imageUrl: body.imageUrl,
            tags: body.tags,
        });
    }
}

module.exports = ReviewUpdateDTO;
