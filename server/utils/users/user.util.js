import validator from 'validator';

import db from '../../models';

import Response from '../response.util';

import isEmpty from '../isEmpty.util';

const {
  User
} = db;
/**
 * User validation class
 */
class userValidation {
  /**
   * user signup validation
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async userSignup(req, res, next) {
    const {
      email,
      password,
    } = req.body;
    const checkobj = {};
    const checkemail = await validator.isEmail(email);
    if (!checkemail) checkobj.email = `Email value ${email} is invalid!`;
    const checkpassword = await validator.isLength(password, {
      min: 8,
    });
    if (!checkpassword) checkobj.passwordLength = 'Password should be a minimum of 8 characters';
    const condition = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    const alphanumericpassword = await condition.test(password);
    if (!alphanumericpassword) checkobj.passwordType = 'Password should be alphanumeric';
    if (Object.keys(checkobj).length !== 0) {
      return Response(res, 422, checkobj);
    }
    return next();
  }

  /**
   * Check if user exist
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async userExist(req, res, next) {
    const {
      email,
    } = req.body;
    const checkuser = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (checkuser) {
      return Response(res, 422, `User with email: ${email} already exist!`);
    }
    return next();
  }

  /**
   * User object empty check
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static userEmpty(req, res, next) {
    const {
      email,
      password,
      firstname,
      lastname
    } = req.body;
    return isEmpty({
      email,
      password,
      firstname,
      lastname
    }, res, next);
  }

  /**
   * User sign in object empty check
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static isSigninFieldEmpty(req, res, next) {
    return isEmpty(req.body, res, next);
  }

  static validateRole(req, res, next) {
    const { newrole } = req.body;
    if (!validator.isIn(newrole.toLowerCase(), ['user', 'admin', 'superadmin'])) {
      return Response(res, 400, 'Please insert a valid role.');
    }
    next();
  }

  /**
   * user not exist middleware
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async userNotExist(req, res, next) {
    const { email } = req.body;
    const errObj = {};
    const checkemail = validator.isEmail(email);
    if (!checkemail) errObj.email = `Email value ${email} is invalid!`;
    const trimEmail = validator.trim(email);
    const emptyEmail = validator.isEmpty(trimEmail);
    if (emptyEmail) errObj.email = 'Email is required';
    if (Object.keys(errObj).length !== 0) {
      return Response(res, 422, errObj);
    }
    const checkuser = await User.findOne({
      where: {
        email
      }
    });
    if (!checkuser) {
      const message = `User with email ${email} does not exist`;
      return Response(res, 404, message);
    }
    const {
      id,
      firstname,
    } = checkuser;
    req.user = {
      id,
      firstname,
    };
    return next();
  }

  /**
   *  check password
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async checkPassword(req, res, next) {
    const { password } = req.body;
    const errObj = {};
    const checkpassword = await validator.isLength(password, {
      min: 8,
    });
    if (!checkpassword) errObj.passwordLength = 'Password should be a minimum of 8 characters';
    const condition = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    const alphanumericpassword = await condition.test(password);
    if (!alphanumericpassword) errObj.passwordType = 'Password should be alphanumeric';
    if (Object.keys(errObj).length !== 0) {
      return Response(res, 422, errObj);
    }
    return next();
  }
}

export default userValidation;
