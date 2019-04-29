import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { saveCommentHistory } from '../utils';
import db from '../models';

const { CommentHistory } = db;

chai.use(chaiHttp);
let alternateToken;
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

describe('Comment history tests', () => {
  describe('Save comment history function', () => {
    const commentId = 'bcf38432-2c98-4008-afaf-e510eb9c69e5'; // created by seeder
    const fakeCommentIdID = 'db7e5f06-4017-49f7-bfc9-e37af08e9280';
    it('should return false if commentID is not found', async () => {
      const result = await saveCommentHistory(fakeCommentIdID);
      expect(result).to.equal(false);
    });

    it('should return true if commentId is found', async () => {
      const result = await saveCommentHistory(commentId);
      expect(result).to.equal(true);
    });

    let savedCommentHistory;
    before(async () => {
      await saveCommentHistory(commentId);

      savedCommentHistory = await CommentHistory.findOne({
        attributes: ['comment'],
        where: {
          commentId
        }
      });
    });
    it('should successfully insert current comment into the CommentHistories table', async () => {
      expect(savedCommentHistory.comment).to.equal('Quisque ultrices nunc at quam vulputate, vitae maximus risus pharetra');
    });
  });
});

describe('Get comment history', () => {
  describe('GET /api/v1/article/comment/:commentId/history', () => {
    const fakeCommentIdID = 'db7e5f06-4017-49f7-bfc9-e37af08e9280';
    const commentId = 'c22c38cf-894c-417c-acf8-68eb0712bdaa';
    it('should return 404 if comment is not found', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/article/comment/${fakeCommentIdID}/history`)
        .set({ Authorization: `Bearer ${token}` });

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message').eql('Comment does not exist');
    });

    it('should return previously edited comments associated to a comment', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/article/comment/${commentId}/history`)
        .set({ Authorization: `Bearer ${token}` });

      expect(res).to.have.status(200);
      expect(res.body.data.rows[0]).to.have.property('comment').eql('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum | updated first');
    });
  });
});

describe('Edit comment', () => {
  it('should return 200 if article is successfully edited', async () => {
    const res = await chai.request(app)
      .put('/api/v1/article/Gildard is working on it-12345678/comment/bfee5ce0-d1fd-4ef3-83ce-07a03041c5e8')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        comment: 'Change this comment'
      });

    expect(res).to.have.status(200);
    expect(res).to.be.a('object');
    expect(res.body).to.have.property('data');
    expect(res.body.message).to.equal('Comment successfully updated');
  });

  it('should return error if incorrect id is passed', async () => {
    const res = await chai.request(app)
      .put('/api/v1/article/Gildard is working on it-12345678/comment/23')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        comment: 'Change this comment'
      });

    expect(res).to.have.status(400);
    expect(res.body.message).to.equal('Please enter a valid id.');
  });

  it('should return error if comment is empty', async () => {
    const res = await chai.request(app)
      .put('/api/v1/article/gildard-is-working-on-it-12345678/comment/bfee5ce0-d1fd-4ef3-83ce-07a03041c5e8')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        comment: ''
      });

    expect(res).to.have.status(422);
    expect(res.body.message).to.equal('comment is required');
  });

  it('should return error if user is not logged in', async () => {
    const res = await chai.request(app)
      .put('/api/v1/article/gildard-is-working-on-it-12345678/comment/bfee5ce0-d1fd-4ef3-83ce-07a03041c5e8')
      .send({
        comment: 'hello, change this comment'
      });

    expect(res).to.have.status(401);
    expect(res.body.message).to.equal('Unauthorized - Header Not Set');
  });
});

describe('Delete comments', () => {
  it('should return 404 if the article does not exist', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/article/wrong-slug/comment/1b030f7c-7387-4cdd-ae0a-913737c0f96e')
      .set({ Authorization: `Bearer ${token}` });

    expect(res).to.have.status(404);
    expect(res.body).to.be.a('object');
    expect(res.body.message).to.equal('Article not found.');
  });

  it('should return 404 if comment does not exist', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/article/Gildard is working on it-12345678/comment/1b030f7c-7387-4cdd-ae0a-913737c0f9f4')
      .set({ Authorization: `Bearer ${token}` });

    expect(res).to.have.status(404);
    expect(res.body).to.be.a('object');
    expect(res.body.message).to.equal('Comment not found.');
  });

  it('should delete a comment and thread comments', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/article/the-boy-drank-palm-wine-3456677788/comment/f24afaca-a55f-44c3-9705-539f36fd8f45')
      .set({ Authorization: `Bearer ${token}` });

    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('Comment deleted.');
    expect(res.body).to.have.property('data');
  });
});
