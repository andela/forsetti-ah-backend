import { expect } from 'chai';
import faker from 'faker';

import sendMail from '../utils/mail.util';


const fakeEmail = faker.internet.email();
const mailOption = {
  email: fakeEmail,
  subject: 'hello there',
  message: '<h1>Forsetti Backend</h1><h5>Welcome to Authors Haven </h5>'
};

describe('Test for Email Notification', () => {
  it('should contain the recipient email in the accepted array', async () => {
    const res = await sendMail(mailOption);
    expect(res.accepted[0]).to.eql(mailOption.email);
  });

  it('should return an error if the email field is absent', async () => {
    const res = await sendMail({
      subject: 'hello there',
      message: '<h1>Forsetti Backend</h1><h5>Welcome to Authors Haven </h5>'
    });
    expect(res.status).to.eql('failure');
    expect(res.message).to.eql('No recipients defined');
  });

  it('should pass if the message subject is not specified', async () => {
    const res = await sendMail({
      email: fakeEmail,
      message: '<h1>Forsetti Backend</h1><h5>Welcome to Authors Haven </h5>'
    });
    expect(res.status).to.eql('success');
  });

  it('should return an error if the email is invalid', async () => {
    const res = await sendMail({
      email: 'samabos007',
      message: '<h1>Forsetti Backend</h1><h5>Welcome to Authors Haven </h5>'
    });
    expect(res.status).to.eql('failure');
    expect(res.message).to.eql('No recipients defined');
  });
});
