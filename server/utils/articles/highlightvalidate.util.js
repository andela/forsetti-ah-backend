import db from '../../models';
import Response from '../response.util';

const { Article } = db;

class VerifyHighlightedText {
/**
 * @static
 * @function VerifyHighlightedText
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @param {Object} next - response object
 * @returns {Object} JSON
 */
  static async verifyText(req, res, next) {
    const { slug } = req.params;
    const { highlightedText, spanId } = req.body;

    if (highlightedText && !spanId) {
      return Response(res, 400, 'Span Id is required for this text highlight');
    }

    if (highlightedText && spanId) {
      const findArticle = await Article.findOne({
        where: { slug }
      });

      const articleBody = findArticle.dataValues.body.replace(/\s/g, '').toLowerCase();
      const isValidHighlight = articleBody.includes(highlightedText.toLowerCase());
      if (!isValidHighlight) {
        return Response(res, 404, 'Highlighted text cannot be found in article');
      }
    }

    return next();
  }
}
export default VerifyHighlightedText;
