import db from '../../models';

const { Comment, CommentHistory } = db;

/**
 * Insert current comment into CommentHistories table
 * @param {int} commentId
 * @returns {Boolean} true/false
 */
const saveCommentHistory = async (commentId) => {
  let success;
  try {
    const currentComment = await Comment.findByPk(commentId);
    if (currentComment !== null) {
      const { comment } = currentComment;
      const commentHistory = await CommentHistory.create({
        comment,
        commentId,
      });
      success = true;
      return success;
    }
    success = false;
    return success;
  } catch (error) {
    success = false;
    return success;
  }
};

export default saveCommentHistory;
