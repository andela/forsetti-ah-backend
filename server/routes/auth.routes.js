import express, { Router } from 'express';
import passport from 'passport';
import controllers from '../controllers';
import {
  tryCatch,
  userSignup,
  userEmpty,
  userExist,
  isSigninFieldEmpty,
} from '../utils';

const { UserController } = controllers;
const { socialRedirect } = UserController;

const router = new Router();

router.post('/signup', [userEmpty, userExist, userSignup], tryCatch(UserController.create));

router.post('/login', isSigninFieldEmpty, tryCatch(UserController.signinUser));

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), socialRedirect);

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { session: false }), socialRedirect);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), socialRedirect);

export default router;
