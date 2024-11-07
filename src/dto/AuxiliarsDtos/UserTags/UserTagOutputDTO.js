class UserTagOutputDTO {
    constructor(userTag) {
        this.id = userTag.id;
        this.user_id = userTag.user_id;
        this.tag = userTag.tag;
        this.creationDate = userTag.creationDate;
    }

    static format(userTag) {
        if (Array.isArray(userTag)) {
            return userTag.map(ut => new UserTagOutputDTO(ut));
        } else {
            return new UserTagOutputDTO(userTag);
        }
    }
}

module.exports = UserTagOutputDTO;
