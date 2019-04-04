import express, { Router } from 'express';
import controllers from '../controllers';
import { tryCatch, createArticle } from '../utils';
import { signInAuth } from '../utils/users/permissions.util';

const { ArticleController } = controllers;

const router = new Router();

router.post('/', [signInAuth, createArticle], tryCatch(ArticleController.createArticle));

export default router;
