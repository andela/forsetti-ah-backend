import isUUID from 'validator/lib/isUUID';
import Response from './response.util';

/**
 * @description Checks if an id is valid
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns {Object} response
 */
const idValidator = (req, res, next) => {
  const { id } = req.params;

  if (!isUUID(id, 4)) return Response(res, 400, 'Please enter a valid id.');
  return next();
};

export default idValidator;
