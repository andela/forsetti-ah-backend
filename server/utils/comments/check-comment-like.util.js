import db from '../../models';
import Response from '../response.util';

const { CommentLike } = db;

class likeValidation {
  static async doesLikeExistInCommentForUser(req, res, next) {
    const { id: userid } = req.user;
    const { commentId } = req.params;
    const doesLikeExist = await CommentLike.findOne({
      attributes: ['id'],
      where: {
        userid,
        commentid: commentId,
      },
    });
    if (doesLikeExist) {
      return Response(res, 409, 'You cannot like a comment twice');
    }
    return next();
  }
}

export default likeValidation;
