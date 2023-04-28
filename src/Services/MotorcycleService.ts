import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import InvalidParam from '../Errors/InvalidParam';
import NotFound from '../Errors/NotFound';

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
    if (!isValidObjectId(id)) throw new InvalidParam('Invalid mongo id');
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.getById(id);
    
    if (result.length === 0) throw new NotFound('Motorcycle not found');

    const [arrayAllmotorcycles] = result
      .map((motorcycle) => this.createMotorcycleDomain(motorcycle));
    return arrayAllmotorcycles;
  }
}