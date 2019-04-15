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
  checkComments,
  doesLikeExistInCommentForUser,
  updateArticle,
  checkArticleExist,
  checkAuthor,
  shareArticleCheck
} from '../utils';
import { signInAuth } from '../utils/users/permissions.util';
import imageUpload from '../config/cloudinaryconfig';

const { createComments, threadedComment } = CommentController;
const { createOrRemoveBookmark } = BookmarkController;
const { createArticle, editArticle, shareArticle } = ArticleController;

const router = new Router();

router.post('/', [signInAuth, imageUpload, createarticle], tryCatch(createArticle));

router.post('/:slug/comment', [checkComments, signInAuth], tryCatch(createComments));

router.post('/:slug/comment/:commentid/thread', [checkComments, signInAuth], tryCatch(threadedComment));

router.post('/:articleId/claps', signInAuth, tryCatch(ClapController.createClap));
router.get('/', tryCatch(ArticleController.getAllArticles));

router.post('/:articleId/bookmark', signInAuth, tryCatch(createOrRemoveBookmark));

router.put('/:slug', [signInAuth, checkArticleExist, checkAuthor, updateArticle], tryCatch(editArticle));

router.post('/comment/:commentId/like', [signInAuth, doesLikeExistInCommentForUser], tryCatch(CommentController.likeComment));

router.post('/:slug/share', [signInAuth, shareArticleCheck, checkArticleExist], tryCatch(shareArticle));

export default router;
