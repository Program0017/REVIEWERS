class ReviewOutputDTO {
    constructor(review) {
        this.review_id = review.review_id;
        this.business_id = review.business_id;
        this.rating = review.rating;
        this.title = review.title;
        this.content = review.content;
        this.image_url = review.image_url;
        this.creation_date = review.creation_date;
        this.updated_date = review.updated_date;
        this.helpful_votes = review.helpful_votes;
        this.tags = review.tags;
    }

    static format(review) {
        if (Array.isArray(review)) {
            return review.map(r => new ReviewOutputDTO(r));
        } else {
            return new ReviewOutputDTO(review);
        }
    }
}

module.exports = ReviewOutputDTO;
