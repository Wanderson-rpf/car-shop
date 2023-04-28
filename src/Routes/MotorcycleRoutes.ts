import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const MotorcycleRoutes = Router();

MotorcycleRoutes
  .post('/', (req, res, next) => new MotorcycleController(req, res, next).createMotorcycle());

export default MotorcycleRoutes;