import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import {
  getAllCarsOutput,
  getByIdCarOutput,
  newCarInput,
  newCarOutput,
  resultEditDataCar,
} from '../../Mocks/CarService.mock';
import CarService from '../../../src/Services/CarService';
import CarController from '../../../src/Controllers/CarController';
import Car from '../../../src/Domains/Car';

const ERROR_INTERNAL = 'Internal error';

describe('CONTROLLER: Testes rota de car', function () {
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

  describe('1 - Teste criação de registro rota /cars POST', function () {
    it('1.1 - Criar registro de um novo carro no banco de dados com sucesso.', async function () {
      req = { body: newCarInput } as Request;
      const carController = new CarController(req, res, next);
      const NEW_CAR_OUTPUT = new Car(newCarOutput);

      sinon
        .stub(CarService.prototype, 'createCar')
        .resolves(NEW_CAR_OUTPUT);
      // .resolves(newCarOutput as unknown as Car);

      await carController.createCar();

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(NEW_CAR_OUTPUT)).to.be.equal(true);
    });

    it(
      '1.2 - Tenta criar registro de um novo carro no banco de dados com dados vazios.',
      async function () {
        const carController = new CarController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(CarService.prototype, 'createCar')
          .rejects(ERROR);

        await carController.createCar();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );
  });
  describe('2 - Teste consulta de registro rotas /cars e /cars/:id GET', function () {
    it(
      '2.1 - Consulta todos os registros de carros no banco de dados com sucesso.',
      async function () {
        const carController = new CarController(req, res, next);
        const LIST_CAR_OUTPUT = getAllCarsOutput.map((car) => new Car(car));

        sinon
          .stub(CarService.prototype, 'getAll')
          .resolves(LIST_CAR_OUTPUT);

        await carController.getAll();

        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
        expect((res.json as sinon.SinonStub).calledWith(LIST_CAR_OUTPUT)).to.be.equal(true);
      },
    );

    it(
      '2.2 - Apresenta erro ao consulta todos os registros quando entra na excesão.',
      async function () {
        const carController = new CarController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(CarService.prototype, 'getAll')
          .rejects(ERROR);

        await carController.getAll();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );

    it(
      '2.3 - Consulta por ID os registros de carros no banco de dados com sucesso.',
      async function () {
        req = { params: '634852326b35b59438fbea2f' } as unknown as Request;
        const carController = new CarController(req, res, next);
        const CAR_OUTPUT = new Car(getByIdCarOutput);

        sinon
          .stub(CarService.prototype, 'getById')
          .resolves(CAR_OUTPUT);

        await carController.getById();

        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
        expect((res.json as sinon.SinonStub).calledWith(CAR_OUTPUT)).to.be.equal(true);
      },
    );

    it(
      '2.4 - Apresenta erro ao consulta um registro quando entra na excesão.',
      async function () {
        const carController = new CarController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(CarService.prototype, 'getById')
          .rejects(ERROR);

        await carController.getById();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );
  });

  describe('3 - Teste edição de registro rota /cars/:id PUT', function () {
    it(
      '3.1 - Edita um registro de carros no banco de dados com sucesso.',
      async function () {
        req = { params: '634852326b35b59438fbea2f' } as unknown as Request;
        const carController = new CarController(req, res, next);
        const CAR_EDITED_OUTPUT = new Car(resultEditDataCar);

        sinon
          .stub(CarService.prototype, 'editRegisterCar')
          .resolves(CAR_EDITED_OUTPUT);

        await carController.editRegisterCar();

        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
        expect((res.json as sinon.SinonStub).calledWith(CAR_EDITED_OUTPUT)).to.be.equal(true);
      },
    );

    it(
      '3.2 - Apresenta erro ao tentar editar um registro quando entra na excesão.',
      async function () {
        const carController = new CarController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(CarService.prototype, 'editRegisterCar')
          .rejects(ERROR);

        await carController.editRegisterCar();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );
  });

  describe('4 - Teste remoção de registro rota /cars/:id DELETE', function () {
    it('4.1 - Deleta registro de um carro no banco de dados com sucesso.', async function () {
      req = { params: '644c3a7e9ce725f859a3b808' } as unknown as Request;
      const carController = new CarController(req, res, next);
      const MESSAGE_DELETE = { message: 'Car register deleted.' };

      sinon
        .stub(CarService.prototype, 'remove')
        .resolves(MESSAGE_DELETE);

      await carController.remove();

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(MESSAGE_DELETE)).to.be.equal(true);
    });

    it(
      '4.2 - Apresenta erro ao tentar remover um registro quando entra na excesão.',
      async function () {
        const carController = new CarController(req, res, next);
        const ERROR = new Error(ERROR_INTERNAL);

        sinon
          .stub(CarService.prototype, 'remove')
          .rejects(ERROR);

        await carController.remove();

        expect(next.calledWith(ERROR)).to.be.equal(true);
      },
    );
  });
});
