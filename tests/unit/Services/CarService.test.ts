import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import {
  getAllCarsOutput,
  getByIdCarOutput,
  newCarInput,
  newCarOutput,
} from '../../Mocks/CarService.mock';
import CarService from '../../../src/Services/CarService';

describe('Teste de rotas de Car.', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('1 - Teste criação de registro rota /cars POST', function () {
    it('1.1 - Criar registro de um novo carro no banco de dados com sucesso.', async function () {
      sinon.stub(Model, 'create').resolves(newCarOutput);

      const service = new CarService();
      const result = await service.createCar(newCarInput);

      expect(result).to.be.deep.equal(newCarOutput);
    });
  });

  describe('2 - Teste consultas de registro rota /cars e /cars/:id GET', function () {
    it(
      '2.1 - Consulta todos os registros de carros no banco de dados com sucesso.',
      async function () {
        sinon.stub(Model, 'find').resolves(getAllCarsOutput);

        const service = new CarService();
        const result = await service.getAll();

        expect(result).to.be.deep.equal(getAllCarsOutput);
      },
    );

    it(
      '2.2 - Consulta por ID os registros de carros no banco de dados com sucesso.',
      async function () {
        sinon.stub(Model, 'find').resolves([getByIdCarOutput]);

        const service = new CarService();
        const result = await service.getById('634852326b35b59438fbea2f');

        expect(result).to.be.deep.equal(getByIdCarOutput);
      },
    );
  });
});