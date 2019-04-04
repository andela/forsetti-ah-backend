import db from '../models';
import slug from '../utils/slugify.utils';
import Response from '../utils/response.util';

const { Article } = db;
/**
 * Article Controller
 * @package Article
 */
class ArticleController {
  static async createArticle(req, res) {
    /**
     * @description - Controller for create an article endpoint
     *
     * @static
     * @param {object} request
     * @param {object} response
     * @returns {object}
     * @memberof createArticle
    */
    const {
      title, body, tags, description, published
    } = req.body;
    const { id } = req.user;
    const successMessage = 'Article successfully created';
    const errorMessage = 'Article was not created successfully';
    const article = await Article.create({
      title,
      body,
      tags,
      description,
      published,
      slug: slug(`${title} ${Date.now()}`),
      userId: id
    });
    if (!article) {
      return Response(res, 400, errorMessage);
    }
    return Response(res, 201, successMessage, { article });
  }
}
export default ArticleController;
