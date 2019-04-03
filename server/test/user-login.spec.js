import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

describe('POST /users/login', () => {
  it('should sign in a user', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'melanie@dara.com',
        password: 'soldier',
      });
    expect(res).to.have.status(200);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Signed in successfully');
  });

  it('should return error for a wrong email', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gbegbero@gbe.com',
        password: 'soldier',
      });
    expect(res).to.have.status(400);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Invalid Credentials');
  });

  it('should return error for a wrong password', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'melanie@dara.com',
        password: 'soldier00',
      });
    expect(res).to.have.status(400);
    expect(res).to.be.a('object');
    expect(res.body.message).to.equal('Invalid Credentials');
  });
});
