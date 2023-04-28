import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import InvalidParam from '../Errors/InvalidParam';
import NotFound from '../Errors/NotFound';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';

const errorNotFound = 'Car not found';
const errorInvalidParam = 'Invalid mongo id';

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
    if (!isValidObjectId(id)) throw new InvalidParam(errorInvalidParam);
    const carODM = new CarsODM();
    const result = await carODM.getById(id);
    
    if (!result) throw new NotFound(errorNotFound);

    const resultCar = this.createCarDomain(result);
    return resultCar;
  }

  public async editRegisterCar(id: string, newValue: Partial<ICar>) {
    if (!isValidObjectId(id)) throw new InvalidParam(errorInvalidParam);
    const carODM = new CarsODM();
    const result = await carODM.getById(id);
    if (!result) throw new NotFound(errorNotFound);

    const resultUpdate = await carODM.edit(id, newValue);
    const newCar = this.createCarDomain(resultUpdate);
    return newCar;
  }

  public async remove(id: string) {
    if (!isValidObjectId(id)) throw new InvalidParam(errorInvalidParam);
    const carODM = new CarsODM();
    const result = await carODM.getById(id);
    if (!result) throw new NotFound(errorNotFound);
    await carODM.remove(id);
  }
}