import { User } from "./user";

export abstract class Product{
    
    constructor(protected id: number, protected code: string, protected weight: number, protected state: string, protected type: string, protected totalPrice: number, protected sender: User, protected receiver: User){
    }
}

export class Chimical extends Product{
    constructor(id: number, code: string, weight: number, state: string, type: string, totalPrice: number, private toxicity: number, sender: User, receiver: User){
        super(id, code, weight, state, type, totalPrice, sender, receiver);
    }
}

export class Alimentary extends Product{
    constructor(id: number, code: string, weight: number, state: string, type: string, totalPrice: number, sender: User, receiver: User){
        super(id, code, weight, state, type, totalPrice, sender, receiver);
    }
}

export abstract class Material extends Product{
    constructor(id: number, code: string, weight: number, state: string, type: string, totalPrice: number, sender: User, receiver: User){
        super(id, code, weight, state, type, totalPrice, sender, receiver);
    }
}

export class Fragile extends Material{
    constructor(id: number, code: string, weight: number, state: string, type: string, totalPrice: number, sender: User, receiver: User){
        super(id, code, weight, state, type, totalPrice, sender, receiver);
    }
}

export class Unbreakable extends Material{
    constructor(id: number, code: string, weight: number, state: string, type: string, totalPrice: number, sender: User, receiver: User){
        super(id, code, weight, state, type, totalPrice, sender, receiver);
    }
}