import chai, { expect } from 'chai';
import app from '../../index';
import userMockData from './stubs/mock-data.user';
import {
  verifyToken,
  generateToken
} from '../utils/jwt-sign.util';

chai.use(require('chai-http'));

let token;

before(async () => {
  const res = await chai.request(app)
    .post('/api/v1/auth/signup')
    .send(userMockData.resetPasswordObject);

  const {
    id
  } = await verifyToken(res.body.data[0].token, res);
  token = await generateToken({
    email: res.body.data[0].user.email,
    id
  }, '15m');
});

describe('JWT function checks', () => {
  it('should test the generateToken function', async () => {
    const testToken = await generateToken({
      id: 'ee056f8d-af99-435b-9feb-19c87a1e4373'
    }, '15m');
    expect(testToken).to.be.a('string');
  });
});

describe('Forgot passsword checks', () => {
  it('should send reset password email to user', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/forgotpassword')
      .send({
        email: userMockData.resetPasswordObject.email,
      });

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal(`A reset password link has been sent to ${userMockData.resetPasswordObject.email}. Please check your mail`);
  });

  it('should check for an invalid email', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/forgotpassword')
      .send({
        email: userMockData.invalidDataForgotPassword.email,
      });
    expect(res).to.have.status(422);
    expect(res.body).to.be.an('object');
    expect(res.body.message.email).to.equal(`Email value ${userMockData.invalidDataForgotPassword.email} is invalid!`);
  });

  it('should check for an empty email field', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/forgotpassword')
      .send({
        email: '  ',
      });
    expect(res).to.have.status(422);
    expect(res.body).to.be.an('object');
    expect(res.body.message.email).to.equal('Email is required');
  });
});


describe('Reset password checks', () => {
  it('should send reset password user password', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/auth/resetpassword?token=${token}`)
      .send({
        password: userMockData.resetPasswordObject.password,
      });
    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal(`${userMockData.resetPasswordObject.email} user password has been changed`);
  });

  it('should return 401 on invalid token', async () => {
    const wrongToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6ImNhNTQxNmQzLTYxOGMtNGMyNi1hOGE4LTVjNTY2NjIxYjBmYyIsImVtYWlsIjoiZGF2aWRva29uamkzQGdtYWlsLmNvbSIsImlhdCI6MTU1NDMxNDY5OCwiZXhwIjoxNTU0MzE1NTk4fQ.IoG7LysoLOPrzH3H4W5XMKMiNfK6djUZPujpz1nIJy8`;
    const res = await chai.request(app)
      .put(`/api/v1/auth/resetpassword?token=${wrongToken}`)
      .send({
        password: userMockData.resetPasswordObject.password,
      });
    expect(res).to.have.status(401);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal('invalid token');
  });

  it('should send a password with than 8 characters', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/auth/resetpassword?token=${token}`)
      .send({
        password: userMockData.invalidDataForgotPassword.password,
      });
    expect(res).to.have.status(422);
    expect(res.body).to.be.an('object');
    expect(res.body.message.passwordLength).to.equal('Password should be a minimum of 8 characters');
  });

  it('should send a password without alphanumeric characters', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/auth/resetpassword?token=${token}`)
      .send({
        password: userMockData.invalidDataResetPassword.password,
      });
    expect(res).to.have.status(422);
    expect(res.body).to.be.an('object');
    expect(res.body.message.passwordType).to.equal('Password should be alphanumeric');
  });
});
