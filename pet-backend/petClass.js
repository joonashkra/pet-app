module.exports = class Pet {
    constructor(id, ownerId, name, petType, status, dob) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.petType = petType;
        this.status = status;
        this.dob = dob;
    }

    getId() {
        return this.id;
    }

    getOwnerId() {
        return this.ownerId;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.petType;
    }

    getStatus() {
        return this.status;
    }

    getDob() {
        return this.dob;
    }
}