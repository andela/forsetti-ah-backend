import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import articleMockData from './stubs/mock-data.article';


chai.use(chaiHttp);
let userToken;
let alternateToken;
let slug;
describe('Articles routes', () => {
  before(async () => {
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'mofe@okoro.com',
        password: 'soldier'
      });

    userToken = userResponse.body.data.token;
  });
  describe('POST /api/v1/article', () => {
    it('should successfullly create an article', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.validArticleObject);
      expect(res).to.have.status(201);
      const { article } = res.body.data;
      const {
        title, body, description, tagList
      } = articleMockData.validArticleObject;
      ({ slug } = res.body.data.article);
      expect(article).to.have.property('title').eql(title);
      expect(article).to.have.property('body').eql(body);
      expect(article).to.have.property('image');
      expect(article).to.have.property('description').eql(description);
      expect(article).to.have.property('tagList').eql(tagList);
      expect(article).to.have.property('slug');
    });
    it('should return 422 if title is not in the request data', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[0]);
      const { message } = res.body;
      expect(res).to.have.status(422);
      expect(message[0]).to.have.property('title').eql('title field is required');
    });
    it('should return 422 if title is not more than eight characters', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[1]);
      const { message } = res.body;
      expect(res).to.have.status(422);
      expect(message).to.have.property('title').eql({ lengthy: 'Title length should be more than 8 characters' });
    });
    it('should return 422 if title is not a string', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[2]);
      const { message } = res.body;
      const { title } = message;
      expect(res).to.have.status(422);
      expect(title.type).to.be.equal('Title should be a string');
    });
    it('should return 422 if body is not in the request data', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[3]);
      const { message } = res.body;
      expect(res).to.have.status(422);
      expect(message[0]).to.have.property('body').eql('body field is required');
    });
    it('should return 422 if body is not more than eight characters', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[4]);
      const { message } = res.body;
      expect(res).to.have.status(422);
      expect(message).to.have.property('body').eql({ lengthy: 'Body length should be more than 8 characters' });
    });
    it('should return 422 if body is not a string', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[5]);
      const { message } = res.body;
      const { body } = message;
      expect(res).to.have.status(422);
      expect(body.type).to.be.equal('Body should be string');
    });
    it('should return 422 if description is not in the request data', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[6]);
      const { message } = res.body;
      expect(res).to.have.status(422);
      expect(message[0]).to.have.property('description').eql('description field is required');
    });
    it('should return 422 if description is not more than eight characters', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[7]);
      const { message } = res.body;
      expect(res).to.have.status(422);
      expect(message).to.have.property('description').eql({ lengthy: 'Description length should be more than 8 characters' });
    });
    it('should return 422 if description is not a string', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[8]);
      const { message } = res.body;
      const { description } = message;
      expect(res).to.have.status(422);
      expect(description.type).to.be.equal('Description should be string');
    });
    it('should return 422 if tagList is not an array', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[12]);
      const { message } = res.body;
      const { tags } = message;
      expect(res).to.have.status(422);
      expect(tags.type).to.be.equal('TagList must be an array and all items in the tags array must be all strings');
    });
    it('should return 422 if tags array contains a data that is not a string', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[13]);
      const { message } = res.body;
      const { tags } = message;
      expect(res).to.have.status(422);
      expect(tags.type).to.be.equal('TagList must be an array and all items in the tags array must be all strings');
    });
    it('should return 422 if tags array contains a data that is empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[9]);
      const { message } = res.body;
      const { tags } = message;
      expect(res).to.have.status(422);
      expect(tags.type).to.be.equal('TagList must be an array and all items in the tags array must be all strings');
    });
    it('should return 422 if published is not a boolean', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[10]);
      const { message } = res.body;
      const { published } = message;
      expect(res).to.have.status(422);
      expect(published.type).to.be.equal('Publised must be a boolean');
    });
    it('should return 422 if all required field is not set in the request data', async () => {
      const res = await chai.request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(articleMockData.invalidObject[11]);
      const { message } = res.body;
      expect(res).to.have.status(422);
      expect(message).to.be.equal('title, body, description and tagList are required');
    });
    it('it should get all articles', async () => {
      const res = await chai.request(app)
        .get('/api/v1/article')
        .set({ Authorization: `Bearer ${userToken}` });
      const { message } = res.body;
      expect(res).to.have.status(200);
      expect(message).to.be.equal('Articles successfully retrieved');
      expect(res.body.data).to.have.property('articles');
    });
  });
});
describe('User can edit article', () => {
  before(async () => {
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'melanie@dara.com',
        password: 'soldier'
      });

    alternateToken = userResponse.body.data.token;
  });
  it('should return 200 when editing article', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/article/${slug}`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        description: 'This is a description from test',
        title: 'This is a title from test',
        body: 'This is from test',
      });
    const { message } = res.body;
    expect(res).to.have.status(200);
    expect(message).to.be.equal('Article edited successfully');
  });
  it('should return 200 when editing article with tags', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/article/${slug}`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        description: 'This is a description from test',
        title: 'This is a title from test',
        body: 'This is from test',
        tagList: ['test', 'app'],
      });
    const { message } = res.body;
    expect(res).to.have.status(200);
    expect(message).to.be.equal('Article edited successfully');
  });
  it('should return 404 when article does not exist', async () => {
    const res = await chai.request(app)
      .put('/api/v1/article/this-is-a-test-for-articles-1554903984790')
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        description: 'This is a description from test',
        title: 'This is a title from test',
        body: 'This is from test',
      });
    const { message } = res.body;
    expect(res).to.have.status(404);
    expect(message).to.be.equal('Article not found');
  });
  it('should return 422 when description is empty', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/article/${slug}`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        description: '   ',
        title: 'This is a title from test',
        body: 'This is from test',
      });
    const { message } = res.body;
    expect(res).to.have.status(422);
    expect(message.description).to.be.equal('description should not be empty');
  });
  it('should check if description not sent', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/article/${slug}`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        title: 'This is a title from test',
        body: 'This is from test',
      });
    const { message } = res.body;
    expect(res).to.have.status(200);
    expect(message).to.be.equal('Article edited successfully');
  });
  it('should return 422 when title is empty', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/article/${slug}`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        description: 'This is a description from test',
        title: '  ',
        body: 'This is from test',
      });
    const { message } = res.body;
    expect(res).to.have.status(422);
    expect(message.title).to.be.equal('Title should not be empty');
  });
  it('should check if title not sent', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/article/${slug}`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        description: 'This is a description from test',
        body: 'This is from test',
      });
    const { message } = res.body;
    expect(res).to.have.status(200);
    expect(message).to.be.equal('Article edited successfully');
  });
  it('should return 422 when body is empty', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/article/${slug}`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        description: 'This is a description from test',
        title: 'This is a title from test',
        body: ' ',
      });
    const { message } = res.body;
    expect(res).to.have.status(422);
    expect(message.body).to.be.equal('body should not be empty');
  });
  it('should check if body not sent', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/article/${slug}`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        description: 'This is a description from test',
        title: 'This is a title from test',
      });
    const { message } = res.body;
    expect(res).to.have.status(200);
    expect(message).to.be.equal('Article edited successfully');
  });
  it('should return 400 when a user is not author an article ', async () => {
    const res = await chai.request(app)
      .put(`/api/v1/article/${slug}`)
      .set({ Authorization: `Bearer ${alternateToken}` })
      .send({
        description: 'This is a description from test',
        title: 'This is a title from test',
        body: 'This is from test',
      });
    const { message } = res.body;
    expect(res).to.have.status(400);
    expect(message).to.be.equal('Action restricted to author of article');
  });
});
