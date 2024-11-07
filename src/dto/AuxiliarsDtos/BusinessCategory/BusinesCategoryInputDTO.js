class BusinessCategoryInputDTO {
    constructor({ id, category }) {
        this.id = id;
        this.category = category;
    }

    // Método estático para crear un DTO de entrada a partir del cuerpo de la solicitud
    static fromRequestBody(body) {
        return new BusinessCategoryInputDTO({
            id: body.id,
            category: body.category,
        });
    }
}

module.exports = BusinessCategoryInputDTO;
