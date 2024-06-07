export class Product {
    constructor(id, code, weight, state, type, totalPrice, sender, receiver) {
        this.id = id;
        this.code = code;
        this.weight = weight;
        this.state = state;
        this.type = type;
        this.totalPrice = totalPrice;
        this.sender = sender;
        this.receiver = receiver;
    }
}
export class Chimical extends Product {
    constructor(id, code, weight, state, type, totalPrice, toxicity, sender, receiver) {
        super(id, code, weight, state, type, totalPrice, sender, receiver);
        this.toxicity = toxicity;
    }
}
export class Alimentary extends Product {
    constructor(id, code, weight, state, type, totalPrice, sender, receiver) {
        super(id, code, weight, state, type, totalPrice, sender, receiver);
    }
}
export class Material extends Product {
    constructor(id, code, weight, state, type, totalPrice, sender, receiver) {
        super(id, code, weight, state, type, totalPrice, sender, receiver);
    }
}
export class Fragile extends Material {
    constructor(id, code, weight, state, type, totalPrice, sender, receiver) {
        super(id, code, weight, state, type, totalPrice, sender, receiver);
    }
}
export class Unbreakable extends Material {
    constructor(id, code, weight, state, type, totalPrice, sender, receiver) {
        super(id, code, weight, state, type, totalPrice, sender, receiver);
    }
}
