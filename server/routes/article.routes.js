import express, { Router } from 'express';
import {
  ArticleController,
  CommentController,
  ClapController,
  BookmarkController,
  SearchControllers
} from '../controllers';

import {
  tryCatch,
  createArticle as createarticle,
  imageUpload,
  checkComments,
  validateCommentType,
  doesLikeExistInCommentForUser,
  updateArticle,
  checkArticleExist,
  checkAuthor,
  shareArticleCheck,
  verifyText,
  paramsValidate,
  SearchValidators,
  deleteImage,
  commentIdValidator,
} from '../utils';

import { signInAuth } from '../utils/users/permissions.util';

const { createComments, threadedComment, getCommentHistory } = CommentController;
const { createOrRemoveBookmark } = BookmarkController;
const {
  createArticle,
  editArticle,
  getOneArticle,
  shareArticle,
  deleteArticle
} = ArticleController;
const { getArticles } = SearchControllers;
const { checkQueryParams, checkSpecialChars } = SearchValidators;

const router = new Router();

router.post('/', [signInAuth, createarticle], tryCatch(ArticleController.createArticle));

router.get('/search', [checkQueryParams, checkSpecialChars], tryCatch(getArticles));

router.get('/:slug', tryCatch(getOneArticle));

router.post('/', [signInAuth, imageUpload, createarticle], tryCatch(createArticle));

router.post('/:slug/comment', [signInAuth, checkComments, verifyText, validateCommentType], tryCatch(createComments));

router.post('/:slug/comment/:commentid/thread', [signInAuth, checkComments, validateCommentType], tryCatch(threadedComment));

router.post('/:articleId/claps', signInAuth, tryCatch(ClapController.createClap));

router.get('/', [paramsValidate], tryCatch(ArticleController.getAllArticles));

router.get('/', tryCatch(ArticleController.getAllArticles));

router.post('/:articleId/bookmark', signInAuth, tryCatch(createOrRemoveBookmark));

router.put('/:slug', [signInAuth, checkArticleExist, checkAuthor, updateArticle], tryCatch(editArticle));

router.post('/comment/:commentId/like', [signInAuth, doesLikeExistInCommentForUser], tryCatch(CommentController.likeComment));

router.get('/comment/:commentId/history', [commentIdValidator, signInAuth], tryCatch(getCommentHistory));

router.post('/:slug/share', [signInAuth, shareArticleCheck, checkArticleExist], tryCatch(shareArticle));

router.delete('/:slug', [signInAuth, checkArticleExist, checkAuthor, deleteImage], tryCatch(deleteArticle));

export default router;
