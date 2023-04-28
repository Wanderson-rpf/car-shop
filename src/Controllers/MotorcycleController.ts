import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private _service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._service = new MotorcycleService();
  }

  public async createMotorcycle() {
    const motorcycle: IMotorcycle = {
      model: this._req.body.model,
      year: this._req.body.year,
      color: this._req.body.color,
      status: this._req.body.status,
      buyValue: this._req.body.buyValue,
      category: this._req.body.category,
      engineCapacity: this._req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this._service.createMotorcycle(motorcycle);
      return this._res.status(201).json(newMotorcycle);
    } catch (error) {
      this._next(error);
    }
  }

  public async getAll() {
    try {
      const allmotorcycles = await this._service.getAll();
      this._res.status(200).json(allmotorcycles);
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
}