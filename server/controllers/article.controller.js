import db from '../models';
import slug from '../utils/slugify.utils';
import Response from '../utils/response.util';

const { Article, User, Comment } = db;
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
    if (req.file) req.body.image = req.file.secure_url;
    const {
      title, body, tags, description, image, published
    } = req.body;
    const { id } = req.user;
    const successMessage = 'Article successfully created';
    const errorMessage = 'Article was not created successfully';
    const article = await Article.create({
      title,
      body,
      tags,
      description,
      image,
      published,
      slug: slug(`${title} ${Date.now()}`),
      userId: id
    });
    if (!article) {
      return Response(res, 400, errorMessage);
    }
    return Response(res, 201, successMessage, { article });
  }

  static async getAllArticles(req, res) {
    /**
     * @description - Controller to get all articles endpoint
     *
     * @static
     * @param {object} request
     * @param {object} response
     * @returns {object}
     * @memberof getAllArticles
    */
    const articles = await Article.findAndCountAll({
      where: { published: true },
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstname', 'lastname', 'bio', 'image']
      },
      {
        model: Comment,
        as: 'comments'
      }]
    });
    if (articles.count === 0) {
      return Response(res, 400, 'There is no article in database');
    }
    return Response(res, 200, 'Articles successfully retrieved', { articles });
  }
}
export default ArticleController;
