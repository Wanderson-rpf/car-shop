import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import {
  dataMotorcycleForEditing,
  getAllMotorcyclesOutput,
  getByIdMotorcycleOutput,
  newDataMotorcycle,
  newMotorcycleInput,
  newMotorcycleOutput,
  resultEditDataMotorcycle,
} from '../../Mocks/MotorcycleService.mock';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Teste de rotas de Motorcycle.', function () {
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
        sinon.stub(Model, 'find').resolves([getByIdMotorcycleOutput]);

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
          expect((error as Error).message).to.be.equal('Invalid mongo id');
        }
      },
    );
  });

  describe('3 - Teste edição de registro rota /cars/:id PUT', function () {
    it(
      '3.1 - Edita um registro de carros no banco de dados com sucesso.',
      async function () {
        sinon.stub(Model, 'find').resolves([dataMotorcycleForEditing]);
        sinon.stub(Model, 'findByIdAndUpdate').resolves(resultEditDataMotorcycle);

        const service = new MotorcycleService();
        const result = await service.editRegister('634852326b35b59438fbea2f', newDataMotorcycle);
        
        expect(result).to.be.deep.equal(resultEditDataMotorcycle);
      },
    );

    it(
      '3.2 - Tenta editar um registro de carro no banco de dados com ID invalido.',
      async function () {
        sinon.stub(Model, 'find').resolves();
        sinon.stub(Model, 'findByIdAndUpdate').resolves();

        try {
          const service = new MotorcycleService();
          await service.getById('634852326b35b59438fbea2f111');
        } catch (error) {
          expect((error as Error).message).to.be.equal('Invalid mongo id');
        }
      },
    );
  });
});