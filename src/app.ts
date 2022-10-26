import express from 'express';
import errorHandler from './middlewares/error';
import routerCar from './routers/routerCar';

const app = express();
app.use(express.json());
app.use(routerCar);
app.use(errorHandler);

export default app;
