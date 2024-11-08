class UserOutputDTO {
    constructor(user) {
        this.id = user.id; // Agregado para incluir el id
        this.username = user.username;
        this.email = user.email;
        this.bio = user.bio;
        this.profilePictureUrl = user.profilePictureUrl;
        this.isActive = user.isActive; // Estado activo
        this.isReported = user.isReported; // Estado reportado
        this.points = user.points; // Puntos del usuario
        this.referredById = user.referredById; // ID del usuario que refirió (si existe)
        this.tags = user.tags ? user.tags.map(tag => tag.tag) : []; // Etiquetas asociadas al usuario
    }

    // Formatear para una lista de usuarios o un solo usuario
    static format(user) {
        if (Array.isArray(user)) {
            // Si es un array de usuarios, formatear cada uno con el constructor
            return user.map(u => new UserOutputDTO(u));
        } else {
            // Si es un solo usuario, formatearlo directamente
            return new UserOutputDTO(user);
        }
    }
}
module.exports = UserOutputDTO;
