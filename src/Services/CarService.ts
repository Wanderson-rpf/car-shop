import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import InvalidParam from '../Errors/InvalidParam';
import NotFound from '../Errors/NotFound';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarsODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarsODM();
    const allCars = await carODM.getAll();
    const arrayAllCars = allCars.map((car) => this.createCarDomain(car));
    return arrayAllCars;
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) throw new InvalidParam('Invalid mongo id');
    const carODM = new CarsODM();
    const result = await carODM.getById(id);
    
    if (result.length === 0) throw new NotFound('Car not found');

    const [arrayAllCars] = result.map((car) => this.createCarDomain(car));
    return arrayAllCars;
  }

  public async editRegisterCar(id: string, newValue: Partial<ICar>) {
    if (!isValidObjectId(id)) throw new InvalidParam('Invalid mongo id');
    const carODM = new CarsODM();
    const result = await carODM.getById(id);
    if (result.length === 0) throw new NotFound('Car not found');

    const resultUpdate = await carODM.edit(id, newValue);
    const newCar = this.createCarDomain(resultUpdate);
    return newCar;
  }
}