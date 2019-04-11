import db from '../models';

const { Article, Clap } = db;

class Rating {
  /**
   * Get the claps for an article
   * @param {string} articleId
   * @returns {object} claps
   */
  static async getArticleClaps(articleId) {
    const claps = await Clap.findAndCountAll({
      where: { articleId }
    });
    return claps;
  }

  /**
   * Get the claps for an article
   * @param {string} articleId
   * @returns {number} rating
   */
  static async getArticleRating(articleId) {
    const claps = await Rating.getArticleClaps(articleId).count;
    let rating;
    switch (true) {
      case claps >= 0 && claps < 10:
        rating = 0;
        break;

      case claps >= 10 && claps < 20:
        rating = 1;
        break;

      case claps >= 20 && claps < 30:
        rating = 2;
        break;

      case claps >= 30 && claps < 40:
        rating = 3;
        break;

      case claps >= 40 && claps < 50:
        rating = 4;
        break;

      case claps >= 50:
        rating = 5;
        break;

      default: rating = 0;
        break;
    }
    return rating;
  }
}

export default Rating;
