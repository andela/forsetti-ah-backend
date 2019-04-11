import { expect } from 'chai';
import { Rating } from '../utils';


describe('Article Rating Checks', () => {
  it.only('should successfuly get the rating of an article', async () => {
    const rating = await Rating.getArticleRating('efbd2ccd-4e06-4ecb-bfe0-baf303cd5577');
    expect(rating).to.be.a('number');
  });

  it.only('should return 0 if clap is from 0 to 9', async () => {
    const rating = await Rating.getArticleRating('efbd2ccd-4e06-4ecb-bfe0-baf303cd5577');
    expect(rating).to.be.a('number');
    expect(rating).to.equal(0);
  });
});

describe('Get Claps Checks', () => {
  it.only('should successfuly get claps as an object', async () => {
    const claps = await Rating.getArticleClaps('efbd2ccd-4e06-4ecb-bfe0-baf303cd5577');
    expect(claps).to.be.an('object');
  });
});
