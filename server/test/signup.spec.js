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

    it('should return 422 if firstname not sent', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userMockData.invalidData[0]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ firstname: 'firstname is required.' });
    });

    it('should return 422 if lastname not sent', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userMockData.invalidData[1]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ lastname: 'lastname is required.' });
    });

    it('should return 422 if email not sent', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userMockData.invalidData[2]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ email: 'email is required.' });
    });

    it('should return 422 if password not sent', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userMockData.invalidData[3]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ password: 'password is required.' });
    });

    it('should return 422 if user already exist', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userMockData.invalidData[4]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql('User with email: d.ogundimy@andela.com already exist!');
    });

    it('should return 422 if email is invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userMockData.invalidData[5]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ email: 'Email value d.ogundimyandela.com is invalid!' });
    });

    it('should return 422 if password length does not meet requirements', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userMockData.invalidData[6]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ passwordLength: 'Password should be a minimum of 8 characters' });
    });

    it('should return 422 if password is not alphanumeric', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userMockData.invalidData[7]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ passwordType: 'Password should be alphanumeric' });
    });
  });
});
