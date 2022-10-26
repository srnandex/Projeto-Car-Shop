import { Router } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const routerCar = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

routerCar.post('/car', (req, res) => carController.create(req, res));
routerCar.get('/car', (req, res) => carController.read(req, res));
routerCar.get('/car/:id', (req, res) => carController.readOne(req, res));
routerCar.put('/car/:id', (req, res) => carController.update(req, res));
routerCar.delete('/car/:id', (req, res) => carController.delete(req, res));

export default routerCar;
