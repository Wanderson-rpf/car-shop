import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import {
  getAllMotorcyclesOutput,
  getByIdMotorcycleOutput,
  newMotorcycleInput, newMotorcycleOutput, resultEditDataMotorcycle,
} from '../../Mocks/MotorcycleService.mock';
import MotorcycleController from '../../../src/Controllers/MotorcycleController';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const ERROR_INTERNAL = 'Internal error';

describe('CONTROLLER: Testes rota de motorcycle', function () {
  let req = {} as Request;
  const res = {} as Response;
  let next: sinon.SinonStub;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    next = sinon.stub();
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('1 - Teste criação de registro rota /motorcycle POST', function () {
    it('1.1 - Criar registro de um nova moto no banco de dados com sucesso.', async function () {
      req = { body: newMotorcycleInput } as Request;
      const motorcycleController = new MotorcycleController(req, res, next);
      const NEW_MOTORCYCLE_OUTPUT = new Motorcycle(newMotorcycleOutput);

      sinon
        .stub(MotorcycleService.prototype, 'createMotorcycle')
        .resolves(NEW_MOTORCYCLE_OUTPUT);

      await motorcycleController.createMotorcycle();

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(NEW_MOTORCYCLE_OUTPUT)).to.be.equal(true);
    });

    it(
      '1.2 - Tenta criar registro de uma nova moto no banco de dados com dados vazios.',
      async function () {
        const motorcycleController = new MotorcycleController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(MotorcycleService.prototype, 'createMotorcycle')
          .rejects(ERROR);

        await motorcycleController.createMotorcycle();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );
  });
  describe('2 - Teste consulta de registro rotas /motorcycle e /motorcycle/:id GET', function () {
    it(
      '2.1 - Consulta todos os registros de motos no banco de dados com sucesso.',
      async function () {
        const motorcycleController = new MotorcycleController(req, res, next);
        const LIST_MOTORCYCLE_OUTPUT = getAllMotorcyclesOutput.map((moto) => new Motorcycle(moto));

        sinon
          .stub(MotorcycleService.prototype, 'getAll')
          .resolves(LIST_MOTORCYCLE_OUTPUT);

        await motorcycleController.getAll();

        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
        expect((res.json as sinon.SinonStub).calledWith(LIST_MOTORCYCLE_OUTPUT)).to.be.equal(true);
      },
    );

    it(
      '2.2 - Apresenta erro ao consulta todos os registros quando entra na excesão.',
      async function () {
        const motorcycleController = new MotorcycleController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(MotorcycleService.prototype, 'getAll')
          .rejects(ERROR);

        await motorcycleController.getAll();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );

    it(
      '2.3 - Consulta por ID os registros de carros no banco de dados com sucesso.',
      async function () {
        req = { params: '634852326b35b59438fbea2f' } as unknown as Request;
        const motorcycleController = new MotorcycleController(req, res, next);
        const MOTROCYCLE_OUTPUT = new Motorcycle(getByIdMotorcycleOutput);

        sinon
          .stub(MotorcycleService.prototype, 'getById')
          .resolves(MOTROCYCLE_OUTPUT);

        await motorcycleController.getById();

        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
        expect((res.json as sinon.SinonStub).calledWith(MOTROCYCLE_OUTPUT)).to.be.equal(true);
      },
    );

    it(
      '2.4 - Apresenta erro ao consulta um registro quando entra na excesão.',
      async function () {
        const motorcycleController = new MotorcycleController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(MotorcycleService.prototype, 'getById')
          .rejects(ERROR);

        await motorcycleController.getById();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );
  });

  describe('3 - Teste edição de registro rota /motorcycle/:id PUT', function () {
    it(
      '3.1 - Edita um registro de carros no banco de dados com sucesso.',
      async function () {
        req = { params: '634852326b35b59438fbea2f' } as unknown as Request;
        const motorcycleController = new MotorcycleController(req, res, next);
        const MOTORCYCLE_EDITED_OUTPUT = new Motorcycle(resultEditDataMotorcycle);

        sinon
          .stub(MotorcycleService.prototype, 'editRegister')
          .resolves(MOTORCYCLE_EDITED_OUTPUT);

        await motorcycleController.editRegister();

        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
        expect((res.json as sinon.SinonStub)
          .calledWith(MOTORCYCLE_EDITED_OUTPUT)).to.be.equal(true);
      },
    );

    it(
      '3.2 - Apresenta erro ao tentar editar um registro quando entra na excesão.',
      async function () {
        const motorcycleController = new MotorcycleController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(MotorcycleService.prototype, 'editRegister')
          .rejects(ERROR);

        await motorcycleController.editRegister();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );
  });

  describe('4 - Teste remoção de registro rota /motorcycle/:id DELETE', function () {
    it('4.1 - Deleta registro de uma moto no banco de dados com sucesso.', async function () {
      req = { params: '644c3a7e9ce725f859a3b808' } as unknown as Request;
      const motorcycleController = new MotorcycleController(req, res, next);
      const MESSAGE_DELETE = { message: 'Motorcycle register deleted.' };

      sinon
        .stub(MotorcycleService.prototype, 'remove')
        .resolves(MESSAGE_DELETE);

      await motorcycleController.remove();

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(MESSAGE_DELETE)).to.be.equal(true);
    });

    it(
      '4.2 - Apresenta erro ao tentar remover um registro quando entra na excesão.',
      async function () {
        const motorcycleController = new MotorcycleController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(MotorcycleService.prototype, 'remove')
          .rejects(ERROR);

        await motorcycleController.remove();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );
  });
});
