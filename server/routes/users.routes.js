import express, { Router } from 'express';
import controllers from '../controllers';
import { signInAuth, superAdminAuth } from '../utils/users/permissions.util';
import { tryCatch, idValidator, validateRole } from '../utils';

const { UserController } = controllers;
const { updateUserRole } = UserController;

const router = new Router();

router.patch('/role/:id', signInAuth, superAdminAuth, idValidator, validateRole, tryCatch(updateUserRole));

export default router;
