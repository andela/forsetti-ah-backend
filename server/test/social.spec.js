import chai from 'chai';
import nock from 'nock';
import controllers from '../controllers';
import app from '../../index';

const { UserController } = controllers;

const { expect } = chai;

const accessToken = 'randomtoken';
const refreshToken = 'randomtoken2';
const profile = {
  id: '1234567890',
  emails: [{ value: 'random@email.com' }],
  displayName: 'random name',
  provider: 'facebook',
  photos: [{ value: 'image' }],
};

nock('https://www.facebook.com/')
  .filteringPath(() => '/api/v1/auth/facebook')
  .get('/api/v1/auth/facebook')
  .reply(200, 'facebook callback route called');

describe('passport strategy', () => {
  it('should be a function', (done) => {
    UserController.socialCallback(accessToken, refreshToken, profile, done);
    expect(UserController.socialCallback).to.be.a('function');
  });

  it('should call the social route', async () => {
    const response = await chai.request(app).get('/api/v1/auth/facebook');
    expect(response).to.have.status(200);
    expect(response.text).to.be.deep.equal('facebook callback route called');
  });
});
