class BusinessTagUpdateDTO {
    constructor({ tag }) {
        this.tag = tag;
    }

    static fromRequestBody(body) {
        return new BusinessTagUpdateDTO({
            tag: body.tag,
        });
    }
}

module.exports = BusinessTagUpdateDTO;
