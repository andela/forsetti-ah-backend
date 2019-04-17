import express, { Router } from 'express';
import {
  ArticleController,
  CommentController,
  ClapController,
  BookmarkController
} from '../controllers';

import {
  tryCatch,
  createArticle as createarticle,
  imageUpload,
  checkComments,
  doesLikeExistInCommentForUser,
  updateArticle,
  checkArticleExist,
  checkAuthor,
  shareArticleCheck,
  verifyText,
  paramsValidate
} from '../utils';
import { signInAuth } from '../utils/users/permissions.util';

const { createComments, threadedComment } = CommentController;
const { createOrRemoveBookmark } = BookmarkController;
const {
  createArticle,
  editArticle,
  getOneArticle,
  shareArticle
} = ArticleController;

const router = new Router();

router.post('/', [signInAuth, createarticle], tryCatch(ArticleController.createArticle));
router.get('/:slug', tryCatch(getOneArticle));

router.post('/', [signInAuth, imageUpload, createarticle], tryCatch(createArticle));

router.post('/:slug/comment', [signInAuth, checkComments, verifyText], tryCatch(createComments));

router.post('/:slug/comment/:commentid/thread', [checkComments, signInAuth], tryCatch(threadedComment));

router.post('/:articleId/claps', signInAuth, tryCatch(ClapController.createClap));

router.get('/', [paramsValidate], tryCatch(ArticleController.getAllArticles));

router.post('/:articleId/bookmark', signInAuth, tryCatch(createOrRemoveBookmark));

router.put('/:slug', [signInAuth, checkArticleExist, checkAuthor, updateArticle], tryCatch(editArticle));

router.post('/comment/:commentId/like', [signInAuth, doesLikeExistInCommentForUser], tryCatch(CommentController.likeComment));

router.post('/:slug/share', [signInAuth, shareArticleCheck, checkArticleExist], tryCatch(shareArticle));

export default router;
