import validator from 'validator';
import Response from '../response.util';
import isRequired from '../isRequired.util';
import baseUtils from './base.util';
import db from '../../models';

const { Article } = db;

const {
  isString,
  isLength,
  isStringArray,
  isEmptyObject,
  isBoolean
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
      title, body, tagList, description, published
    } = req.body;
    const error = {
      title: {}, body: {}, description: {}, tags: {}, published: {}
    };

    if (!title && !body && !description) {
      const errorMessage = 'title, body, description and tagList are required';
      return Response(res, 422, errorMessage);
    }
    const requiredFields = isRequired(req.body, ['title', 'body', 'description', 'published']);
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
    if (!isStringArray(tagList)) {
      error.tags.type = 'TagList must be an array and all items in the tags array must be all strings';
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

  /**
   *  edit article
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async updateArticle(req, res, next) {
    const {
      body: {
        description, title, body
      }
    } = req;
    const errObj = {};
    if (title) {
      const trimmedTitle = validator.trim(title);
      if (validator.isEmpty(trimmedTitle)) errObj.title = 'Title should not be empty';
    }
    if (body) {
      const trimmedTitle = validator.trim(body);
      if (validator.isEmpty(trimmedTitle)) errObj.body = 'body should not be empty';
    }
    if (description) {
      const trimmedTitle = validator.trim(description);
      if (validator.isEmpty(trimmedTitle)) errObj.description = 'description should not be empty';
    }
    if (Object.keys(errObj).length !== 0) {
      return Response(res, 422, errObj);
    }
    return next();
  }

  /**
   * Check if article exist
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} Response
   */
  static async checkArticleExist(req, res, next) {
    const { slug } = req.params;
    const checkArticle = await Article.findOne({ where: { slug } });
    if (!checkArticle) return Response(res, 404, 'Article not found');
    return next();
  }

  /**
   * Check Author of article
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async checkAuthor(req, res, next) {
    const {
      params: { slug }, user: { id }
    } = req;

    const checkauthor = await Article.findOne({
      where: {
        userId: id,
        slug
      }
    });

    if (!checkauthor) {
      return Response(res, 401, 'Action restricted to author of article');
    }
    return next();
  }

  /**
   * share article validation
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async shareArticleCheck(req, res, next) {
    const {
      body: { email },
    } = req;
    const errObj = {};
    const trimmedEmail = validator.trim(email);
    if (validator.isEmpty(trimmedEmail)) errObj.email = 'email is required';
    const validEmail = validator.isEmail(email);
    if (!validEmail) {
      return Response(res, 422, 'Email is invalid');
    }
    if (Object.keys(errObj).length !== 0) {
      return Response(res, 422, errObj);
    }
    return next();
  }

  /**
    * Checks if get all articles id are numbers
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @return {any} next/error
    */
  static async paramsValidate(req, res, next) {
    const { page } = req.query;
    const paramId = parseInt(page, 10);

    if (!paramId) {
      return Response(res, 422, 'Invalid id');
    }
    req.params.page = paramId;
    return next();
  }
}

export default articleValidation;
