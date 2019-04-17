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
});
describe('User post comment route', () => {
  it('should post a comment to an article', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/the-boy-drank-palm-wine-3456677788/comment')
      .set({ Authorization: `Bearer ${token}` })
      .send({ comment: 'This is a valid comment' });
    ({ id } = res.body.data.comment);
    expect(res).to.have.status(201);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('comment made successfully');
  });

  it('should return 422 when comment not sent', async () => {
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
      .post(`/api/v1/article/the-boy-drank-palm-wine-3456677788/comment/${id}/thread`)
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

describe('User post highlighted text', () => {
  it('should return an error if highlighted text cannot be found in the article', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/Gildard is working on it-12345678/comment')
      .set({ Authorization: `Bearer ${token}` })
      .send({ comment: 'This is a valid comment', highlightedText: 'hhhhh', spanId: 'span1' });
    expect(res).to.have.status(404);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Highlighted text cannot be found in article');
  });

  it('should post a comment on highlighted text of an article', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/Gildard is working on it-12345678/comment')
      .set({ Authorization: `Bearer ${token}` })
      .send({ comment: 'This is a an ancient name', highlightedText: 'boy', spanId: 'span2' });
    expect(res).to.have.status(201);
    expect(res).to.be.a('object');
    expect(res.body.data.comment).to.have.property('highlightedText');
    expect(res.body.message).to.equal('comment made successfully');
  });

  it('should return 400 error if spanid is not specified', async () => {
    const res = await chai.request(app)
      .post('/api/v1/article/Gildard is working on it-12345678/comment')
      .set({ Authorization: `Bearer ${token}` })
      .send({ comment: 'This is a an ancient name', highlightedText: 'boy', spanId: '' });
    expect(res).to.have.status(400);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Span Id is required for this text highlight');
  });
});
