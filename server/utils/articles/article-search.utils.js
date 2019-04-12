import Response from '../response.util';

class SearchValidators {
/**
 * @param {object} req
 * @param {object} res
 * @param {any} next
 * @returns {any} response
 */
  static async checkQueryParams(req, res, next) {
    const { author, title, tag } = req.query;
    if (!author && !title && !tag) return Response(res, 422, 'No search parameters inputted');
    return next();
  }

  static async checkSpecialChars(req, res, next) {
    const { author, title, tag } = req.query;
    const checkRegex = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}\\/]/;
    if (checkRegex.test(author) || checkRegex.test(title) || checkRegex.test(tag)) return Response(res, 422, 'Special characters not allowed');
    return next();
  }
}

export default SearchValidators;
