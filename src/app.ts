import express from 'express';
import CarRoutes from './Routes/CarRoutes';
import errorMiddleware from './Middleware/error-middleware';
import MotorcycleRoutes from './Routes/MotorcycleRoutes';

const app = express();
app.use(express.json());
app.use('/cars', CarRoutes);
app.use('/motorcycles', MotorcycleRoutes);
app.use(errorMiddleware);

export default app;
