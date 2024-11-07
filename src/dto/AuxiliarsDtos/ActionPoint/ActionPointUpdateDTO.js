class ActionPointUpdateDTO {
    constructor({ action,points,  }) {
        this.action = action;
        this.points = points;
    }

    static fromRequestBody(body) {
        return new ActionPointUpdateDTO({
            action: body.action,
            points: body.points,
        });
    }
}

module.exports = ActionPointUpdateDTO;
