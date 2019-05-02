import validator from 'validator';

import db from '../../models';

import Response from '../response.util';

const { Comment } = db;

class commentValidation {
  static checkComments(req, res, next) {
    const { comment } = req.body;
    const trimmedcomment = validator.trim(comment);
    const checkEmpty = validator.isEmpty(trimmedcomment);

    if (checkEmpty) {
      return Response(res, 422, 'comment is required');
    }
    return next();
  }

  static validateCommentType(req, res, next) {
    const { commentType } = req.body;
    if (commentType) {
      if (!validator.isIn(commentType.toLowerCase(), ['normal', 'criticism'])) {
        return Response(res, 400, 'Please insert a valid comment type.');
      }
    } else {
      next();
    }
  }

  /**
   * Check User of article
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async checkUser(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;

    const userComment = await Comment.findOne({
      where: {
        id
      }
    });
    if (userId !== userComment.userId) {
      return Response(res, 400, 'No right to edit this comment');
    }
    return next();
  }
}

export default commentValidation;
