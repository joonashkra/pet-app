module.exports = class Visit {
    constructor(id, petId, date, comment) {
        this.id = id;
        this.petId = petId;
        this.date = date;
        this.comment = comment;
    }

    getId() {
        return this.id;
    }

    getPetId() {
        return this.petId;
    }

    getDate() {
        return this.date;
    }

    getComment() {
        return this.comment;
    }
}