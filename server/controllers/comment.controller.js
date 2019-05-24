import dotenv from 'dotenv';
import db from '../models';
import { Response, newCommentMail, saveCommentHistory } from '../utils';

dotenv.config();


const {
  Comment,
  User,
  DraftComment,
  Article,
  CommentLike,
  CommentHistory,
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
    const { comment, highlightedText, spanId } = req.body;
    const commentType = req.body.commentType || null;

    const articleExists = await Article.findOne({
      where: { slug },
    });
    if (!articleExists) return Response(res, 404, 'Article not found.');
    const articleId = articleExists.dataValues.id;

    const table = articleExists.dataValues.published ? Comment : DraftComment;
    const newcomment = await table.create({
      userId: id,
      articleId,
      comment,
      highlightedText,
      spanId,
      commentType
    });

    const getUser = await User.findByPk(id);
    if (newcomment) {
      const { createdAt, updatedAt } = newcomment;
      const {
        firstname,
        username,
        email,
        image
      } = getUser;
      const response = {
        comment: {
          id: newcomment.id,
          createdAt,
          updatedAt,
          comment,
          highlightedText,
          spanId,
          commentType,
          threadcomments: [],
          usercomments: {
            username,
            firstname,
            image
          }
        }
      };
      await newCommentMail(articleId, id);
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
    const commentType = req.body.commentType || null;

    const articleExists = await Article.findOne({
      where: { slug },
    });
    const articleId = articleExists.dataValues.id;
    const table = articleExists.dataValues.published ? Comment : DraftComment;
    const getUser = await User.findByPk(id);
    const {
      firstname,
      username,
      image
    } = getUser;

    const newThreadComment = await table.create({
      userId: id,
      articleId,
      comment,
      commentType,
      parentId: commentid,
    });

    if (newThreadComment) {
      const response = {
        ...newThreadComment.dataValues,
        usercomments: {
          username,
          firstname,
          image
        }
      };
      return Response(res, 201, 'thread comment added', response);
    }
  }

  /**
   * Like comment controller
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response
   */
  static async likeComment(req, res) {
    const { id } = req.user;
    const { commentId } = req.params;

    const commentResponse = await Comment.findOne({
      attributes: ['comment'],
      where: { id: commentId },
    });
    if (!commentResponse) return Response(res, 404, 'Comment not found');
    const { comment } = commentResponse.dataValues;

    const likeComment = await CommentLike.create({
      userid: id,
      commentid: commentId,
    });
    const { id: likeid, userid } = likeComment.dataValues;
    const likeObject = {
      id: likeid,
      comment,
      userid,
    };
    return Response(res, 201, 'Comment liked successfully', likeObject);
  }

  /**
   * Get all comment history
   * @param {*} req
   * @param {*} res
   * @returns {object} response
   */
  static async getCommentHistory(req, res) {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    if (!comment) return Response(res, 404, 'Comment does not exist');
    const commentHistory = await CommentHistory.findAndCountAll({
      where: { commentId },
      attributes: {
        exclude: ['id']
      },
    });
    return Response(res, 200, 'Comment history retrieved successfully', commentHistory);
  }

  /**
    * @description Deletes a user's comment
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @returns {array} An empty array
    */
  static async deleteComment(req, res) {
    const { commentId, slug } = req.params;
    const { user: { id } } = req;
    const articleExists = await Article.findOne({
      where: { slug },
    });
    if (!articleExists) return Response(res, 404, 'Article not found.');

    const articleId = articleExists.dataValues.id;
    const table = articleExists.dataValues.published ? Comment : DraftComment;
    const commentExists = await table.findOne({
      where: {
        id: commentId,
        userId: id
      }
    });

    if (!commentExists) return Response(res, 404, 'Comment not found.');

    await table.destroy({
      where: { id: commentId }
    });
    await table.destroy({
      where: { parentId: commentId }
    });

    return Response(res, 200, 'Comment deleted.', []);
  }

  /**
   * Edit comment controller
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response
   */

  static async editComment(req, res) {
    const { id, slug } = req.params;
    const userId = req.user.id;
    const { comment } = req.body;

    const articleExists = await Article.findOne({
      where: { slug },
    });

    const table = articleExists.dataValues.published ? Comment : DraftComment;
    await saveCommentHistory(id);
    const editedComment = await table.update({
      comment
    }, {
      returning: true,
      where: {
        userId,
        id
      }
    });
    return Response(res, 200, 'Comment successfully updated', editedComment);
  }
}
export default CommentController;
