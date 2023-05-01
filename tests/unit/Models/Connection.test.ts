import { expect } from 'chai';
import sinon from 'sinon';
import connectionDB from '../../../src/Models/Connection';

describe('MODEL: Teste conexão', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('1 - Teste conexão do banco de dados.', function () {
    it('1.1 - Testa se a conexão existe.', function () {
      const conn = connectionDB();
      expect(conn).to.exist;
    });
  });
});