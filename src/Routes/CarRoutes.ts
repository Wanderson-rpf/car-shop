import { Router } from 'express';
import CarController from '../Controllers/CarController';

const CarRoutes = Router();

CarRoutes
  .post('/', (req, res, next) => new CarController(req, res, next).createCar())
  .get('/', (req, res, next) => new CarController(req, res, next).getAll())
  .get('/:id', (req, res, next) => new CarController(req, res, next).getById())
  .put('/:id', (req, res, next) => new CarController(req, res, next).editRegisterCar())
  .delete('/:id', (req, res, next) => new CarController(req, res, next).remove());

export default CarRoutes;