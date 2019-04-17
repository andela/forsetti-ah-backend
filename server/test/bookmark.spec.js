import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
let userToken;

describe('Bookmark article routes', () => {
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

  describe('Bookmark article route POST /api/v1/article/articleid/bookmark', () => {
    it('should return 404 error if article is not found', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article/ddbc0491-f25b-44c1-a5df-25795fc7fbda/bookmark')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.property('status').eql(404);
      expect(res.body).to.have.property('message').eql('Article not found');
    });

    it('should successfullly bookmark an article', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article/ddbc0491-f25b-44c1-a5df-25795fc7fada/bookmark')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.property('status').eql(201);
      expect(res.body).to.have.property('message').eql('Article has been successfully bookmarked');
    });

    it('should successfullly remove a bookmarked article', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article/ddbc0491-f25b-44c1-a5df-25795fc7fada/bookmark')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.property('status').eql(200);
      expect(res.body).to.have.property('message').eql('Bookmark removed successfully');
    });
  });
});
