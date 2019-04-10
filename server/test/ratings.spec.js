import { expect } from 'chai';
import { Rating } from '../utils';


describe('Article Rating Checks', () => {
  it('should successfuly get the rating of an article', async () => {
    const rating = await Rating.getArticleRating('8ec9d2a8-89c0-4af5-9406-240eb9fc1746');
    expect(rating).to.be.a('number');
  });

  it('should return 0 if clap is from 0 to 9', async () => {
    const rating = await Rating.getArticleRating('ddbc0491-f25b-44c1-a5df-25795fc7fada');
    expect(rating).to.be.a('number');
    expect(rating).to.equal(0);
  });
});
