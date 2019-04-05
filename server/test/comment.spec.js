import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

let token;
before(async () => {
  const userResponse = await chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'mofe@okoro.com',
      password: 'soldier'
    });
  const response = userResponse.body.data;
  ({ token } = response);
});
describe('User post comment route', () => {
  it('should post a comment to an article', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/a11f440b-eae3-4d28-990d-700c7b965709/comment')
      .set({ Authorization: `Bearer ${token}` })
      .send({ comment: 'This is a valid comment' });
    expect(res).to.have.status(201);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('comment made successfully');
  });

  it('should return 422 when comment on sent', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/a11f440b-eae3-4d28-990d-700c7b965709/comment')
      .set({ Authorization: `Bearer ${token}` })
      .send({ comment: ' ' });

    expect(res).to.have.status(422);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('comment is required');
  });

  it('should return 401 if user not authorized', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/a11f440b-eae3-4d28-990d-700c7b965709/comment')
      .set({ Authorization: null })
      .send({ comment: 'This is a valid comment' });

    expect(res).to.have.status(401);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Access Denied. Please Log In.');
  });

  it('should return 401 if header not set', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/a11f440b-eae3-4d28-990d-700c7b965709/comment')
      .send({ comment: 'This is a valid comment' });

    expect(res).to.have.status(401);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Unauthorized - Header Not Set');
  });

  it('should return 401 for token error', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/a11f440b-eae3-4d28-990d-700c7b965709/comment')
      .set({ Authorization: 'Bearer abcd' })
      .send({ comment: 'This is a valid comment' });

    expect(res).to.have.status(401);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Error in verification. Please try again');
  });
});

describe('User Threaded comments', () => {
  it('should post a comment to an article', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/833c0925-3dc5-424e-a575-a065eb71d5b3/comment/96de3cbe-9544-41a8-8f53-73d7e917c7b2/thread')
      .set({ Authorization: `Bearer ${token}` })
      .send({ comment: 'This is a valid sub comment' });
    expect(res).to.have.status(201);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('thread comment added');
  });

  it('should return 422 when comment on sent', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/833c0925-3dc5-424e-a575-a065eb71d5b3/comment/96de3cbe-9544-41a8-8f53-73d7e917c7b2/thread')
      .set({ Authorization: `Bearer ${token}` })
      .send({ comment: ' ' });

    expect(res).to.have.status(422);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('comment is required');
  });

  it('should return 401 if user not authorized', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/833c0925-3dc5-424e-a575-a065eb71d5b3/comment/96de3cbe-9544-41a8-8f53-73d7e917c7b2/thread')
      .set({ Authorization: null })
      .send({ comment: 'This is a valid comment' });

    expect(res).to.have.status(401);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Access Denied. Please Log In.');
  });

  it('should return 401 if header not set', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/833c0925-3dc5-424e-a575-a065eb71d5b3/comment/96de3cbe-9544-41a8-8f53-73d7e917c7b2/thread')
      .send({ comment: 'This is a valid comment' });

    expect(res).to.have.status(401);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Unauthorized - Header Not Set');
  });

  it('should return 401 for token error', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/833c0925-3dc5-424e-a575-a065eb71d5b3/comment/96de3cbe-9544-41a8-8f53-73d7e917c7b2/thread')
      .set({ Authorization: 'Bearer abcd' })
      .send({ comment: 'This is a valid comment' });

    expect(res).to.have.status(401);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Error in verification. Please try again');
  });
});
