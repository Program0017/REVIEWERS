class ActionPointOutputDTO {
    constructor(ActionPoint) {
        this.id = ActionPoint.id;
        this.action = ActionPoint.action;
        this.points = ActionPoint.points;
        this.creationDate = ActionPoint.creationDate;
    }

    static format(ActionPoint) {
        if (Array.isArray(ActionPoint)) {
            return ActionPoint.map(rt => new ActionPointOutputDTO(rt));
        } else {
            return new ActionPointOutputDTO(ActionPoint);
        }
    }
}

module.exports = ActionPointOutputDTO;
