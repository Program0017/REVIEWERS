class ActionPointInputDTO {
    constructor({ id, action,points }) {
        this.id = id;
        this.action = action;
        this.points = points;
    }

    // Método estático para crear un DTO de entrada a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new ActionPointInputDTO({
            id: body.id,
            action: body.action,
            points: body.points,


        });
    }
}

module.exports = ActionPointInputDTO;
