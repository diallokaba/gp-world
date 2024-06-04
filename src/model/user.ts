export abstract class User{
    constructor(protected id: number, protected firstname: string, protected lastname: string, protected email: string, protected telephone: string, protected type: string){
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