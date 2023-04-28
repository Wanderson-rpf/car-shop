import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import {
  dataCarForEditing,
  getAllCarsOutput,
  getByIdCarOutput,
  newCarInput,
  newCarOutput,
  newDataCar,
  resultEditDataCar,
} from '../../Mocks/CarService.mock';
import CarService from '../../../src/Services/CarService';

describe('Teste de rotas de Car.', function () {
  beforeEach(function () {
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

    it(
      '2.3 - Consulta por ID os registros de carros no banco de dados com ID invalido.',
      async function () {
        sinon.stub(Model, 'find').resolves();

        try {
          const service = new CarService();
          await service.getById('634852326b35b59438fbea2f111');
        } catch (error) {
          expect((error as Error).message).to.be.equal('Invalid mongo id');
        }
      },
    );

    // it(
    //   '4.3 - Consulta por ID os registros de carros no banco de dados com ID inexistente.',
    //   async function () {
    //     sinon.stub(Model, 'find').resolves();

    //     try {
    //       const service = new CarService();
    //       await service.getById('1111222233330000ffffcccc');
    //     } catch (error) {
    //       expect((error as Error).message).to.be.equal('Car not found');
    //     }
    //   },
    // );
  });

  describe('3 - Teste edição de registro rota /cars/:id PUT', function () {
    it(
      '3.1 - Edita um registro de carros no banco de dados com sucesso.',
      async function () {
        sinon.stub(Model, 'find').resolves([dataCarForEditing]);
        sinon.stub(Model, 'findByIdAndUpdate').resolves(resultEditDataCar);

        const service = new CarService();
        const result = await service.editRegisterCar('634852326b35b59438fbea2f', newDataCar);

        expect(result).to.be.deep.equal(resultEditDataCar);
      },
    );

    it(
      '3.2 - Tenta editar um registro de carro no banco de dados com ID invalido.',
      async function () {
        sinon.stub(Model, 'find').resolves();
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new CarService();
          await service.getById('634852326b35b59438fbea2f111');
        } catch (error) {
          expect((error as Error).message).to.be.equal('Invalid mongo id');
        }
      },
    );
  });
});