import tryCatch from './trycatch.util';
import { generateToken, verifyToken } from './jwt-sign.util';
import passwordHash from './password-hash.util';
import userValidation from './users/user.util';
import logger from './logger.util';
import sendMail from './mail.util';
import Response from './response.util';
import UuidValidator from './idvalidator/uuidvalidator.util';
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
import verifyHighlightedText from './articles/highlightvalidate.util';
import SearchValidators from './articles/article-search.utils';
import deleteImage from './articles/deleteImage.util';
import saveCommentHistory from './comments/comment-history.util';
import commentIdValidator from './commentidvalidator.util';
import readTime from './readTime.util';

const {
  userSignup, userExist, isSigninFieldEmpty, validateRole, validateProfile,
  userNotExist, checkPassword, checkUsername
} = userValidation;
const { checkComments, validateCommentType, checkUser } = commentValidator;

const {
  createArticle,
  articleEmpty,
  updateArticle,
  checkAuthor,
  articleExist,
  checkArticleExist,
  shareArticleCheck,
  paramsValidate
} = articleValidation;
const { doesLikeExistInCommentForUser } = likeValidation;
const { verifyText } = verifyHighlightedText;

export {
  tryCatch,
  generateToken,
  verifyToken,
  passwordHash,
  userSignup,
  userExist,
  logger,
  sendMail,
  Response,
  isSigninFieldEmpty,
  UuidValidator,
  validateRole,
  validateProfile,
  userNotExist,
  checkPassword,
  mailTemplate,
  imageUpload,
  createArticle,
  articleEmpty,
  checkComments,
  validateCommentType,
  newArticleMail,
  newFollowerMail,
  newCommentMail,
  Rating,
  reportCheck,
  articleExist,
  reportTypeCheck,
  doesLikeExistInCommentForUser,
  updateArticle,
  checkAuthor,
  checkArticleExist,
  shareArticleCheck,
  verifyText,
  paramsValidate,
  SearchValidators,
  deleteImage,
  checkUsername,
  saveCommentHistory,
  commentIdValidator,
  checkUser,
  readTime,
};
