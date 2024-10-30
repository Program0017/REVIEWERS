class UserUpdateDTO {
    constructor({ username, email, bio, profile_picture_url, newPassword }) {
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.profile_picture_url = profile_picture_url || 'url_default_image.jpg'; // Valor por defecto
        this.newPassword = newPassword; // Si necesitas manejar la contraseña
    }

    static fromRequestBody(body) {
        return new UserUpdateDTO({
            username: body.username,
            email: body.email,
            bio: body.bio,
            profile_picture_url: body.profile_picture_url,
            newPassword: body.newPassword,
        });
    }
}

module.exports = UserUpdateDTO;
