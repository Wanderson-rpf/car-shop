import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import {
  arrayNull,
  dataMotorcycleForEditing,
  findDelete,
  getAllMotorcyclesOutput,
  getByIdMotorcycleOutput,
  newDataMotorcycle,
  newMotorcycleInput,
  newMotorcycleOutput,
  resultEditDataMotorcycle,
} from '../../Mocks/MotorcycleService.mock';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const ERROR_NOT_FOUND = 'Motorcycle not found';
const ERROR_INVALID_PARAM = 'Invalid mongo id';

describe('SERVICE: Teste de rotas de Motorcycle.', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('1 - Teste criação de registro rota /motorcycles POST', function () {
    it('1.1 - Criar registro de uma nova moto no banco de dados com sucesso.', async function () {
      sinon.stub(Model, 'create').resolves(newMotorcycleOutput);

      const service = new MotorcycleService();
      const result = await service.createMotorcycle(newMotorcycleInput);

      expect(result).to.be.deep.equal(newMotorcycleOutput);
    });
  });

  describe('2 - Teste consultas de registro rota /motorcycles e /motorcycles/:id GET', function () {
    it(
      '2.1 - Consulta todos os registros de motos no banco de dados com sucesso.',
      async function () {
        sinon.stub(Model, 'find').resolves(getAllMotorcyclesOutput);

        const service = new MotorcycleService();
        const result = await service.getAll();

        expect(result).to.be.deep.equal(getAllMotorcyclesOutput);
      },
    );

    it(
      '2.2 - Consulta por ID os registros de motos no banco de dados com sucesso.',
      async function () {
        sinon.stub(Model, 'findById').resolves(getByIdMotorcycleOutput);

        const service = new MotorcycleService();
        const result = await service.getById('634852326b35b59438fbea31');

        expect(result).to.be.deep.equal(getByIdMotorcycleOutput);
      },
    );

    it(
      '2.3 - Consulta por ID os registros de motos no banco de dados com ID invalido.',
      async function () {
        sinon.stub(Model, 'find').resolves();

        try {
          const service = new MotorcycleService();
          await service.getById('634852326b35b59438fbea2f111');
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_INVALID_PARAM);
        }
      },
    );

    it(
      '2.4 - Consulta por ID os registros de motos no banco de dados com ID inexistente.',
      async function () {
        sinon.stub(Model, 'findById').resolves();

        try {
          const service = new MotorcycleService();
          await service.getById('1111222233330000ffffcccc');
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_NOT_FOUND);
        }
      },
    );
  });

  describe('3 - Teste edição de registro rota /motorcycles/:id PUT', function () {
    it(
      '3.1 - Edita um registro de moto no banco de dados com sucesso.',
      async function () {
        sinon.stub(Model, 'findById').resolves(dataMotorcycleForEditing);
        sinon.stub(Model, 'findByIdAndUpdate').resolves(resultEditDataMotorcycle);

        const service = new MotorcycleService();
        const result = await service.editRegister('634852326b35b59438fbea2f', newDataMotorcycle);

        expect(result).to.be.deep.equal(resultEditDataMotorcycle);
      },
    );

    it(
      '3.2 - Tenta editar um registro de moto no banco de dados com ID invalido.',
      async function () {
        sinon.stub(Model, 'findById').resolves();
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new MotorcycleService();
          await service.editRegister('634852326b35b59438fbea2f111', newDataMotorcycle);
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_INVALID_PARAM);
        }
      },
    );

    it(
      '3.3 - Tenta editar um registro de moto no banco de dados com ID inexistente.',
      async function () {
        sinon.stub(Model, 'findById').resolves();
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new MotorcycleService();
          await service.editRegister('1111222233330000ffffcccc', newDataMotorcycle);
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_NOT_FOUND);
        }
      },
    );
  });

  describe('4 - Teste remoção de registro rota /motorcycles/:id DELETE', function () {
    it('4.1 - Deleta registro de uma moto no banco de dados com sucesso.', async function () {
      sinon.stub(Model, 'findById').resolves(findDelete);
      sinon.stub(Model, 'findOneAndDelete').resolves();

      const service = new MotorcycleService();
      const result = await service.remove('644c3d8b3d1267845f9f026b');

      expect(result).to.be.deep.equal({ message: 'Motorcycle register deleted.' });
    });

    it(
      '4.2 - Tenta remover um registro de moto no banco de dados com ID invalido.',
      async function () {
        sinon.stub(Model, 'findById').resolves(findDelete);
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new MotorcycleService();
          await service.remove('644c3d8b3d1267845f9f026b111');
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_INVALID_PARAM);
        }
      },
    );

    it(
      '4.3 - Tenta remover um registro de moto no banco de dados com ID inexistente.',
      async function () {
        sinon.stub(Model, 'findById').resolves();
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new MotorcycleService();
          await service.remove('1111222233330000ffffcccc');
        } catch (error) {
          expect((error as Error).message).to.be.equal(ERROR_NOT_FOUND);
        }
      },
    );
  });

  describe('5 - Teste create motorcycle domain com valor NULL', function () {
    it('5.1 - Tenta utilizar o metodo createMotorcycleDomain() com valor null.', async function () {
      sinon.stub(Model, 'find').resolves(arrayNull);

      const service = new MotorcycleService();
      const result = await service.getAll();

      expect(result).to.be.deep.equal(arrayNull);
    });
  });
});