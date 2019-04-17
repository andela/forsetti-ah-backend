import validator from 'validator';

import db from '../../models';

import Response from '../response.util';


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
}

export default commentValidation;
