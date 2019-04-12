import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


chai.use(chaiHttp);
describe('GET /api/v1/article/search', () => {
  it('should return 200 for search query successfully run', async () => {
    const res = await chai.request(app)
      .get('/api/v1/article/search?title=The boy drank palm wine');
    expect(res).to.have.status(200);
    expect(res.body.data.rows).to.be.an('array');
    expect(res.body.data.rows[0].title).to.eql('The boy drank palm wine');
    expect(res.body.data.count).to.eql(1);
  });

  it('should return 404 for search query for no item found', async () => {
    const res = await chai.request(app)
      .get('/api/v1/article/search?tag=cow');
    expect(res).to.have.status(404);
    expect(res.body.message).to.eql('Search result not found');
  });

  it('should return 400 for search query for no query item passed', async () => {
    const res = await chai.request(app)
      .get('/api/v1/article/search?author=&tag=&title=');
    expect(res).to.have.status(422);
    expect(res.body.message).to.eql('No search parameters inputted');
  });

  it('should return 422 when special characters are passed', async () => {
    const res = await chai.request(app)
      .get('/api/v1/article/search?author=!!');
    expect(res).to.have.status(422);
    expect(res.body.message).to.eql('Special characters not allowed');
  });
});
