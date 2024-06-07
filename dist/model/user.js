export class User {
    constructor(id, firstname, lastname, email, address, telephone, type) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.address = address;
        this.telephone = telephone;
        this.type = type;
    }
}
export class Sender extends User {
    constructor(id, firstname, lastname, email, address, telephone, type) {
        super(id, firstname, lastname, email, address, telephone, type);
    }
}
export class Receiver extends User {
    constructor(id, firstname, lastname, email, address, telephone, type) {
        super(id, firstname, lastname, email, address, telephone, type);
    }
}
export class Manager extends User {
    constructor(id, firstname, lastname, email, address, telephone, type) {
        super(id, firstname, lastname, email, address, telephone, type);
    }
}
