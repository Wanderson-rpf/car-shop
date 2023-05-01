import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import InvalidParam from '../Errors/InvalidParam';
import NotFound from '../Errors/NotFound';

const errorNotFound = 'Motorcycle not found';
const errorInvalidParam = 'Invalid mongo id';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const allmotorcycles = await motorcycleODM.getAll();
    const arrayAllmotorcycles = allmotorcycles
      .map((motorcycle) => this.createMotorcycleDomain(motorcycle));
    return arrayAllmotorcycles;
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) throw new InvalidParam(errorInvalidParam);
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.getById(id);
    
    if (!result) throw new NotFound(errorNotFound);

    const resultMotorcycle = this.createMotorcycleDomain(result);
    return resultMotorcycle;
  }

  public async editRegister(id: string, newValue: Partial<IMotorcycle>) {
    if (!isValidObjectId(id)) throw new InvalidParam(errorInvalidParam);
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.getById(id);
    if (!result) throw new NotFound(errorNotFound);

    const resultUpdate = await motorcycleODM.edit(id, newValue);
    const newCar = this.createMotorcycleDomain(resultUpdate);
    return newCar;
  }

  public async remove(id: string) {
    if (!isValidObjectId(id)) throw new InvalidParam(errorInvalidParam);
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.getById(id);
    if (!result) throw new NotFound(errorNotFound);
    await motorcycleODM.remove(id);
    return { message: 'Motorcycle register deleted.' };
  }
}
