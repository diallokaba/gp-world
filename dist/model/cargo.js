export class Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image) {
        this._id = id;
        this._reference = reference;
        this._maxWeight = maxWeight;
        this._maxNbrProduct = maxNbrProduct;
        this._totalAmount = totalAmount;
        this._leavingDate = leavingDate;
        this._arrivedDate = arrivedDate;
        this._type = type;
        this._distance = distance;
        this._globalState = "OPEN";
        this._progressionState = "PENDING",
            this._departurePoint = departurePoint;
        this._arrivalPoint = arrivalPoint;
        this.products = [];
        this._image = image;
    }
    get reference() {
        return this._reference;
    }
    get maxWeight() {
        return this._maxWeight;
    }
    get maxNbrProduct() {
        return this._maxNbrProduct;
    }
    get totalAmount() {
        return this._totalAmount;
    }
    get distance() {
        return this._distance;
    }
    get id() {
        return this._id;
    }
    get type() {
        return this._type;
    }
    get globalState() {
        return this._globalState;
    }
    get progressionState() {
        return this._progressionState;
    }
    get leavingDate() {
        return this._globalState;
    }
    get arrivedDate() {
        return this._progressionState;
    }
    get departurePoint() {
        return this._globalState;
    }
    get arrivalPoint() {
        return this._progressionState;
    }
    get image() {
        return this._image;
    }
}
export class Air extends Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image) {
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image);
    }
}
export class Maritime extends Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image) {
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image);
    }
}
export class Road extends Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image) {
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image);
    }
}
