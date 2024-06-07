export class Cargo {
    constructor(_id, _reference, _maxWeight, _maxNbrProduct, _totalAmount, _type, _leavingDate, _arrivedDate, _distance, _departurePoint, _arrivalPoint, _globalState, _progressionState, _image) {
        this._id = _id;
        this._reference = _reference;
        this._maxWeight = _maxWeight;
        this._maxNbrProduct = _maxNbrProduct;
        this._totalAmount = _totalAmount;
        this._type = _type;
        this._leavingDate = _leavingDate;
        this._arrivedDate = _arrivedDate;
        this._distance = _distance;
        this._departurePoint = _departurePoint;
        this._arrivalPoint = _arrivalPoint;
        this._globalState = _globalState;
        this._progressionState = _progressionState;
        this._image = _image;
        this.products = [];
    }
    get id() {
        return this._id;
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
    totalAmount() {
        return this._totalAmount;
    }
    get distance() {
        return this._distance;
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
        return this._leavingDate;
    }
    get arrivedDate() {
        return this._arrivedDate;
    }
    get departurePoint() {
        return this._departurePoint;
    }
    get arrivalPoint() {
        return this._arrivalPoint;
    }
    get image() {
        return this._image;
    }
}
export class Air extends Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, globalState, progressionState, image) {
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, globalState, progressionState, image);
    }
}
export class Maritime extends Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, globalState, progressionState, image) {
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, globalState, progressionState, image);
    }
}
export class Road extends Cargo {
    constructor(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, globalState, progressionState, image) {
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, globalState, progressionState, image);
    }
}
