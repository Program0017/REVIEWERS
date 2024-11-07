class BusinessTagInputDTO {
    constructor({ id, tag }) {
        this.id = id;
        this.tag = tag;
    }

    static fromRequestBody(body) {
        return new BusinessTagInputDTO({
            id: body.id,
            tag: body.tag,
        });
    }
}

module.exports = BusinessTagInputDTO;
