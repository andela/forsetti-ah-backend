import express, { Router } from 'express';
import controllers from '../controllers';
import utils from '../utils';

const { UserController } = controllers;
const { tryCatch } = utils;

const router = new Router();

router.post('/', tryCatch(UserController.create));

export default router;
