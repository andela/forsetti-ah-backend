import db from '../../models';
import Response from '../response.util';
import isRequired from '../isRequired.util';
import baseUtils from './base.util';

const { Article } = db;

const {
  isString, isLength, isStringArray, isEmptyObject, isBoolean
} = baseUtils;

class articleValidation {
  static async createArticle(req, res, next) {
    /**
     * @description - Validation for create an article endpoint
     *
     * @static
     * @param {object} request
     * @param {object} response
     * @returns {object}
     * @memberof createArticleValidation
    */
    const {
      title, body, tags, description, published
    } = req.body;
    const error = {
      title: {}, body: {}, description: {}, tags: {}, published: {}
    };

    if (!title && !body && !description && !tags && !published) {
      const errorMessage = 'title, body, description, tags and published fields are required';
      return Response(res, 422, errorMessage);
    }
    const requiredFields = isRequired(req.body, ['title', 'body', 'description', 'tags', 'published']);
    if ((typeof requiredFields === 'object') && requiredFields.length > 0) {
      return Response(res, 422, requiredFields.map(err => err));
    }
    if (!isString(title)) {
      error.title.type = 'Title should be a string';
    }
    if (!isLength(title, 8)) {
      error.title.lengthy = 'Title length should be more than 8 characters';
    }
    if (!isString(body)) {
      error.body.type = 'Body should be string';
    }
    if (!isLength(body, 8)) {
      error.body.lengthy = 'Body length should be more than 8 characters';
    }
    if (!isString(description)) {
      error.description.type = 'Description should be string';
    }
    if (!isLength(description, 8)) {
      error.description.lengthy = 'Description length should be more than 8 characters';
    }
    if (!isStringArray(tags)) {
      error.tags.type = 'Tags must be an array and all items in the tags array must be all strings';
    }
    if (!isBoolean(published)) {
      error.published.type = 'Publised must be a boolean';
    }
    if (!isEmptyObject(error.title)
      || !isEmptyObject(error.body)
      || !isEmptyObject(error.description)
      || !isEmptyObject(error.tags)
      || !isEmptyObject(error.published)) {
      return Response(res, 422, error);
    }
    next();
  }

  /**
   * Checks if article exists
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @return {any} next/error
   */
  static async articleExist(req, res, next) {
    const { articleId } = req.body;
    const article = await Article.findByPk(articleId);
    if (article === null) return Response(res, 400, 'Article does not exist');
    return next();
  }
}

export default articleValidation;
