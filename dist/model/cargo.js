export class Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, _leavingDate, _arrivedDate, distance, _departurePoint, _arrivalPoint) {
        this._id = id;
        this._reference = reference;
        this._maxWeight = maxWeight;
        this._maxNbrProduct = maxNbrProduct;
        this._totalAmount = totalAmount;
        this.leavingDate = _leavingDate;
        this.arrivedDate = _arrivedDate;
        this._type = type;
        this._distance = distance;
        this._globalState = "OPEN";
        this._progressionState = "PENDING",
            this.departurePoint = _departurePoint;
        this.arrivalPoint = _arrivalPoint;
        this.products = [];
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
}
export class Air extends Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint) {
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint);
    }
}
export class Maritime extends Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint) {
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint);
    }
}
export class Road extends Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint) {
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint);
    }
}
