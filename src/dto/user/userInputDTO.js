
class UserInputDTO {
    constructor({ user_id, username, email, password, bio, profile_picture_url, tags }) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.profile_picture_url = profile_picture_url;
        this.tags = tags;
    }

    static fromRequestBody(body) {
        return new UserInputDTO({
            user_id: body.user_id,
            username: body.username,
            email: body.email,
            password: body.password,
            bio: body.bio,
            profile_picture_url: body.profile_picture_url,
            tags: body.tags
        });
    }
}

module.exports = UserInputDTO;
