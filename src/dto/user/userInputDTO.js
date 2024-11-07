class UserInputDTO {
    constructor({ id, username, email, passwordHash, bio, profilePictureUrl, referredById }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.bio = bio;
        this.profilePictureUrl = profilePictureUrl;
        this.referredById = referredById; // Cambiado a camelCase para seguir la convención
    }

    static fromRequestBody(body) {
        return new UserInputDTO({
            id: body.id,
            username: body.username,
            email: body.email,
            passwordHash: body.passwordHash,
            bio: body.bio,
            profilePictureUrl: body.profilePictureUrl,
            referredById: body.referredById // Mapeo del campo que llega en snake_case
        });
    }
}

module.exports = UserInputDTO;
