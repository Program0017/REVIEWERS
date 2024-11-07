class ReviewOutputDTO {
    constructor(review) {
        this.review_id = review.review_id;
        this.id = review.id;
        this.rating = review.rating;
        this.title = review.title;
        this.content = review.content;
        this.imageUrl = review.imageUrl;
        this.creationDate = review.creationDate;
        this.updatedDate = review.updatedDate;
        this.helpfulVotes = review.helpfulVotes;
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
