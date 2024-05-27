import { Product } from "./product";

export abstract class Cargo {
    protected _id: number;
    protected _reference: string;
    protected _maxWeight: number;
    protected _maxNbrProduct: number;
    products: Product[];
    protected _totalAmount: number;
    protected _type: string;
    protected leavingDate: string;
    protected arrivedDate: string;
    protected _distance: number;
    protected _globalState: string;
    protected _progressionState: string;
    protected departurePoint: number;
    protected arrivalPoint: number;

    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, _leavingDate: string, _arrivedDate: string, distance: number, _departurePoint: number, _arrivalPoint: number) {
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

    public get reference(): string{
        return this._reference;
    }

    public get maxWeight(): number{
        return this._maxWeight;
    }

    public get maxNbrProduct(): number{
        return this._maxNbrProduct;
    }

    public get totalAmount(): number{
        return this._totalAmount;
    }

    public get distance(): number{
        return this._distance;
    }

    public get id(): number{
        return this._id;
    }

    public get type(): string{
        return this._type;
    }

    public get globalState(): string{
        return this._globalState;
    }

    public get progressionState(): string{
        return this._progressionState;
    }
}

export class Air extends Cargo{
    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: number, arrivalPoint: number){
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint);
    }
}

export class Maritime extends Cargo{
    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: number, arrivalPoint: number){
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint);
    }
}

export class Road extends Cargo{
    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: number, arrivalPoint: number){
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint);
    }
}