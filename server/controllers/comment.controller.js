import dotenv from 'dotenv';
import db from '../models';
import { Response } from '../utils';

dotenv.config();


const {
  Comment,
  User,
  DraftComment,
  Article
} = db;

/**
 * Comments Controller
 * @package comments
 */
class CommentController {
  /**
     * Create comment endpoint
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} response
     */
  static async createComments(req, res) {
    const { id } = req.user;
    const { slug } = req.params;
    const { comment } = req.body;

    const articleExists = await Article.findOne({
      where: { slug },
    });
    if (!articleExists) return Response(res, 404, 'Article not found.');
    const articleId = articleExists.dataValues.id;

    const table = articleExists.dataValues.published ? Comment : DraftComment;
    const newcomment = await table.create({
      userId: id,
      articleId,
      comment
    });
    const getUser = await User.findByPk(id);
    if (newcomment) {
      const { createdAt, updatedAt } = newcomment;
      const { firstname, email } = getUser;
      const response = {
        comment: {
          id: newcomment.id,
          createdAt,
          updatedAt,
          body: comment,
          author: {
            username: firstname,
            email
          }
        }
      };
      return Response(res, 201, 'comment made successfully', response);
    }
  }

  /**
   * Threaded Comment controller
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response
   */
  static async threadedComment(req, res) {
    const { commentid, slug } = req.params;
    const { id } = req.user;
    const {
      comment
    } = req.body;

    const articleExists = await Article.findOne({
      where: { slug },
    });
    const table = articleExists.dataValues.published ? Comment : DraftComment;
    const articleId = articleExists.dataValues.id;

    const newThreadComment = await table.create({
      userId: id,
      articleId,
      comment,
      parentId: commentid,
    });
    if (newThreadComment) {
      const response = { comment: newThreadComment };
      return Response(res, 201, 'thread comment added', response);
    }
  }
}

export default CommentController;
