import { Product } from "./product";

export abstract class Cargo {
    products: Product[];

    constructor(protected _id: number, protected _reference: string, protected _maxWeight: number, protected _maxNbrProduct: number, protected _totalAmount: number, protected _type: string, protected _leavingDate: string, protected _arrivedDate: string, protected _distance: number, protected _departurePoint: string, protected _arrivalPoint: string, protected _globalState: string, protected _progressionState: string, protected _image: string) {
        this.products = [];
    }

    public get id(): number{
        return this._id;
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

    public totalAmount(): number{
        return this._totalAmount;
    }

    public get distance(): number{
        return this._distance;
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
        return this._leavingDate;
    }

    public get arrivedDate(): string{
        return this._arrivedDate;
    }

    public get departurePoint(): string{
        return this._departurePoint;
    }

    public get arrivalPoint(): string{
        return this._arrivalPoint;
    }

    public get image(): string{
        return this._image;
    }
}

export class Air extends Cargo{
    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: string, arrivalPoint: string, globalState: string, progressionState: string, image: string){
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, globalState, progressionState, image);
    }
}

export class Maritime extends Cargo{
    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: string, arrivalPoint: string, globalState: string, progressionState: string, image: string){
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, globalState, progressionState, image);
    }
}

export class Road extends Cargo{
    constructor(id: number, reference: string, maxWeight: number, maxNbrProduct: number, totalAmount: number, type: string, leavingDate: string, arrivedDate: string, distance: number, departurePoint: string, arrivalPoint: string, globalState: string, progressionState: string, image: string){
        super(id, reference, maxWeight, maxNbrProduct, totalAmount, type, leavingDate, arrivedDate, distance, departurePoint, arrivalPoint, globalState, progressionState, image);
    }
}