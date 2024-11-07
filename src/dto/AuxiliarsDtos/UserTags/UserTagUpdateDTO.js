class UserTagUpdateDTO {
    constructor({ tag }) {
        this.tag = tag;
    }

    static fromRequestBody(body) {
        return new UserTagUpdateDTO({
            tag: body.tag,
        });
    }
}

module.exports = UserTagUpdateDTO;
