export default interface IValidateCar {
  validateIdCar(id: string): Promise<void>;
}