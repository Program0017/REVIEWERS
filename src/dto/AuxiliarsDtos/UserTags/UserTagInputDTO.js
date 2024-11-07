class UserTagInputDTO {
    constructor({ user_id, tag }) {
        this.user_id = user_id;
        this.tag = tag;
    }

    // Método estático para crear un DTO de entrada a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new UserTagInputDTO({
            user_id: body.user_id,
            tag: body.tag,
        });
    }
}

module.exports = UserTagInputDTO;
