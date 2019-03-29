import chai, { expect } from 'chai';
import app from '../../index';
import userMockData from './stubs/mock-data.user';

chai.use(require('chai-http'));

describe('Signup routes', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should return token if user was successfully created', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userMockData.validUserObject);

      expect(res).to.have.status(201);
      expect(res.body.data[0]).to.have.property('token');
      expect(res.body.data[0].user).to.have.property('firstname').eql(userMockData.validUserObject.firstname);
      expect(res.body.data[0].user).to.have.property('lastname').eql(userMockData.validUserObject.lastname);
      expect(res.body.data[0].user).to.have.property('email').eql(userMockData.validUserObject.email);
    });
  });
});
