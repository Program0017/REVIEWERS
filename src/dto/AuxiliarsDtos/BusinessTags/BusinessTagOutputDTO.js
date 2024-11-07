class BusinessTagOutputDTO {
    constructor(businessTag) {
        this.id = businessTag.id;
        this.id = businessTag.id;
        this.tag = businessTag.tag;
        this.creationDate = businessTag.creationDate;
    }

    static format(businessTag) {
        if (Array.isArray(businessTag)) {
            return businessTag.map(bt => new BusinessTagOutputDTO(bt));
        } else {
            return new BusinessTagOutputDTO(businessTag);
        }
    }
}

module.exports = BusinessTagOutputDTO;
