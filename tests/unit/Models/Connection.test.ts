import { expect } from 'chai';
import sinon from 'sinon';
import connectToDatabase from '../../../src/Models/Connection';

describe('MODEL: Teste conexão', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('1 - Teste conexão do banco de dados.', function () {
    it('1.1 - Testa se a conexão existe.', async function () {
      const conn = await connectToDatabase();
      
      expect(conn.connection.readyState).to.be.equal(1);
      // expect(conn).to.exist;
    });
  });
});