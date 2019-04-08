import express, { Router } from 'express';
import { ArticleController, CommentController, ClapController } from '../controllers';
import { tryCatch, createArticle, checkComments } from '../utils';
import { signInAuth } from '../utils/users/permissions.util';

const { createComments, threadedComment } = CommentController;

const router = new Router();

router.post('/', [signInAuth, createArticle], tryCatch(ArticleController.createArticle));

router.post('/:slug/comment', [checkComments, signInAuth], tryCatch(createComments));

router.post('/:slug/comment/:commentid/thread', [checkComments, signInAuth], tryCatch(threadedComment));

router.post('/:articleId/claps', signInAuth, tryCatch(ClapController.createClap));

export default router;
