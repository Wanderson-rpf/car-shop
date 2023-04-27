import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

export default class CarController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private _service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._service = new CarService();
  }

  public async createCar() {
    const car: ICar = {
      model: this._req.body.model,
      year: this._req.body.year,
      color: this._req.body.color,
      status: this._req.body.status,
      buyValue: this._req.body.buyValue,
      doorsQty: this._req.body.doorsQty,
      seatsQty: this._req.body.seatsQty,
    };

    try {
      const newCar = await this._service.createCar(car);
      return this._res.status(201).json(newCar);
    } catch (error) {
      this._next(error);
    }
  }

  public async getAll() {
    try {
      const allCars = await this._service.getAll();
      this._res.status(200).json(allCars);
    } catch (error) {
      this._next(error);
    }
  }

  public async getById() {
    try {
      const { id } = this._req.params;
      const result = await this._service.getById(id);
      return this._res.status(200).json(result);
    } catch (error) {
      this._next(error);
    }
  }

  public async editRegisterCar() {
    try {
      const { id } = this._req.params;
      const newCar: ICar = { ...this._req.body };
      
      const resultUpdate = await this._service.editRegisterCar(id, newCar);
    
      return this._res.status(200).json(resultUpdate);
    } catch (error) {
      this._next(error);
    }
  }
}