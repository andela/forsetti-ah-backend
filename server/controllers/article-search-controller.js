import sequelize from 'sequelize';
import db from '../models';
import { Response } from '../utils';

const { Op } = sequelize;
const { Article, User } = db;

class SearchControllers {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async getArticles(req, res) {
    const queryKeys = Object.keys(req.query);
    const queryValues = Object.values(req.query);
    let counter = 0;
    const searchObject = {};

    queryKeys.forEach(async (key) => {
      if (key === 'author') {
        const user = await User.findOne({
          where: { username: { [Op.iLike]: `%${queryValues[counter]}%` } }
        });
        searchObject.userId = user ? user.dataValues.id : null;
      }
      if (key === 'tag') {
        searchObject.tagList = { [Op.contains]: [queryValues[counter].toLowerCase()] };
      }
      if (key === 'title') {
        searchObject.title = { [Op.iLike]: `%${queryValues[counter]}%` };
      }
      counter += 1;
      if (counter === queryKeys.length) {
        const result = await Article.findAndCountAll({
          where: {
            [Op.or]: searchObject
          }
        });
        if (result.count === 0) return Response(res, 404, 'Search result not found');
        return Response(res, 200, 'Article found.', result);
      }
    });
  }
}

export default SearchControllers;
