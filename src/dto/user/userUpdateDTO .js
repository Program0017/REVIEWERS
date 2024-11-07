class UserUpdateDTO {
    constructor({ username, email, bio, profilePictureUrl, newPassword, tags }) {
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.profilePictureUrl = profilePictureUrl || 'url_default_image.jpg'; // Valor por defecto
        this.newPassword = newPassword; // Si necesitas manejar la contraseña

    }

    static fromRequestBody(body) {
        return new UserUpdateDTO({
            username: body.username,
            email: body.email,
            bio: body.bio,
            profilePictureUrl: body.profile_picture_url,
            newPassword: body.newPassword,

        });
    }
}

module.exports = UserUpdateDTO;
