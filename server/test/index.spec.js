import chai, { expect } from 'chai';
import app from '../../index';

chai.use(require('chai-http'));

describe('Default application route', () => {
  it('should return success http status code upon hitting the defualt route', async () => {
    const res = await chai.request(app)
      .get('/');

    expect(res).to.have.status(200);
  });
});
