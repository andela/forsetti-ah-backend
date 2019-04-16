import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
let userToken;
before(async () => {
  const userResponse = await chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'mofe@okoro.com',
      password: 'soldier123'
    });

  userToken = userResponse.body.data.token;
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
