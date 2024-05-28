import { Product } from "./product";

export abstract class Cargo {
    protected _id: number;
    protected _reference: string;
    protected _maxWeight: number;
    protected _maxNbrProduct: number;
    products: Product[];
    protected _totalAmount: number;
    protected _type: string;
    protected _leavingDate: string;
    protected _arrivedDate: string;
    protected _distance: number;
    protected _globalState: string;
    protected _progressionState: string;
    protected _departurePoint: number;
    protected _arrivalPoint: number;
    protected _image: string;

    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: number, arrivalPoint: number, image: string) {
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

    public get leavingDate(): string{
        return this._globalState;
    }

    public get arrivedDate(): string{
        return this._progressionState;
    }

    public get departurePoint(): string{
        return this._globalState;
    }

    public get arrivalPoint(): string{
        return this._progressionState;
    }

    public get image(): string{
        return this._image;
    }
}

export class Air extends Cargo{
    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: number, arrivalPoint: number, image: string){
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image);
    }
}

export class Maritime extends Cargo{
    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: number, arrivalPoint: number, image: string){
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image);
    }
}

export class Road extends Cargo{
    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: number, arrivalPoint: number, image: string){
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, image);
    }
}