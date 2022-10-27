// Codigo da aula ao vivo Lectures/30.2
import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import {
	mockCars,
	mockCarsId,
} from '../../mocks/mockCars';


describe('Frame Model', () => {
	const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(mockCarsId);
		sinon.stub(Model, 'findOne').resolves(mockCarsId);
	});

	after(() => {
		sinon.restore();
	})

	describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(mockCars);
			expect(newCar).to.be.deep.equal(mockCarsId);
		});
	});

	describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(carFound).to.be.deep.equal(mockCarsId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

	
});
