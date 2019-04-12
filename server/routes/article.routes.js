import express, { Router } from 'express';
import {
  ArticleController,
  CommentController,
  ClapController,
  BookmarkController
} from '../controllers';
import {
  tryCatch,
  createArticle,
  checkComments,
  doesLikeExistInCommentForUser,
} from '../utils';
import { signInAuth } from '../utils/users/permissions.util';
import imageUpload from '../config/cloudinaryconfig';

const { createComments, threadedComment } = CommentController;
const { createOrRemoveBookmark } = BookmarkController;

const router = new Router();

router.post('/', [signInAuth, imageUpload, createArticle], tryCatch(ArticleController.createArticle));

router.post('/:slug/comment', [checkComments, signInAuth], tryCatch(createComments));

router.post('/:slug/comment/:commentid/thread', [checkComments, signInAuth], tryCatch(threadedComment));

router.post('/:articleId/claps', signInAuth, tryCatch(ClapController.createClap));
router.get('/', tryCatch(ArticleController.getAllArticles));

router.post('/:articleId/bookmark', signInAuth, tryCatch(createOrRemoveBookmark));

router.post('/comment/:commentId/like', [signInAuth, doesLikeExistInCommentForUser], tryCatch(CommentController.likeComment));

export default router;
