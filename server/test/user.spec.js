import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import dummyText from './stubs/mock-data.profile';

chai.use(chaiHttp);
let superAdminToken;
let userToken;
const invalidToken = 'dssdssqQwwe';

describe('Users Routes', () => {
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

    it('should not retrieve users functionality if authorization token is not valid', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users/')
        .set({ Authorization: `Bearer ${invalidToken}` });
      expect(res).to.have.status(401);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('message').eql('Error in verification. Please try again');
    });
    it('should retrieve users functionality', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users/')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('message').eql('Successfully retrieved users');
      expect(res.body.data).to.have.property('rows');
    });
    it('should contain a user id from seeded data', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users/')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body.data.rows[0]).to.have.property('id').eql('b2b67e1e-d40c-47ef-8abf-62e1a330d4ef');
    });
  });

  describe('Profile', () => {
    it('should return 404 if user does not exist', async () => {
      const res = await chai.request(app)
        .get('/api/v1/profiles/d002d107-bb04-4846-9313-01a45f263068')
        .set({ Authorization: `Bearer ${userToken}` });

      expect(res).to.have.status(404);
      expect(res).to.be.a('object');
      expect(res.body.message).to.equal('No profile found for this user.');
    });

    it('should return a users profile', async () => {
      const res = await chai.request(app)
        .get('/api/v1/profiles/fcc7773a-cff8-4ee2-9f8e-1d506b4e27c8')
        .set({ Authorization: `Bearer ${userToken}` });

      expect(res).to.have.status(200);
      expect(res.body.data[0]).to.have.property('articlesWritten');
      expect(res.body.data[0]).to.have.property('articlesRead');
      expect(res.body.message).to.equal('User profile found.');
    });

    it('should update the users profile successfully', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/profiles')
        .set({ Authorization: `Bearer ${userToken}` })
        .send({
          username: 'mofe002',
          bio: 'This is my bio $$.'
        });

      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data[0].username).to.equal('mofe002');
    });

    it('should return 400 if the input details are invalid', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/profiles')
        .set({ Authorization: `Bearer ${userToken}` })
        .send({
          firstname: '1',
          lastname: '1',
          bio: dummyText,
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
    });

    it('should return user notifications if any', async () => {
      const res = await chai.request(app)
        .get('/api/v1/profiles/notifications')
        .set({ Authorization: `Bearer ${userToken}` });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('array');
    });
  });

  describe('Get Bookmark routes GET /api/v1/users/bookmark', () => {
    it('should return bookmarks for a user', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users/bookmark')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.property('status').eql(200);
      expect(res.body).to.have.property('message').eql('user bookmarks successfully retrieved');
    });
  });
});
