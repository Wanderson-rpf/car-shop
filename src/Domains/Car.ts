import ICar from '../Interfaces/ICar';

export default class Car {
  private _id: string | undefined;
  private _model: string;
  private _year: number;
  private _color: string;
  private _status: boolean;
  private _buyValue: number;
  private _doorsQty: number;
  private _seatsQty: number;

  constructor({
    id,
    model,
    year,
    color,
    status = false,
    buyValue,
    doorsQty,
    seatsQty,
  }: ICar) {
    this._id = id;
    this._model = model;
    this._year = year;
    this._color = color;
    this._status = status;
    this._buyValue = buyValue;
    this._doorsQty = doorsQty;
    this._seatsQty = seatsQty;
  }

  public get model(): string {
    return this._model;
  }
  public set model(value: string) {
    this._model = value;
  }

  public get year(): number {
    return this._year;
  }
  public set year(value: number) {
    this._year = value;
  }

  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value;
  }

  public get status(): boolean {
    return this._status;
  }
  public set status(value: boolean) {
    this._status = value;
  }

  public get buyValue(): number {
    return this._buyValue;
  }
  public set buyValue(value: number) {
    this._buyValue = value;
  }

  public get doorsQty(): number {
    return this._doorsQty;
  }
  public set doorsQty(value: number) {
    this._doorsQty = value;
  }

  public get seatsQty(): number {
    return this._seatsQty;
  }
  public set seatsQty(value: number) {
    this._seatsQty = value;
  }
}