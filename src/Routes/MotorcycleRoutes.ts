import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const MotorcycleRoutes = Router();

MotorcycleRoutes
  .post('/', (req, res, next) => new MotorcycleController(req, res, next).createMotorcycle())
  .get('/', (req, res, next) => new MotorcycleController(req, res, next).getAll())
  .get('/:id', (req, res, next) => new MotorcycleController(req, res, next).getById())
  .put('/:id', (req, res, next) => new MotorcycleController(req, res, next).editRegister());

export default MotorcycleRoutes;
