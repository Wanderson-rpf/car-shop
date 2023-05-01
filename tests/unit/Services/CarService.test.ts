import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import {
  arrayCarNull,
  dataCarForEditing,
  findDeleteCar,
  getAllCarsOutput,
  getByIdCarOutput,
  newCarInput,
  newCarOutput,
  newDataCar,
  resultEditDataCar,
} from '../../Mocks/CarService.mock';
import CarService from '../../../src/Services/CarService';

const ERROR_NOT_FOUND = 'Car not found';
const ERROR_INVALID_PARAM = 'Invalid mongo id';

describe('SERVICE: Teste rotas de Car.', function () {
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
        sinon.stub(Model, 'findById').resolves(getByIdCarOutput);

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
          expect((error as Error).message).to.be.equal(ERROR_INVALID_PARAM);
        }
      },
    );

    it(
      '2.4 - Consulta por ID os registros de carros no banco de dados com ID inexistente.',
      async function () {
        sinon.stub(Model, 'findById').resolves();

        try {
          const service = new CarService();
          await service.getById('1111222233330000ffffcccc');
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_NOT_FOUND);
        }
      },
    );
  });

  describe('3 - Teste edição de registro rota /cars/:id PUT', function () {
    it(
      '3.1 - Edita um registro de carros no banco de dados com sucesso.',
      async function () {
        sinon.stub(Model, 'findById').resolves(dataCarForEditing);
        sinon.stub(Model, 'findByIdAndUpdate').resolves(resultEditDataCar);

        const service = new CarService();
        const result = await service.editRegisterCar('634852326b35b59438fbea2f', newDataCar);

        expect(result).to.be.deep.equal(resultEditDataCar);
      },
    );

    it(
      '3.2 - Tenta editar um registro de carro no banco de dados com ID invalido.',
      async function () {
        sinon.stub(Model, 'findById').resolves();
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new CarService();
          await service.editRegisterCar('634852326b35b59438fbea2f111', newDataCar);
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_INVALID_PARAM);
        }
      },
    );

    it(
      '3.3 - Tenta editar um registro de carro no banco de dados com ID inexistente.',
      async function () {
        sinon.stub(Model, 'findById').resolves();
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new CarService();
          await service.editRegisterCar('1111222233330000ffffcccc', newDataCar);
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_NOT_FOUND);
        }
      },
    );
  });

  describe('4 - Teste remoção de registro rota /cars/:id DELETE', function () {
    it('4.1 - Deleta registro de um carro no banco de dados com sucesso.', async function () {
      sinon.stub(Model, 'findById').resolves(findDeleteCar);
      sinon.stub(Model, 'findOneAndDelete').resolves();

      const service = new CarService();
      const result = await service.remove('644c3d8b3d1267845f9f026b');

      expect(result).to.be.deep.equal({ message: 'Car register deleted.' });
    });

    it(
      '4.2 - Tenta remover um registro de carro no banco de dados com ID invalido.',
      async function () {
        sinon.stub(Model, 'findById').resolves(findDeleteCar);
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new CarService();
          await service.remove('644c3d8b3d1267845f9f026b111');
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_INVALID_PARAM);
        }
      },
    );

    it(
      '4.3 - Tenta remover um registro de carro no banco de dados com ID inexistente.',
      async function () {
        sinon.stub(Model, 'findById').resolves();
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new CarService();
          await service.remove('1111222233330000ffffcccc');
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_NOT_FOUND);
        }
      },
    );
  });

  describe('5 - Teste create car domain com valor NULL', function () {
    it('5.1 - Tenta utilizar o metodo createCarDomain() com valor null.', async function () {
      sinon.stub(Model, 'find').resolves(arrayCarNull);

      const service = new CarService();
      const result = await service.getAll();

      expect(result).to.be.deep.equal(arrayCarNull);
    });
  });
});