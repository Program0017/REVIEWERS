class ReviewUpdateDTO {
    constructor({ rating, title, content, image_url, tags }) {
        this.rating = rating;
        this.title = title;
        this.content = content;
        this.image_url = image_url;
        this.tags = tags;
    }

    static fromRequestBody(body) {
        return new ReviewUpdateDTO({
            rating: body.rating,
            title: body.title,
            content: body.content,
            image_url: body.image_url,
            tags: body.tags,
        });
    }
}

module.exports = ReviewUpdateDTO;
