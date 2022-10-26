import { Router } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const routerCar = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

routerCar.post('/cars', (req, res) => carController.create(req, res));
routerCar.get('/cars', (req, res) => carController.read(req, res));
routerCar.get('/cars/:id', (req, res) => carController.readOne(req, res));
routerCar.put('/cars/:id', (req, res) => carController.update(req, res));
routerCar.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default routerCar;
