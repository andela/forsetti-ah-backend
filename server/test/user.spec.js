import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
let superAdminToken;
let userToken;

describe('Users', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'melanie@dara.com',
        password: 'soldier'
      });

    superAdminToken = response.body.data.token;

    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'mofe@okoro.com',
        password: 'soldier'
      });

    userToken = userResponse.body.data.token;
  });

  describe('Users', () => {
    it('should return 401 if no token is received', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/users/role/fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8');

      expect(res).to.have.status(401);
      expect(res).to.be.a('object');
      expect(res.body.message).to.equal('Unauthorized - Header Not Set');
    });

    it('should return 401 for invalid token', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/users/role/fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8')
        .set({ Authorization: null });

      expect(res).to.have.status(401);
      expect(res).to.be.a('object');
      expect(res.body.message).to.equal('Access Denied. Please Log In.');
    });

    it('should return 401 for token error', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/users/role/fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8')
        .set({ Authorization: 'Bearer abcd' });

      expect(res).to.have.status(401);
      expect(res).to.be.a('object');
      expect(res.body.message).to.equal('Error in verification. Please try again');
    });

    it('should return 400 if id is invalid', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/users/role/abcd')
        .set({ Authorization: `Bearer ${superAdminToken}` });

      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.message).to.equal('Please enter a valid id.');
    });

    it('should return 403 if user is not an admin', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/users/role/fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8')
        .set({ Authorization: `Bearer ${userToken}` });

      expect(res).to.have.status(403);
      expect(res).to.be.a('object');
      expect(res.body.message).to.equal('Access Denied. For Superadmins only.');
    });

    it('should return 200 for successfull update', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/users/role/fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8')
        .set({ Authorization: `Bearer ${superAdminToken}` })
        .send({ newrole: 'admin' });

      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('data');
    });

    it('should reverse updated user role', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/users/role/fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8')
        .set({ Authorization: `Bearer ${superAdminToken}` })
        .send({ newrole: 'user' });

      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('data');
    });
  });
});
