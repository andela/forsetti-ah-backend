import db from '../models';
import Response from '../utils/response.util';

const { Clap, Article } = db;
/**
 * Clap Controller
 * @package clap
 */
class ClapController {
  /**
   * @description - Controller for creating a clap endpoint
   * @param {object} req
   * @param {object} res
   * @returns {object} response
  */
  static async createClap(req, res) {
    const {
      articleId
    } = req.params;
    const { id } = req.user;
    const isArticleExists = await Article.findOne({ where: { id: articleId } });
    if (!isArticleExists) return Response(res, 404, 'Article not found');
    const existingUserClap = await Clap.findOne({ where: { articleId, userId: id } });
    if (existingUserClap != null) return Response(res, 400, 'you cannot clap twice');
    const userOwnArticle = await Article.findOne({ where: { userId: id }, as: 'user' });
    if (userOwnArticle != null) return Response(res, 400, 'you cannot clap for yourself');
    const clap = await Clap.create({
      articleId,
      userId: id
    });
    if (!clap) {
      return Response(res, 400, 'Clap was not created successfully');
    }
    return Response(res, 201, 'Clap successfully created', { clap });
  }
}
export default ClapController;
