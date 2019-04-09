import chai, { expect } from 'chai';
import app from '../../index';
import report from './stubs/mock-data.report';

chai.use(require('chai-http'));

describe('Article Report routes', () => {
  // Login to obtain token
  let token;
  before(async () => {
    const loginReponse = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'mofe@okoro.com',
        password: 'soldier'
      });
    const response = loginReponse.body.data;
    ({ token } = response);
  });
  describe('POST /api/v1/reports', () => {
    it('should return error if comment is not filled', async () => {
      const res = await chai.request(app)
        .post('/api/v1/reports')
        .send(report.invalidReport[0]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ comment: 'comment is required.' });
    });

    it('should return error if typeId is not filled', async () => {
      const res = await chai.request(app)
        .post('/api/v1/reports')
        .send(report.invalidReport[1]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ typeId: 'typeId is required.' });
    });

    it('should return error if articleId is not filled', async () => {
      const res = await chai.request(app)
        .post('/api/v1/reports')
        .send(report.invalidReport[2]);

      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message').eql({ articleId: 'articleId is required.' });
    });

    it('should return 400 if article does not exist', async () => {
      const res = await chai.request(app)
        .post('/api/v1/reports')
        .set({ Authorization: `Bearer ${token}` })
        .send(report.invalidReport[3]);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').eql('Article does not exist');
    });

    it('should return 400 if report type does not exist', async () => {
      const res = await chai.request(app)
        .post('/api/v1/reports')
        .set({ Authorization: `Bearer ${token}` })
        .send(report.invalidReport[4]);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').eql('Report type does not exist');
    });

    it('should return created report successfully', async () => {
      const res = await chai.request(app)
        .post('/api/v1/reports')
        .set({ Authorization: `Bearer ${token}` })
        .send(report.validReport);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data[0]).to.have.property('open').eql(true);
      expect(res.body.data[0]).to.have.property('comment').eql(report.validReport.comment);
    });
  });
});
