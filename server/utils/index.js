import tryCatch from './trycatch.util';
import { generateToken, verifyToken } from './jwt-sign.util';
import passwordHash from './password-hash.util';
import userValidation from './users/user.util';
import logger from './logger.util';
import sendMail from './mail.util';
import Response from './response.util';
import idValidator from './idvalidator.util';
import mailTemplate from './mail-template/mail-template.util';
import imageUpload from './image-upload.util';
import articleValidation from './articles/article.util';
import commentValidator from './comments/comments.util';
import newArticleMail from './notifications/article-mail.util';
import newFollowerMail from './notifications/follows-mail.util';
import newCommentMail from './notifications/comment-mail.util';
import Rating from './rating.util';
import { reportCheck, reportTypeCheck } from './reports/report.util';
import likeValidation from './comments/check-comment-like.util';

const {
  userSignup, userEmpty, userExist, isSigninFieldEmpty, validateRole, validateProfile,
  userNotExist, checkPassword,
} = userValidation;
const { checkComments } = commentValidator;

const { createArticle, articleEmpty, articleExist } = articleValidation;
const { doesLikeExistInCommentForUser } = likeValidation;
export {
  tryCatch,
  generateToken,
  verifyToken,
  passwordHash,
  userSignup,
  userEmpty,
  userExist,
  logger,
  sendMail,
  Response,
  isSigninFieldEmpty,
  idValidator,
  validateRole,
  validateProfile,
  userNotExist,
  checkPassword,
  mailTemplate,
  imageUpload,
  createArticle,
  articleEmpty,
  checkComments,
  newArticleMail,
  newFollowerMail,
  newCommentMail,
  Rating,
  reportCheck,
  articleExist,
  reportTypeCheck,
  doesLikeExistInCommentForUser
};
