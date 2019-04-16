import { expect } from 'chai';
import { readTime } from '../utils';


describe('Read time checks', () => {
  it('should successfully return read time of a content', async () => {
    const readingDuration = await readTime('<span>Like seriously</span> <p>the car and the bus</p>');
    expect(readingDuration).to.be.a('number');
  });
  it('should not return read time of a content if the data type is not a string', async () => {
    const readingDuration = await readTime(true);
    expect(readingDuration).eql('Content must be a string');
  });
  it('should return read time content value', async () => {
    const readingDuration = await readTime('<span>Like seriously</span> <p>the car and the bus</p>');
    expect(readingDuration).to.be.a('number');
    expect(readingDuration).eql(0.035);
  });
});
