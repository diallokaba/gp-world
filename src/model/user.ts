export abstract class User{
    constructor(public id: number, public firstname: string, public lastname: string, public email: string, public telephone: string, public type: string){
    }
}

export class Sender extends User{
    constructor(id: number, firstname: string, lastname: string, email: string, telephone: string, type: string){
        super(id, firstname, lastname, email, telephone, type);
    }
}

export class Receiver extends User{
    constructor(id: number, firstname: string, lastname: string, email: string, telephone: string, type: string){
        super(id, firstname, lastname, email, telephone, type);
    }
}

export class Manager extends User{
    constructor(id: number, firstname: string, lastname: string, email: string, telephone: string, type: string){
        super(id, firstname, lastname, email, telephone, type);
    }
}