class UserOutputDTO {
    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.bio = user.bio;
        this.profile_picture_url = user.profile_picture_url;
        this.registration_date = user.registration_date;
        this.updated_date = user.updated_date;
        this.last_login = user.last_login;
        this.itsActive = user.itsActive;
    }

    static format(user) {
        if (Array.isArray(user)) {
            return user.map(u => new UserOutputDTO(u));
        } else {
            return new UserOutputDTO(user);
        }
    }
}

module.exports = UserOutputDTO;
