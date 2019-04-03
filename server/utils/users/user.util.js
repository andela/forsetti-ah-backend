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
}

export default userValidation;
