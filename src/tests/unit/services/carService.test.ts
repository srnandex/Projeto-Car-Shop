import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { mockCars, mockCarsId } from '../../mocks/mockCars';

describe('car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(mockCarsId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(mockCarsId)
			.onCall(1).resolves(null);
		sinon.stub(carModel, 'update')
			.onCall(0).resolves(mockCarsId)
			.onCall(1).resolves(null)
			.onCall(2).resolves(mockCarsId);

	});

	after(() => {
		sinon.restore()
	});

	describe('Create car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(mockCars);

			expect(carCreated).to.be.deep.equal(mockCarsId);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('ReadOne car', () => {
		it('Success', async () => {
			const carCreated = await carService.readOne(mockCarsId._id);

			expect(carCreated).to.be.deep.equal(mockCarsId);
		});

		it('Failure', async () => {
			try {
				// a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
				await carService.readOne(mockCarsId._id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

});