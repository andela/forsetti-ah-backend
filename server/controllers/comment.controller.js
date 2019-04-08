import dotenv from 'dotenv';
import db from '../models';
import { Response } from '../utils';

dotenv.config();


const { comments, User } = db;

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
    const newcomment = await comments.create({
      userid: id,
      articleid: slug,
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
    const newThreadComment = await comments.create({
      userid: id,
      articleid: slug,
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
