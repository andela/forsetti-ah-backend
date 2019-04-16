import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

let token;
let id;
before(async () => {
  const userResponse = await chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'mofe@okoro.com',
      password: 'soldier123'
    });
  const response = userResponse.body.data;
  ({ token } = response);

  const userComment = await chai.request(app)
    .post('/api/v1/article/the-boy-drank-palm-wine-3456677788/comment')
    .set({ Authorization: `Bearer ${token}` })
    .send({ comment: 'This is the second valid comment' });
  ({ id } = userComment.body.data.comment);
});
describe('User like a comment', () => {
  it('should be able to post a like for a comment', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/article/comment/${id}/like`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res).to.have.status(201);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Comment liked successfully');
  });

  it('should not like a comment twice by one user', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/article/comment/${id}/like`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res).to.have.status(409);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('You cannot like a comment twice');
  });
});
