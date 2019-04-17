import isUUID from 'validator/lib/isUUID';
import Response from './response.util';

/**
 * @description Checks if the commentid is valid
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns {Object} response
 */
const commentIdValidator = (req, res, next) => {
  const { commentId } = req.params;

  if (!isUUID(commentId, 4)) return Response(res, 400, 'Please enter a valid id.');
  return next();
};

export default commentIdValidator;
