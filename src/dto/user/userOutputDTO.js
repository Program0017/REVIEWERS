class UserOutputDTO {
    constructor(user) {
        this.id = user.id; // Agregado para incluir el id
        this.username = user.username;
        this.email = user.email;
        this.bio = user.bio;
        this.profilePictureUrl = user.profilePictureUrl; // Consistencia en el nombre de las propiedades
        this.registrationDate = user.registrationDate; // Cambiado a camelCase
        this.updatedDate = user.updatedDate;
        this.lastLogin = user.lastLogin;
        this.isActive = user.isActive; // Cambiado a camelCase
        this.isReported = user.isReported; // Añadido para incluir la propiedad isReported
        this.points = user.points; // Añadido para incluir puntos
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
