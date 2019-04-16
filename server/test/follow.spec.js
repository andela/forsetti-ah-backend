import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
let userToken;
let userTokenTwo;
const invalidToken = 'gtf6td6ftfguffttsamorano';
before(async () => {
  const userResponse = await chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'mofe@okoro.com',
      password: 'soldier123'
    });
  userToken = userResponse.body.data.token;
  const userResponseTwo = await chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'melanie@dara.com',
      password: 'soldier123'
    });

  userTokenTwo = userResponseTwo.body.data.token;
});
after(async () => {

});
describe('User can follow and unfollow a user route', () => {
  it('should follow a user', async () => {
    const res = await chai.request(app)
      .post('/api/v1/profiles/Dimkpa/follow')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('Successfully followed user');
    expect(res.body.data).to.have.property('followee');
    expect(res.body.data).to.have.property('followers');
  });
  it('should not follow a user if the user doesnt exist', async () => {
    const res = await chai.request(app)
      .post('/api/v1/profiles/Dimkpayy/follow')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('User does not exist');
  });
  it('should not follow a user if the user has been followed before', async () => {
    const res = await chai.request(app)
      .post('/api/v1/profiles/Dimkpa/follow')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(400);
    expect(res.body.message).to.equal('Cannot follow user twice');
  });
  it('should not follow a user if it is the same user requesting to be followed', async () => {
    const res = await chai.request(app)
      .post('/api/v1/profiles/Mofe/follow')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(409);
    expect(res.body.message).to.equal('Cannot follow self');
  });
  it('should unfollow a user', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/profiles/Dimkpa/follow')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('Successfully unfollowed user');
    expect(res.body.data).to.have.property('followee');
    expect(res.body.data).to.have.property('followers');
  });
  it('should not unfollow a user if the user doesnt exist', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/profiles/Dimkpayy/follow')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('User does not exist');
  });
  it('should not unfollow a user if the user has been followed before', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/profiles/Dimkpa/follow')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(400);
    expect(res.body.message).to.equal('Cannot follow user twice');
  });
  it('should not unfollow a user if it is the same user requesting to be followed', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/profiles/Mofe/follow')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(409);
    expect(res.body.message).to.equal('Cannot follow self');
  });
});
describe('User can get followers', () => {
  it('should get a user followers', async () => {
    const res = await chai.request(app)
      .get('/api/v1/profiles/followers')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('Followers returned successfully');
    expect(res.body.data).to.be.a('object');
    expect(res.body.data).to.have.property('followee');
    expect(res.body.data).to.have.property('followers');
    expect(res.body.data.followers).to.be.a('array');
  });

  it('should indicate if a user does not have followers', async () => {
    const res = await chai.request(app)
      .get('/api/v1/profiles/followers')
      .set({ Authorization: `Bearer ${userTokenTwo}` });
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('User currently does not have followers');
  });

  it('should not get a user followers if authorization token is invalid', async () => {
    const res = await chai.request(app)
      .get('/api/v1/profiles/followers')
      .set({ Authorization: `Bearer ${invalidToken}` });
    expect(res).to.have.status(401);
    expect(res.body.message).to.equal('Error in verification. Please try again');
  });
});
describe('Users can get list of those they are following', () => {
  it('should get a user followee', async () => {
    const res = await chai.request(app)
      .get('/api/v1/profiles/followee')
      .set({ Authorization: `Bearer ${userToken}` });
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('List of followees returned successfully');
    expect(res.body.data).to.be.a('object');
    expect(res.body.data).to.have.property('followee');
    expect(res.body.data).to.have.property('following');
    expect(res.body.data.following).to.be.a('array');
  });

  it('should indicate that a user is not following any other user', async () => {
    const res = await chai.request(app)
      .get('/api/v1/profiles/followee')
      .set({ Authorization: `Bearer ${userTokenTwo}` });
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('User does not follow anyone currently');
  });

  it('should not get a user followers if authorization token is invalid', async () => {
    const res = await chai.request(app)
      .get('/api/v1/profiles/followee')
      .set({ Authorization: `Bearer ${invalidToken}` });
    expect(res).to.have.status(401);
    expect(res.body.message).to.equal('Error in verification. Please try again');
  });
});
